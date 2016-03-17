/**
 * 后台API URL
 * @author wdb
 * @param name
 */
var urls = {}
///*********************S 后台API*******************/
urls['bgData'] = "/bgIndex/bgData";//首页统计数据
urls['inputstream'] = "/bgIndex/inputstream";//引流统计
urls['fansStat'] = '/bgIndex/fansStat';//粉丝统计
urls['pageview'] = '/visit/getPageView';

urls["delPic"] = '/prodpicture/delPic';//删除商品图片
urls["addProduct"] = "/product/addProduct";//添加商品
urls["productList"] = "/product/getAllProd";//商品列表
urls["upDownProd"] = "/product/upDownProd";//上下架商品
urls["wareList"] = "/product/getAllProd";//仓库中的列表
urls["saleList"] = "/product/getAllProd";//出售中的列表
urls["commList"] = "/product/getAllProd";//首推中的列表
urls["setProduct"] = "/product/updateValue";//仓库中佣金设置
urls["setFreight"] = "/product/updateValue";//仓库中运费设置
urls["wareTree"] = "/prodcategory/selectProdCategoryTree";//仓库分类树
urls["productSearch"] = "/product/getAllProd";//商品搜索
urls["wareSearch"] = "/product/getAllProd";//仓库搜索
urls["wareHot"] = "/product/updateHot";//仓库首推
urls["productDel"] = "/product/deleteProduct";//商品删除
urls["setKill"] = "/product/setKill"; //参加秒杀
urls["setTuan"] = "/product/setTuan"; //参加秒杀
urls["cancelKill"] = "/product/cancelKill"; //取消秒杀
urls["killList"] = "/activity/killList"; //秒杀列表
urls["getProdActInfo"] = "/activity/getProdActInfo"; //获取单个秒杀
urls["chProdActInfo"] = "/activity/chProdActInfo"; //编辑秒杀
urls["tuanList"] = "/activity/tuanList"; //团购列表
urls["getProdInfos"] = "/pvinfo/getProdInfos"; //获取商品所有属性
urls["addProd_prev"] = "/product/pre_create";//预添加商品
urls["getSuppKeys"] = "/prodkey/getSuppKeys";//取得商家所有商品属性
urls["addValue"] = "/prodvalue/addValue";//增加属性值
urls["getProd"] = "/product/getSingleProd";//后台查看单个商品
urls["updateProd"] = "/product/updateProduct";//更新商品
urls["delValue"] = "/prodvalue/delValue";//删除某一值
urls["sendOrder"] = "/order/sendOrder";//发货
urls["sendlevel"] = "/userlevel/getAllLevel";//会员星级
urls["updatelevel"] = "/userlevel/updateLevel";//修改会员星级user / userData
urls["userData"] = "/user/userData";//用户统计列表
urls["actList"] = "/activity/actList";//活动列表
urls["updateOrderprice"] = "/order/updateOrdPrice";//修改订单价格
urls["insertArticle"] = "/article/insertArticle";//发布文章
urls["artList"] = "/article/artList";//文章列表
urls["getAllArtCateg"] = "/artcategory/getAllArtCateg";//文章分类
urls["updateArticle"] = "/article/updateArticle";//文章修改
urls["addArticletype"] = "/artcategory/insertArtCateg";//添加文章分类
urls["Articletree"] = "/artcategory/getArtCategTree";//获取树分类
urls["ArtCateg"] = "/artcategory/getAllArtCateg";//获取树分类
urls["editArtCateg"] = "/artcategory/updateArtCateg";//编辑树分类
urls["delArtCateg"] = "/artcategory/deleteArtCateg";//删除分类
urls["getSingleCateg"] = "/artcategory/getSingleCateg";//根据ID获取单个文章分类
urls["getSingle"] = "/article/getSingle";//获取单个文章
urls["getAllCategDownArt"] = "/article/getAllCategDownArt";//获取单个文章
urls["searchlist"] = "/wap/searchlist";//搜索文章
urls["myStream"] = "/commstream/myStream";//获取分销详情
urls["myShares"] = "/sharelink/myShares";//获取分销详情
urls["subpages"] = "/indextemplate/getSubPages";//取得二级页
urls["setWel"] = "/welpic/setWel";//取得欢迎图
urls["getWel"] = "/welpic/getWel";//设置欢迎图
urls["createPacket"] = "/redpacket/createPacket";//设置红包
urls["packetList"] = "/redpacket/packetList";//设置红包
urls["del_packet"] = "/redpacket/del_packet";//删除红包

