<template>
<div>
  <div class="player">
    <video preload="auto" style="background: #222" controls width="80%">
      <source src="/wzz/wzz_fast.mp4" type="video/mp4" />
    </video>
  </div>
  <p class="tips">播放的视频是压缩过的，由于我的服务器带宽太小，原视频播放很卡顿所以预览的视频就用的压缩版本的，点击下面的下载连接下载更清晰的原版视频</p>
  <p class="downbtn">
    <a href="/wzz/wzz.mp4" download="wzz.mp4">点击下载旺仔仔周岁生日原视频（原视频mp4格式，大小526mb）</a>
  </p>
</div>
</template>

<script>
export default {};
</script>

<style>
.downbtn {
  text-align: center;
  font-size: 1.6rem;
}

.tips {
  text-align: center;
  font-size: 1.4rem;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 2rem;
}

@media screen and (max-width: 480px) {
  .player {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
  }
}

@media screen and (min-width: 481px) {
  .player {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 10rem;
  }
}
</style>
