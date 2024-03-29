# “校友APP”前端开发记录

## 1.1.2.20200806（未打包apk）
* 新增 【登录】、【注册】页面网络请求部分
  + 【登录】页面 发送登录请求
  + 【注册】页面 获取短信验证码、图片验证码、发送注册请求
* 优化 完善了【注册】页面的图片验证码部分
* 优化 将[获取验证码]按钮的disabled与手机号]输入框中手机号的格式关联
* 优化 将从【登陆】、【注册】页面跳转到的其他部分页面的跳转方式由navigate换成redirect
* 修复 修复了部分页面高度超出屏幕高度的问题
* 修复 对【注册成功】页面进行了重新创建，并在pages.json文件中进行了注册

## 1.2.1.20200807（已打包apk）
* 新增 【个人中心】、【学籍认证】、【个人档案】、【我的校友】、【推荐校友】页面基本模板
* 新增 封装了滚动文字导航栏组件
* 新增 引入了uni-app的公共样式uni.css文件
* 新增 完成了【个人中心】页面的大部分UI设计
* 优化 将简易导航栏左上角返回按钮按照蓝湖设计图上修改为文字按钮

## 1.2.2.20200808（已打包apk）
* 修复 修复了【个人中心】页面——分享栏部分——照片在APP端真机上未能列显示的bug（可能是grid布局无法正常使用，改成了uniGrid组件）
* 优化 调整了导航栏部分大小和按钮位置

## 1.2.3.20200813（已打包apk）
* 新增 完成了【个人中心】页面的UI部分、本地逻辑（读取相机/本地图片的功能除外）
* 新增 完成了【学籍认证】页面的UI部分、本地逻辑
* 优化 调整了所有页面部分按钮文字显示竖直不居中（这说明line-height样式在APP端或许不能正常使用，用"u-f-ajc"进行调整）
* 优化 将【登录】页面两个icon的图标位置微微调整到更为恰当的地方

## 1.2.4.20200822（已打包apk）
* 新增 完成了【个人档案】页面的UI部分、本地逻辑
* 新增 完成了【登录】、【注册】页面的登录状态缓存
* 新增 完成了【个人中心】、【个人档案】页面的图片上传功能
* 优化 【个人中心】页面分享栏中内容部分被触摸将触发页面滑动到底部(页面滚动回顶部后可以重新触发点击滚动)
* 优化 【学籍认证】页面对不同场景下下拉栏“无匹配项”时的提示文字内容进行了优化

## 1.2.5.20200831（已打包apk）
* 新增 完成了【推荐校友】、【好友通知】页面的UI部分、本地逻辑

## 1.2.6.20200908
* 新增 完成了【我的校友】、【好友聊天】页面的UI部分、本地逻辑

****

## 开发进度
| 页面名称 | UI设计 | 前端 | 后端 | 前端-后端 |
| :-----: | :----: | :-: | :--: | :------: |
| 欢迎 | √ | √ | \\ | √ |
| 登陆 | √ | √ | √ | √ |
| 忘记密码 | 待完成 | 待完成 | 待完成 | 待完成 |
| 注册 | √ | √ | √ | √ |
| 用户协议 | 待完成 | 待完成 | \\ | \\ |
| 注册成功 | √ | √ | \\ | \\ |
| 个人中心 | 部分局部样式欠缺 | √ | 待完成 | 待完成 |
| 学籍认证 | √ | √ | 待完成 | 待完成 |
| 个人档案 | √ | √ | 待完成 | 待完成 |
| 我的校友 | √ | √ | 待完成 | 待完成 |
| 搜索我的好友 | 待完成 | 待完成 | 待完成 | 待完成 |
| 好友聊天 | √ | √ | 待完成 | 待完成 |
| 推荐校友 | √ | √ | 待完成 | 待完成 |
| 好友通知 | 部分局部样式欠缺 | √ | 待完成 | 待完成 |
| 搜索添加好友 | 待完成 | 待完成 | 待完成 | 待完成 |
| 添加好友详情 | 待完成 | 待完成 | 待完成 | 待完成 |
| 交易记录 | 待完成 | 待完成 | 待完成 | 待完成 |
|  |  |  |  |  |

****
**Tips：以下是个页面的命名**
+ 【欢迎】 `index`
+ 【登录】 `login`
	+ 【忘记密码】 `forget`
+ 【注册】 `register`
	+ 【用户协议】 `agreement`
	+ 【注册成功】 `register_succ`
+ 【个人中心】 `personal_center`
	+ 【学籍认证】 `certificate`
	+ 【个人档案】 `archive`
	+ 【我的校友】 `alumnus_my`
		+ 【搜索我的好友】 `friend_my_search`
		+ 【好友聊天】 `friend_chat`
	+ 【推荐校友】 `alumnus_rec`
		+ 【好友通知】 `friend_notice`
		+ 【搜索添加好友】 `friend_search`
		+ 【添加好友详情】 `friend_add_more`
	+ 【交易记录】 `deal_record`