<?php
	namespace PHPSTORM_META {
	/** @noinspection PhpUnusedLocalVariableInspection */
	/** @noinspection PhpIllegalArrayKeyTypeInspection */
	$STATIC_METHOD_TYPES = [

		\D('') => [
			'Mongo' instanceof Think\Model\MongoModel,
			'View' instanceof Think\Model\ViewModel,
			'Activit' instanceof Model\Activity_use,
			'Article' instanceof Model\ArticleModel,
			'Msg' instanceof Home\Model\MsgModel,
			'Activity_group' instanceof Model\Activity_groupModel,
			'Activity' instanceof Model\ActivityModel,
			'Adv' instanceof Think\Model\AdvModel,
			'Group' instanceof Model\GroupModel,
			'Video' instanceof Model\VideoModel,
			'Relation' instanceof Think\Model\RelationModel,
			'User' instanceof Model\UserModel,
			'Group_user' instanceof Model\Group_userModel,
			'Merge' instanceof Think\Model\MergeModel,
			'Group_report' instanceof Model\Group_reportModel,
		],
	];
}