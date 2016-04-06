<?php
namespace Admin\Controller;
use Think\Controller;
class FilterController extends Controller{
    public function __construct()
    {
        parent::__construct();
        if(empty(session('username'))){
            echo "<script type='text/javascript'>window.top.location.href='/server/index.php/admin/index/login'</script>";
        }
    }
}