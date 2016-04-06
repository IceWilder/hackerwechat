<?php
namespace Model;

use Think\Model;

class Group_reportModel extends Model
{
    public function search()
    {
        $where = array();
        $where['del_flag'] = 0;
        if ($wechatID = I('get.wechatID')) {
            $where['wechatID'] = array('like', "%$wechatID%");
        }
        if ($article_title = I('get.article_title')) {
            $where['article_title'] = array('like', "%$article_title%");
        }
        $count = $this->where($where)->count();
        $page = new Page($count, 2);
        $orderby = 'report_id';
        $orderway = 'desc';
        $odby = I('odby');
        if ($odby && in_array($odby,
                array('report_id_asc', 'report_id_desc', 'send_number_asc', 'send_number_desc', 'read_number_asc', 'read_number_desc'
                , 'share_num_asc', 'share_num_desc', 'like_num_asc' . 'like_num_desc'))
        ) {
            $odby = explode('_', $odby);
            $orderby = $odby[0] . $odby[1];
            $orderway = $odby[2];
        }
        $page->setConfig('prev', '上一页');
        $page->setConfig('next', '下一页');
        $page->setConfig('header', '<span class="rows">共 %TOTAL_ROW% 条记录</span>');
        $show = $page->show();
        $data = $this->where($where)->limit($page->firstRow . ',' . $page->listRows)->order("$orderby $orderway")->select();
        return array(
            'page' => $show,
            'data' => $data
        );
    }
}
