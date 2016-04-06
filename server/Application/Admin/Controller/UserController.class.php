<?php
/**
 * Created by PhpStorm.
 * User: darcygail
 * Date: 3/18/16
 * Time: 3:42 PM
 */

namespace Admin\Controller;


use Think\Controller;
use Think\Page;

class UserController extends FilterController
{
    public function userAdd()
    {

        if (IS_POST) {
            //数据验证
            if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $_POST['email'])) {
                $emailErr = "无效的 email 格式！";
                $this->assign('emailErr', $emailErr);
                $this->display();
                die();
            }
            if (!preg_match("/^0?1[3|4|5|8][0-9]\d{8}$/", $_POST['mobile'])){
                $mobileErr="无效的手机号码";
                $this->assign('mobileErr',$mobileErr);
                $this->display();
                die();
            }
            $create_time = date('Y-m-d H:i:s', time());
            $userModel = M('user');
            $userModel->startTrans();
            $userModel->create();
            $userModel->create_time = $create_time;
            $user_id = $userModel->add();
            if (!$user_id) {
                $userModel->rollback();
                $this->error('添加失败', U('userList'), 1);
                die();
            }
            $userModel->commit();
            $this->success('添加成功', U('userList'), 1);
        } else {
            $this->display();
        }
    }
    public function userEdit()
    {
        $userModel = M('user');
        //处理
        if (IS_POST) {
            $userModel->create();
            $userModel->save();
            $this->success('修改完成', U('userList'), 1);
        }
        else {
            $user_id = $_GET['user_id'];
            //获取用户信息
            $where = array('user_id' => $user_id, 'del_flag' => 1);
            $user = $userModel->where($where)->find();
            $this->assign('user', $user);
            $this->display();
        }
    }

    //删除时同时删除关联的数据,user,user_group,user_activity
    public function delete()
    {
        $userModel = M('user');
        $userModel->startTrans();
        $user_id = $_GET['user_id'];
        $where = array('user_id' => $user_id,);
        $userModel->del_flag = 0;
        $result = $userModel->where($where)->save();
        if ($result == false) {
            $userModel->rollback();
            $this->error('删除失败', U('userList'), 1);
            die();
        }
        $guModel = M('group_user');
        if ($guModel->where($where)->find()) {
            $guModel->del_flag = 0;
            $result = $guModel->where($where)->save();
            if (!$result) {
                $userModel->rollback();
                $this->error('删除失败', U('userList'), 1);
                die();
            }
        }

        $auModel = M('activity_user');
        if ($auModel->where($where)->find()) {
            $auModel->del_flag = 0;
            $result = $auModel->where($where)->save();
            if (!$result) {
                $userModel->rollback();
                $this->error('删除失败', U('userList'), 1);
                die();
            }
        }

        $umModel = M('user_msg');
        if ($umModel->where($where)->find()) {
            $userModel->del_flag = 0;
            $result = $umModel->where($where)->save();
            if (!$result) {
                $userModel->rollback();
                $this->error('删除失败', U('userList'), 1);
                die();
            }
        }

        $userModel->commit();
        $this->success('删除成功', U('userList'), 1);
    }

    //取出未删除的用户信息
    public function userList()
    {
        $where['del_flag'] = 1;
        $userModel = M('user');
        $auModel = M('activity_user');
        if ($_GET['real_name']) {
            $where['real_name'] = array('like', "%$_GET[real_name]%");
        }
        $is_bind = I('get.is_bind', 2);
        if ($is_bind != 2) {
            $where['is_bind'] = array('eq', $is_bind);
        }
        $orderby = 'user_id';
        $orderway = 'desc';
        if ($_GET['orderby'] && $_GET['orderway']) {
            $orderby = $_GET['orderby'];
            $orderway = $_GET['orderway'];
        }
        $count = $userModel->where($where)->count();
        $users = $userModel->where($where)->select();
        $page = new Page($count, 5);
        $page->setConfig('prev', '【上一页】');
        $page->setConfig('next', '【下一页】');
        $page->setConfig('first', '【首页】');
        $page->setConfig('last', '【末页】');
        $page->setConfig('theme', '共 %TOTAL_ROW% 条记录,当前是 %NOW_PAGE%/%TOTAL_PAGE% %FIRST% %UP_PAGE%  %DOWN_PAGE% %END%');
        $show = $page->show();
        $this->assign("users", $users);
        $this->assign('page', $show);
        $this->display();
    }
}