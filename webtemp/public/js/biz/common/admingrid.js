

/*
 url :  url
 table_obj：表格对象
 paging_obj：分页对象
 current_page：起始页面
 total_pages：总页面
 column_list：表格 列的列表
 param_list：调用url的参数
 page_rows:一页的数量


 */

function clickjump(){
    var values=$("#li_input").val();

    grid.clickjump(values);
}

function get_show_array(totalcount,current_index)
{
    //alert("1");
    var pagelist = [];
//varpagelist=newArray("0","1","2","3",totalcount+1);

//上一页下一页
    var count = 0;
    pagelist[0] = 0;
    pagelist[1] = totalcount + 1;

    count++;
    count++;

    var max_show = 5;//最多页面
    if (totalcount <= max_show) {
        for (var t = 0; t < totalcount; t++) {
            pagelist[count++] = t + 1;
        }
    }
    else {
        // alert(current_index);

        console.log(current_index);


        var used_num = 0;

        for (var jj = 1; jj < totalcount; jj++)
        {


            pagelist[count++] = jj;
            used_num++;

            if (used_num == max_show)
                break;
        }

        //当前页 大于

        if(current_index > max_show +1 )
        {
            pagelist[count++] =  -(max_show +1);
        }

        //当前页
        pagelist[count++] = current_index;


        // alert("当前页 到末尾");
        // alert("当前页 "+current_index);
        // alert("totalcount "+totalcount);
        //当前页 到末尾

        for(var jj =  parseInt(current_index)+1; jj< parseInt(totalcount);jj++ )
        {
            var value = jj;

            // alert(jj);

            var findflag = 0;

            for(var ttttt=0;ttttt<pagelist.length;ttttt++)
            {
                var tvalue = pagelist[ttttt];

                if(tvalue == value)
                {
                    findflag = 1;
                    break;
                }

            }

            if(findflag == 0)
            {
                pagelist[count++] =  -(value);
                break;
            }
        }

        var used_num = 1;//使用个数

        //尾

        pagelist[count++] = totalcount;





    }

    return pagelist;
}


function get_page_num(total,size)
{
    var row_num = parseInt( parseInt(total) / parseInt(size) );

    if( parseInt(total) % parseInt(size) >0)
    {
        row_num++;
    }

    return row_num;
}

