<template>
  <div class="items-wrapper">
    <div></div>
    <div @click="goPage(item.url)" class="items" v-for="(item, index) in items" :key="index">
      <img :src="item.img" alt="">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {
      items: [
        {
          name: '老虎机游戏',
          img: require('@/assets/images/items/slotIcon.png'),
          summary: '',
          url: 'http://www.wangtz.cn/slot_machine/slot_machine3.0',
        },
        {
          name: '曼德勃罗集合数乘图',
          img: require('@/assets/images/items/mand.png'),
          summary: '',
          url: 'http://www.wangtz.cn/mandelbrot',
        },
        {
          name: '计算器',
          img: require('@/assets/images/items/calc.png'),
          summary: '',
          url: 'http://www.wangtz.cn/calculator',
        },
        {
          name: '在线markdown编辑器',
          img: require('@/assets/images/items/md.png'),
          summary: '',
          url: 'http://markdown.wangtz.cn/',
        },
        {
          name: '万年历',
          img: require('@/assets/images/items/cand.png'),
          summary: '',
          url: 'http://www.wangtz.cn/calender_components/',
        },
        {
          name: '围棋',
          img: require('@/assets/images/items/go.png'),
          summary: '',
          url: 'http://www.wangtz.cn/Go',
        },
        // {
        //   name: '',
        //   img: '',
        //   summary: '',
        //   url: '',
        // },
      ]
    }
  },
  methods: {
    goPage(url) {
      window.location.href = url
    }
  },
};
</script>

<style scoped>
.items-wrapper {
  padding: 1.6rem;
  width: 100%;
  height: 100%;
}
.items {
  margin-bottom: 2rem;
}
.items img {
  width: 6rem;
  height: 6rem;
}
</style>