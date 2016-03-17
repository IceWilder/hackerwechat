<?php
namespace Components;
use Think\Controller;
class AdminController extends Controller{
    function __construct(){
        parent::__construct();
        $mg_id = session("mg_id");
        if(empty($mg_id)){
            $this->redirect('login/login');
        }
    }
}
