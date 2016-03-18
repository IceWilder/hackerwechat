<?php
/**
 * Created by PhpStorm.
 * User: darcygail
 * Date: 3/18/16
 * Time: 3:42 PM
 */

namespace Application\Admin\Controller;


use Think\Controller;

class UserController extends Controller
{
    public function add()
    {
        $userModel = M('user');
        $userModel->startTrans();
        $userModel->create();
        $user_id = $userModel->add();
        if (!$user_id) {
            $userModel->rollback();
            returnApiError('创建用户失败');
            die();
        }
        if ($_POST('group_id')) {
            $guModel = M('group_user');
            $guList['group_id'] = $_POST['group_id'];
            $guList['user_id'] = $user_id;
            $guModel->data($guList)->add();
            if (!$guModel) {
                $userModel->rollback();
                returnApiError('用户-团队表插入失败');
                die();
            }
        }
        $activityModel = M('activity');
        $current_aid = $activityModel->Field('activity_id')->order('create_time desc')->find();
        $auModel = M('activity_user');
        $auList['activity_id'] = $current_aid;
        $auList['user_id'] = $user_id;
        $result = $auModel->add($auList);
        if (!$result) {
            $userModel->rollback();
            returnApiError('用户-活动表失败');
            die();
        }
        $userModel->commit();
        returnApiSuccess("添加成功");
    }

    public function edit()
    {
        $userMedel = M('user');
        $userMedel->create();
        $userMedel->save();
    }

    public function delete()
    {
        $userModel = M('user');
        $userModel->startTrans();
        $user_id = $_POST('user_id');
        $where = array('id' => $user_id,);
        $userModel->del_flag = 0;
        $result = $userModel->where($where)->save();
        if (!$result) {
            $userModel->rollback();
            returnApiError('用户表删除失败');
            die();
        }

        $guModel = M('group_user');
        $guModel->del_flag = 0;
        $result = $guModel->where($where)->save();
        if (!$result) {
            $userModel->rollback();
            returnApiError('用户团队关系表失败');
            die();
        }

        $auModel = M('activity_user');
        $auModel->del_flag = 0;
        $result = $auModel->where($where)->save();
        if (!$result) {
            $userModel->rollback();
            returnApiError('用户活动关系表失败');
            die();
        }

        $umModel = M('user_msg');
        $userModel->del_flag = 0;
        $result = $umModel->where($where)->save();
        if (!$result) {
            $userModel->rollback();
            returnApiError('用户消息关系表失败');
            die();
        }

        $userModel->commit();
        returnApiSuccess('删除成功');
    }
}