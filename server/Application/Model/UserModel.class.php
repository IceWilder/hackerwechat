<?php
namespace Model;
use Think\Model;
class UserModel extends Model{

    protected $_validate = array(
        array('email', '/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/', "邮箱格式不正确"),
        array('mobile', '^[1][358][0-9]{9}$', '手机号码格式不正确'),
    );
}