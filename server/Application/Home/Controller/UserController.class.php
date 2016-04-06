<?php
namespace Home\Controller;

use Think\Controller;

class SignController extends Controller
{
    public function sign()
    {
        import('Class.object_array', APP_PATH);
        if (IS_POST) {
//            实例化需要的模型对象
            $activityModel = M('activity');
            $groupModel = M('group');
            $userModel = M('User');
            $agModel = M('activity_group');
            $ugModel = M('Group_user');
            $uaModel = M('activity_user');
            $errorFlag = 0;
            //开启事务
            $activityModel->startTrans();
            $activity_id = $_POST['activity_id'];
            $wechatid = $_POST['wechatID'];
            $category = $_POST['category'];
            $create_time = date('Y-m-d H:i:s', time());
            $users = json_decode(I('post.users', '', 'strip_tags'));
            if (empty($users)) {
                $errorFlag = 1;
            }
            //插入团队表
            $group = array(
                'category' => $category,
                'wechatID' => $wechatid,
                'create_time' => $create_time
            );
            $group_id = $groupModel->field('category,wechatID,create_time')->add($group);
            if (!$group_id) {
                $errorFlag = 1;
            }
            //插入活动团队对应表
            $agList = array(
                'activity_id' => $activity_id,
                'group_id' => $group_id,
                'create_time' => $create_time
            );
            $returncode = $agModel->field('activity_id,group_id,create_time')->add($agList);
            if (!$returncode) {
                $errorFlag = 1;
            }
            //用户信息检查和插入
            foreach ($users as $userobj) {
                $real_name = $userobj->real_name;
                $email = $userobj->email;
                $mobile = $userobj->mobile;
                if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
                    $error="邮箱格式错误";
                    $errorFlag = 1;
                }
                if (!preg_match("/^0?1[3|4|5|8][0-9]\d{8}$/", $mobile)) {
                    $error="手机格式错误";
                    $errorFlag = 1;
                }
                //手机号不能重复
                $where = array(
                    'del_flag' => 1,
                    'mobile' => $mobile,
                );
                $test = $userModel->where($where)->find();
                if (!empty($test)) {
                    $errorFlag = 1;
                }
                $userdata = array(
                    "real_name" => $real_name,
                    "email" => $email,
                    "mobile" => $mobile,
                    "create_time" => $create_time
                );
                $userid = $userModel->field('real_name,email,mobile,create_time')->add($userdata);
                if (!$userid) {
                    $errorFlag = 1;
                }
                //插入用户团队关联表
                $ugList = array(
                    'group_id' => $group_id,
                    'user_id' => $userid,
                    'create_time' => $create_time,
                );
                if (!$ugModel->field('group_id,user_id,create_time')->add($ugList)) {
                    $errorFlag = 1;
                }
                //插入用户活动关联表
                $uaList = array(
                    'activity_id' => $activity_id,
                    'user_id' => $userid,
                    'create_time' => $create_time,
                );
                if (!$uaModel->field('activity_id,user_id,create_time')->add($uaList)) {
                    $errorFlag = 1;
                }
            }
            if ($errorFlag==1) {
                $uaModel->rollback();
                returnApiError("报名失败,".$error);
            } else {
                $uaModel->commit();
                returnApiSuccess('报名成功success');
            }
        }
    }
}

?>
