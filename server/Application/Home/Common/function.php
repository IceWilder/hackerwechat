<?php
/**
 * Created by PhpStorm.
 * User: gakuin
 * Date: 12/16/15
 * Time: 1:47 PM
 */
function returnApiSuccess($msg = null,$data = array()){
    $result = array(
        'code'=>0,
        'msg' => $msg,
        'data' =>$data
    );
   echo json_encode($result);
}
function returnApiError($msg = null){
    $result = array(
        'code'=>1,
        'msg' => $msg
    );
    echo json_encode($result);
}
function setPageSize(&$page,&$size){
    if($page==null||$size==null){
        $page=1;
        $size=10;
    }else{
        return;
    }

}
function checkSession($Session_id){
    if($Session_id==null){
        return false;
    }else{
        $value=S($Session_id);
        return $value;
    }
}
function setSessionID($user_id,$timestamp){
    $serialize_id=array('user_id'=>$user_id,'timestamp'=>$timestamp);
    $str=serialize($serialize_id);
   // dump($str);
  //  dump($timestamp);
    $keyStr=$str.md5(\Org\Util\MsgConst::Secure_Key);
    $newStr = base64_encode($keyStr);
    return $newStr;
}
function  setAdminSessionID($admin_id,$timestamp){
    $serialize_id=array('$admin_id'=>$admin_id,'timestamp'=>$timestamp);
    $str=serialize($serialize_id);
    // dump($str);
    //  dump($timestamp);
    $keyStr=$str.md5(\Org\Util\MsgConst::AdminSecure_Key);
    $newStr = base64_encode($keyStr);
    return $newStr;
}
function returnApiErrorExample(){
    $result = array(
        'code'=>1,
        'msg' => '当前系统繁忙，请稍后重试！',
    );
    echo json_encode($result);
}
/**
 * @param null $data
 * @return array|mixed|null
 *过滤post提交的参数；
 *
 */

function checkDataPost($data = null){
    if(!empty($data)){
        $data = explode(',',$data);
        foreach($data as $k=>$v){
            if((!isset($_POST[$k]))||(empty($_POST[$k]))){
                if($_POST[$k]!==0 && $_POST[$k]!=='0'){
                    returnApiError($k.'值为空！');
                }
            }
        }
        unset($data);
        $data = I('post.');
        unset($data['_URL_'],$data['token']);
        return $data;
    }
}
/*
 * 过滤get提交的参数
 * */
function checkDataGet($data = null){
    if(!empty($data)){
        $data = explode(',',$data);
        foreach($data as $k=>$v){
            if((!isset($_GET[$k]))||(empty($_GET[$k]))){
                if($_GET[$k]!==0 && $_GET[$k]!=='0'){
                    returnApiError($k.'值为空！');
                }
            }
        }
        unset($data);
        $data = I('get.');
        unset($data['_URL_'],$data['token']);
        return $data;
    }
}