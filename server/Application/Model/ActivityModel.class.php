<?php
namespace Model;
use Think\Model;
use Admin\Common\Common\myupyun;

class ActivityModel extends Model{
    public function _before_insert(&$data, $options)
    {
//        //图片上传
        $this->upload1($data,$options);
        $data['create_time']=date("Y-m-d H:i:s");
    }
    public function _before_update(&$data, $options)
    {
        $this->upload1($data,$options);
    }
    public function upload1(&$data, $options){

            if($_FILES['pic']['size']>0) {
                $upyun = new myupyun(YNAME, YUSER, YPASS);
                $dl = "http://".YNAME.".b0.upaiyun.com/";
                $upyun->setApiDomain('v0.api.upyun.com');
                // 获得文件
                $file_name = md5(time());
                $file_tmp_name = $_FILES["pic"]["tmp_name"];
                $fh = fopen($file_tmp_name,'r');
                $upyun->writeFile("/".$file_name, $fh);
                $data['pic_url'] = $dl.$file_name;
            }
    }
}