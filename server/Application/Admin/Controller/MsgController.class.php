<?php
namespace Admin\Controller;
use Think\Controller;
class MsgController extends Controller{
    //查找所有的消息
    public function msgList($del_flag=null){
        if(empty($del_flag)){
            $del_flag = 1;
        }
        $msg = M('msg');
        $msgData = $msg->where("del_flag = {$del_flag}")->order("create_time desc")->select();
        returnApiSuccess("所有的消息",$msgData);
    }
    //根据ID查找消息
    public function findMsg($msg_id=null){
        if(empty($msg_id)){
            returnApiError("信息id不能为空");
            exit();
        }
        $msg = M('msg');
        $msgData = $msg->where("msg_id = {$msg_id}")->find();
        if(empty($msgData)){
            returnApiError("消息不存在");
        }else{
            returnApiSuccess("消息信息",$msgData);
        }
    }
    //发送消息是获取信息
    public function sendMsgInfo($msg_id=null){
        if(empty($msg_id)){
            returnApiError("信息ID不能为空");
            exit();
        }
        $msg = M('msg');
        $msgData = $msg->where("msg_id={$msg_id}")->find();
        $group = M('group');
        $groupData = $group->where("del_flag=1")->order("create_time desc")->select();
        $data = array(
            'msg'=>$msgData,
            'groups'=>$groupData,
        );
        returnApiSuccess($data);
    }
    //发送消息
    public function sendMsg($msg_id=null,$group_id=null){
        if(empty($msg_id)||empty($group_id)){
            returnApiError("信息ID或团队ID或用户ID不能为空");
            exit();
        }
        $group_user = M('group_user');
        if(is_array($group_id)){
            foreach($group_id as $id){
                $user_ids = $group_user->where("group_id={$id} AND del_flag=1")->select();
                foreach($user_ids as $user_id){
                    $user_msg = M('user_msg');
                    $user_msg->msg_id = $msg_id;
                    $user_msg->user_id = $user_id;
                    $user_msg->create_time = time();
                    $user_msg->add();
                }
            }
        }else{
            $user_ids = $group_user->where("group_id={$group_id} AND del_flag=1")->select();
            foreach($user_ids as $user_id){
                $user_msg = M('user_msg');
                $user_msg->msg_id = $msg_id;
                $user_msg->user_id = $user_id;
                $user_msg->create_time = time();
                $user_msg->add();
            }
        }
    }
    //更新消息
    public function saveMsg(){
        $msg = M('msg');
        if($msg->create()){
            $result = $msg->save();
            if($result === false){
                returnApiError("更新失败");
            }else{
                returnApiSuccess("更新成功","");
            }
        }else{
            returnApiError("更新失败");
        }
    }
    //添加消息
    public function addMsg(){
        $msg = M('msg');
        if($msg->create()){
            $msg->create_time=time();
            $result = $msg->add();
            if($result){
                returnApiSuccess("添加成功","");
            }else{
                returnApiError("添加失败");
            }
        }else{
            returnApiError("添加失败");
        }
    }
    //根据id删除消息
    public function deleteMsg($msg_id=null){
        if(empty($msg_id)){
            returnApiError("信息id不能为空");
            exit();
        }
        $msg = M('msg');
        $msg->del_flag = 0;
        $result = $msg->where("msg_id={$msg_id}")->save();
        if($result === false){
            returnApiError("删除失败");
        }else{
            returnApiSuccess("删除成功","");
        }
    }
}