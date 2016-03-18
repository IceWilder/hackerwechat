<?php
/**
 * Created by PhpStorm.
 * User: darcygail
 * Date: 3/18/16
 * Time: 10:39 AM
 */

namespace Application\Home\Controller;


use Think\Controller;

class BindController extends Controller
{
    public function index()
    {
        if (IS_POST) {
            $hacker_id = $_POST['hacker_id'];
            $mobile = $_POST['mobile'];
            if ($hacker_id && $mobile) {
                $data = explode('#', $hacker_id);
                $where = array(
                    'wechatID' => $data[0],
                    'group_id' => $data[1],
                );
                $groupModel = M('group');
                $result = $groupModel->where($where)->find();
                if (!$result) {
                    returnApiError('并没有这样的hacker_id');
                    die();
                }
                $userModel = M('user');
                $user_id = $userModel->getFieldByMobile($mobile);
                if (!$user_id) {
                    returnApiError('尚未加入团队');
                    die();
                }
                $userModel->is_bind = 1;
                $userModel->where('id=' . $user_id)->save();
                returnApiSuccess('绑定成功');
            }
        }
    }
}