<?php
/**
 * Created by PhpStorm.
 * User: darcygail
 * Date: 3/18/16
 * Time: 3:42 PM
 */

namespace Admin\Controller;


use Think\Controller;

class UserController extends Controller
{
    public function userAdd()
    {
        if (IS_POST) {
            $userModel = M('user');
            $userModel->startTrans();
            $userModel->create();
            $user_id = $userModel->add();
            if (!$user_id) {
                $userModel->rollback();
                $this->error('添加失败', U('userList'), 1);
                die();
            }
            if ($_POST['group_id']) {
                $guModel = M('group_user');
                $guList['group_id'] = $_POST['group_id'];
                $guList['user_id'] = $user_id;
                $guModel->data($guList)->add();
                if (!$guModel) {
                    $userModel->rollback();
                    $this->error('添加失败', U('userList'), 1);
                    die();
                }
            }
            $current = returnCurrentActivity();
            $auModel = M('activity_user');
            $auList['activity_id'] = $current;
            $auList['user_id'] = $user_id;
            $result = $auModel->add($auList);
            if (!$result) {
                $userModel->rollback();
                $this->error('添加失败', U('userList'), 1);
                die();
            }
            $userModel->commit();
            $this->success('添加成功', U('userList'), 1);
        } else {
            $current = returnCurrentActivity();
            $where = array('activity_id' => $current);
            $agModel = M('activity_group');
            $groupModel = M('group');
            //根据activity_id取出当前活动已经报名的队伍
            $groups = array();
            $groupids = $agModel->where($where)->field('group_id')->select();
            foreach ($groupids as $groupid) {
                $group = $groupModel->field('group_id,wechatID')->where($groupid)->find();
                array_push($groups, $group);
            }
            $this->assign("groups", $groups);
            $this->display();
        }
    }

    public function userEdit()
    {
        $userModel=M('user');
        $groupModel=M('group');
        //处理
        $user_id=$_POST['user_id'];
        if(IS_POST){
            $data=$userModel->create();
            $data->save();
            if($_POST['wechatID']!=$_POST['wechat']){
                $guModel = M('group_user');
                $data['user_id']=$_POST['user_id'];
                $where=array('wechatID'=>$_POST['wechatID']);
                $group_id=$groupModel->where($where)->getField('group_id');
                $data['group_id']=$group_id;
                $guModel->save($data);
            }
        }
        $user_id = $_GET['user_id'];
        $guModel = M('group_user');
        $agModel = M('activity_group');
        $groupModel = M('group');
        $current = returnCurrentActivity();
        $where = array('activity_id' => $current);
        //获取用户信息
        $user=$userModel->find($user_id);
        //获取团队信息
        $groups = array();
        $groupids = $agModel->where($where)->field('group_id')->select();
        foreach ($groupids as $groupid) {
            $group = $groupModel->field('group_id,wechatID')->where($groupid)->find();
            array_push($groups, $group);
        }
        $this->assign("groups", $groups);
        $where = array('user_id' => $user_id, 'del_flag' => 1);
        $group_id = $guModel->where($where)->getField('group_id');
        if ($group_id) {
            $where2 = array('group_id' => $group_id);
            $wechatID = $groupModel->where($where2)->getField('wechatID');
        } else {
            $wechatID = '';
        }
        $user['wechatid'] = $wechatID;
        $this->assign('user',$user);
        $this->display();
    }

    //删除时同时删除关联的数据,user,user_group,user_activity
    public function delete()
    {
        $userModel = M('user');
        $userModel->startTrans();
        $user_id = $_GET['user_id'];
        $where = array('user_id' => $user_id,);
        $userModel->del_flag = 0;
        $result = $userModel->where($where)->save();
        if ($result == false) {
            $userModel->rollback();
            $this->error('删除失败', U('userList'), 1);
            die();
        }
        $guModel = M('group_user');
        $test = $guModel->where($where)->find();
        echo "test is " . $test;
        if ($guModel->where($where)->find()) {
            echo "已进入";
            $guModel->del_flag = 0;
            $result = $guModel->where($where)->save();
            if (!$result) {
                $userModel->rollback();
                $this->error('删除失败', U('userList'), 1);
                die();
            }
        }

        $auModel = M('activity_user');
        if ($auModel->where($where)->find()) {
            $auModel->del_flag = 0;
            $result = $auModel->where($where)->save();
            if (!$result) {
                $userModel->rollback();
                $this->error('删除失败', U('userList'), 1);
                die();
            }
        }

        $umModel = M('user_msg');
        if ($umModel->where($where)->find()) {
            $userModel->del_flag = 0;
            $result = $umModel->where($where)->save();
            if (!$result) {
                $userModel->rollback();
                $this->error('删除失败', U('userList'), 1);
                die();
            }
        }

        $userModel->commit();
        $this->success('删除成功', U('userList'), 1);
    }

    //取出当前活动的未删除的用户信息
    public function userList()
    {
        $userModel = M('user');
        $auModel = M('activity_user');
        $current = returnCurrentActivity();
        $where3 = array('activity_id' => $current, 'del_flag' => 1);
        $userids = $auModel->where($where3)->field('user_id')->select();
        $guModel = M('group_user');
        $users = array();
        $user=array();
        $groupModel = M('group');
        foreach ($userids as $userid) {
//            $wechatID='';
            echo 'userid is'.$userid['user_id'];
            $where = array('user_id' => $userid['user_id'], 'del_flag' => 1);
            $user = $userModel->where($where)->find();
            if($user){

            $group_id = $guModel->where($where)->getField('group_id');
            if ($group_id) {
                $where2 = array('group_id' => $group_id);
                $wechatID = $groupModel->where($where2)->getField('wechatID');
            } else {
                $wechatID = '';
            }
            $user['wechatid'] = $wechatID;
            array_push($users, $user);
            }
        }
//        dump($users);
        $this->assign("users", $users);
        $this->display();
    }
}