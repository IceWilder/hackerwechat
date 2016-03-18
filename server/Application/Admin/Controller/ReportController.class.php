<?php
/**
 * Created by PhpStorm.
 * User: darcygail
 * Date: 3/18/16
 * Time: 1:12 PM
 */

namespace Application\Admin\Controller;


use Think\Controller;

class ReportController extends Controller
{
    public function delete()
    {
        $report_id = I('report_id');
        if ($report_id) {
            $grModel = M('group_report');
            $grModel->del_flag = '0';
            $grModel->where('report_id=' . $report_id)->save();
        }
    }
}