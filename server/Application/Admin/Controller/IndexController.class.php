<?php
/**
 * Created by PhpStorm.
 * User: darcygail
 * Date: 3/22/16
 * Time: 9:47 PM
 */

namespace Admin\Controller;


use Think\Controller;

class IndexController extends Controller
{
    public function index()
    {
        $this->display();
    }
    public function logout(){
        session('username',null);
        $this->redirect('login');
    }
    public function login(){
        $this->display();
    }
    public function dologin($username="",$password=""){
        $admin = M('admin');
        $data = $admin->where("username = '{$username}' AND password = '{$password}' ")->find();
        if(!empty($data)){
            session("username",$username);
            $this->redirect('index',null);
        }else{
            $this->error("用户名或密码错误");
        }
    }
}