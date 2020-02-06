<template>
  <div style="overflow: hidden">
    <div
      id="homeKey"
      @touchmove.prevent
      style="position: absolute; bottom: 7.5rem; left: 50%; margin-top: -25px; margin-left: -25px; width: 50px; height: 50px; border-radius: 36%;background: #f40; z-index: 100; display: inline-block; opacity: 0.6"
      ref="homeKey"
    ></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.TouchMove();
    this.left = document.getElementById("homeKey").offsetLeft;
    this.top = document.getElementById("homeKey").offsetTop;
    console.log(this.left, "left");
    console.log(this.top, "top");
  },
  methods: {
    touchStart(e) {
      this.moveStartX = e.targetTouches[0].clientX;
      this.moveStartY = e.targetTouches[0].clientY;
      // alert('start')
    },
    touchMove(e) {
      this.moveEndX = e.targetTouches[0].clientX;
      this.moveEndY = e.targetTouches[0].clientY;
      this.updataX = this.moveStartX - this.moveEndX - 25;
      this.updataY = this.moveStartY - this.moveEndY - 25;
      console.log(this.updataX, this.updataY);
      $("#homeKey").css("left", this.left - this.updataX);
      $("#homeKey").css("top", this.top - this.updataY);
      // alert('run')
    },
    touchtouchend(e) {
      this.left = document.getElementById("homeKey").offsetLeft;
      this.top = document.getElementById("homeKey").offsetTop;
    },
    TouchMove() {
      let that = this;
      this.$refs.homeKey.addEventListener("touchmove", this.touchMove, false);
      this.$refs.homeKey.addEventListener("touchstart", this.touchStart, false);
      this.$refs.homeKey.addEventListener(
        "touchend",
        this.touchtouchend,
        false
      );
    },
    throttle(func, wait) {
      let previous = 0;
      return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
        }
      };
    }
  },
  data() {
    return {
      left: "",
      top: "",
      updataX: "",
      updataY: ""
    };
  }
};
</script>

<style>
</style>