urls["prodCateList"] = "/prodcategory/selectProdCategoryTree";//商品分类树
urls["updateCate"] = "/prodcategory/updateCate";//修改或新增目录
urls["delCate"] = "/prodcategory/delCate";//删除目录
urls["getBgOrder"] = "/order/getBgOrderList";//获取后台订单列表
urls["getOrderstatus"] = "/order/getOrderListByUserid";//获取前台订单列表
urls["getSingleOrder"] = "/order/getSingleOrder";//查看单个订单
urls["getMultiOrder"] = "/order/getMultiOrder";//取得多个订单
urls["free_fees"] = "/order/free_fees";//免运费
urls["closeOrder"] = "/order/closeOrder";//关闭订单
urls["sureOrder"] = "/order/confirmOrder";//确认收货
urls["getAllExpress"] = "/express/getAllExpress";//取得全部物流公司
urls["createPer"] = "/levelper/createPer";//商家添加佣金比例
urls["perList"] = "/levelper/perList";//佣金比例列表
urls["deletePer"] = "/levelper/deletePer";//删除某一比例
urls["editLevel"] = "/levelper/updatePer";//更新比例
urls["noActProds"] = "/product/noActProds";//不在活动中的商品
urls["addAct"] = "/activity/addAct";//添加活动
urls["updateAct"] = "/activity/updateAct";//更新活动
urls["getAct"] = "/activity/getAct";//取得一个活动
urls["addBanner"] = "/shopbanner/addBanner"; // 添加轮播图
urls["getshopBanner"] = "/shopbanner/getAllBanner"; //轮播图列表
urls["updateBanner"] = "/shopbanner/updateBanner";//修改轮播图
urls["deleteBanner"] = "/shopbanner/deleteBanner";  //删除轮播图
urls["upCateInfo"] = "/prodcategory/upCateInfo";//修改目录信息
urls["getSingleBanner"] = "/shopbanner/getSingleBanner";//编辑时 查询单个banner
urls["updatePublic"] = "/shopbanner/updatePublic";//轮播图显示不显示
urls["delArt"] = "/article/delArt";// 删除文章
urls["deleteAct"] = "/activity/deleteAct"; //删除活动

urls["getRefundList"] = "/return/getRefundList";//退款列表
urls["dealApply"] = "/return/dealApply"; //退款审核
urls["getBatchsend"] = "/order/getBatchsend";//批量发货
urls["sendAllGood"] = "/order/sendGoods";//批量发货发货
urls["setPage"] = "/article/setHomePage";//设为主页

urls["getAllAuth"] = "/auth/getAllAuth";//获取所有权限
urls["getAllRole"] = "/role/getAllRole";//获取所有角色
urls["roleDelete"] = "/role/roleDelete";//删除角色
urls["gethasAuth"] = "/auth/gethasAuth";//获取单个角色信息
urls["editRole"] = "/role/editRole";//编辑保存
urls["userRole"] = "/user/userRole";//商家用户角色
urls["addUserRole"] = "/user/addUserRole";//增加商家用户角色
urls["saveUserRole"] = "/user/saveUserRole";//保存新增管理员
urls["adminRoleDel"] = "/user/adminRoleDel";
urls["editSaveUserRole"] = "/user/editSaveUserRole";
urls["getUserCommList"] = "/order/getUserCommList";
/*********************E 后台API*******************/

