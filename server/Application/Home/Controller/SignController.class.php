<?php
namespace Home\Controller;

use Think\Controller;

class SignController extends Controller
{
  public function sign()
  {
    if(IS_POST){
      //实例化
      $activityModel=M('activity');
      $groupModel=M('group');
      $userModel=M('User');
      $agModel=M('activity_group');
      $ugModel=M('Group_user');
      $uaModel=M('activity_user');
      $activityModel->startTrans();
      $activityData=$activityModel->where('del_flag=1')->find();
      $activity_id=$activityData['activity_id'];
       //插入团队表
      $group['category']=I('post.category');
      $group['wechatID']=I('post.wechat_id');
      $group['users']=
      $group['create_time']=time();
      $group_id=$groupModel->field('category,wechat_id,create_time')->add($group);
      if(!$group_id){
        $activityModel->rollback();
        returnApiError('团队插入失败');die();
      }
        //插入活动团队对应表j
      $agList=array(
        'activity_id'=>$activity_id,
          'group_id'=>$group_id
      );
      $returncode=$agModel->field('activity_id,group_id')->add($agList);
      if(!$returncode){
        $activityModel->rollback();
        returnApiError($userModel->getError());die();
      }

      $users=json_decode(I('post.users'),true);
      foreach($users as $key=>$user){
        //插入用户表
        $userid=$userModel->field('real_name,email,mobile')->add($user);
        if(!$userid){
          $activityModel->rollback();
          returnApiError($userModel->getError());die();
        }
        //插入用户团队关联表
        $ugList=array(
            'gourp_id'=>$group_id,
            'user_id'=>$userid,
        );
        if(!$ugModel->field('gourp_id,user_id')->add($ugList)){
          $activityModel->rollback();
          returnApiError('用户－团队插入失败');die();
        }
        //插入用户活动关联表
        $uaList=array(
          'activity_id'=>$activity_id,
          'user_id'=>$userid,
        );
        if(!$uaModel->field('activity_id,user_id')->add($uaList)){
          $activityModel->rollback();
          returnApiError('活动－团队插入失败');die();
        }
      }
      $activityModel->commit();
      returnApiSuccess('报名成功');
    }
  }
}
