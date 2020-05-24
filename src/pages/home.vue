<template>
  <div id="world">
    <div class="homePage-nav"></div>
    <div class="homePage-title">
      <img src="@/assets/images/title.png" alt />
    </div>
    <!--<homeKey class="displayHomeKey"></homeKey>-->
    <div class="homePage-footer">
      <div class="dock">
        <div class="dock_pad"></div>
      </div>
      <div class="btnBox">
        <div class="btnOuter" title="技术博客">
          <span class="title">技术博客</span>
          <div @click="goNewPage('/blogTable')" class="btn coral">Blog</div>
        </div>
        <div class="btnOuter">
          <span class="title">个人简历</span>
          <div @click="goNewPage('/resume')" class="btn blue">Me</div>
        </div>
        <div class="btnOuter">
          <span class="title">项目经验</span>
          <div @click="goNewPage('/item')" class="btn green">Item</div>
        </div>
        <div class="btnOuter">
          <span class="title">画廊</span>
          <div class="btn yellow">Gallery</div>
        </div>
      </div>
      <p>2020 王天柱 京ICP备19003625号</p>
    </div>
    <van-toast id="van-toast"></van-toast>
  </div>
</template>

<script>
// import homeKey from "@/components/homeKey.vue";
import threeModle from "../../static/js/homePage.js";
import { Toast } from 'vant';


export default {
  name: "homePage",
  data() {
    return {
      list: [], //聊天记录的数组
      contentText: "" //input输入的值
    };
  },
  components: {
    [Toast.name]: Toast
  },
  mounted() {
    $("#world").hide();
    $("#world").fadeIn(2000);

  },
  activated() {
    console.log("加载3D场景");
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (window.location.hostname === "blog.wangtz.cn") {
        vm.$router.push("/blogTable");
      }
    });
  },
  methods: {
    goNewPage(path) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        positon: "top",
      });
      // let routeUrl = this.$router.resolve({
      //   path
      // });
      // window.open(routeUrl.href, "_blank");
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
#world {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(#e4e0ba, #f7d9aa);
}
#van-toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.homePage-nav {
  position: absolute;
  padding: 2rem 5rem;
  display: flex;
}
.homePage-nav > span {
  font-size: 1.6rem;
  line-height: 2rem;
  margin-right: 2rem;
}
.dock {
  width: 28rem;
  height: 6rem;
  /* border: 0.1rem solid #000; */
  border-radius: 0.6rem;
  overflow: hidden;
  position: absolute;
  top: -2.4rem;
  left: 50%;
  transform: translate(-50%, 0);
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.dock_pad {
  width: 120%;
  height: 120%;
  transform: translate(-10%, -10%);
  background: rgba(255, 255, 255, 0.6);
  filter: blur(10px);
}
.homePage-footer p {
  text-align: center;
  font-weight: 900;
  font-size: 1.4rem;
}
.plateIcon {
  width: 6rem;
  height: 6rem;
  position: absolute;
  top: -2.4rem;
}
.btnBox {
  width: 90%;
  margin: 0 auto;
  height: 4rem;
  transform: translateY(-3.5rem);
  display: flex;
  justify-content: space-around;
}
.btnOuter {
  width: 7rem;
  height: 10rem;
  /* background: cornflowerblue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-2.5rem);
}
.btn {
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 1rem;
  /* background: coral; */
  display: flex;
  justify-content: center;
  text-align: center;
  word-break: break-word;
  align-items: center;
  font-size: 1.6rem;
  line-height: 1.6rem;
  font-weight: 900;
  flex-wrap: wrap;
  cursor: pointer;
}
.btnOuter > span {
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 0.4rem;
  opacity: 0;
  color: #fff;
  background: #666;
  border-radius: 0.4rem;
}
.btnOuter:hover {
  animation: jump 1s;
  animation-fill-mode: forwards;
}
.btnOuter:hover > span {
  opacity: 1;
  animation: disappear 3.5s;
  animation-fill-mode: forwards;
}
.title {
  margin-bottom: 1rem;
}
@keyframes jump {
  60% {
    transform: translateY(-5rem);
  }
  100% {
    transform: translateY(-2.5rem);
  }
}
@keyframes big {
  100% {
    transform: scale(1.5, 1.5);
  }
}
@keyframes disappear {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.coral {
  background: coral;
}
.blue {
  background: cornflowerblue;
}
.green {
  background: lightgreen;
}
.yellow {
  background: mediumorchid;
}
</style>