/***********************手机端API*************************/
urls["mobileIndex"] = "/mobile/mobileIndex";//商城首页
urls["getHotProds"] = "/mobile/getHotProds";//热门商品
urls["getSlidePic"] = "/shopbanner/mobileBanner";//轮播图
urls["check"] = "/session/check";
urls["doWxLogin"] = "/login/doWxLogin";//微信openid登录
urls["getWxConf"] = "/weixinconf/getWxConfByCode";
urls["addProdToCart"] = "/shoppingcart/addProd";//添加商品到购物车
urls["getDeliAddr"] = "/deliveryaddress/getDeliveryAddr";//获取收货地址
urls["getMsDeliveryAddrList"] = "/deliveryaddress/getMsDeliveryAddrList";//获取收货地址列表
urls["getShopCate"] = "/prodcategory/getShopCate";//商城导航
urls["getCateProds"] = "/product/getCateProds";//目录下的商品
urls["area"] = "/area/getAreaJsonStr";//获取地址列表
urls["getOneAddr"] = "/deliveryaddress/getOneAddr";//获取单个地址接口
urls["updateDeliveryAddr"] = "/deliveryaddress/updateDeliveryAddr";//修改地址

urls["getAllCategory"] = "/prodcategory/getAllCategory"//查看宝贝分类

urls["sendcaptcha"] = "/login/resendCaptcha";//获取验证码
urls["bindmobile"] = "/user/bindingMobile";//绑定手机

urls["delProdAttr"] = "/product/delProdAttr";//删除商品某一属性
urls["addTran"] = "/extrapply/ask";//提现申请
urls["askList"] = "/extrapply/getAskList";//提现列表
urls["dealAsk"] = "/extrapply/dealAsk";//提现审核
urls["viewTran"] = "/useraccount/getMineAccount";//提现申请账户余额
urls["getExpressMsg"] = "/order/getExpressMsg";//查看物流
urls["delProd"] = "/shoppingcart/delProd";//删除购物中的商品
urls["chCartProdCount"] = "/shoppingcart/chCartProdCount";//修改购物车商品数量
urls["cartlist"] = "/shoppingcart/getAllSpcart";//购物车列表
urls["saveAddress"] = "/deliveryaddress/createDeliveryAddr";//保存地址
urls["delDeliveryAddr"] = "/deliveryaddress/delDeliveryAddr";//删除
urls["createOrder"] = "/order/addOrder";//购物车下单
urls["updateOrderAddress"] = "/order/updateOrderAddress";//更新订单地址
urls["payOrder"] = "/order/payOrder";//支付回调
urls["saveShareLink"] = "/openmobile/createOm";//保存分享链接关系
urls["saveWxUser"] = "/login/saveWxUser";//保存微信用户
urls["updateVal"] = "/prodvalue/updateVal";//修改value

urls["tempList"] = "/indextemplate/tempList";
urls["actPit"] = "/indextemplate/actPit";
urls["delPit"] = "/indextemplate/delPit";
urls["addTemp"] = "/indextemplate/addTemp";
urls["getActTemp"] = "/indextemplate/getActTemp";//获取微店首页模板
urls["getTemp"] = "/indextemplate/getById";
urls["updateTemp"] = "/indextemplate/updateContent";//更新模板

urls["applyRet"] = "/return/applyRet"; //退款/退货退款
urls["confirm"] = "/return/confirm";//确认是否已同意退货
/***********************手机端API*************************/

