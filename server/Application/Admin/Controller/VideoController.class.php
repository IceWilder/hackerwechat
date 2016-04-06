<?php
namespace Admin\Controller;
use Admin\Common\Common\myupyun;
use Think\Controller;
use Think\Page;
class VideoController extends FilterController{
    //查找所有的视频
    public function videoList($del_flag=1){
        $video = M('video');

        $recordcount = $video->where("del_flag = {$del_flag}")->order("create_time desc")->count();//总记录数
        $page=new Page($recordcount,10);
        $page->lastSuffix=false;    //最后一页是否显示总页数
        $page->rollPage=4;          //分页栏每页显示的页数
        $page->setConfig('prev', '【上一页】');
        $page->setConfig('next', '【下一页】');
        $page->setConfig('first', '【首页】');
        $page->setConfig('last', '【末页】');

        $page->setConfig('theme', '共 %TOTAL_ROW% 条记录,当前是 %NOW_PAGE%/%TOTAL_PAGE% %FIRST% %UP_PAGE%  %DOWN_PAGE% %END%');

        $startno=$page->firstRow;   //起始行数
        $pagesize=$page->listRows;  //页面大小
        $videoList=$video->where("del_flag = {$del_flag}")->order("create_time desc")->limit("$startno,$pagesize")->select();

        $pagestr=$page->show(); //组装分页字符串
        $category = array(
            '0'=>'技术互联网',
            '1'=>'生活文艺',
            '2'=>'健康运动',
            '3'=>'八卦杂谈',
            '4'=>'媒体阅读',
            '5'=>'艺术影画',
            '6'=>'吃喝生活',
        );
        for($i=0;$i<count($videoList);$i++){
            $videoList[$i]['category'] = $category[$videoList[$i]['category']];
        }
        $this->assign('videoList',$videoList);
        $this->assign('pagestr',$pagestr);
        $this->display();
    }
    //根据ID查找视频
    public function editVideo($video_id=null){
        if(empty($video_id)){
            returnApiError("视频id不能为空");
            exit();
        }
        $video = M('video');
        $videoData = $video->where("video_id = {$video_id}")->find();
        $activity = M('activity')->where("del_flag=1")->order("start_time desc")->select();
        $this->assign("activity",$activity);
        $this->assign('video',$videoData);
        $this->display();
    }
    //更新视频
    public function doSaveVideo(){
        $video = M('video');
        $video->create();
        if($_FILES['imagePath']['size']>0){
            $upyun = new myupyun(YNAME, YUSER, YPASS);
            $dl = "http://".YNAME.".b0.upaiyun.com/";
            $upyun->setApiDomain('v0.api.upyun.com');
            // 获得文件
            $file_name = md5(time());
            $file_tmp_name = $_FILES["imagePath"]["tmp_name"];
            $fh = fopen($file_tmp_name,'r');
            $upyun->writeFile("/".$file_name, $fh);
            $video->pic_url = $dl.$file_name;
        }
        $result = $video->save();
        $this->redirect('videoList',null);
    }
    public function addVideo(){
        $activity = M('activity')->where("del_flag=1")->order("start_time desc")->select();
        $this->assign("activity",$activity);
        $this->display();
    }
    //添加视频
    public function doAddVideo(){
        $video = M('video');
        if($video->create()){
            $video->create_time=date("Y-m-d H:i:s",time());
            if($_FILES['imagePath']['size']>0){
                $upyun = new myupyun(YNAME, YUSER, YPASS);
                $dl = "http://".YNAME.".b0.upaiyun.com/";
                $upyun->setApiDomain('v0.api.upyun.com');
                // 获得文件
                $file_name = md5(time());
                $file_tmp_name = $_FILES["imagePath"]["tmp_name"];
                $fh = fopen($file_tmp_name,'r');
                $upyun->writeFile("/".$file_name, $fh);
                $video->pic_url = $dl.$file_name;
            }

            $result = $video->add();
            $this->redirect('videoList',null);
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
        $this->redirect('videoList',null);
    }
}