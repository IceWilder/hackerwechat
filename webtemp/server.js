/**
 * Created by wdb on 4/10/15.
 */
var io = require('socket.io')();

var pricelist = [];//价格列表

//pricelist.sort(function(a,b){return a<b?1:-1});//从大到小排序

io.on('connection', function (socket) {

    //响应连接
    socket.emit('conn', socket.id);
    //断开连接
    socket.on('disconnect', function () {
        console.log(socket.id + ': disconnect');
        socket.broadcast.emit('disc', socket.userid);
    });
    socket.on('setpid', function (pid) {
        console.log("设置",socket.pid,pid)
        if (socket.pid != pid) {
            socket.pid = pid;
        }
        console.log(socket.pid,pid)
    });
    //广播出价价格
    socket.on('bidprice', function (price) {
        console.log(socket.pid + '加价：' + price);
        socket.broadcast.emit('newprice', socket.pid, price);
        socket.emit('newprice', socket.pid, price);
    });
    socket.on('biduser', function (usernum) {
        console.log(socket.pid + '出价人数：' + usernum);
        socket.broadcast.emit('newuser', socket.pid, usernum);
        socket.emit('newuser', socket.pid, usernum);
    });

});

exports.listen = function (server) {
    console.log("============listen socekt io ===========")
    return io.listen(server);
};