/***********************微信接口*************************/
urls['putWxConf'] = "/weixinconf/putWxConf";//更新微信配置信息
urls['getWelcome'] = "/weixinwelcome/getWelcome";//获取微信配置信息
urls['applyWelcome'] = "/weixinwelcome/applyWelcome";//更新微信配置信息
urls['getTempBySupp'] = "/weixintemplate/getTempBySupp";
urls['saveTemplate'] = "/weixintemplate/saveTemplate";
urls["buttonList"] = "/button/wxButtonList";//商家菜单列表
urls["getParentMenu"] = "/button/getParentMenu";//取得一级菜单
urls["addmenu"] = "/button/addWxButton";//添加菜单
urls["editmenu"] = "/button/editWxButton";//编辑菜单
urls["getmenu"] = "/button/getMenu";//获取菜单
urls["delmenu"] = "/button/deleteMenu";//删除菜单
urls["synchMenus"] = "/button/synchMenus";//同步微信菜单
urls["broadcast"] = "/wx/broadcast";
urls['replyList'] = "/weixinreply/getAllReply";//自动回复列表
urls['addReply'] = "/weixinreply/createReply";//添加自动回复
urls['viewReply'] = "/weixinreply/getReply";//查看自动回复
urls['updateReply'] = "/weixinreply/updateReply";//编辑自动回复
urls['changeReply'] = "/weixinreply/chReplyState";//自动回复是否激活
urls['delReply'] = "/weixinreply/deleteReply";//删除自动回复
urls['getItem'] = "/orderitem/getSingleItem";//取得单个明细
urls["addShareCount"] = "/openmobile/addShareCount";//增加分享次数
urls["usercenter"] = "/user/usercenter";//个人中心数据
urls["directBind"] = "/user/directBind";//扫二维码直接绑定
urls["gainPacket"] = "/redpacket/gainPacket";//领取红包
urls["m_pakcetList"] = "/redpacket/m_pakcetList";//手机端红包列表
urls["chOrderRed"] = '/order/chOrderRed';//修改订单红包
urls["getPacket"] = '/redpacket/getPacket';//查询单个红包
urls["myaskmem"] = '/user/myaskmem';//我的下线
urls["cancelReturn"] = '/return/cancelReturn';
urls["initlevels"] = '/userlevel/initLevels';//初始化星级

urls["getAliConf"] = '/payconf/getAliConfig';//支付宝配置
urls["putAliConf"] = '/payconf/putAliConf';//设置
urls["getScoreConfig"] = '/scoreconfig/getScoreConfig';//取得积分配置
urls["upScoreConfig"] = '/scoreconfig/upScoreConfig';//修改积分配置
urls["buy_records"] = '/order/buy_records';//下级购买纪录
urls["getShopConfig"] = '/shopconfig/getShopConfig';//店铺配置
urls["putShopConfig"] = '/shopconfig/putConfig';
urls["setOrderMes"] = '/order/setOrderMes';//买家留言
urls["getMaterials"] = '/weixinmaterial/getMaterials';//素材列表
urls["addMaterial"] = '/weixinmaterial/addMaterial';//添加素材
urls["getAllByType"] = '/weixinmaterial/getAllByType';//添加素材
urls["viewmater"] = '/weixinmaterial/getSingle';//查看素材
urls["updateMater"] = '/weixinmaterial/updateMater';//编辑素材
urls["orderExpress"] = '/order/orderExpress';//订单物流信息
urls["getPointProduct"] = '/point/getPointProduct';//获取积分对换
urls["setPointProduct"] = '/point/setPointProduct';//设置积分信息
urls["cancelPoint"] = '/point/cancelPoint';//去下积分对换
urls["editPoint"] = '/point/editPoint';//编辑保存商城积分
urls["cancelPointProduct"] = '/point/cancelPointProduct';//去下积分列表对换
urls["exchange"] = '/point/exchange';//积分对换
urls["pointinfo"] = '/point/pointinfo';//去下积分列表对换
urls["payByAmount"] = '/order/payByAmount';//余额支付
urls["chUseAmount"] = '/order/chUseAmount';//修改余额
urls["getAllAuth"] = '/auth/getAllAuth';//获取权限
urls["addRole"] = '/role/addRole';//提交权限设置
urls["getCommStream"] = '/commstream/getCommStream';//佣金明细
urls["getAmountRecord"] = '/amountrecord/getAmountRecord';//退款明细
urls["zeroPay"] = '/order/zeroPay';
urls["addVisit"] = '/visit/addVisit';
urls["setExpose"] = '/visit/setExpose';
urls["upaddr"] = '/order/upAddr';
urls["chOrderCount"] = '/order/chOrderCount';

