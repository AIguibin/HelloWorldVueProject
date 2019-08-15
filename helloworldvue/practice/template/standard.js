// exports:首先对于本身来讲是一个变量（对象），它不是module的引用，它是{}的引用，它指向module.exports的{}模块
// module.exports:首先，module是一个变量，指向一块内存，exports是module中的一个属性，存储在内存中，然后exports属性指向{}模块


// require时代的模块
//-------- node 模块的定义 -----------
module.exports = {
    a: function () {},
    b: 'xxx'
};
//-------- node 模块的引用 -----------
var m = require('./a');
m.a();
// AMD or CMD
// ----------- AMD or CMD 定义 ----------------
define(function (require, exports, module) {
    module.exports = {
        a: function () {},
        b: 'xxx'
    };
});
// ------------ AMD or CMD 引用 -------------
define(function (require, exports, module) {
    var m = require('./a');
    m.a();
    module.exports = {}
});

//ES6中的module时代的模块
// ---------------export导出模块接口-----------
// 在要导出的接口前面，加入export指令。
export default function () {}
export function a() {}
var b = 'xxx';
export {
    b
}; // 这是ES6的写法，实际上就是{b:b}
setTimeout(() => b = 'ooo', 1000);
export var c = 100;
// --------------import导入模块--------------
import $ from 'jquery';
import * as _ from '_';
import {
    xxx
} from './a';
import {
    default as alias,
    a as a_a,
    xx,
    xxxx
} from './a';

var console;

function used() {
    console.log($, _, xxx, alias, a_a, xx, xxxx);
}
used();

// AMD 与 CMD 规范的区别
// 1.对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
// 2.CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：
// CMD
define(function (require, exports, module) {
    var a = require('./a')
    a.doSomething()
    // 此处略去 100 行
    var b = require('./b') // 依赖可以就近书写
    b.doSomething()
    // ...
})

// AMD 默认推荐的是
define(['./a', './b'], function (a, b) { // 依赖必须一开始就写好
    a.doSomething()
    // 此处略去 100 行
    b.doSomething()
    // ...
})
// ---------------AMD------------------
// Asynchronous Module Definition，用白话文讲就是 异步模块定义，对于 JSer 来说，异步是再也熟悉不过的词了，所有的模块将被异步加载，模块加载不影响后面语句运行。所有依赖某些模块的语句均放置在回调函数中。
// AMD规范定义了一个自由变量或者说是全局变量 define 的函数。
// define(id , dependencies  , factory);
// AMD规范 : https://github.com/amdjs/amdjs-api/wiki/AMD
// 第一个参数 id 为字符串类型，表示了模块标识，为可选参数。若不存在则模块标识应该默认定义为在加载器中被请求脚本的标识。如果存在，那么模块标识必须为顶层的或者一个绝对的标识。
// 第二个参数，dependencies ，是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。
// 第三个参数，factory，是一个需要进行实例化的函数或者一个对象。
// 创建模块标识为 alpha 的模块，依赖于 require， export，和标识为 beta 的模块
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
    exports.verb = function () {
        return beta.verb();
        // or:
        return require("beta").verb();
    }
});
// 一个返回对象字面量的异步模块
define(["alpha"], function (alpha) {
    return {
        verb: function () {
            return alpha.verb() + 1;
        }
    }
});
// 无依赖模块可以直接使用对象字面量来定义
define({
    add: function (x, y) {
        return x + y;
    }
});

// -----------------CMD--------------------------
// CMD在CMD中，一个模块就是一个文件，格式为：define( factory );
// 全局函数 define，用来定义模块。
// 参数 factory 可以是一个函数，也可以为对象或者字符串。
// 当 factory 为对象、字符串时，表示模块的接口就是该对象、字符串。
// 定义JSON数据模块：
define({
    foo: bar
});
// 通过字符串定义模板模块：
define("this is {{ data }}");
// factory 为函数的时候，表示模块的构造方法，执行构造方法便可以得到模块向外提供的接口。
define(function (require, exports, module) {
    // 模块代码
});

// define(id ? , deps ? , factory);
// define 也可以接受两个以上的参数，字符串 id 为模块标识，数组 deps 为模块依赖：
define('module', ['module1', 'module2'], function (require, exports, module) {
    // 模块代码
});
// 其与 AMD 规范用法不同。
// require 是 factory 的第一个参数。
// require( id );
// 接受模块标识作为唯一的参数，用来获取其他模块提供的接口：
define(function (require, exports) {
    var a = require('./a');
    a.doSomething();
});

// require.async(id, callback ? );
// require 是同步往下执行的，需要的异步加载模块可以使用 require.async 来进行加载：
define(function (require, exports, module) {
    require.async('.a', function (a) {
        a.doSomething();
    });
});

require.resolve(id)
// 可以使用模块内部的路径机制来返回模块路径，不会加载模块。
// exports 是 factory 的第二个参数，用来向外提供模块接口。

define(function (require, exports) {
    exports.foo = 'bar'; // 向外提供的属性
    exports.do = function () {}; // 向外提供的方法
});
// 当然也可以使用 return 直接向外提供接口。
define(function (require, exports) {
    return {
        foo: 'bar', // 向外提供的属性
        do: function () {} // 向外提供的方法
    }
});
// 也可以简化为直接对象字面量的形式:
define({
    foo: 'bar', // 向外提供的属性
    do: function () {} // 向外提供的方法
});
// 与nodeJS中一样需要注意的是，一下方式是错误的：
define(function (require, exports) {
    exports = {
        foo: 'bar', // 向外提供的属性
        do: function () {} // 向外提供的方法
    }
});
// 需要这么做
define(function (require, exports, module) {
    module.exports = {
        foo: 'bar', // 向外提供的属性
        do: function () {} // 向外提供的方法
    }
});
// 传入的对象引用可以添加属性，一旦赋值一个新的对象，那么值钱传递进来的对象引用就会失效了。开始之初，exports 是作为 module.exports 的一个引用存在，一切行为只有在这个引用上 factory 才得以正常运行，赋值新的对象后就会断开引用，exports就只是一个新的对象引用，对于factory来说毫无意义，就会出错。
// module 是factory的第三个参数，为一个对象，上面存储了一些与当前模块相关联的属性与方法。
// module.id 为模块的唯一标识。
// module.uri 根据模块系统的路径解析规则得到模块的绝对路径。
// module.dependencies 表示模块的依赖。
// module.exports 当前模块对外提供的接口。