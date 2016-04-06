<?php
namespace Home\Controller;
use Think\Controller;

class ReportController extends Controller{
    //添加周报
    public function addReport()
    {

        $user_group = M('group_user');
        $groupModel = M('group');
        $reportModel = M('group_report');
        $uid = $_POST['user_id'];
        if ($uid == null) {
            returnApiError("用户id不存在");
            exit();
        }

        $groupId = $user_group->field('group_id')->where('user_id =' . $uid)->find();
        if ($groupId == null) {
            returnApiError("未参与任何团队");
            exit();
        }

        $wechatId = $groupModel->field('wechatID')->where('group_id =' . $groupId['group_id'])->find();
        if ($wechatId == null) {
            returnApiError("wechatId不存在");
            exit();
        }
            if($wechatId) {
                $reportModel->create_time = date("Y-m-d H:i:s");
                $reportModel->wechatID = $wechatId['wechatid'];
                $result = $reportModel->add();
            }
            if($result){
                returnApiSuccess("添加成功!");
            }else{
                returnApiError("添加失败");
            }

    }

}