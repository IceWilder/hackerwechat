<?php
namespace Home\Controller;
use Think\Controller;

class ReportController extends Controller{
    //添加周报
    public function addReport(){

        $user_group=M('group_user');
        $groupModel=M('group');
        $reportModel= M('group_report');
        $uid=$_GET['user_id'];
        if($uid==null){
            returnApiError("用户id不存在");
           exit();
        }

       $groupId= $user_group->field('group_id')->where('user_id ='.$uid)->find();
        if($groupId==null){
            returnApiError("未参与任何团队");
            exit();
        }

        $wechatId=$groupModel->field('wechatID')->where('group_id ='.$groupId['group_id'])->find();
        if($wechatId==null){
            returnApiError("wechatId不存在");
            exit();
        }

        if($reportModel->create($data=I('post.'))){
            $data['create_time']=time();
            $data['wechatID']=$wechatId['wechatid'];
            $reportModel->add($data);
        }
   }
}