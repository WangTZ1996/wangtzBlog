<template>
  <div class="resume-page">
    <div class="resume-body">
      <div id="output" class="resume-title"></div>
      <div class="resume-workName">Network Engineer</div>
      <div class="resume-wantedPhoto">
        <img src="@/assets/images/resume/resume8.jpg" alt />
      </div>
      <div class="resume-status">Only Alive</div>
      <div class="resume-name">WangTianZhu</div>
      <div class="resume-value">
        <div>
          <span>￥</span>
          <span>15000/Month</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Typing from "typing.js";

export default {
  name: "resume",
  mounted() {
      this.typing()
  },
  methods: {
    typing() {
      if (this.len <= this.str.length) {
        document.getElementById('output').innerHTML = this.str.slice(0, this.len++) + '_';
        this.timer = setTimeout(this.typing, 300);
      } else {
        document.getElementById('output').innerHTML = this.str; //结束打字,移除 _ 光标
        clearTimeout(this.timer);
      }
    }
  },
  data() {
    return {
      str: 'WANTED',
      len: 0,
      timer: 0,
    };
  }
};
</script>

<style scoped>
.resume-body {
  width: 60rem;
  padding-bottom: 6rem;
  margin: 1rem auto;
  position: relative;
  /* left: 50%;
  transform: translateX(-50%); */
  border: 1px solid #000;
}
.resume-title {
  padding: 2rem;
  text-align: center;
  font-size: 8rem;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-weight: 900;
  color: #000;
  padding-bottom: 0;
  letter-spacing: 1rem;
}
.resume-workName {
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-weight: 900;
  color: #000;
  padding-top: 0;
}
.resume-wantedPhoto {
  width: 32rem;
  height: 32rem;
  margin: 0 auto;
  border: #000 0.2rem solid;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.resume-wantedPhoto > img {
  width: 32rem;
  height: 32rem;
  object-fit: cover;
}
.resume-status {
  font-size: 3rem;
  letter-spacing: 1rem;
  padding: 1rem;
  text-align: center;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: #000;
  padding-bottom: 0;
}
.resume-name {
  font-size: 6rem;
  padding: 1rem;
  text-align: center;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: #000;
  padding-top: 0;
}
.resume-value {
  display: flex;
}
.resume-value > div {
  margin: 0 auto;
}
.resume-value > div > span {
  font-size: 6rem;
  text-align: center;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: #000;
}
</style>