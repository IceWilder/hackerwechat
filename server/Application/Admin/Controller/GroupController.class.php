<?php
namespace Admin\Controller;

use Think\Controller;

class GroupController extends Controller
{
//   public function addGroup(){
//       $data['wechatID']=$_GET['wechatID'];
//       $data['category']=$_GET['category'];
//       $data['']
//       $users=$_GET['users'];
//
//   }
    public function getGroup()
    {
        $group_id = $_GET['group_id'];
        $del_flag = $_GET['del_flag'];
        $model = M('group');
        if (empty($group_id)) {
            if ($del_flag === null) {
                if (!empty ($data = $model->order('create_time desc')->select())) {
                    returnApiSuccess("获取成功", $data);
                } else
                    returnApiError("获取失败");
            } else {
                if (!empty ($data = $model->where('del_flag =' . $del_flag)->order('create_time desc')->select())) {
                    returnApiSuccess("获取成功", $data);
                } else
                    returnApiError("获取失败");
            }
        } else {
            $group = $model->where("group_id = {$group_id} and del_flag =1")->find();
            if (empty($group)) {
                returnApiError('该团队已解散');
                exit();
            }
            $group_user = M('group_user')->where("group_id = {$group_id} and del_flag =1")->select();
            if (!empty($group_user)) {
                $i = 0;
                foreach ($group_user as $v) {
                    $users[i] = M('user')->where("user_id = {$v['user_id']} and del_flag =1")->select();
                    $i++;
                }
            }
            $activity_id = M('activity_group')->field('activity_id')->where("group_id = {$group_id} and del_flag =1")->find();
            if (!empty($activity_id)) {
                $activity = M('activity')->where("activity_id = {$activity_id['activity_id']} and del_flag =1")->find();

            }

            $data = array(
                'group' => $group,
                'users' => $users,
                'activity' => $activity
            );
            if (!empty ($data)) {
                returnApiSuccess("获取成功", $data);
            } else
                returnApiError("获取失败");
        }
    }

    public function updateGroup()
    {
        $model = M('group');
        if ($group = $model->create()) {
            $model->save();
        }
    }

    public function delGroupUser()
    {
        $uid = $_GET['user_id'];
        $gid = $_GET['group_id'];
        if (empty($uid) || empty($gid)) {
            returnApiError("userid,groupid必须有");
        }
        $where = array('user_id' => $uid, 'group_id' => $gid);
        $group_user = M('group_user')->where($where)->find();
        $group_user['del_flag'] = 0;
        M('group_user')->save($group_user);
    }

    public function addGroupUser()
    {
        $gid = $_POST['group_id'];
        $real_name = $_POST['real_name'];
        $mobile = $_POST['mobile'];
        $user = M('user')->where("real_name = '" . $real_name . "'and  mobile = {$mobile} and del_flag = 1")->find();
        if (empty($user)) {
            returnApiError('该用户不存在');
        } else {
            $gu = array(
                'group_id' => $gid,
                'user_id' => $user['user_id'],
                'create_time' => time()
            );
            M('group_user')->add($gu);
        }
    }
}