<?php
namespace Test\Controller;
use Think\Controller;
class TestController extends Controller{
    function test(){
        if(IS_POST){
            $data = $_POST['username'];
            echo $data;
        }
        $this->display();
    }
}
