/**
 * Created by hcadmin on 16/3/15.
 */
var Action = require("../apiaction");
var DataProxy = require("data-proxy");

exports.hackerRouter = function(router){
    router.get('/hackerwechat/Userbdfaild',function(req,res){
        res.render ('Hackerwechat/Userbinding/Userbdfaild',{
            layout:'keb/layout-keb',
            active:'videolist',
            //page:1,
            jscript:'hewuqi/video/video'
        });
    });
    router.get('/hackerwechat/Userbdsuccess',function(req,res){
        res.render ('Hackerwechat/Userbinding/Userbdsuccess',{
            layout:'keb/layout-keb',
            active:'videolist',
            //page:1,
            jscript:'hewuqi/video/video'
        });
    });
    router.get('/hackerwechat/UserBinding',function(req,res){
        res.render ('Hackerwechat/Userbinding/UserBinding',{
            layout:'keb/layout-keb',
            active:'videolist',
            //page:1,
            jscript:'hewuqi/video/video'
        });
    });
    router.get('/hackerwechat/activitiesdetails',function(req,res){
        res.render ('Hackerwechat/Activityregist/ActivitiesDetails',{
            //layout:'keb/layout-keb',
            active:'videolist',
            //page:1,
            //jscript:'hewuqi/video/video'
        });
    });
    router.get('/hackerwechat/EventRegist',function(req,res){
        res.render ('Hackerwechat/Activityregist/EventRegist',{
            //layout:'keb/layout-keb',
            active:'videolist',
            //page:1,
            jscript:'hackerwechat/groupregist'
        });
    });
    router.get('/hackerwechat/HackerInfo',function(req,res){
        res.render ('Hackerwechat/Activityregist/HackerInfo',{
            layout:'keb/layout-keb',
            active:'videolist',
            //page:1,
            jscript:'hewuqi/video/video'
        });
    });

    //router.get('/hewuqi/video',function(req,res){
    //    res.render ('hewuqi/video/video',{
    //        layout:'keb/layout-keb',
    //        active:'videolist',
    //        //page:1,
    //        jscript:'hewuqi/video/video'
    //    });
    //});
    router.all('/hackerwechat/DailyReport',function(req,res){
        var report_id=req.param("report_id");
        var params={report_id:report_id};
            res.render ('Hackerwechat/Eventreport/DailyReport',{
                //layout:'keb/layout-keb',
                //active:'videolist',
                jscript:'Hackerwechat/Eventreport/DailyReport',
              //  data:data
            });

    })
    //router.all('/hewuqi/deleteVideo',function(req,res){
    //    var video_id=req.param("video_id");
    //    var params={video_id:video_id};
    //    Action.send(req,res,"/admin/deleteVideo",params,"GET",function(res,data){
    //        var json=json.parse(data);
    //        var code=json.code;
    //        if(code==0){
    //            res.redirect("/hewuqi/video");
    //        }
    //    })
    //});
    router.all('/hackerwechat/ApplicationProgress',function(req,res){
        var course_id=req.param("course_id");
        var params={course_id:course_id};
        //Action.send(req,res,"/admin/courseList",params,"GET",function(res,data){
        //    var json=JSON.parse(data);
        //    var data=json.data;
            res.render ('Hackerwechat/Actcoursemanage/ApplicationProgress',{
                //layout:'keb/layout-keb',
                active:'course_video',
                jscript:'/Hackerwechat/Actcoursemanage/ApplicationProgress',
               // data:data
            });
        //});
    });
    router.all('/hackerwechat/Coursederivative',function(req,res){
        var course_id=req.param("course_id");
        var params={course_id:course_id};
        //Action.send(req,res,"/admin/courseList",params,"GET",function(res,data){
        //    var json=JSON.parse(data);
        //    var data=json.data;
        res.render ('Hackerwechat/Actcoursemanage/Coursederivative',{
            //layout:'keb/layout-keb',
            active:'course_video',
            jscript:'/Hackerwechat/Actcoursemanage/ApplicationProgress',
            // data:data
        });
        //});
    });
    router.all('/hackerwechat/Coursemedia',function(req,res){
        var course_id=req.param("course_id");
        var params={course_id:course_id};
        //Action.send(req,res,"/admin/courseList",params,"GET",function(res,data){
        //    var json=JSON.parse(data);
        //    var data=json.data;
        res.render ('Hackerwechat/Actcoursemanage/Coursemedia',{
            //layout:'keb/layout-keb',
            active:'course_video',
            jscript:'/Hackerwechat/Actcoursemanage/ApplicationProgress',
            // data:data
        });
        //});
    });
    router.all('/hackerwechat/HackerCheats',function(req,res){
        var course_id=req.param("course_id");
        var params={course_id:course_id};
        //Action.send(req,res,"/admin/courseList",params,"GET",function(res,data){
        //    var json=JSON.parse(data);
        //    var data=json.data;
        res.render ('Hackerwechat/Actcoursemanage/HackerCheats',{
            //layout:'keb/layout-keb',
            active:'course_video',
            jscript:'/Hackerwechat/Actcoursemanage/ApplicationProgress',
            // data:data
        });
        //});
    });
    router.all('/hackerwechat/PersonalCenter',function(req,res){
        var course_id=req.param("course_id");
        var params={course_id:course_id};
        //Action.send(req,res,"/admin/courseList",params,"GET",function(res,data){
        //    var json=JSON.parse(data);
        //    var data=json.data;
        res.render ('Hackerwechat/Actcoursemanage/PersonalCenter',{
            //layout:'keb/layout-keb',
            active:'course_video',
            jscript:'/Hackerwechat/Actcoursemanage/ApplicationProgress',
            // data:data
        });
        //});
    });
    router.all('/hewuqi/course_info',function(req,res){
        var course_id=req.param("course_id");
        //console.log(video_id);
        var params={course_id:course_id};
        Action.send(req,res,"/admin/courseInfo",params,"GET",function(res,data){
            var json=JSON.parse(data);
            var res_data=json.data;
            console.log(res_data);
            res.render ('hewuqi/video/courseInfo',{
                layout:'keb/layout-keb',
                active:'course_video',
                jscript:'',
                data:res_data
            });
        });

    });
    router.all('/hewuqi/editCourse',function(req,res){
        var course_id=req.param("course_id");
        //console.log(video_id);
        var params={course_id:course_id};
        Action.send(req,res,"/admin/courseInfo",params,"GET",function(res,data){
            var json=JSON.parse(data);
            var res_data=json.data;
            console.log(res_data);
            res.render ('hewuqi/video/editCourse',{
                layout:'keb/layout-keb',
                active:'course_video',
                jscript:'hewuqi/video/editCourse',
                data:res_data
            });
        });

    });
    router.all('/hewuqi/club',function(req,res){

        res.render ('hewuqi/club/club',{
            layout:'keb/layout-keb',
            active:'club',
            jscript:'hewuqi/club/club',
            //data:res_data
        });
    });
    router.all('/hewuqi/club_info',function(req,res){
        var club_id=req.param("club_id");
        var params={club_id:club_id};
        Action.send(req,res,"/club/getClubInfo",params,"GET",function(res,data){
            var json=JSON.parse(data);
            var res_data=json.data;
            console.log(res_data);
            res.render ('hewuqi/club/clubInfo',{
                layout:'keb/layout-keb',
                active:'course_video',
                jscript:'',
                data:res_data
            });
        });
    });
    router.all('/hewuqi/editClub',function(req,res){
        var club_id=req.param("club_id");
        var params={club_id:club_id};
        Action.send(req,res,"/club/getClubInfo",params,"GET",function(res,data){
            var json=JSON.parse(data);
            var res_data=json.data;
            console.log(res_data);
            res.render ('hewuqi/club/editClub',{
                layout:'keb/layout-keb',
                active:'course_video',
                jscript:'hewuqi/club/editClub',
                data:res_data
            });
        });
    });
    router.all('/hewuqi/createclub',function(req,res){
        res.render ('hewuqi/club/createclub',{
            layout:'keb/layout-keb',
            active:'course_video',
            jscript:'hewuqi/club/createclub'

        });
    });
    router.all('/hewuqi/userlist',function(req,res){
        res.render ('hewuqi/user/userlist',{
            layout:'keb/layout-keb',
            active:'userlist',
            jscript:'hewuqi/user/user'
            //data:res_data
        });
    });
    router.all('/hewuqi/user_info',function(req,res){
        var user_id=req.param("user_id");
        var params={user_id:user_id};
        Action.send(req,res,"/admin/userinfo",params,"GET",function(res,data){
            var json=JSON.parse(data);
            var res_data=json.data;
            console.log(res_data);
            res.render ('hewuqi/user/userinfo',{
                layout:'keb/layout-keb',
                active:'userlist',
                jscript:'hewuqi/user/userinfo',
                data:res_data
            });
        });
    });
    router.all('/hewuqi/teacherlist',function(req,res){
        res.render ('hewuqi/user/teacherlist',{
            layout:'keb/layout-keb',
            active:'teacherlist',
            jscript:'hewuqi/user/teacher'
            //data:res_data
        });
    });
    router.all('hewuqi/teacherinfo', function (req,res) {
        var user_id=req.param("user_id");
        var params={user_id:user_id};
        Action.send(req,res,"/admin/teacherinfo",params,"GET",function(res,data){
            var json=JSON.parse(data);
            var res_data=json.data;
            console.log(res_data);
            res.render ('hewuqi/user/teacherinfo',{
                layout:'keb/layout-keb',
                active:'teacherlist',
                jscript:'hewuqi/user/teacherinfo',
                data:res_data
            });
        });
    });
    router.all('/hewuqi/addcourse',function(req,res){
        var user_id=req.param("user_id");
        res.render ('hewuqi/user/addcourse',{
            layout:'keb/layout-keb',
            active:'teacherlist',
            jscript:'hewuqi/user/teacher',
            user_id:user_id,
            tag:0
        });
    });
    router.get('/hewuqi/competes',function(req,res){
        res.render ('hewuqi/compete/compete',{
            layout:'keb/layout-keb',
            active:'competes',
            //page:1,
            jscript:'hewuqi/compete/compete'
        });
    });
    router.all('/hewuqi/competeinfo', function (req,res) {
        var compete_id=req.param("compete_id");
        var params={compete_id:compete_id};
        Action.send(req,res,"/admin/competeinfo",params,"GET",function(res,data){
            var json=JSON.parse(data);
            var res_data=json.data;
            console.log(res_data);
            res.render ('hewuqi/compete/competeinfo',{
                layout:'keb/layout-keb',
                active:'competes',
                jscript:'hewuqi/compete/competeinfo',
                data:res_data
            });
        });
    });
    router.all('/hewuqi/changecompete',function(req,res){
        var compete_id=req.param("compete_id");
        var params={compete_id:compete_id};
        Action.send(req,res,"/compete/competeVideos",params,"GET",function(res,data){
            var json=JSON.parse(data);
            var res_data=json.data;
            console.log(res_data);
            res.render ('hewuqi/compete/changecompete',{
                layout:'keb/layout-keb',
                active:'competes',
                jscript:'hewuqi/compete/changecompete',
                data:res_data
            });
        });
    })
    router.all('/hewuqi/addCompete',function(req,res){

        res.render ('hewuqi/compete/addCompete',{
            layout:'keb/layout-keb',
            active:'addCompete',
            jscript:'hewuqi/compete/addCompete'
        });
    });
    router.get('/hewuqi/showSquares',function(req,res){
        res.render ('hewuqi/showsquare/showsquares',{
            layout:'keb/layout-keb',
            active:'competes',
            //page:1,
            jscript:'hewuqi/compete/compete'
        });
    });

    router.all('/hewuqi/shareVideos',function(req,res){
        var video_id=req.param("video_id");
        var params={video_id:video_id};
        Action.send(req,res,"/video/video_info",params,"GET",function(res,data){
            var json=JSON.parse(data);
            var res_data=json.data;
            console.log(res_data);
            res.render ('hewuqi/share/sharevideo',{
                layout:'keb/layout-share',
                data:res_data
            });
        });
    })


};