/******************************************未来之星**********************************************************/
urls["wxuser"] = '/dcfeUser/wxUserMsg';//微信关注用户
urls["videoRank"] = '/dcfeUser/videoRank';//视频排行榜
urls["videoManage"] = '/dcfeUser/videoManage';//视频管理
urls["updateAgreement"] = '/dcfeAgreement/updateAgreement';//发布新协议
urls["getAgreement"] = '/dcfeAgreement/getAgreement';//获取协议
urls["addTicket"] = '/dcfeActivity/addActivityAndPrize';//抢票活动
urls["selectVideoMsg"] = '/dcfeUser/selectVideoMsg';//作品详情/作品检索
urls["selectVideoByUserId"] = '/dcfeUser/selectVideoByUserId';//用户个人视频列表
urls["addpraise"] = '/dcfeUser/addpraise';//点赞
urls["addUserAndVideo"] = '/dcfeUser/addUserAndVideo';//上传用户信息及视频
urls["upUserAndVideo"] = '/uservideo/upUserAndVideo';//更新用户视频
urls["serachUserMsg"] = '/dcfeUser/serachUserMsg';//根据用户id视频id查询用户信息
urls["updateUserAndVideo"] = '/dcfeUser/updateUserAndVideo';//编辑
urls["getAllPrizeList"] = '/dcfePrizeList/getAllPrizeList';//中奖列表
urls["getAllPrizeList"] = '/dcfePrizeList/getAllPrizeList';//中奖列表
urls["luckDraw"] = '/dcfePrizeList/luckDraw';//添加中奖信息
urls["getActivityAndPrize"] = '/dcfeActivity/getActivityAndPrize';//获取活动信息及奖品信息
urls["deleteTicket"] = '/dcfeActivity/deleteTicket';//删除活动
urls["searchPrize"] = '/dcfePrize/searchPrize';//查询活动对应奖品
urls["deletePrize"] = '/dcfePrize/deletePrize';//删除奖品

