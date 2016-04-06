<?php
namespace Home\Controller;
use Think\Controller;
class VideoController extends Controller{
    //视频列表
    public function videoList($user_id=null)
    {
        $activity_user = M('activity_user');
        $activityUsers = $activity_user->where("del_flag = 1 AND user_id = {$user_id}")->select();
        $video = M('video');
        for($j=0;$j<count($activityUsers);$j++){
            $videos[$j] = $video->where("del_flag = 1 AND activity_id = {$activityUsers[$j]['activity_id']}")->select();
            for($i=0;$i<count($videos[$j]);$i++){
                if($videos[$j][$i]['video_grade'] > $activityUsers[$j]['grade']){
                    $videos[$j][$i]['is_look'] = false;
                }else{
                    $videos[$j][$i]['is_look'] = true;
                }
            }
        }
        returnApiSuccess('视频列表',$videos);
    }
    //观看视频
    public function videoView($video_id=null){
        $error = "";
        if(!empty($video_id)){
            $video = M('video');
            $videoUrl = $video->field("video_url AND del_flag=1")->find();
        }else{
            $error="视频不存在";
        }
        if(empty($error)){
            returnApiSuccess("视频的链接",$videoUrl);
        }else{
            returnApiError($error);
        }
    }
}