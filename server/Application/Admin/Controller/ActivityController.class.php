<?php
namespace Admin\Controller;

use Admin\Model\ActivityModel;
use Think\Controller;

class ActivityController extends Controller
{
    public function addActivity()
    {
        if (IS_POST) {

            $model = new ActivityModel();
            if ($model->create()) {
                if ($model->add()) {
                    returnApiSuccess("添加成功", "");
                } else {
                    returnApiError("添加失败");
                }
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
    public function getActivity()
    {
        $activityid = $_GET['activity_id'];
        $del_flag = $_GET['del_flag'];
        dump($activityid);
        dump($del_flag);
        if (!empty($activityid)) {
            if ($data = M('activity')->where("activity_id = {$activityid}")->find()) {
                returnApiSuccess("获取活动", $data);
            } else {
                returnApiError("获取活动失败");
            }

        } else {
            if ($del_flag !== null) {
                if (!empty($data = M('activity')->where("del_flag = {$del_flag}")->order('create_time desc')->select())) {
                    returnApiSuccess("获取活动", $data);
                } else {
                    returnApiError("获取活动失败");
                }
            } else {
                if ($data = M('activity')->order('create_time desc')->select()) {
                    returnApiSuccess("获取活动", $data);;
                } else {
                    returnApiError("获取活动失败");
                }
            }
        }
    }

    public function update()
    {
        if (M('activity')->create()) {
            if (M('activity')->save()) {
                returnApiSuccess("更新成功", "");
            } else {
                returnApiError("更新失败");
            }
        }
    }
}