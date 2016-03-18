<?php
namespace Home\Controller;
use Think\Controller;
class InformationController extends Controller{
    //骇客资讯
    public function infoList(){
        $activity = M('activity');
        $activityData = $activity->where("del_flag=1")->order("start_time desc")->find();
        $article = M('article');
        $articleData = $article->where("del_flag=1")->order("create_time desc")->select();
        $infoData = array(
            "activity"=>$activityData,
            "articleList"=>$articleData,
        );
        returnApiSuccess("活动咨询信息",$infoData);
    }
    //查看文章
    public function articleView($article_id=null){
        $error = "";
        if(!empty($article_id)){
            $article = M('article');
            $articleData = $article->where("del_flag=1 AND article_id={$article_id}")->find();
            if(empty($articleData)){
                $error="文章不存在";
            }
        }else{
            $error="文章ID不能为空";
        }
        if(empty($error)){
            returnApiSuccess("文章信息",$articleData);
        }else{
            returnApiError($error);
        }
    }
    //查看活动
    public function activityView($activity_id=null){
        $error = "";
        if(!empty($activity_id)){
            $activity = M('activity');
            $activityData = $activity->where("del_flag=1 AND activity_id={$activity_id}")->find();
            if(empty($activityData)){
                $error="活动不存在";
            }
        }else{
            $error="活动ID不能为空";
        }
        if(empty($error)){
            returnApiSuccess("活动信息",$activityData);
        }else{
            returnApiError($error);
        }
    }

}