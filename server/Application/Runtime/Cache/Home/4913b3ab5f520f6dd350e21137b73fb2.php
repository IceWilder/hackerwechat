<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    你的成绩是<?php echo ($score); ?><br>
    <?php if($score >= 90): ?>good!
        <?php elseif($score >= 80): ?>
            great
        <?php elseif($score <= 60): ?>
            sorry<?php endif; ?>
    <?php $__FOR_START_11887__=1;$__FOR_END_11887__=100;for($i=$__FOR_START_11887__;$i < $__FOR_END_11887__;$i+=10){ echo ($i); ?> 嘿嘿额黑<br><?php } ?>
</body>
</html>