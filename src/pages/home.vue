<template>
  <div id="world">
    <div class="homePage-nav">
      <span @click="goNewPage('/blogTable')">blog</span>
      <span @click="goNewPage('/resume')">resume</span>
    </div>
    <div class="homePage-title">
      <img src="@/assets/images/title.png" alt />
    </div>
    <homeKey class="displayHomeKey"></homeKey>
    <div class="homePage-footer">
      <p>COPYRIGHT 2020 王天柱. ALL RIGHTS RESERVED.</p>
      <p>京ICP备19003625号</p>
    </div>
  </div>
</template>

<script>
import homeKey from "@/components/homeKey.vue";
import threeModle from "../../static/js/homePage.js";

export default {
  name: "homePage",
  data() {
    return {
      list: [], //聊天记录的数组
      contentText: "" //input输入的值
    };
  },
  components: {
    homeKey
  },
  mounted() {
    $("#world").hide();
    $("#world").fadeIn(2000);
    this.backText(this.sendText)
  },
  activated() {
    console.log("加载3D场景");
  },
  methods: {
    goNewPage(path) {
      let routeUrl = this.$router.resolve({
        path
      });
      window.open(routeUrl.href, "_blank");
    },
    sendText() {
      let that = this;
      this.list = [...this.list, { type: "mine", content: this.contentText }]; //通过type字段进行区分是自己（mine）发的还是系统（robot）返回的
      this.backText(function() {
        that.contentText = ""; //加回调在得到返回数据的时候清除输入框的内容
      });
    },
    backText(callback) {
      let that = this;
      if (window.WebSocket) {
        let ws = new WebSocket("ws://localhost:8087");
        ws.onopen = function(e) {
          console.log("链接服务器成功");
          console.log("that.contentText is", that.contentText);
          ws.send(that.contentText);
          callback();
        };
        ws.onclose = function(e) {
          console.log("服务器关闭");
        };
        ws.onerror = function() {
          console.log("服务器出错");
        };
        ws.onmessage = function(e) {
          that.list = [...that.list, { type: "robot", content: e.data }];
        };
      }
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
.homePage-footer p {
  text-align: center;
}
</style>