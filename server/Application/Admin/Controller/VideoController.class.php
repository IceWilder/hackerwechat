<?php
namespace Admin\Controller;
use Think\Controller;
use Think\Upload;

class VideoController extends Controller{
    //查找所有的视频
    public function videoList($del_flag=null){
        if(empty($del_flag)){
            $del_flag = 1;
        }
        $video = M('video');
        $videoData = $video->where("del_flag = {$del_flag}")->order("create_time desc")->select();
        returnApiSuccess("所有的视频",$videoData);
    }
    //根据ID查找视频
    public function findVideo($video_id=null){
        if(empty($video_id)){
            returnApiError("视频id不能为空");
            exit();
        }
        $video = M('video');
        $videoData = $video->where("video_id = {$video_id}")->find();
        if(empty($videoData)){
            returnApiError("视频不存在");
        }else{
            returnApiSuccess("视频信息",$videoData);
        }
    }
    //更新视频
    public function saveVideo(){
        $video = M('video');
        $video->create();
        $result = $video->save();
        if($result === false){
            returnApiError("更新失败");
        }else{
            returnApiSuccess("更新成功","");
        }
    }
    //添加视频
    public function addVideo(){
        $video = M('video');
        if($video->create()){
            $video->create_time=time();
            $config=array(
                'maxSize'   =>  213,
                'savePath'  =>  './Public/Uploads/video/',
                'saveName'  =>  array('uniqid',''),
                'autoSub'   =>    true,
                'subName'   =>    array('date','Ymd'),
            );
            $ftpConfig=array(
                'host'     => '192.168.1.200', //服务器
                'port'     => 21, //端口
                'timeout'  => 90, //超时时间
                'username' => 'ftp_user', //用户名
                'password' => 'ftp_pwd', //密码
            );
            $upload = new \Think\Upload($config,'Ftp',$ftpConfig);// 实例化上传类
            $info   =   $upload->upload();
            if(!$info){
                returnApiError($upload->getError());
                exit();
            }else{
                $video->pic_url = $info[0]['savepath'].$info[0]['savename'];
                $video->video_url = $info[1]['savepath'].$info[1]['savename'];
            }
            $result = $video->add();
            if($result){
                returnApiSuccess("添加成功","");
            }else{
                returnApiError("添加失败");
            }
        }else{
            returnApiError("添加失败");
        }
    }
    //根据id删除视频
    public function deleteVideo($video_id=null){
        if(empty($video_id)){
            returnApiError("视频id不能为空");
            exit();
        }
        $video = M('video');
        $video->del_flag = 0;
        $result = $video->where("video_id={$video_id}")->save();
        if($result === false){
            returnApiError("删除失败");
        }else{
            returnApiSuccess("删除成功","");
        }
    }
}