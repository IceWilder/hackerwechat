<?php
/**
 * Created by PhpStorm.
 * User: darcygail
 * Date: 3/17/16
 * Time: 5:15 PM
 */

namespace Application\Admin\Controller;


use Think\Controller;

class UserController extends Controller
{
    public function add()
    {

        $userModel = M('user');
        $result = $userModel->add();
        if ($result) {
            returnApiSuccess("添加成功:)");
        } else {
            returnApiError('添加失败:(');
        }
    }

    public function edit()
    {
        $userModel = M('user');
        $result = $userModel->save();
        if ($result) {
            returnApiSuccess("更新成功:)");
        } else {
            returnApiError('更新失败:(');
        }

    }

    public function delete()
    {
        $userModel = M('user');
        $result = $userModel->add();
        if ($result) {
            returnApiSuccess("删除成功:)");
        } else {
            returnApiError('删除失败:(');
        }

    }
}

?>
