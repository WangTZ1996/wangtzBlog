<template>
  <div>
    <div class="markdownPad markdown-body" v-html="input" v-highlight></div>
  </div>
</template>

<script>
import marked from "marked";
import README from "../../WeiXin_Login.md";
// import README from "../../20200108.md"
import hljs from "highlight.js";
import "highlight.js/styles/rainbow.css";
import Vue from "vue";
Vue.directive("highlight", function(el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});

export default {
  mounted() {
    console.log(JSON.parse(JSON.stringify(README)));
    console.log(JSON.stringify(README));
    axios({
      url: '/wangtz/',
      method: 'POST',
      data: {
        markdownDaily: JSON.stringify(README)
      }
    }).then(res => {
      console.log(res)
    })
  },
  data() {
    return {
      input: README
    };
  }
};
</script>

<style scoped>
@media screen and (min-width: 414px) {
  .markdownPad {
    max-width: 60rem;
    height: auto;
    padding: 1rem 2rem;
    padding-bottom: 12rem;
    font-size: 1.6rem;
    margin: 0 auto;
  }
}
@media screen and (max-width: 415px) {
  .markdownPad {
    height: auto;
    padding: 1rem 2rem;
    padding-bottom: 12rem;
    font-size: 1.4rem;
    margin: 0 auto;
  }
}
.markdownPad >>> img {
  width: 90%;
}
.markdownPad >>> blockquote {
  border-left: #eee solid 5px;
  padding-left: 15px;
  color: #8e8e8e;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.markdownPad >>> ul li {
  line-height: 25px;
}
.markdownPad >>> pre code {
  color: #ccc;
  background: #2d2d2d;
  font-family: "Microsoft YaHei" !important;
}
.markdownPad >>> p code {
  color: #d34b62;
  background: #2d2d2d;
  margin: 0 2px;
  font-family: "Microsoft YaHei" !important;
}

@keyframes squeezeBody {
  from {
    width: 100%;
  }
  to {
    width: calc(100% - 300px);
  }
}

@-webkit-keyframes squeezeBody {
  from {
    width: 100%;
  }
  to {
    width: calc(100% - 300px);
  }
}

@keyframes stretchBody {
  from {
    width: calc(100% - 300px);
  }
  to {
    width: 100%;
  }
}

@-webkit-keyframes stretchBody {
  from {
    width: calc(100% - 300px);
  }
  to {
    width: 100%;
  }
}

.markdownPad >>> .squeezed-body {
  animation: squeezeBody 0.5s ease;
  -webkit-animation: squeezeBody 0.5s ease;
  width: calc(100% - 300px);
}

.markdownPad >>> .full-body {
  animation: stretchBody 0.5s ease;
  -webkit-animation: stretchBody 0.5s ease;
  width: 100%;
}

.markdownPad >>> h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Monospace";
  font-weight: bold;
}

.markdownPad >>> h1 {
  border-bottom: 1px solid #ddd;
}

.markdownPad >>> .serif {
  font-family: "Monospace";
}

.markdownPad >>> .top-bar {
  height: 45px;
  min-height: 45px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.markdownPad >>> .bars-lnk {
  color: #fff;
}

.markdownPad >>> .bars-lnk i {
  display: inline-block;
  margin-left: 10px;
  margin-top: 7px;
}

.markdownPad >>> .bars-lnk img {
  display: inline-block;
  margin-left: 10px;
  margin-top: -15px;
  margin-right: 15px;
  height: 35px;
}

.markdownPad >>> .lateral-menu {
  background-color: #333;
  color: rgb(144, 144, 144);
  width: 300px;
  font-family: "Open Sans", "Myriad Pro", "Lucida Grande", "Lucida Sans Unicode",
    "Lucida Sans", Geneva, Verdana, sans-serif;
}

.markdownPad >>> .lateral-menu label {
  color: rgb(144, 144, 144);
}

.markdownPad >>> .lateral-menu-content {
  padding-left: 10px;
  height: 100%;
  font-size: 12px;
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  line-height: 16px;
}

.markdownPad >>> .lateral-menu-content .title {
  padding-top: 15px;
  font-size: 2em;
  height: 45px;
}

.markdownPad >>> .lateral-menu-content-inner {
  overflow-y: auto;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 50px;
  padding-right: 10px;
  font-size: 0.9em;
}

.markdownPad >>> .container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  height: 100%;
  padding-top: 65px;
}

.markdownPad >>> .container > * {
  display: block;
  width: 50%;
  margin-left: 10px;
  margin-right: 10px;
  max-height: 100%;
}

.markdownPad >>> .container textarea {
  resize: none;
  font-family: Consolas, "Liberation Mono", Courier, monospace;
  height: 97%;
  max-height: 97%;
  width: 45%;
}

.markdownPad >>> #preview {
  height: 97%;
  max-height: 97%;
  border: 1px solid #eee;
  overflow-y: scroll;
  width: 55%;
  padding: 10px;
}

.markdownPad >>> pre {
  white-space: pre-wrap;
  /* css-3 */
  white-space: -moz-pre-wrap;
  /* Mozilla, since 1999 */
  white-space: -pre-wrap;
  /* Opera 4-6 */
  white-space: -o-pre-wrap;
  /* Opera 7 */
  word-wrap: break-word;
  /* Internet Explorer 5.5+ */
  background-color: #f8f8f8;
  border: 1px solid #dfdfdf;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 0.125rem 0.3125rem 0.0625rem;
}

.markdownPad >>> th {
  border: 1px solid #333;
  padding: 0 1rem;
}

.markdownPad >>> td {
  border: 1px solid #333;
  padding: 0 1rem;
}

.markdownPad >>> pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #2d2d2d;
  border-radius: 6px;
}

.markdownPad >>> .modal-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(51, 51, 51, 0.5);
}

.markdownPad >>> .modal-inner {
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  height: 225px;
  background-color: #fff;
  opacity: 1;
  z-index: 1000;
}

.markdownPad >>> .modal-close-btn {
  float: right;
  display: inline-block;
  margin-right: 5px;
  color: #ff4336;
}

.markdownPad >>> .modal-close-btn:hover {
  float: right;
  display: inline-block;
  margin-right: 5px;
  color: #8d0002;
}

.markdownPad >>> .modal-topbar {
  clear: both;
  height: 25px;
}

.markdownPad >>> .modal-inner .link-area {
  margin: 10px;
  height: 170px;
}

.markdownPad >>> .modal-inner textarea {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.markdownPad >>> .version {
  color: white;
  font-size: 0.8em !important;
}
</style>