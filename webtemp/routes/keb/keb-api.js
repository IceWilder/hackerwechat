var Action = require("../apiaction");
exports.hwqAPI = function(router){

/*核舞器*/
    router.all('/hewuqi/api/videos',function(req,res){
        var page=req.param("page");
        var size=req.param("rows");
        var content=req.param("content");
        var ordertype=req.param("ordertype");
        var category=req.param("category");
        var params={page:page,size:size,content:content,ordertype:ordertype,category:category};
        Action.send(req,res,'/admin/getVideoList',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                json.data['rows']=json.data['videos'];
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/courses',function(req,res){
        var page=req.param("page");
        var size=req.param("rows");
        var content=req.param("content");
        var ordertype=req.param("ordertype");
        var course_type=req.param("course_type");
        var params={page:page,size:size,content:content,ordertype:ordertype,course_type:course_type};
        Action.send(req,res,'/admin/courseList',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/clubs',function(req,res){
        var page=req.param("page");
        var size=req.param("rows");
        var params={page:page,size:size};
        Action.send(req,res,'/admin/clubList',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.post('/hewuqi/api/editCourse',function(req,res){

        var course_id=req.param("course_id");

        var course_intro=req.param("course_intro");
        var course_type=req.param("course_type");
        var allVideos=req.param("allVideos");
        var course_name=req.param("course_name");
        var course_bill=req.param("course_bill");
        var user_id=req.param("user_id");
        var videos_num=req.param("videos_num");
        var params={course_type:course_type,course_id:course_id,
            course_intro:course_intro,
                allVideos:allVideos,course_name:course_name,
            course_bill:course_bill,user_id:user_id,videos_num:videos_num};
        Action.send(req,res,'/admin/editCourse',params,"POST",function(res,data){
           // console.log(data,"aDASDA");
            var json = JSON.parse(data);
            console.log(params);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);

            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/editClub', function (req,res) {
        var video_id=req.param("video_id");
        var video_url=req.param("video_url");
        var manager=req.param("manager");
        var school=req.param("school");
        var club_intro=req.param("club_intro");
        var club_contact=req.param("club_contact");
        var club_one_pic=req.param("club_one_pic");
        var club_two_pic=req.param("club_two_pic");
        var club_id=req.param("club_id");
        var club_name=req.param("club_name");
        var params={
            manager:manager,
            school:school,
            club_intro:club_intro,
            club_contact:club_contact,
            video_url:video_url,
            club_one_pic:club_one_pic,
            club_two_pic:club_two_pic,
            video_id:video_id,
            club_id:club_id,
            club_name:club_name
        };
        Action.send(req,res,'/admin/editClub',params,"POST",function(res,data){
            // console.log(data,"aDASDA");
            var json = JSON.parse(data);
            console.log(params);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);

            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/createClub', function (req,res) {
      //  var video_id=req.param("video_id");
        var video_url=req.param("video_url");
        var manager=req.param("manager");
        var school=req.param("school");
        var club_intro=req.param("club_intro");
        var club_contact=req.param("club_contact");
        var club_one_pic=req.param("club_one_pic");
        var club_two_pic=req.param("club_two_pic");
        var club_name=req.param("club_name");

        //  var club_id=req.param("club_id");
        var params={
            manager:manager,
            school:school,
            club_intro:club_intro,
            club_contact:club_contact,
            video_url:video_url,
            club_one_pic:club_one_pic,
            club_two_pic:club_two_pic,
            club_name:club_name

            //   video_id:video_id,
       //     club_id:club_id
        };
        Action.send(req,res,'/admin/createClub',params,"POST",function(res,data){
            // console.log(data,"aDASDA");
            var json = JSON.parse(data);
            console.log(params);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);

            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/users',function(req,res){
        var page=req.param("page");
        var size=req.param("rows");
        var content=req.param("content");
        var ordertype=req.param("ordertype");
        var params={page:page,size:size,content:content,ordertype:ordertype};
        Action.send(req,res,'/admin/userlist',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/deleteUser',function(req,res){
        var user_id=req.param("user_id");
        var params={user_id:user_id};
        Action.send(req,res,'/admin/deleteUser',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/upgradeUser',function(req,res){
        var user_id=req.param("user_id");
        var params={user_id:user_id};
        Action.send(req,res,'/admin/upgradeUser',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/teachers',function(req,res){
        var page=req.param("page");
        var size=req.param("rows");
        var content=req.param("content");
        var ordertype=req.param("ordertype");
        var params={page:page,size:size,content:content,ordertype:ordertype};
        Action.send(req,res,'/admin/teacherlist',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.post('/hewuqi/api/addCourse',function(req,res){

        var course_intro=req.param("course_intro");
        var course_type=req.param("course_type");
        var allVideos=req.param("allVideos");
        var course_name=req.param("course_name");
        var course_bill=req.param("course_bill");
        var user_id=req.param("user_id");
        var videos_num=req.param("videos_num");
        var params={course_type:course_type,course_id:course_id,
            course_intro:course_intro,
            allVideos:allVideos,course_name:course_name,
            course_bill:course_bill,user_id:user_id,videos_num:videos_num};
        Action.send(req,res,'/admin/addcourse',params,"POST",function(res,data){
            // console.log(data,"aDASDA");
            var json = JSON.parse(data);
            console.log(params);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);

            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/competes',function(req,res){
        var page=req.param("page");
        var size=req.param("rows");
        var content=req.param("content");
        var params={page:page,size:size,content:content};
        Action.send(req,res,'/admin/competelist',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })
    });
    router.all('/hewuqi/api/competeVideo',function(req,res){
        var compete_id=req.param("compete_id");
        var params={compete_id:compete_id};
        Action.send(req,res,'/compete/competeVideos',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })

    });

    router.all('/hewuqi/api/changeCompete',function(req,res){
        var compete_id=req.param("compete_id");
        var tag_id=req.param("tag_id");
        var videos=req.param("videos");
        var params={compete_id:compete_id,tag_id:tag_id,videos:videos};
        Action.send(req,res,'/compete/changeCompete',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })

    });

    router.all('/hewuqi/api/deleteTag',function(req,res){
        var compete_id=req.param("compete_id");
        var tag_id=req.param("tag_id");
        var params={compete_id:compete_id,tag_id:tag_id};
        Action.send(req,res,'/admin/deleteTag',params,"GET",function(res,data){
            var json = JSON.parse(data);
            //console.log("[[[json]]]",json.data);
            if(json.data === "" || json.data===null) {
                res.status(200).json(json);
            }else {
                console.log(json);
                res.status(200).json(json);
            }
        })

    })
};