<template>
  <div class="resume-page">
    <div @click="rollAvatar" :class="{open: isRoll === true, noopen: isRoll === false}" class="avatar">
      <img v-if="!showVidoe" :class="{ roll: isRoll === true, rollReverse: isRoll === false }"  :src="avatar" alt="avatar" title="王天柱" />
      <video ref="video" class="resume_video" src="@/assets/test.mp4"></video>
    </div>
    <p class="autograph">一个爱画画的前端程序员</p>
    <div class="content">
      <div class="bascInfo">
        <p class="title">个人信息</p>
        <div class="row bascInfo-wrapper">
          <div
            v-for="(item, index, key) in bascInfo"
            :key="key"
            class="infoItem col-md-6 col-lg-6 col-xs-2"
          >{{ item }}</div>
        </div>
      </div>
      <div class="bascInfo">
        <p class="title">个人简介</p>
        <div class="row Info-wrapper">{{ briefInfo.content }}</div>
      </div>
      <div class="bascInfo">
        <p class="title">技术栈</p>
        <div class="Info-wrapper">
          <div class="skillIcons">
            <img v-for="(icon, index) in icons" :key="index" :src="icon" alt />
          </div>
          <div class="skillsText" v-for="(item, index) in skills" :key="index">{{ item }}</div>
        </div>
      </div>
      <div class="bascInfo">
        <p class="title">项目经验</p>
        <div class="items-wrapper">
          <div class="item-wrapper" v-for="(item, index) in projects" :key="index">
            <div class="itemTitle">
              <div class="subTitle itemName">{{ item.name }}</div>
              <a :href="item.href">{{ item.href }}</a>
            </div>
            <div class="itemTime subTitle">{{ item.time }}</div>
            <div class="subTitle">项目介绍：</div>
            <div>{{ item.info }}</div>
            <div class="subTitle">我的职责</div>
            <div class="itemDuty" v-for="(duty, index) in item.duty" :key="index">{{ duty }}</div>
          </div>
        </div>
      </div>
      <div class="bascInfo">
        <p class="title">工作经历</p>
        <div class="items-wrapper">
          <div class="item-wrapper" v-for="(item, index) in workExps" :key="index">
            <div class="workExp">
              <div class="subTitle">{{ item.time }}</div>
              <div class="subTitle">{{ item.company }}</div>
              <div class="subTitle">{{ item.position }}</div>
            </div>
            <div class="workDuty" v-for="(workDuty, index) in item.work" :key="index">
              {{ workDuty }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="copyRight">2020 王天柱 京ICP备19003625号</p>
  </div>
</template>

<script>
export default {
  name: "resume",
  mounted() {
    console.log(this.$refs.video.ended, 'is end')
  },
  methods: {
    rollAvatar() {
      if (this.isRoll === 'default' || !this.isRoll) {
        this.isRoll = true
        setTimeout(() => {
          this.showVidoe = true
          this.$refs.video.play()
          this.watchVideo()
        }, 1 * 1000);
      } else {
        this.isRoll = false
        this.showVidoe = false
        this.$refs.video.pause()
      }
      if (this.isRoll) {
        setTimeout(() => {
          this.avatar = this.avatar2
        }, 300)
      } else {
        setTimeout(() => {
          this.avatar = this.avatar1
        }, 300)
      }
    },
    watchVideo() {
      let timer = setInterval(() => {
        if (this.$refs.video.ended || this.$refs.video.paused) {
          clearInterval(timer)
          if (this.$refs.video.ended) {
            this.showVidoe = false
            this.isRoll = !this.isRoll
          }
        }
      }, 500)
    }
  },
  data() {
    return {
      isRoll: 'default',
      showVidoe: false,
      avatar: require('@/assets/images/zjz.jpg'),
      avatar1: require('@/assets/images/zjz.jpg'),
      avatar2: require('@/assets/images/life.jpg'),
      bascInfo: {
        name: "王天柱 | 男 | 96",
        school: "北京服装学院 | 自动化",
        mobile: "手机:18810210354",
        email: "邮箱:2249796929@qq.com",
        exp: "前端开发:3.5年",
        position: "职位:web前端"
      },
      briefInfo: {
        content: `喜欢钻研技术，自己开发并维护着个人博客网站，既是锻炼自己同时也可以得到他人的指导。对新鲜事物感兴趣，喜欢探究底层实现原理。自学能力强，能够通过阅读框架或组件库的api文档来快速上手新技术。对工作认真负责，能站在用户角度体验产品并反馈开发。一直致力于设计出稳定健壮快速响应的网站应用。`
      },
      skills: [
        "1.熟练掌握HTML5、CSS3、javascript、ES6、jquery",
        "2.熟练使用Vue.js框架，了解一定vue底层实现原理，学习vue3.0规范，熟悉vue生态，能熟练使用vue-router、vuex、vantUI进行快速开发",
        "3.理解前端工程化，熟练使用webpack进行模块化项目开发",
        "4.理解前后端分离，熟悉ajax请求，熟练使用axios",
        "5.熟悉http，https协议",
        "6.了解nodejs、mongodb数据库、tomcat服务器",
        "7.熟练使用git管理代码、进行多人协作",
        "8.熟练使用PS、AI、AE进行图片处理、动图制作",
        "9.熟悉restful接口规范",
        "10.了解webgl、threeJS",
        "11.对跨域请求和移动端兼容性有一定经验"
      ],
      eduExp: {},
      projects: [
        {
          name: "项目一 沸点舆情：",
          href: "",
          time: "项目时间：2020.4.1 - 2020.5.18",
          info:
            "沸点舆情是一款针对企业用户开发的舆情监控webapp，用户根据自己关注的热点领域创建监控方案，系统实时监控全网相关文章并将阅读数高的文章列入警告列表同时提醒用户。",
          duty: [
            "1.主要使用vue框架搭配vue-router，axios。",
            "2.使用vant+rem布局组件实现项目UI快速开发适配移动端。",
            "3.使用echarts图表插件实现数据可视化。",
            "4.全面负责前端技术选型、架构设计、组件开发。"
          ]
        },
        {
          name: "项目二 阿尔法社",
          href: "http://wx.digitwonder.com",
          time: "项目时间：2019.8.1 - 2020.3.1",
          info:
            "阿尔法社是一款面向投资理财用户的个人只能化财经信息处理工具，通过智能推荐提供给用户最感兴趣的财经文章。",
          duty: [
            "1.构建情报站功能模块，个人中心模块，开发文章列表组件。",
            "2.设计基于vuex的页面数据缓存机制，解决了H5重复调用路由无法保存之前页面数据的问题。",
            "3.学习微信授权api文档，实现项目的微信授权登录（移动端静默授权和PC端扫码登录）。"
          ]
        },
        {
          name: "项目三 数字奇迹官网",
          href: "https://www.digitwonder.com",
          time: "项目时间：2019.7.15 - 2019.8.1",
          info:
            "构建数字奇迹公司官网页面，使用原生js实现页面滑动轮播，使用css3媒体查询+flex布局实现页面自适应，同时适配PC和移动端。",
          duty: [
            "负责布局官网页面，高度还原UI设计，实现页面滑动轮播效果，使用flex实现页面弹性布局，使用css3媒体查询实现布局自适应。"
          ]
        },
        {
          name: "项目四 数字奇迹在线招聘系统",
          href: "http://interview.digitwonder.com",
          time: "项目时间：2020.3.11 - 2020.3.31 ",
          info:
            "本项目为疫情期间公司在线面试登记系统，应聘者微信登录系统之后依次选择岗位、填写基本信息表、填写专业笔试题完成提交，系统提供HR查看面试者信息页面的管理页面。",
          duty: [
            "1.使用vue框架搭建应用",
            "2.使用H5 localstorage本地存储实现面试者信息自动回填功能。"
          ]
        }
      ],
      workExps: [
        {
          time: "2019-7 至今 ",
          company: "北京数字奇迹科技有限公司 ",
          position: "web前端工程师",
          work: [
            "1. 负责数字奇迹公司官网的构建",
            "2. 负责公司主打产品“头号财讯”的开发构建",
            "3. 负责公司H5app开屏动画设计制作（使用PS、AI、AE）",
            "4. 负责公司2020年春季在线面试系统的前端搭建",
            "5. 负责公司ToB项目沸点舆情前端开发"
          ],
          results: [
            "2019-7-15 入职数字奇迹前端组，负责开发数字奇迹公司官网http://www.digitwonder.com/，实现同一套HTML结构同时适配PC端和移动端，通过css3媒体查询实现根据不同的浏览器窗口尺寸来实现自适应布局。",
            "2019-8-1 开发公司主打产品“头号财讯”的H5页面，主要负责开发主题部分页面和通用列表组件，使用ECharts开发可视化数据云图，学习微信分享api。实现移动端微信授权登录，pc端微信扫码登录。手动实现缓存管理，解决H5页面递归路由无法缓存问题，解决思路:将每一级路由页面的数据在路由深度增加时存入vuex，在路由深度减少时读取vuex中的对应的缓存数据并清除该条缓存，解决了重复调用组件不能缓存数据的问题。",
            "2020-3-11 负责独立设计并开发数字奇迹在线面试系统及后台管理系统。历时一周完成面试者微信登录、登记答题系统、HR查看结果系统，上线部署运行流畅。",
            "2020-3-19 负责独立开发公司新的数据可视化项目，调研主流前端数据可视化插件echarts和D3，设计数据可视化项目前端架构、与中台协同制定图表数据格式、前端技术选型，最终确定Vue+Vant+echarts前端架构。通过享元模式优化页面数据流列表dom结构，增加页面性能防止dom加载过多导致页面卡死。使用Echars+D3实现数据可视化图表和关键词云图。"
          ]
        },
        {
          time: "2019-3 至2019-6 ",
          company: "东方金信科技有限公司",
          position: "web前端工程师",
          work: [
            "1.负责东方金信公司数据资产管理平台首页的构建。",
            "2.使用原生JavaScript开发万年历组件。"
          ],
          results: [
            "2019-3 至 2019-4 入职东方金信数据研究院前端组，学习版本控制工具github的使用，学习ES6标准，开发了原生js万年历组件，实现了年份、月份前后切换，以及日期的事件备注功能。",
            "2019-4 至 2019-5 学习vue框架并使用vue开发了数据资产管理平台门户页，在开发门户页的过程中学习并应用了tween.js补间动画库、swiper轮播图插件，使用parcel打包工具实现了门户页的模块化开发。在第一版vue项目开发完成后使用nuxt脚手架将项目重构。"
          ]
        }
      ],
      icons: {
        html: require("@/assets/images/html.png"),
        css: require("@/assets/images/css.png"),
        js: require("@/assets/images/js.png"),
        ts: require("@/assets/images/ts.jpg"),
        vue: require("@/assets/images/vue.png"),
        react: require("@/assets/images/react.png"),
        node: require("@/assets/images/node.png"),
        git: require("@/assets/images/git.png"),
        mongodb: require("@/assets/images/mongodb.png")
      }
    };
  }
};
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .itemTitle {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .itemTitle a {
    overflow: hidden;
    margin-top: 0.6rem;
  }
  .workExp {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
}

@media screen and (min-width: 501px) {
  .itemTitle {
    display: flex;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .itemTitle a {
    overflow: hidden;
    margin-top: 0.6rem;
  }
  .workExp {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .workExp div {
    flex: 1;
  }
  .workExp div:last-child {
    text-align: right;
  }
}

.resume-page {
  width: 100%;
}
.avatar {
  margin: 0 auto;
  margin-top: 3em;
  width: 10rem;
  height: 10rem;
  background: #444;
  overflow: hidden;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.avatar img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;
  background: #edeff1;
  z-index: 2;
}
.autograph {
  font-size: 1.2rem;
  text-align: center;
  font-weight: 600;
  color: midnightblue;
  margin-top: 2rem;
}
.content {
  width: 100%;
  height: 100%;
  max-width: 60rem;
  margin: 0 auto;
  margin-bottom: 3rem;
  background: linear-gradient(#e4e0ba, #f7d9aa);
  padding: 1.6rem;
  border-radius: 0.4rem;
}
.title {
  font-size: 1.4rem;
  font-weight: 900;
}
.content .bascInfo {
  width: 100%;
  margin-bottom: 2rem;
}
.content .bascInfo .bascInfo-wrapper {
  width: 100%;
  margin: 0;
  background: #fff;
  position: relative;
  border-radius: 1em;
}
.content .bascInfo .infoItem {
  box-sizing: border-box;
  padding: 0.4rem 1em;
  font-size: 1.2rem;
  font-weight: 600;
}
.Info-wrapper {
  padding: 1.6rem;
  width: 100%;
  margin: 0;
  background: #fff;
  position: relative;
  border-radius: 1em;
  font-size: 1.2rem;
  text-indent: 2em;
  line-height: 2rem;
}
.items-wrapper {
  padding: 1.6rem;
  width: 100%;
  margin: 0;
  background: #fff;
  position: relative;
  border-radius: 1em;
  font-size: 1.2rem;
  line-height: 2rem;
}
.skillIcons {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.skillIcons img {
  width: 4rem;
  height: 4rem;
  margin: 0 0.6rem;
  margin-bottom: 0.6rem;
}
.skillsText {
  margin-top: 1.6rem;
  font-size: 1.2rem;
  line-height: 1.8rem;
}

.itemTime {
  line-height: 2rem;
}
.item-wrapper {
  padding: 0.4rem;
  margin-bottom: 2rem;
  background: #edeff1;
  border-radius: 0.4rem;
}
.itemDuty {
  font-weight: 600;
}
.copyRight {
  text-align: center;
  font-weight: 900;
  color: rgb(6, 19, 63);
  margin-bottom: 12px;
}
.subTitle {
  margin-top: 0.6rem;
}
.resume_video {
  height: 16rem;
  z-index: 1;
  position: absolute;
}

@keyframes roll {
  0% {
    transform: rotateY(0);
    opacity: 1;
  }
  100% {
    transform: rotateY(180deg);
    opacity: 0;
  }
}
@keyframes rollReverse {
  0% {
    transform: rotateY(180deg);
    opacity: 0;
  }
  100% {
    transform: rotateY(0);
    opacity: 1;
  }
}

.roll {
  animation: roll 1s forwards;
}
.rollReverse {
  animation: rollReverse 1s forwards;
}

@keyframes kf1 {
  0% {
    width: 10em;
    height: 10rem;
    border-radius: 100px;
  }
  100% {
    width: 100%;
    max-width: 60em;
    height: 16rem;
    border-radius: 6px;
  }
}
@keyframes kf2 {
  0% {
    width: 100%;
    max-width: 60em;
    height: 16rem;
    border-radius: 6px;
  }
  100% {
    width: 10em;
    height: 10rem;
    border-radius: 100px;
  }
}
.open {
  animation: kf1 1s forwards;
}
.noopen {
  animation: kf2 1s forwards;
}
</style>
