<template>
    <div>
        <div>indexPage</div>
        <div v-for="item in markdowns" :key="item.id" class="markdownlist">
            <div class="active" @click="$router.push('/eassy?id=' + item.id)">{{ item.title }}</div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import simditor from "simditor"

export default {
    created() {
        axios.get('http://www.wangtz.cn:8087/blogTable').then(res => {
            console.log(res)
            this.markdowns = res.data
        })
    },
    data() {
        return {
            markdowns: [],
        }
    }
}
</script>

<style lang="css" scoped>
    .markdownlist {
        width: 20rem;
        padding: 0.6rem;
        font-size: 1.6rem;
        margin: 0 auto;
        text-align: center;
    }
    .active:hover {
        color: #f40;
    }
</style>