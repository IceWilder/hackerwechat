<?php
namespace Admin\Controller;
use Think\Controller;
use Think\Page;
use Admin\Common\Common\myupyun;

class ArticleController extends FilterController{
    //查找所有的资讯
    public function articleList($del_flag=1){
        $article = M('article');
        $recordcount = $article->where("del_flag = {$del_flag}")->order("create_time desc")->count();//总记录数
        $page=new Page($recordcount,10);
        $page->setConfig('prev', '【上一页】');
        $page->setConfig('next', '【下一页】');
        $page->setConfig('first', '【首页】');
        $page->setConfig('last', '【末页】');

        $page->setConfig('theme', '共 %TOTAL_ROW% 条记录,当前是 %NOW_PAGE%/%TOTAL_PAGE% %FIRST% %UP_PAGE%  %DOWN_PAGE% %END%');

        $startno=$page->firstRow;   //起始行数
        $pagesize=$page->listRows;  //页面大小
        $articleList=$article->where("del_flag = {$del_flag}")->order("create_time desc")->limit("$startno,$pagesize")->select();

        $pagestr=$page->show(); //组装分页字符串

        $this->assign('articleList',$articleList);
        $this->assign('pagestr',$pagestr);
        $this->display();
    }
    //根据ID查找文章
    public function editArticle($article_id=null){
        if(empty($article_id)){
            returnApiError("文章id不能为空");
            exit();
        }
        $article = M('article');
        $articleData = $article->where("article_id = {$article_id}")->find();
        $this->assign("article",$articleData);
        $this->display();
    }

    //更新文章
    public function saveArticle(){
        $article = M('article');
        $article->create();
        if($_FILES['imagePath']['size']>0){
            $upyun = new myupyun(YNAME, YUSER, YPASS);
            $dl = "http://".YNAME.".b0.upaiyun.com/";
            $upyun->setApiDomain('v0.api.upyun.com');
            // 获得文件
            $file_name = md5(time());
            $file_tmp_name = $_FILES["imagePath"]["tmp_name"];
            $fh = fopen($file_tmp_name,'r');
            $upyun->writeFile("/".$file_name, $fh);
            $article->pic_url = $dl.$file_name;
        }
        $result = $article->save();
        $this->redirect("articleList",null);
    }
    public function addArticle(){
        $this->display();
    }
    //添加文章
    public function doAddArticle(){
        $article = M('article');
        if($article->create()){
            $article->create_time = date("Y-m-d H:i:s",time());

            $config=array(
                'rootPath'  =>  './Public/Uploads/',
            );
            if($_FILES['imagePath']['size']>0){
                $upyun = new myupyun(YNAME, YUSER, YPASS);
                $dl = "http://".YNAME.".b0.upaiyun.com/";
                $upyun->setApiDomain('v0.api.upyun.com');
                // 获得文件
                $file_name = md5(time());
                $file_tmp_name = $_FILES["imagePath"]["tmp_name"];
                $fh = fopen($file_tmp_name,'r');
                $upyun->writeFile("/".$file_name, $fh);
                $article->pic_url = $dl.$file_name;
            }
            $article->add();
           $this->redirect("articleList",null);
        }else{
            returnApiError("添加失败");
        }
    }
    //根据id删除文章
    public function deleteArticle($article_id=null){
        if(empty($article_id)){
            returnApiError("文章id不能为空");
            exit();
        }
        $article = M('article');
        $article->del_flag = 0;
        $result = $article->where("article_id={$article_id}")->save();
        $this->redirect('articleList',null);
    }
}