urls["reset"] = '/dcfePrizeList/reset';//发起新活动
urls["getActivity"] = '/dcfeActivity/getActivity';//进入修改活动页面
urls["updateTicket"] = '/dcfeActivity/updateTicket';//修改活动
urls["getPrize"] = '/dcfePrize/getPrize';//进入奖品信息页面
urls["changePrize"] = '/dcfePrize/changePrize';//修改奖品信息
//js
urls["is_agree"] = '/user/is_agree';  //判断用户是否已经同意协议
urls["user_agree"] = '/user/agree';  //更新用户同意协议状态
urls["userinfo"] = '/dcfeUser/userinfo'; //获取dcfe_user对应的openid的用户信息
/******************************************摄影狮**********************************************************/
urls["afterAccessCourseList"]='/course/wapAfterAccessCourseList';//审核成功后课程列表(s)
urls["afterAccessCourseInfos"]='/course/wapAfterAccessCourseInfos';//审核成功后课程列表详情(s)
urls["afterAccessCourseDele"]='/course/wapAfterAccessCourseDele';//审核成功后课程列表删除(s)
urls["courseCommentList"]='/commentcourse/wapCourseCommentList';//课程列表评论(s)
urls["courseJoinCode"]='/usercourse/wapCourseJoinCode';//课程邀请码(s)
urls["courseJoinCodeUpdate"]='/usercourse/wapCourseJoinCodeUpdate';//课程邀请码使用(s)
urls["courseApplyList"]='/courseapply/wapCourseApplyList';//课程审核申请列表(s)
urls["courseApplyDele"]='/courseapply/wapCourseApplyDele';//课程审核申请列表删除(s)
urls["afterAccessAddCourse"]='/course/wapAfterAccessAddCourse';//课程审核申请创建(s)
urls["afterAccessEditCourse"]='/course/wapAfterAccessEditCourse';//课程审核申请编辑(s)
urls["photoworkListUp"]='/photoworks/wapPhotoworkListUp';//作品列表(s)
urls["photoworkDele"]='/photoworks/wapPhotoworkDele';//作品列表删除(s)
urls["photoworkAccess"]='/photoworks/wapPhotoworkAccess';//作品审核通过(s)
urls["workCommentListUp"]='/commentwork/wapWorkCommentList';//作品列表评论(s)
urls["teacherApplyList"]='/teacherapply/wapTeacherApplyList';//教师审核列表(s)
urls["teacherApplyDele"]='/teacherapply/wapTeacherApplyDele';//教师审核删除(s)
urls["teacherApplyAccess"]='/teacherapply/wapTeacherApplyAccess';//教师审核通过(s)
urls["userList"]='/suser/wapUserList';//用户列表(s)
urls["userConfig"]='/config/wapUserConfig';//普通会员开启设置(s)
urls["userConfigInfo"]='/config/wapUserConfigInfo';//普通会员开启信息(s)
urls["adminList"]='/adminauthor/wapAdminList';//管理员列表(s)
urls["adminAdd"]='/adminauthor/wapAdminAdd';//新增管理员(s)
urls["adminDele"]='/adminauthor/wapAdminDele';//删除管理员(s)
urls["flowerList"]='/flower/wapFlowerList';//鲜花套餐列表(s)
urls["flowerAdd"]='/flower/wapFlowerAdd';//新增鲜花套餐(s)
urls["flowerDele"]='/flower/wapFlowerDele';//删除鲜花套餐(s)
urls["subscribeList"]='/subscribe/wapSubscribeList';//订阅列表(s)
urls["userSubscribeList"]='/usersubscribe/wapUserSubscribeList';//订阅用户列表(s)
urls["subscribeInfo"]='/subscribe/wapSubscribeInfo';//订阅列表详情(s)
urls["subscribeCreate"]='/subscribe/wapCreateSubscribe';//订阅创建(s)
urls["subscribeDele"]='/subscribe/wapSubscribeDele';//订阅删除(s)
urls["subscribeEdit"]='/subscribe/wapEditSubscribe';//订阅编辑(s)


urls["membercheck"] = '/level/wapGetLevel';  //获取会员审核里面的select（hy）
urls["WapGetMyWorks"] = '/photoworks/wapGetMyWorks';//我的作品分页（hy）
urls["wapWorkCategories"]='/workcategory/wapWorkCategories';//我的作品分类（hy）
urls["addWorks"] = '/photoworks/wapAddWorks';//上传作品
urls["photoworkList"] = '/photoworks/wapPhotoworkList';//课程列表详情（hy）
urls["workcategorylist"] = '/workcategory/wapWorkCategories';//上传作品
urls["toBeTeacher"] = '/teacherapply/wapTeacherApply';//申请成为老师
urls["wapAfterAccessCourseList"] = '/course/wapAfterAccessCourseList';//我的课程分页
urls["afterAccessCourseList"] = '/course/wapAfterAccessCourseList';//课程列表
urls["afterAccessCourseInfos"] = '/course/wapAfterAccessCourseInfos';//课程列表详情
urls["afterAccessCourseDele"] = '/course/wapAfterAccessCourseDele';//课程列表删除
urls["courseCommentList"] = '/commentcourse/wapCourseCommentList';//课程列表评论
urls["userList"] = '/suser/wapUserList';//课程邀请码
urls["afterAccessCourseInfos"] = '/course/wapAfterAccessCourseInfos';//课程列表详情
urls["photoworkList"] = '/photoworks/wapPhotoworkList';//作品列表
urls["wapSubscribeList"] = '/subscribe/wapSubscribeListFront';//订阅的list(hy)
urls["buyFlower"]='/suser/wapGetFlower';//获取鲜花套餐
urls["buyflower"]='/suser/wapPayForFlowers';//购买鲜花
urls["userMenu"]='/suser/wapUserInfo';//个人主页
urls["userMenuAgain"]='/suser/wapUserInfo';//Vip会员申请，编辑界面
urls["wapSubscribe"]='/subscribe/wapSubscribe';//订阅按钮（hy）
urls["wapSubscribeInfo"]='/subscribe/wapSubscribeInfo';//订阅详情（hy）
urls["boughtComment"]='/course/wapCommentCourse';//课程评论
urls["workComment"]='/photoworks/wapWorkComment';//作品评论

