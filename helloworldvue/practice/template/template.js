/**
 *
 */
define([], function (require, exports) {
    const template = '<div><h1>哈哈哈 我现实了吧</h1></div>';
    exports.subunit = {
        template: template,
        data: function () {
            return {}
        },
        method: {}
    }
});

/**
 * @created by
 * @updated by
 * @description
 */
(function (vue, name) {
    vue.component(name, {
        template: '<div><h1>哈哈哈 我现实了吧</h1></div>',
        props: {},
        data: function () {},
        methods: {},
        created: function () {},
        computed: {}
    });
}(Vue, 'showw-showw'));
// 不同于以下写法，以下不是闭包自执行
// Vue.component('showw-showw', {
//   template: '<div><h1>哈哈哈 我现实了吧</h1></div>',
//   props: {},
//   data: function () {},
//   methods: {},
//   created: function () {},
//   computed: {}
// });

/**
 * @created
 * @updated
 * @description
 */
(function (vue, name) {
    // 注册
    vue.component(name, function (resolve, reject) {
        // 向 `resolve` 回调传递组件定义
        resolve({
            template: '<div><h1>哈哈哈 我现实了吧</h1></div>',
            props: {},
            data: function () {},
            methods: {},
            created: function () {},
            computed: {}
        });
        reject({

        })
    });
}(Vue, 'showw-showw'));