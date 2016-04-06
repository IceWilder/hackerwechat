<?php
namespace Home\Controller;

use Think\Controller;

class SignController extends Controller
{
    public function sign()
    {
        if (IS_POST) {
            //实例化
            $activityModel = M('activity');
            $groupModel = M('group');
            $userModel = M('User');
            $agModel = M('activity_group');
            $ugModel = M('Group_user');
            $uaModel = M('activity_user');
            // $users=$_POST['users'];
            //插入用户表
            $activity_id = $_POST['activity_id'];
            $activityModel->startTrans();
            $create_time = date('Y-m-d H:i:s', time());
            $json_users = I('post.users', '', 'strip_tags');

            $users=json_decode($json_users,true);
            if(empty($users)){
                returnApiError("至少要有一个队员!");die();
            }
            foreach ($users as $key => $user) {
                //用户信息检查
                if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $user['email'])) {
                    $emailErr = "无效的 email 格式！";
                    returnApiError($emailErr);
                    die();
                }
                if (!preg_match("/^0?1[3|4|5|8][0-9]\d{8}$/", $user['mobile'])) {
                    $mobileErr = "无效的手机号码";
                    returnApiError($mobileErr);
                    die();
                }
                $user['create_time'] = $create_time;
                $userid = $userModel->add($user);
                if (!$userid) {
                    $activityModel->rollback();
                    returnApiError("用户表插入失败");
                    die();
                }
            }
            //插入团队表
            $group['category'] = I('post.category');
            $group['wechatID'] = I('post.wechat_id');
            $group['create_time'] = $create_time;
            $group_id = $groupModel->field('category,wechatID,create_time')->add($group);
            if (!$group_id) {
                $activityModel->rollback();
                returnApiError('团队插入失败');
                die();
            }
            //插入活动团队对应表
            $agList = array(
                'activity_id' => $activity_id,
                'group_id' => $group_id,
                'create_time' => $create_time
            );
            $returncode = $agModel->field('activity_id,group_id,create_time')->add($agList);
            if (!$returncode) {
                $activityModel->rollback();
                returnApiError($userModel->getError());
                die();
            }
            //插入用户团队关联表
            $ugList = array(
                'group_id' => $group_id,
                'user_id' => $userid,
                'create_time' => $create_time,
            );
            if (!$ugModel->field('group_id,user_id,create_time')->add($ugList)) {
                $activityModel->rollback();
                returnApiError('用户－团队插入失败');
                die();
            }
            //插入用户活动关联表
            $uaList = array(
                'activity_id' => $activity_id,
                'user_id' => $userid,
                'create_time' => $create_time,
            );
            if (!$uaModel->field('activity_id,user_id,create_time')->add($uaList)) {
                $activityModel->rollback();
                returnApiError('活动－团队插入失败');
                die();
            }

            $activityModel->commit();
            returnApiSuccess('报名成功');
        }
    }
}
