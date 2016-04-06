<?php
namespace Admin\Controller;

use Think\Controller;

class GroupController extends Controller{
    public function addGroup(){
        if(IS_POST){
            $activityid=$_POST['activity_id'];
            if($activityid!==null) {
                $group = array();
                $group['wechatID'] = $_POST['wechatID'];
                $group['category'] = $_POST['category'];
                $group['hackerID']=$_POST['hackerID'];
                $date = date("Y-m-d H:i:s",time());
                $group['create_time'] = $date;
                M("group")->add($group);
                $groupid = M("group")->where("create_time = '{$date}'")->find();
                $activity_group = array(
                    "group_id" => $groupid['group_id'],
                    "activity_id" => $activityid,
                    "create_time"   =>$date,
                );
                M("activity_group")->add($activity_group);
                $this->redirect("getGroup",array('activity_id'=>$activityid));
            }
        }
        else{
            $activityid=$_GET['activity_id'];
            $this->assign("activity_id",$activityid);
        }
     $this->display();
    }
    public function getGroup(){
     $activityid=$_GET['activity_id'];

      if($activityid!==null) {

          $activity = M('activity')->where('activity_id = ' . $activityid)->find();
          $count      = M('activity_group')->where("activity_id = {$activityid} and del_flag=1")->count();
          $Page       = new \Think\Page($count,10);
          $Page->setConfig('prev','【上一页】');
          $Page->setConfig('next','【下一页】');
          $Page->setConfig('frist','【首页】');
          $Page->setConfig('last','【末页】');
          $Page->setConfig('theme','共 %TOTAL_ROW%条记录,当前是 %NOW_PAGE%/%TOTAL_PAGE% %FIRST%　%UP_PAGE% %DOWN_PAGE% %END%');
          $show       = $Page->show();

          $groupids = M('activity_group')->where("activity_id = {$activityid} and del_flag = 1")->order("create_time desc")->limit($Page->firstRow.','.$Page->listRows)->select();
          if ($groupids !== null) {
              for ($i = 0; $i < count($groupids); $i++) {
                  $groups[$i] = M('group')->where("group_id ={$groupids[$i]['group_id']} and del_flag = 1")->find();
                  $user_ids = M('group_user')->field("user_id")->where("group_id ={$groupids[$i]['group_id']} and del_flag = 1")->order("create_time desc")->select();
                  if(!empty($user_ids)){
                      $grade= M('activity_user')->where("activity_id ={$activityid} and user_id = {$user_ids[0]['user_id']}")->find();
                      $groups[$i]['grade']=$grade['grade'];
                      $grade=null;
                  }
//                  for ($j = 0; $j < count($user_ids); $j++) {
//                      $user = M('user')->where("user_id = {$user_ids[$j]['user_id']} and del_flag = 1")->find();
//                      $users[$j] = $user;
//                  }
//                  $groups[$i]['users']=$users;
//                  $users=null;
              }
              $gradelist=array(
                  array('value'=>0 ,'name'=>"未报名"),
                  array('value'=>1 ,'name'=>"提交申请"),
                  array('value'=>2 ,'name'=>"审核中"),
                  array('value'=>3 ,'name'=>"预约面试"),
                  array('value'=>4 ,'name'=>"申请成功"),
              );
              $this->assign('page',$show);
              $this->assign("groups", $groups);
              $this->assign('gradelist',$gradelist);
          }
          $this->assign("activity", $activity);
      }
        $this->display();
    }
    public function getUser(){
    $groupid=$_GET['group_id'];
        $activityid=$_GET['activity_id'];
        if($groupid!==null){
            $user_ids= M('group_user')->field("user_id")->where("group_id = {$groupid} and del_flag = 1 ")->select();
            for ($j = 0; $j < count($user_ids); $j++) {
                      $user = M('user')->where("user_id = {$user_ids[$j]['user_id']} and del_flag = 1")->find();
                      $users[$j] = $user;
            }

                $this->assign("users", $users);
                $this->assign("group_id",$groupid);
                $this->assign('activity_id',$activityid);
                $this->display();

        }
        else{
            $this->error("id不能为空");
        }
   }
    public function getGroupById(){
        $group_id=$_GET['group_id'];
        $group = M('group')->where("group_id = {$group_id} and del_flag =1")->find();
        if (empty($group)) {
            returnApiError('该团队已解散');
            exit();
        }
        $group_user = M('group_user')->where("group_id = {$group_id} and del_flag = 1")->select();
        if (!empty($group_user)) {
            $i = 0;
            foreach ($group_user as $v) {
                $users[i] = M('user')->where("user_id = {$v['user_id']} and del_flag =1")->select();
                $i++;
            }
        }
   }
    public function updateGroup()
    {
        if(IS_POST) {
            $model = M('group');
            if ($group = $model->create()) {
                $model->save();
                $this->redirect("getGroup",array('activity_id'=>$_POST['activity_id']));
            }
        }
        else{
            $groupid=$_GET['group_id'];
            $activityid=$_GET['activity_id'];
            if($groupid!==null){
                $group=M('group')->where("group_id ={$groupid}")->find();
                $categorylist=array(
                  array("value"=>0,"name"=>"技术互联网"),
                    array("value"=>1,"name"=>"生活文艺"),
                    array("value"=>2,"name"=>"健康运动"),
                    array("value"=>3,"name"=>"八卦杂谈"),
                    array("value"=>4,"name"=>"媒体阅读"),
                    array("value"=>5,"name"=>"艺术影画"),
                    array("value"=>6,"name"=>"吃喝生活"),
                );
                $this->assign("categorylist",$categorylist);
                $this->assign("group",$group);
                $this->assign("activity_id",$activityid);
            }
        }
       $this->display();
    }
    public function delGroup()
    {
        $gid = $_GET['group_id'];
        $activityid=$_GET['activity_id'];
        if (!empty($gid)) {
           $group= M('group')->where("group_id = {$gid}")->find();
            if($group!==null) {
                $group['del_flag']=0;
                M('group')->save($group);
            }
            $activity_group= M('activity_group')->where("group_id = {$gid}")->find();
            if($activity_group!==null) {
                $activity_group['del_flag']=0;
                M('activity_group')->save($activity_group);
            }
            $group_user= M('group_user')->where("group_id = {$gid}")->select();
            if($group_user!==null) {
                for($i=0;$i<count($group_user);$i++) {
                    $group_user[$i]['del_flag'] = 0;
                    M('group_user')->save($group_user[$i]);
                    ///
                    $useid=$group_user[$i]['user_id'];
                    $activity_user= M('activity_user')->where("activity_id = {$activityid} and user_id = {$useid} ")->find();
                    $activity_user['del_flag']=0;
                    M('activity_user')->save($activity_user);
                }
            }
            }
            $this->redirect("getGroup",array('activity_id'=>$activityid));
        }

