<?php
namespace Admin\Controller;
use Think\Controller;
class ArticleController extends Controller{
    //查找所有的资讯
    public function articleList(){
        $article = M('article');
        $articleData = $article->where("del_flag = 1")->order("create_time desc")->select();
        returnApiSuccess($articleData);
    }
    //根据ID查找文章
    public function findArticle(){
        $article = M('article');
        $articleData = $article->where("del_flag");
    }
}