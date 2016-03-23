<?php
return array(
	//'配置项'=>'配置值'
    'SHOW_PAGE_TRACE' => true,
    /* 数据库设置 */
    'DB_TYPE'               =>  'mysql',     // 数据库类型
    'DB_HOST'               =>  'localhost', // 服务器地址
    'DB_NAME'               =>  'hacker',          // 数据库名
    'DB_USER'               =>  'root',      // 用户名
    'DB_PWD'                =>  'root',          // 密码
    'DB_PORT'               =>  '3306',        // 端口
    'DB_PREFIX'             =>  'hacker_',    // 数据库表前缀
    //图片上传
    'img_maxSize'          =>'3M',
    'img_exts'             =>array('jpg', 'gif', 'png', 'jpeg'),
    'img_savePath'        =>'hacker/picture/',
    'img_rootPath'       =>'./Public/Uploads/picture/',

);