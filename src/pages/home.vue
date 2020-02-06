<template>
  <div id="world">
    <div class="homePage-nav">
      <span @click="$router.push('/blog')">blog</span>
      <span @click="$router.push('/resume')">resume</span>
    </div>
    <div class="homePage-title">
      <img src="@/assets/images/title.png" alt="">
    </div>
    <!-- <video src="blob:https://www.apple.com/da3f2732-ee2d-497f-9265-f7f6cc8beb1e" height="300px" class="homePage-video"></video> -->
    <homeKey class="displayHomeKey"></homeKey>
    <div class="homePage-footer">
      <p>COPYRIGHT 2020 王天柱. ALL RIGHTS RESERVED.</p>
		  <p>京ICP备19003625号</p>
    </div>
  </div>
</template>

<script>
import homeKey from '@/components/homeKey.vue'

export default {
  name: 'homePage',
  components: {
    homeKey,
  },
  mounted() {
    $('#world').hide()
    $('#world').fadeIn(2000)
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
.homePage-video {
  position: absolute;
  background: #fff;
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
.homePage-footer > p {
  text-align: center;
}
</style>