# PC端微信扫码登录流程：

###### *为什么要微信登录：*

> 如果用户在微信客户端中访问第三方网页，公众号可以通过微信网页授权机制，来获取用户基本信息，进而实现业务逻辑。微信拥有庞大且稳定活跃的用户基数，直接将我们的app接入到微信的生态可以免去复杂的新用户注册流程，使用户体验更良好。

###### ***微信登录的几种情况：***

+ PC端：

    + PC端微信浏览器 -> 直接调用微信授权（不扫码，使用微信服务号的appid和appsecret）

    + PC端其他浏览器 -> 跳转微信的扫码登录页面（需要扫码，使用微信开放平台注册的PC应用appid和appsecret）

+ 移动端：

    + 微信客户端打开 -> 直接调用微信授权（不扫码，使用微信服务号的appid和appsecret）

    + 其他手机浏览器打开 -> 跳转微信的扫码登录页面（需要扫码，使用微信开放平台注册的PC应用appid和appsecret）

###### ***区分是否是PC环境的方法：***

> 判断是PC环境还是移动环境是为了相应切换应用的布局，目前采用css媒体查询来做判断：

```css
/* 屏幕宽度小于等于1070像素时识别为移动端（1070像素是使推荐页常用情报站栏不现实滚动条的最小宽度） */
@media screen and (max-width: 1070px) {
	/* 移动端布局css样式 */
}
/* 屏幕宽度大于1071像素识别为PC端 */
@media screen and (min-width: 1071px) {
	/* PC端布局样式 */
}
```

> ***这里目前的设计是将判断UI样式和判断登录逻辑区分开的，两个功能分别独立判断***

###### ***区分微信登录的几种情况的方法：***

+ 前端在登录时获取用户设备信息（userAgent）

```javascript
let UA = navigator.userAgent.toLocaleLowerCase()  
// UA的格式可能因设备不同而采用不同的大小写格式这里我们先统一为小写方便下一步判断
UA.indexOf("micromessenger") != -1
// 通过indexOf方法来判断字符串里是否有要查询的字段
```

#### ***前端操作***

###### 1 获取code(此步骤由前端完成)

+ 首先要在微信开放平台里申请创建一个web应用，填写完基本信息之后提交审核，最长7个工作日，一般两天就能下来。审核通过以后可以得到web应用的AppID和AppSecret，稍后请求微信登录的二维码。

+ 在得到web应用的AppID以后前端需要配置请求登录二维码的url：

```javascript
// 前端使用appid和回调域名来获取微信登陆二维码

window.location.replace(
	"https://open.weixin.qq.com/connect/qrconnect?" +
	"appid=" + APP_id + "&" +
	"redirect_uri=" + encodeURIComponent('http://wx.digitwonder.com') + "&" +
	"scope=snsapi_login#wechat_redirect" )
```

> 这个配置中AppID字段是向后台传微信开放平台的web应用AppID，回调地址也是在开放平台注册时留的地址，而且这个回调地址的uri需要经过encode编码加密以后拼接到请求的。'scope'字段表示请求的作用域，微信扫码登录时scope字段固定写'snsapi_login'。将这个地址拼接好以后就可以将路由定向到微信的二维码页面了。

###### 参数说明

参数  | 是否必须 | 说明
:--- | :--- |:---
appid |  是  | 应用唯一标识（前面认证网页应用中获得）
redirect_uri |  是  | 重定向地址，需要进行UrlEncode（前面认证网页应用中获得）
response_type |  是  | 填code
scope |  是  | 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
state |  是  | 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验



+ 在页面定位到微信二维码页面以后扫码确认，页面会被定向到之前配置的回调页面地址并且将请求来的code拼接到url上一并返回，我们在微信确认登陆以后回到url拼接有code的页面获取到code之后向后台发送登陆请求。

```javascript
// 声明变量flag用来存储微信回调页面的code信息
let flag = flag.split("&")[0];
// 重定向该页面的路由（清除url中的code） - 避免发送code请求
this.$router.replace({
  path: "/login",
  query: {
    redirect: this.$route.query.redirect
  }
});

this.request({
        url: "/biz/login/wx",  // 后台接收code的接口
        method: "POST",  // 使用HTTP的POST方法传回code
        data: {
          code: flag  // 将页面存储code的flag变量以code字段传给后台
          // 此处区分登录方式的字段待定
        }
      }).then(res => {
      	// 前端本地获取用户信息后的方法
      })
```

#### ***后端操作***

###### ***接口结构***
>	接口: (post)/biz/login/wx
> 参数: browser(取值为 wx,other)
> 返回数据(json):
```javascript
// 登录成功时返回
{
    "code": 1,
    "msg": "SUCCESS",
    "data": {
        "nick": "用户昵称",
        "role_id": 2,
        "mobile": "手机号",
        "avatar": "用户头像",
        "birthday": 1578909982972,
        "gender": 2,
        "location": "地区",
        "summary": "用户简介",
        "eval": true,
        "status": "Complete",
        "last_login": 1578909982972,
        "id": "id",
        "create_time": 1571755690000,
        "update_time": 1578885503000
    }
}

// 登录失败时返回
{
    "code": 0,
    "msg": "FAILURE"
}
```

###### 1 获取access_token
> 收到登录请求后首先通过code向微信服务器换取access_token。
> 根据不同的浏览器类型使用相应的appid和secret

```javascript
// 请求url(Get)
https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
```
###### 参数说明

参数 | 是否必须 | 说明
:---: | :---: | :---
appid | 是 | 应用唯一标识
secret | 是 | 应用密钥AppSecret
code | 是 | 填写第一步获取的code参数
grant_type | 是 | 填authorization_code

> 微信浏览器登录时使用公众号appid和secret, 其他浏览器登录使用网站应用appid和secret

###### 返回数据说明

名称 | 类型 | 说明
:---: | :---: | :---
access_token | String | access_token
expires_in | int | access_token有效时间
refresh_token | String | refresh_token 
openid | String | open_id
scope | String | 授权作用域

> 当获取数据出错时,返回结果中包含"errCode"字段, 登录失败

###### 2 拉取用户信息
> 通过第一步中获取到的access_token和openid拉取user_info

```javascript
// 请求url(Get)
https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
```
###### 参数说明

参数 | 是否必须 | 说明
:---: | :---: | :---
access_token | 是 | 上一步中获取到的access_token
openid | 是 | 微信用户唯一标识，上一步中获取到的openid

###### 返回数据说明

名称 | 类型 | 说明
:---: | :---: | :---
openid | String | open_id
unionid | String | union_id
nickname | String | 用户昵称
sex | int | 性别
province | String | 省
city | String | 城市
country | String | 国家
headimgurl | String | 用户头像
privilege | Array | 用户权限

> 当获取数据出错时,返回结果中包含"errCode"字段, 登录失败

###### 3 生成或获取本地用户
+ 通过union_id获取第三方平台账号
+ 第三方平台账号存在时通过uid获取用户数据,否则继续
+ 使用微信登录的账户需要将其用户数据转换成本地用户并存储
+ 添加用户缓存
+ 创建或更新用户Auth数据
+ 更新ES(UserIndex)
+ 创建用户媒体


###### 4 返回用户数据
> 将用户数据返回到前台

#### ***时序图***

![获取access_token时序图](https://res.wx.qq.com/op_res/D0wkkHSbtC6VUSHX4WsjP5ssg5mdnEmXO8NGVGF34dxS9N1WCcq6wvquR4K_Hcut "获取access_token时序图")
