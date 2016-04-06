<?php
namespace Admin\Controller;
use Think\Controller;
use Think\Page;

class MsgController extends FilterController{

    //查找所有的消息
    public function msgList($del_flag=1){
        $msg = M('msg');
        $recordcount = $msg->where("del_flag = {$del_flag}")->order("create_time desc")->count();//总记录数
        $page=new Page($recordcount,10);
        $page->setConfig('prev', '【上一页】');
        $page->setConfig('next', '【下一页】');
        $page->setConfig('first', '【首页】');
        $page->setConfig('last', '【末页】');

        $page->setConfig('theme', '共 %TOTAL_ROW% 条记录,当前是 %NOW_PAGE%/%TOTAL_PAGE% %FIRST% %UP_PAGE%  %DOWN_PAGE% %END%');

        $startno=$page->firstRow;   //起始行数
        $pagesize=$page->listRows;  //页面大小
        $msgList=$msg->where("del_flag = {$del_flag}")->order("create_time desc")->limit("$startno,$pagesize")->select();

        $pagestr=$page->show(); //组装分页字符串

        $this->assign('msgList',$msgList);
        $this->assign('pagestr',$pagestr);
        $this->display();
    }
    //根据ID查找消息
    public function editMsg($msg_id=null){
        if(empty($msg_id)){
            returnApiError("信息id不能为空");
            exit();
        }
        $msg = M('msg');
        $msgData = $msg->where("msg_id = {$msg_id}")->find();
        $this->assign('msg',$msgData);
        $this->display();
    }
    //发送消息是获取信息
    public function sendMsg($msg_id=null,$activity_id=null,$wechatid=null){
        if(empty($msg_id)){
            returnApiError("信息ID不能为空");
            exit();
        }
        $msg = M('msg');
        $msgData = $msg->where("msg_id={$msg_id}")->find();
        $activity_user = M("activity_user");
        $activity = M('activity');
        $activityData = $activity->where("del_flag = 1")->order("start_time desc")->select();
        if(empty($activity_id)){
            $activity_id = $activityData[0]['activity_id'];
            $userIds = $activity_user->where("del_flag = 1 AND activity_id = {$activityData[0]['activity_id']}")->getField('user_id');
        }else{
            $userIds = $activity_user->where("del_flag = 1 AND activity_id = {$activity_id}")->getField('user_id');
        }
        if(!empty($wechatid)){
            $group = M('group');
            $groupId = $group->where("del_flag = 1 AND wechatid = {$wechatid}")->getField("group_id");
            if(!empty($groupId)){
                $group_user = M('group_user');
                $userIds = $group_user->where("del_flag = 1 AND user_id in ($userIds)")->getField("user_id");
            }else{
                $userIds = null;
            }
        }
        if(!empty($userIds)){
            $user = M('user');
            $userData = $user->where("del_flag=1 AND user_id in ({$userIds})")->order("create_time desc")->select();
            $user_msg = M('user_msg');
            for($i=0;$i<count($userData);$i++){
                $users = $user_msg->where("del_flag=1 AND user_id = {$userData[$i]['user_id']} AND msg_id = {$msg_id}")->select();
                if(count($users)>0){
                    $userData[$i]['is_send'] = "已发送";
                }else{
                    $userData[$i]['is_send'] = "未发送";
                }
            }
            $this->assign('users',$userData);
        }
        $this->assign('msg',$msgData);
        $this->assign('activitys',$activityData);
        $this->assign('activity_id',$activity_id);
        $this->assign("wechatid",$wechatid);
        $this->display();
    }
    //发送消息
    public function doSendMsg($msg_id=null,$user_id=null,$activity_id){
        if(empty($msg_id)||empty($user_id)){
            returnApiError("信息ID或用户ID不能为空");
            exit();
        }
        $user = M('user');
        $user_msg = M('user_msg');
        foreach($user_id as $id) {
            $users = $user->where("user_id={$id} AND del_flag=1")->select();
            foreach ($users as $user) {
                $data['msg_id'] = $msg_id;
                $data['user_id'] = $user['user_id'];
                $data['create_time'] = date("Y-m-d H:i:s", time());
                $user_msg->add($data);
            }
        }
        $data = array(
            'msg_id' => $msg_id,
            'activity_id' => $activity_id,
        );
        $this->redirect('sendMsg',$data);
    }
    //更新消息
    public function saveMsg(){
        $msg = M('msg');
        if($msg->create()){
            $result = $msg->save();
            $this->redirect('msgList',null);
        }else{
            returnApiError("更新失败");
        }
    }
    public function addMsg(){
        $this->display();
    }
    //添加消息
    public function doAddMsg(){
        $msg = M('msg');
        if($msg->create()){
            $msg->create_time= date("Y-m-d H:i:s",time());
            $result = $msg->add();
            $this->redirect("msgList",null);
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
        $user_msg = M('user_msg');
        $data = $user_msg->where("msg_id={$msg_id}")->select();
        for($i=0;$i<count($data);$i++){
            $data[$i]['del_flag'] = 0;
            $user_msg->save($data[$i]);
        }
        $this->redirect('msgList',null);
    }
}