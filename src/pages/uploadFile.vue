<template>
  <div style="padding: 1.6rem">
    <div class="blog-header">
      <label for="year">年</label>
      <input name="year" type="text" v-model="dateInfo[0]">
      <label for="month">月</label>
      <input name="month" type="text" v-model="dateInfo[1]">
      <label for="date">日</label>
      <input type="text" v-model="dateInfo[2]">
      <label for="title">标题</label>
      <input type="text" v-model="title">
      <label name="classify" for="classify">分类</label>
      <input type="text" v-model="classify">
      <label name="summary" for="summary">简介</label>
      <input type="text" v-model="summary">
    </div>
    <input class="fileInput" type="file" @change="readFile($event)" />
    <div class="markdownPad markdown-body" v-html="fileObj" v-highlight></div>
    <div @click="save" style="width: 5rem; height: 3rem; background: #ddd; border-radius: 0.8rem; margin: 0 auto">保存</div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/rainbow.css";
import Vue from "vue";
import axios from "axios";

Vue.directive("highlight", function(el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});

export default {
  data() {
    return {
      input: "",
      dateInfo: [2020, 4, 1],
      title: '',
      fileObj: 'file',
      markdownInput: '',
      classify: 'html',
      summary: '',
    };
  },
  computed: {
    day() {
      return this.dateInfo[2] < 10 ? "0" + this.dateInfo[2] : this.dateInfo[2];
    },
    mdInput: {
      get() {
        return marked(this.markdownInput)
      },
    }
  },
  methods: {
    readFile(ev) {
      console.log(ev);
      const files = $(".fileInput").prop("files");
      const title = document.getElementsByTagName("h1")
      setTimeout(() => {
        this.title = title[0].innerText
      },500)
      var reader = new FileReader(); //新建一个FileReader
      reader.readAsText(files[0], "UTF-8"); //读取文件
      let that = this
      reader.onload = function(evt) {
        //读取完文件之后会回来这里
        var fileString = evt.target.result; // 读取文件内容
        that.fileObj = marked(fileString)
      };
    },
    save() {
      axios.post('http://www.wangtz.cn:8087/eassy',{
      'author': 'wangtianzhu',
      'date': new Date().getTime(),
      'dateInfo': this.dateInfo,
      'title': this.title,
      'classify': this.classify,
      'summary': this.summary,
      'markdownDaily': JSON.stringify(this.fileObj)
    }).then(res => {
      console.log(res)
      alert('上传成功')
      axios.get("http://www.wangtz.cn:8087/eassy?id=" + res.data.id).then(res => {
      console.log(res, '页面初始get请求');
      this.input = JSON.parse(res.data[0].markdownDaily)
    });
    }).catch(err => {
      console.log(err)
    })
    }
  }
}
</script>

<style >
  .blog-header {
    display: flex;
    flex-direction: column;
  }
  .blog-header input {
    border: 0.1rem solid #333;
  }
  .fileInput {

  }
</style>