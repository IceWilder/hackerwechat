<?php
namespace Home\Controller;
use Model\UserModel;
use Think\Controller;
class UserController extends Controller{
    //骇客信息
    public function getUser($user_id){
        $user = M('user');
        $userData = $user->where("user_id={$user_id}")->find();
        returnApiSuccess("用户信息",$userData);
    }
    //个人中心
    public function getUserInfo(){
        $id=$_GET['user_id'];
        if($id==null){
            returnApiError('用户id不存在');
            exit() ;
        }
        $userModel= new UserModel();
        $whereUser=array('user_id'=>$id,'del_flag'=>1);
        $user= $userModel->where($whereUser)->find();
        if($user==null){
            returnApiError('用户已失效');
            exit() ;
        }

        //获取消息数量
        $whereMsg=array('user_id'=>$id,'is_read'=>0);
        $msgcount=M('user_msg')->where($whereMsg)->count();

        $data=array(
            'user'=>$user,
            'msgcount'=>$msgcount
        );
        if($data) {
            returnApiSuccess('success', $data);
        }
        else
            returnApiError('fail');
    }
    //用户活动信息
    function getActivityinfo(){
        $id=$_GET['user_id'];
        //获取activities

        $activityid=M('activity_user')->field('activity_id')->where("user_id = {$id} and del_flag = 1")->order('create_time desc')->select();
        dump($activityid);
        if(empty($activityid)){
            returnApiError('未参加该活动');
            exit() ;
        }
        $i=0;
        foreach($activityid as $aid) {
            $whereActivity=array('activity_id'=>$aid['activity_id'],'del_flag'=>1);
            if(!empty($res=M('activity')->where($whereActivity)->find())) {
                $activities[$i] =$res;
                    $i++;
            }
        }
        if(empty($activities)){
            returnApiError("没有活动");
        }
        else{
           returnApiSuccess("",$activities);
        }
    }
}