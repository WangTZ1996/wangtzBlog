<template>
  <div class="blogIndex" style="width: 100%; height: 100%; overflow-y: auto">
    <header>
      {{ socketMsg }}
      <a href="http://markdown.wangtz.cn">
        <img src="@/assets/images/edit.png" alt />
      </a>
    </header>
    <div class="blogBox">
      <div class="icon-warpper">
        <div class="icon-Line">
          <img :class="{small: small, big: big}" @click="screen('html')" :src="icons.html" alt />
          <img :class="{small: small, big: big}" @click="screen('css')" :src="icons.css" alt />
          <img :class="{small: small, big: big}" @click="screen('js')" :src="icons.js" alt />
          <img :class="{small: small, big: big}" @click="screen('vue')" :src="icons.vue" alt />
          <img :class="{small: small, big: big}" @click="screen('node')" :src="icons.node" alt />
          <img :class="{small: small, big: big}" @click="screen('git')" :src="icons.git" alt />
          <img
            :class="{small: small, big: big}"
            @click="screen('mongodb')"
            :src="icons.mongodb"
            alt
          />
        </div>
        <div class="tips-m">
          <p>点击图标查看分类下的文章</p>
          <p @click="screen('all')" v-show="isScreen" class="viewAll">查看全部</p>
        </div>
      </div>
      <div class="tips">
        <p>点击图标查看分类下的文章</p>
        <p @click="screen('all')" v-show="isScreen" class="viewAll">查看全部</p>
      </div>
      <div class="essaysList">
        <div v-for="item in markdowns" :key="item.id" class="markdownlist">
          <div
            class="top-line"
            :class="{html: item.classify === 'html', js: item.classify === 'js', css: item.classify === 'css', vue: item.classify === 'vue', node: item.classify === 'node', git: item.classify === 'git', mongodb: item.classify === 'mongodb'} "
          ></div>
          <div class="essayCard">
            <div class="essayIcon">
              <img :src="iconMap(item.classify)" alt />
            </div>
            <div class="essayInfo">
              <div
                class="active essayCardTitle"
                @click="$router.push('/eassy?id=' + item.id)"
              >{{ item.title }}</div>
              <div class="essayInfoBar">
                <span>{{ item.dateInfo[0] + '-' + item.dateInfo[1] + '-' + item.dateInfo[2] }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="blank" class="blankImg">
          <img src="@/assets/images/blank.png" alt />
          <p>没有文章哦</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    let url = "http://www.wangtz.cn:8087/blogTable";
    if (this.$route.query.classify !== undefined) {
      url = url + "?classify=" + this.$route.query.classify;
      this.isScreen = true;
    }
    axios.get(url).then(res => {
      console.log(res);
      this.markdowns = res.data;
      console.log(this.markdowns, "markdown");
      let that = this;
      if (res.data.length === 0) {
        that.timer3 = setTimeout(() => {
          that.blank = true;
        }, 300);
      } else {
        that.blank = false;
      }
    });
  },
  mounted() {
    let warpper = document.getElementsByClassName("blogBox")[0];
    warpper.addEventListener("scroll", this.throttle(this.listenTop));
    let Socket = new WebSocket("ws://www.wangtz.cn:8086");
    this.timer1 = setTimeout(() => {
      Socket.send("前端发送给后台的信息");
    }, 3000);
    let that = this;
    Socket.onmessage = function(evt) {
      that.socketMsg = evt.data;
      console.log(evt.data, "接收信息");
    };
    console.log(Socket, "Socket");
    this.timer2 = setTimeout(() => {
      console.log($(".icon-Line").height(), "iconline");
      this.iconScroll = $(".icon-Line").outerHeight();
      console.log(this.iconScroll, "this.iconScroll");
      $(".tips").css({ "margin-top": this.iconScroll });
    }, 300);
  },
  destroyed() {
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
    clearTimeout(this.timer3);
  },
  data() {
    return {
      big: false,
      small: false,
      blank: false,
      zoomflag: false,
      markdowns: [],
      scrollFlag: false,
      isScreen: false,
      socketMsg: "欢迎来到王天柱的blog",
      iconScroll: "",
      icons: {
        html: require("@/assets/images/html.png"),
        css: require("@/assets/images/css.png"),
        js: require("@/assets/images/js.png"),
        vue: require("@/assets/images/vue.png"),
        node: require("@/assets/images/node.png"),
        git: require("@/assets/images/git.png"),
        mongodb: require("@/assets/images/mongodb.png")
      },
      timer1: null,
      timer2: null,
      timer3: null
    };
  },
  methods: {
    listenTop() {
      if ($(".blogBox").scrollTop() > 10) {
        this.small = true;
        this.big = false;
        this.zoomflag = true;
      } else if (this.zoomflag && $(".blogBox").scrollTop() < 150) {
        this.small = false;
        this.big = true;
      }
      console.log($(".blogBox").scrollTop());
    },
    screen(classify) {
      let url;
      console.log(classify);
      if (classify !== "all") {
        url = "http://www.wangtz.cn:8087/blogTable?classify=" + classify;
        // this.$router.replace("/blogTable?classify=" + classify);
        this.isScreen = true;
      } else if (classify === "all") {
        url = "http://www.wangtz.cn:8087/blogTable";
        // this.$router.replace("/blogTable");
        this.isScreen = false;
      }
      axios.get(url).then(res => {
        console.log(res, "res");
        this.markdowns = res.data;
        let that = this;
        if (res.data.length === 0) {
          that.timer3 = setTimeout(() => {
            that.blank = true;
          }, 300);
        } else {
          that.blank = false;
        }
      });
    },
    /* 节流方法 */
    throttle(method) {
      console.log("执行节流");
      var timer = null;
      var begin = new Date();
      return function() {
        var context = this,
          args = arguments;
        var current = new Date();
        clearTimeout(timer);
        if (current - begin >= 100) {
          method.apply(context, args);
          begin = current;
        } else {
          timer = setTimeout(function() {
            method.apply(context, args);
          }, 100);
        }
      };
    },
    iconMap(type) {
      return this.icons[type];
    }
  }
};
</script>

