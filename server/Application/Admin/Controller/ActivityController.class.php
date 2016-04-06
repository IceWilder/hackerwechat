<?php
namespace Admin\Controller;

use Model\ActivityModel;
use Think\Controller;
use Think\Upload;

class ActivityController extends FilterController
{
    public function addActivity()
    {
        if (IS_POST) {

            $model = new ActivityModel();
            if ($model->create()) {
                $model->add();
                $this->redirect('getActivity');
            }
        }
        $this->display();
    }
    //取activity
    /*
     * 传入activity_id根据activity_id查
     *
     * 没参数查出所有
     */
    public function getActivity($del_flag=1)
    {
            $activityid = $_GET['activity_id'];
            if (empty($activityid)) {
                if ($del_flag !== null) {
                    $count      =  M('activity')->where("del_flag = {$del_flag}")->count();
                    $Page       = new \Think\Page($count,10);
                    $Page->lastSuffix=false;//显示总页数
                    $Page->setConfig('prev','【上一页】');
                    $Page->setConfig('next','【下一页】');
                    $Page->setConfig('frist','【首页】');
                    $Page->setConfig('last','【末页】');
                    $Page->setConfig('theme','共 %TOTAL_ROW%条记录,当前是 %NOW_PAGE%/%TOTAL_PAGE% %FIRST%　%UP_PAGE% %DOWN_PAGE% %END%');
                    $show       = $Page->show();

                    if (!empty($data = M('activity')->where("del_flag = {$del_flag}")->order('start_time desc')->limit($Page->firstRow.','.$Page->listRows)->select())) {
                        $this->assign("activitys",$data);
                        $this->assign('page',$show);
                    } else {
                        returnApiError("获取活动失败");
                    }
                } else {
                    $count      =  M('activity')->count();
                    $Page       = new \Think\Page($count,5);
                    $Page->setConfig('prev',"【上一页】");
                    $Page->setConfig('next',"【下一页】");
                    $show       = $Page->show();
                    if ($data = M('activity')->order('start_time desc')->limit($Page->firstRow.','.$Page->listRows)->select()) {
                        $this->assign("activitys",$data);
                        $this->assign('page',$show);
                    } else {
                        returnApiError("获取活动失败");
                    }
                }
            }
        $this->display();
    }

    public function update()
    {
        $model = new ActivityModel();
        if(IS_POST) {
            if ($model->create()) {
                $model->save();
                $this->redirect("update",array('activity_id'=>$_POST['activity_id']));
            }
        }
        else{
            $activity_id=$_GET['activity_id'];
           if($activity_id!==null) {
               $activity = $model->where("activity_id ={$activity_id}")->find();
               $this->assign("activity", $activity);
           }
        }
        $this->display();
    }

    public function delActivity()
    {
        $activityid = $_GET['activity_id'];
        if ($activityid === null) {
            returnApiError("id不能为空");
            exit();
        }
       $data= M('activity')->where("activity_id ={$activityid}")->find();
        if($data!==null) {
            $data[del_flag] = 0;
            M('activity')->where("activity_id ={$activityid}")->save($data);
        }
        $data= M('activity_user')->where("activity_id ={$activityid}")->find();
        if($data!==null) {

            $data[del_flag] = 0;
            M('activity_user')->where("activity_id ={$activityid}")->save($data);
        }
        $data= M('activity_group')->where("activity_id ={$activityid}")->find();
        if($data!==null){
        $data[del_flag]=0;
        M('activity_group')->where("activity_id ={$activityid}")->save($data);
        }

        $this->redirect("getActivity", array('del_flag'=>1) );
    }
}