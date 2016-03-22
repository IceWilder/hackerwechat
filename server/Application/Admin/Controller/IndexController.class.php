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
    public function test(){
        $this->display();
    }
}