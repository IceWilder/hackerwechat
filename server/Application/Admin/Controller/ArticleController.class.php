<?php
namespace Admin\Controller;
use Think\Controller;
class ArticleController extends Controller{
    //查找所有的资讯
    public function articleList($del_flag=null){
        if(empty($del_flag)){
            $del_flag = 1;
        }
        $article = M('article');
        $articleData = $article->where("del_flag = {$del_flag}")->order("create_time desc")->select();
        returnApiSuccess("所有的资讯",$articleData);
    }
    //根据ID查找文章
    public function findArticle($article_id=null){
        if(empty($article_id)){
            returnApiError("文章id不能为空");
            exit();
        }
        $article = M('article');
        $articleData = $article->where("article_id = {$article_id}")->find();
        if(empty($articleData)){
            returnApiError("文章不存在");
        }else{
            returnApiSuccess("文章信息",$articleData);
        }
    }
    //更新文章
    public function saveArticle(){
        $article = M('article');
        $article->create();
        $result = $article->save();
        if($result === false){
            returnApiError("更新失败");
        }else{
            returnApiSuccess("更新成功","");
        }
    }
    //添加文章
    public function addArticle(){
        $article = M('article');
        if($article->create()){
            $article->create_time = time();
            $result = $article->add();
            if($result){
                returnApiSuccess("添加成功","");
            }else{
                returnApiError("添加失败");
            }
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
        if($result === false){
            returnApiError("删除失败");
        }else{
            returnApiSuccess("删除成功","");
        }
    }
}