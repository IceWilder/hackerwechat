<?php
namespace Admin\Controller;
use Think\Controller;

class ApplyController extends Controller{
    public function apply(){
       $group_id=$_GET['group_id'];
        $activity_id=$_GET['activity_id'];
        if(!empty($group_id)&&!empty($activity_id)) {
            $userids = M('group_user')->where("group_id ={$group_id} and del_flag =1")->select();
            for ($i=0;$i<count($userids);$i++ ){
                $where=array('activity_id'=>$activity_id,'user_id'=>$userids[$i]['user_id'],'del_flag'=>1);
                  $au= M('activity_user')->where($where)->find();
                    $au['grade'] = $au['grade'] + 1;
                    M('activity_user')->save($au);

            }
            if($au===null){
                $this->error("提升失败");
            }
            else{
                $this->success("提升成功");
            }
            }
     }
}