function  Grid(url,table_obj,paging_obj,current_page,total_pages,column_list,param_list,page_rows,callback)
{

    this.api_url = url; //url
    this.table_obj = table_obj; //表格
    this.paging_obj = paging_obj; //分页
    this.current_page = current_page; //开始页面
    this.total_pages = 1; // total_pages; //总页面
    this.column_list = column_list; //表格 列的列表
    this.param_list = param_list; //默认参数
    this.status = 0; //状态 0 正常 1 载入中
    this.page_rows = page_rows; //一页的数量
    this.date_list ;

    this.callback_render_ready=""; //

    this.tr_click_flag =0;



    //开始载入
    this.Init = function(){

       // alert(this.api_url);
        //alert(table_obj.attr("id"));
        //alert(paging_obj.attr("id"));

        //初始化表格控件
        this.init_table();

        //初始化分页控件
        this.init_paging();

        //初始化页面

        this.get_Data(this.current_page);
    };


    //初始化分页控件
    this.init_paging = function()
    {
        this.paging_obj.children('ul').children("li").remove();

        //增加上一页
        //this.paging_obj.children('ul').append("<li dataindex＝\"0\"  class='prepage'>上一页</li>");

        //初始化页面

        var total_page_num  = this.total_pages; //总页数
        var max_show_page = 10; // 总共显示10页

        var selected_page = this.current_page; // 当前第几页

        var showarray = new Array();

        //加上一页

        var numLi_pre = document.createElement("li");

        numLi_pre.setAttribute("dataindex",0);
        numLi_pre.setAttribute("class","prepage");
        numLi_pre.innerHTML="上一页";


        var pagelist=get_show_array(this.total_pages,this.current_page);

        for(var i=0;i<=this.total_pages+1;i++)
        {

            //var numLi= "<li class='num'>"+i+"</li>";

            var numLi = document.createElement("li");

            numLi.setAttribute("dataindex",i);

            if(i==0)
            {
                numLi.setAttribute("class","prepage");
                numLi.innerHTML="上一页";
            }
            if(i>0 && i<=this.total_pages)
            {
                if( parseInt(i) <100)
                    numLi.setAttribute("class","li_num");
                else
                    numLi.setAttribute("class","li_num3");


                numLi.innerHTML=""+i+"";

            }
            if(i>this.total_pages)
            {
                numLi.setAttribute("class","nextpage");
                numLi.innerHTML="下一页";
            }

            var find_flag=0;

            var revert_flag = 0;
            for(var t=0;t<pagelist.length;t++)
            {
                var value=pagelist[t];

                if(value==i)
                {
                    find_flag=1;
                }

                if(value == i*-1 && i > 0)
                {
                    revert_flag = 1;
                }

            }

            if(revert_flag == 1  )
            {
                numLi.setAttribute("dataindex",-1);
                numLi.innerHTML="...";
                this.paging_obj.children('ul').append(numLi);
                continue;
            }


            if(find_flag==0)
                continue;

            this.paging_obj.children('ul').append(numLi);

            if(i>0 && i<this.total_pages)
                this.paging_obj.children('ul').children("li:eq("+i+")").addClass("li_num");


        }

        var select_num = 0;

        for(var tt=0;tt<pagelist.length;tt++)
        {
            if( Math.abs(pagelist[tt]) < this.current_page)
                select_num++;
        }
        this.paging_obj.children('ul').children("li:eq("+select_num+")").addClass("selected");


        var numLi = document.createElement("li");
        numLi.innerHTML="<input type='text' id='li_input'/><button type='button' onclick='clickjump()'  id='btn_li'>跳</button>";
        numLi.setAttribute("dataindex",-1);
        this.paging_obj.children('ul').append(numLi);

        //增加下一页
        // this.paging_obj.children('ul').append("<li dataindex＝\"100\"  class='nextpage'>下一页</li>");

        var thisobj = this;

        this.paging_obj.children('ul').children().each (function() {

            // alert($(this).attr("class"));

            $(this).bind("click",function() {


                //alert($(this).attr("dataindex"));

                var dataindex = $(this).attr("dataindex");
                thisobj.clickLi(dataindex);

            });

        });


    };


    //初始化表格控件
    this.init_table = function()
    {
        table_obj.children().remove();



        var thead = document.createElement("thead");
        var thead_tr = document.createElement("tr");

        for(var i=0;i<this.column_list.length;i++)
        {
            var thead_td = document.createElement("td");
            thead_td.innerHTML = column_list[i].title;
            thead_tr.appendChild(thead_td);


        }
        thead.appendChild(thead_tr);
        table_obj.append(thead);

        //var  tbody= document.createElement("tbody");

        //table_obj.append(tbody);


        this.addProgress();

    }

    //无数据时加标志
    this.addNoData = function()
    {
        table_obj.append("<tbody><tr><td colspan='"+this.column_list.length+"'><div>暂无数据<br></td></tr></div></tbody>");
    }

    //加载进度条
    this.addProgress = function()
    {
        table_obj.append("<tbody><tr><td colspan='"+this.column_list.length+"'><div><br><img src=\"/images/grid/loading.gif\"><br></td></tr></div></tbody>");
    }

    //取消进度条
    this.removeProgress = function()
    {
        table_obj.children('tbody').remove();
    }

    //载入一页数据
    this.load_page_data = function(datalist) {

        this.date_list = datalist;
        var data = datalist;
        if (datalist instanceof Array) {

        }
        else {
            var data = new Array();
            data[0] = datalist;
        }
        table_obj.children('tbody').remove();
        //var tbody = table_obj.children('tbody');

        if(data.length == 0 && this.total_pages == 0)
        {

            this.addNoData();
        }

        var tbody = document.createElement("tbody");


        for (var t = 0; t < data.length; t++) {


            var tbody_tr = document.createElement("tr");

            if(this.tr_click_flag==1){
                tbody_tr.setAttribute("onclick","admin_tr_click('"+t+"')");
                tbody_tr.setAttribute("class","tr");
                tbody_tr.setAttribute("id","tr_bgcolor_"+t);
            }


            for (var i = 0; i < this.column_list.length; i++) {
                var dataindex = this.column_list[i].dataIndex;


                var tbody_td = document.createElement("td");


                if (this.column_list[i].hasOwnProperty("dataSource")) {


                    var datasource_function = this.column_list[i].dataSource;

                    //data,datarow,gridobj,current_column

                    tbody_td.innerHTML = datasource_function(data, t, this, i);
                }
                else
                    tbody_td.innerHTML = data[t][dataindex];


                if(this.column_list[i].hasOwnProperty("td_class")  )
                {

                    tbody_td.setAttribute("class",this.column_list[i].td_class );
                }



                tbody_tr.appendChild(tbody_td);
            }

            tbody.appendChild(tbody_tr);


        }

        table_obj.append(tbody);

       // alert(this.callback_render_ready);
        if (this.callback_render_ready!="") {
            this.callback_render_ready();
        }


    }

    //切换分页控件的选择
    this.changePageShow=function(newpageindex)
    {
        /*

        this.paging_obj.children('ul').children("li:eq("+this.current_page+")").removeClass("selected");
        this.paging_obj.children('ul').children("li:eq("+newpageindex+")").addClass("selected");
        */

        this.current_page = newpageindex;

        this.init_paging();

    }


    //获取数据接口
    this.get_Data = function(pageindex){

        this.removeProgress();
        this.addProgress();

        var final_param = param_list+"&page="+pageindex+"&rows="+page_rows;

        //alert(final_param);
        this.status = 1;

        var thisobj = this;

        $.ajax({
            url:this.api_url,
            type:"post",
            data: final_param,
            dataType:'json',
            success: function(data){

                //alert(data.code);

                if(data.code == 1)
                {
                    alert(data.msg);

                }
                else
                {



                    //alert(data.total);


                    var total_num = 0;

                    var data_flag = 0;  //内部还是外部

                    //total 在外部
                    if(data.hasOwnProperty("total") )
                    {
                       // console.log(data.total);
                        //alert(data.total);

                        total_num = data.total;

                        data_flag  =1;

                    }
                    else
                    {
                        //total 在内部

                        if(data.data.hasOwnProperty("total"))
                        {
                            total_num = data.data.total;

                            data_flag = 2;
                        }

                    }


                    //alert(total_num);


                    var total_page_num = get_page_num(total_num,thisobj.page_rows) ;



                    if(total_page_num != thisobj.total_pages)
                    {
                        thisobj.total_pages = total_page_num;

                        thisobj.init_paging();
                    }




                    //alert(data.msg);
                    //alert(data.data.length);
                    //alert(data.data.login_name);


                    thisobj.changePageShow(pageindex);


                    if(data_flag == 1)
                        thisobj.load_page_data(data.data);

                    if(data_flag == 2)
                        thisobj.load_page_data(data.data.rows);


                }

                this.status = 0;
                if(callback){
                    callback();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

                    this.status = 0;



            }
        });
    }


    //点击li时间
    this.clickLi=function(num)
    {

        //alert(num);

        if(num == -1)
        return;
        //上一页
        if(num ==0)
        {
            if(parseInt(this.current_page)>1)
            {
                num=  parseInt(this.current_page)-1;
            }
            else
            {
                return;
            }

        }

        //下一页

        if(num > parseInt(this.total_pages))
        {
            //alert(this.current_page);
            //alert(this.total_pages);
            if(parseInt(this.current_page)<parseInt(this.total_pages))
            {
                //alert(this.current_page);
                num = parseInt(this.current_page)+1;
            }
            else
            {
                return;
            }
        }

        //alert(num);
        this.get_Data(num);
    }

    this.clickjump=function (num){
        //var values=$("#li_input").val();
        var thisobj=this;
        thisobj.clickLi(num);
    }

}




