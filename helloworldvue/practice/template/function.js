// 自执行匿名函数(function(){})(); || (function(){}());
var console;
(function (n1, n2) {
    console.log("这是匿名函数的自执行的第一种写法，结果为:" + (n1 + n2))
})(10, 100);
(function (n1, n2) {
    console.log("这是匿名函数的自执行的第二种写法，结果为：" + (n1 + n2))
}(10, 100));
// 自执行声明式函数(function name(){})(); || (function name(){}());
(function start(n1, n2) {
    console.log("这是函数声明方式的自执行的第一种写法，结果为:" + (n1 + n2))
})(10, 100);
(function start(n1, n2) {
    console.log("这是函数声明方式的自执行的第二种写法，结果为：" + (n1 + n2))
}(10, 100))

// 一般定义函数有两种方式：
//     1：函数的声明
//     2：函数表达式
// 函数的声明
function name() {
    console.log("函数的声明式定义")
}
name(); //函数调用
// 函数表达式
var fun = function () {
    console.log("函数表达式定义")
}
fun; //函数调用