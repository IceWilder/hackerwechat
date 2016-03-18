<?php
namespace Home\Controller;
use Think\Controller;
class VideoController extends Controller{
    //视频列表
    public function videoList($user_id=null)
    {
        $error = "";
        if(!empty($user_id)){
            $user = M('user');
            $userObj = $user->where("user_id={$user_id} AND del_flag=1")->find();
            if(!empty($userObj)){
                $group_user= M('group_user');
                $group_id = $group_user->where("user_id={$user_id} AND del_flag=1")->getField("group_id");
                if(!empty($group_id)){
                    $group = M('group');
                    $group_category = $group->where("group_id={$group_id} AND del_flag=1")->getField("category");
                    $activity_group = M('activity_group');
                    $activity_id = $activity_group->where("group_id={$group_id} AND del_flag=1")->getField("activity_id");
                    if(!empty($activity_id)){
                        $activity_user = M('activity_user');
                        $grade = $activity_user->where("activity_id={$activity_id} AND user_id={$user_id} AND del_flag=1")->getField("grade");
                        $video = M('video');
                        $videoData = $video->where("del_flag=1 AND activity_id={$activity_id} AND category={$group_category}")->order("create_time desc")->select();
                        for ($i = 0; $i < count($videoData); $i++) {
                            $is_look = false;
                            if ($videoData[$i]['video_grade'] > $grade) {
                                $is_look = true;
                            }
                            $videoData[$i]['is_look'] = $is_look;
                        }
                    }else{
                        $error="该团队没有参与活动";
                    }
                }else{
                    $error="该用户没有团队";
                }
            }else{
                $error="该用户不存在";
            }
        }else{
            $error="用户ID不能空";
        }
        if(empty($error)){
            returnApiSuccess("视频的列表",$videoData);
        }else{
            returnApiError($error);
        }
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