
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/register/register","pages/register_succ/register_succ","pages/test/test","pages/forget/forget","pages/agreement/agreement","pages/personal_center/personal_center","pages/certificate/certificate","pages/archive/archive","pages/alumnus_my/alumnus_my","pages/alumnus_rec/alumnus_rec","pages/deal_record/deal_record","pages/friend_notice/friend_notice","pages/friend_search/friend_search","pages/friend_add_more/friend_add_more"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"南工校友","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","titleNView":false,"scrollIndicator":"none","bounce":"none"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"南工校友","compilerVersion":"2.8.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{}},{"path":"/pages/login/login","meta":{},"window":{}},{"path":"/pages/register/register","meta":{},"window":{}},{"path":"/pages/register_succ/register_succ","meta":{},"window":{}},{"path":"/pages/test/test","meta":{},"window":{}},{"path":"/pages/forget/forget","meta":{},"window":{}},{"path":"/pages/agreement/agreement","meta":{},"window":{}},{"path":"/pages/personal_center/personal_center","meta":{},"window":{"bounce":"vertical"}},{"path":"/pages/certificate/certificate","meta":{},"window":{}},{"path":"/pages/archive/archive","meta":{},"window":{}},{"path":"/pages/alumnus_my/alumnus_my","meta":{},"window":{}},{"path":"/pages/alumnus_rec/alumnus_rec","meta":{},"window":{}},{"path":"/pages/deal_record/deal_record","meta":{},"window":{}},{"path":"/pages/friend_notice/friend_notice","meta":{},"window":{}},{"path":"/pages/friend_search/friend_search","meta":{},"window":{}},{"path":"/pages/friend_add_more/friend_add_more","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
