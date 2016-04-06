<?php
/**
 * Created by PhpStorm.
 * User: darcygail
 * Date: 3/18/16
 * Time: 1:12 PM
 */

namespace Admin\Controller;
use Think\Controller;
use Think\Page;

class ReportController extends FilterController
{
    public function reportList(){
        $report = M('group_report');
        $recordcount = $report->order("create_time desc")->count();//总记录数
        $page=new Page($recordcount,10);
        $page->setConfig('prev', '【上一页】');
        $page->setConfig('next', '【下一页】');
        $page->setConfig('first', '【首页】');
        $page->setConfig('last', '【末页】');

        $page->setConfig('theme', '共 %TOTAL_ROW% 条记录,当前是 %NOW_PAGE%/%TOTAL_PAGE% %FIRST% %UP_PAGE%  %DOWN_PAGE% %END%');

        $startno=$page->firstRow;   //起始行数
        $pagesize=$page->listRows;  //页面大小
        $reportList=$report->order("create_time desc")->limit("$startno,$pagesize")->select();

        $pagestr=$page->show(); //组装分页字符串

        $this->assign('reportList',$reportList);
        $this->assign('pagestr',$pagestr);
        $this->display();
    }

}