<style lang="css" scoped>
header {
  text-align: center;
  font-weight: 900;
  font-size: 1.4rem;
  line-height: 4rem;
  background: linear-gradient(#e4e0ba, #f7d9aa);
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.6rem;
}
header img {
  width: 2rem;
  height: 2rem;
}
header a {
  margin-left: auto;
  display: flex;
  justify-content: center;
}

.hacking {
  width: 100%;
  padding: 1.6rem;
}
.hacking > img {
  width: calc(100% - 3.2rem);
}
.tips p {
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.essayCard {
  padding: 0.8rem 1rem;
  display: flex;
}
.essayIcon {
  width: 4rem;
}
.essayIcon img {
  width: 4rem;
  height: 4rem;
}

.essayCardTitle {
  font-weight: 600;
  letter-spacing: 0;
  margin-left: 1rem;
  cursor: pointer;
}
.essayInfo {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.essayInfoBar {
  /*border-top: 0.1rem solid #edeff1;*/
  width: 100%;
  height: 1.2rem;
  /*background: #ccc;*/
  margin-top: auto;
  font-size: 1rem;
  line-height: 1.6rem;
  color: #999;
  font-weight: 600;
  display: flex;
  justify-content: flex-end;
}
.tips .viewAll {
  font-size: 1rem;
  color: #f40;
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 0.4rem;
}
.tips-m .viewAll {
  font-size: 1.2rem;
  color: #f40;
  margin-bottom: 1rem;
  margin-top: 0.4rem;
  cursor: pointer;
}

/* 移动端 */
@media screen and (max-aspect-ratio: 4/3) {
  .blogBox {
    display: flex;
    flex-direction: column;
    height: calc(100% - 4rem);
    overflow-y: auto;
    margin-top: 4rem;
  }
  .essaysList {
    flex: 1;
    margin: 0 auto;
    margin-top: 1.6rem;
    height: 100%;
    width: 100%;
  }
  .top-line {
    width: 100%;
  }
  .icon-warpper {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
  }
  .icon-Line {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-bottom: 1rem;
    padding-top: 1.6rem;
    position: absolute;
    background: #fff;
  }
  .icon-Line img {
    height: 4rem;
    margin: 0.3rem 1rem;
    cursor: pointer;
  }
  .markdownlist {
    width: 100%;
    font-size: 1.4rem;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  .blogBox::-webkit-scrollbar {
    display: none;
  }
  .tips-m {
    display: none;
  }
  .blankImg {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .blankImg img {
    margin: 0 auto;
    width: 50%;
  }
  .blankImg p {
    text-align: center;
    margin-top: 1rem;
  }
}

/* PC端 */
@media screen and (min-aspect-ratio: 4/3) {
  .active:hover {
    color: #f40;
  }
  .blogBox {
    display: flex;
    flex-direction: row;
    max-width: 80rem;
    margin: 0 auto;
    margin-top: 4rem;
  }
  .top-line {
    width: 100%;
  }
  .icon-warpper {
    width: 6rem;
    display: flex;
    flex-direction: column;
    margin-top: 1.4rem;
    position: fixed;
    height: 100%;
    overflow-y: auto;
  }
  .icon-warpper::-webkit-scrollbar {
    display: none;
  }
  .icon-Line {
    width: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .icon-Line img {
    height: 5rem;
    margin: 1rem 0;
    cursor: pointer;
  }
  .markdownlist {
    width: 100%;
    font-size: 1.6rem;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 0 1.6rem;
  }
  .essaysList {
    flex: 1;
    height: 100%;
    margin-left: 8rem;
    margin: 0 auto;
    margin-top: 1.6rem;
    max-width: 50rem;
  }
  .blogBox::-webkit-scrollbar {
    display: none;
  }
  .tips {
    display: none;
  }
  .blankImg {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30%;
  }
  .blankImg img {
    margin: 0 auto;
    width: 50%;
  }
  .blankImg p {
    text-align: center;
    margin-top: 1rem;
  }
}

/* 文章分类颜色 */
.html {
  background: linear-gradient(
    left,
    rgba(219, 55, 36, 1),
    rgba(219, 55, 36, 0.3)
  );
}

.css {
  background: linear-gradient(
    left,
    rgba(19, 88, 221, 1),
    rgba(19, 88, 221, 0.3)
  );
}

.js {
  background: linear-gradient(
    left,
    rgba(240, 220, 78, 1),
    rgba(240, 220, 78, 0.3)
  );
}

.vue {
  background: linear-gradient(
    left,
    rgba(73, 183, 130, 1),
    rgba(73, 183, 130, 0.3)
  );
}

.node {
  background: linear-gradient(
    left,
    rgba(130, 189, 58, 1),
    rgba(130, 189, 58, 0.3)
  );
}

.git {
  background: linear-gradient(
    left,
    rgba(232, 79, 53, 1),
    rgba(232, 79, 53, 0.3)
  );
}

.mongodb {
  background: linear-gradient(
    left,
    rgba(121, 171, 77, 1),
    rgba(121, 171, 77, 0.3)
  );
}

.small {
  animation: toSmall 0.1s forwards;
  animation-timing-function: ease-out;
}
.big {
  animation: toBig 0.1s forwards;
  animation-timing-function: ease-out;
}

@keyframes toSmall {
  0% {
    height: 4rem;
    margin: 0.3rem 1rem;
    cursor: pointer;
  }
  100% {
    height: 10vw;
    margin: 0;
    cursor: pointer;
  }
}
@keyframes toBig {
  0% {
    height: 10vw;
    margin: 0;
    cursor: pointer;
  }
  100% {
    height: 4rem;
    margin: 0.3rem 1rem;
    cursor: pointer;
  }
}
</style>