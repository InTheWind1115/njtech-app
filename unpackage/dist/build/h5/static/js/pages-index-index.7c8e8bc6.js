(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"108c":function(t,n,e){"use strict";e.r(n);var i=e("c509"),a=e("5af8");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("fcce");var c,r=e("f0c5"),u=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"0676c8a8",null,!1,i["a"],c);n["default"]=u.exports},"49d2":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,"uni-image[data-v-0676c8a8]{position:fixed;top:0;left:0;z-index:-1;width:%?750?%  /* 750rpx代表屏幕宽度 */}.index-welcome[data-v-0676c8a8]{color:#e6e3e3;font-size:%?125?%;margin-top:%?60?%}.index-tips[data-v-0676c8a8]{color:#fff;font-size:%?25?%;margin-top:calc(75%)}.index-btn[data-v-0676c8a8]{width:%?440?%;border-radius:%?100?%;margin-top:%?60?%;color:#00a0eb!important;font-size:%?36?%}",""]),t.exports=n},"5af8":function(t,n,e){"use strict";e.r(n);var i=e("76a1"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},"62be":function(t,n,e){t.exports=e.p+"static/img/index.9a42c4cd.png"},"76a1":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{screenHeight:""}},methods:{toLogin:function(){uni.navigateTo({url:"../login/login"})},toRegister:function(){uni.navigateTo({url:"../register/register"})}},onLoad:function(){this.screenHeight=uni.getSystemInfoSync().windowHeight}};n.default=i},8519:function(t,n,e){var i=e("49d2");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("87a48f88",i,!0,{sourceMap:!1,shadowMode:!1})},c509:function(t,n,e){"use strict";var i,a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",[i("v-uni-image",{staticClass:"u-f-ajc",style:"height: "+t.screenHeight+"px!important;",attrs:{src:e("62be"),mode:"scaleToFill","lazy-load":!0}}),i("v-uni-view",{staticClass:"index-welcome u-f-ajc"},[t._v("Welcome!")]),i("v-uni-view",{staticClass:"index-tips u-f-ajc"},[t._v("欢迎使用校友app，请选择登录账号或注册账号。")]),i("v-uni-button",{staticClass:"index-btn",attrs:{type:"default"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.toLogin.apply(void 0,arguments)}}},[t._v("登录")]),i("v-uni-button",{staticClass:"index-btn",attrs:{type:"default"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.toRegister.apply(void 0,arguments)}}},[t._v("注册")])],1)},o=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}))},fcce:function(t,n,e){"use strict";var i=e("8519"),a=e.n(i);a.a}}]);