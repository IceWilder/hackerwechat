<?php
namespace Admin\Controller;
use Think\Controller;
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