    public function delGroupUser()
    {
        $uid = $_GET['user_id'];
        $gid = $_GET['group_id'];
        if (!empty($uid) &&!empty($gid)) {
            $where = array('user_id' => $uid, 'group_id' => $gid,'del_flag'=>1);
           $group_user= M('group_user')->where($where)->find();
            $group_user['del_flag']=0;
            M("group_user")->save($group_user);
            $this->success();
        }

//
//        M('group_user')->where($where)->save("del_flag = 0");
    }
    public function addGroupUser()
    {

        if (IS_POST) {
            $gid = $_POST['group_id'];
            $real_name = trim($_POST['real_name']);
            $activityid = $_POST['activity_id'];
            $mobile = trim($_POST['mobile']);
            ////////////////////////

                /////////////////////////
                $user = M('user')->where("real_name = '" . $real_name . "'and  mobile = {$mobile} and del_flag = 1")->find();
                $userids = M("group_user")->where("group_id = {$gid} and del_flag=1 ")->select();
                if (!empty($user) && count($userids) < 3) {
                    /////////
                    $u = M("user")->where("mobile = {$mobile} and del_flag = 1")->find();
                    if (empty(M("group_user")->where("group_id ={$gid} and user_id = {$u['user_id']} and del_flag = 1")->find())) {

                        $gu = array(
                            'group_id' => $gid,
                            'user_id' => $user['user_id'],
                            'create_time' => date("Y-m-d H:i:s"),
                        );
                        $au = array('activity_id' => $activityid,
                            'user_id' => $user['user_id'],
                            'create_time' => date("Y-m-d H:i:s"),
                        );

                        M('group_user')->add($gu);
                        M('activity_user')->add($au);
                    }
                    else{
                        $this->error("不能重复添加该队员");
                    }


                } else {
                    $this->error("队员不能超过3或不存在该队员");
                }
                $this->redirect("getUser", array('activity_id' => $activityid, "group_id" => $gid));
                exit();
            } else {
                $gid = $_GET['group_id'];
                $activity = $_GET['activity_id'];
                $this->assign("activity_id", $activity);
                $this->assign("group_id", $gid);
            }
            $this->display();


    }
}