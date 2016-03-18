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
        $ugModel = M('group_user');
        $userModel->startTrans();
        $userModel->create();
        $ugList['user_id'] = $userModel->add();
        if (!$ugList['user_id']) {
            $userModel->rollback();
            returnApiError('用户添加失败:(');
            die();
        }
        $ugList['group_id'] = I('post.group_id');
        if (!$ugModel->data($ugList)->add()) {
            $userModel->rollback();
            returnApiError('用户-团队添加失败:(');
            die();
        }
        $userModel->commit();
        returnApiSuccess("添加成功:)");
    }

    public function edit()
    {
        $userModel = M('user');
        $ugModel = M('group_user');
        $userModel->startTrans();
        $userModel->create();
        $result = $userModel->save();
        if (!$result) {
            $userModel->rollback();
            returnApiError('修改失败:(');
            die();
        }
        if ($ugList['group_id'] = $_POST('group_id')) {
            $ugList['user_id'] = $_POST('user_id');
            if (!$ugModel->data($ugList)->add()) {
                $userModel->rollback();
                returnApiError('用户-团队修改失败:(');
                die();
            }
        }
        $userModel->commit();
        returnApiSuccess("修改成功:)");

    }

    public function delete()
    {
        $userModel = M('user');
        $ugModel = M('group_user');
        $userModel->startTrans();
        $where = array(
            'user_id' => $_POST('user_id'),
        );
        $del = array('del_flag' => 0);
        if (!$userModel->where('id=' . $_POST['user_id'])->setField($del)) {
            $userModel->rollback();
            returnApiError('用户失败:(');
            die();
        }
        if (!$ugModel->where($where)->setField($del)) {
            $userModel->rollback();
            returnApiError('用户-团队删除失败:(');
            die();
        }
        $userModel->commit();
        returnApiSuccess('删除成功！');
    }
}
?>
