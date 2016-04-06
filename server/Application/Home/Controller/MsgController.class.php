<?php
namespace Home\Controller;
use Think\Controller;

class MsgController extends Controller{
    //得到用户的信息
    function getMsg(){
        $id=$_GET['user_id'];
        if($id==null){
            returnApiError("userid is not null");
            exit();
        }
        $msgid = M('user_msg')->where('user_id =' . $id)->order('create_time desc')->select();
        $i=0;
        if($msgid==null){
            returnApiError('该用户没有接受消息');
            exit() ;
        }
        foreach($msgid as $mid) {
            if ($mid['is_read'] == 0) {
                $mid['is_read'] = 1;
                M('user_msg')->save($mid);
            }
            $whereMsg=array('msg_id'=>$mid['msg_id'],'del_flag'=>1);
            $msg[$i] =M('msg')->where($whereMsg)->find();
            $i++;
        }
     if($msg==null){
         returnApiError('没 有 msg');
         exit();
     }
        else{
            returnApiSuccess("我的消息",$msg);
        }
    }
}