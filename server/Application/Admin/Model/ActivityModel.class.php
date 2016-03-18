<?php
namespace Admin\Model;

use Think\Model;
use Think\Upload;

class ActivityModel extends Model
{

    public function _before_insert(&$data, $options)
    {
        //图片上传
        if ($_FILES['pic']['error'] == 0) {
            $rootPath = C('img_rootPath');

            $upload = new Upload(array('rootPath' => $rootPath));// 实例化上传类
            $upload->maxSize = (int)C('img_maxSize') * 1024 * 1024;// 设置附件上传大小
            $upload->exts = C('img_exts');// 设置附件上传类型
            $upload->savePath = C('img_savePath'); // 设置附件上传目录// 上传文件
            $info = $upload->upload();
            if (!$info) {// 上传错误提示错误信
                $this->error = $upload->getError();
                dump($upload->getError());
            } else {
                $name = $info['pic']['savepath'] . $info['pic']['savename'];
                $data['pic_url'] = $name;
            }
        }
    }
}