urls["wapCourseFrontList"]='/course/wapCourseList';//前台课程列表

urls["wapCourseListcourse"]="/course/wapGetMyPublish";//前台课程列表(hy)
urls["wapGetMyCourse"]="/course/wapGetMyCourse";//前台已购买课程列表
urls["wapGetMyPublishList"]="/course/wapGetMyPublish";//前台已购买课程列表

urls["newCourse"]='/course/wapCourseApply';//申请课程发布
urls["newWorkList"]='/photoworks/wapGetMyWorks'//获取我的作品
urls["wapWorkInfoDetails"]='/photoworks/wapWorkInfo';//作品详情（hy）
urls["wapTopDetailsDetails"]='/photoworks/wapWorkInfo';//排行榜——作品详情（hy）
urls["leaderBoard"]='/suser/wapLeaderBoard';//排行榜
urls["phbtop"]='/suser/wapLeaderBoard';//排行榜搜索
urls["wapCourseListPage"]='/course/wapCourseList';//我的课程（mycourse）分页（hy）
urls["wapSubscribedList"]='/subscribe/wapGetMySubscription';//已订阅
urls["wapGetMySubscription"]='/subscribe/wapGetMySubscription';//已订阅

urls["PayCourse"]='/course/wapCourseList';//前台课程列表
urls["wapcourseList"]='/suser/wapIsTeacher';//购买课程判断是否老师
urls["wapgetmyCourse"]='/suser/wapIsTeacher';//我的课程判断是否老师
urls["scCourse"]='/course/wapDelCourse';//删除自己发布的课程

urls["boughtDetails"]='/course/wapCourseInfo';//课程详情
urls["PublishtionDetails"]='/course/wapCourseInfo';//课程详情
urls["wapGetCourseCommentList"]='/course/wapGetCourseComment';//我发布的课程的评论列表(hy)
urls["wapGetMyWorksPage"]='/photoworks/wapGetMyWorks';//作品
urls["wapWorkCommentList"]='/photoworks/wapGetWorkComment';//我的作品的评论详情列表（hy）
urls["wapTopCommentList"]='/photoworks/wapGetWorkComment';//排行榜作品的评论详情列表（hy）
urls["payCourse"]='/course/wapBuyCourse';//购买课程
urls["mobile"]='/login/resendCaptcha';//验证码

urls["wapGetMyWorksComment"]='/photoworks/wapGetMyWorks';//排行榜——作品列表
urls["topComment"]='/photoworks/wapWorkComment';//排行榜评论
urls["checkVip"]='/suser/wapUserReg';//会员审核
urls["NoBuyDetails"]='/course/wapCourseInfo';//课程详情
urls["wapWorkCommentWrite"]='/photoworks/wapWorkComment';//写评论的发表接口
urls["wapTopPublishCommentWrite"]='/photoworks/wapWorkComment';//排行榜写评论的发表接口
urls["wapCommentCourseWrite"]='/course/wapCommentCourse';//课程写评论的发表接口
urls["scwork"]='/photoworks/wapDelWork';//删除自己发布的作品
urls["scygmkc"]='/course/wapDelBoughtCourse';//删除已购买的课程
urls["courseGetHeadImg"]='/suser/wapIsTeacher';//申请成为老师判断
urls["courseGeImg"]='/suser/wapUserInfo';//获取头像
function geturl(url) {
    return urls[url] ? urls[url] : url;
}


exports.geturl = geturl;