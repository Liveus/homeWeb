<template>
  <div class="personal-info">
    <div class="avator">
        <Avatar icon="ios-person" size="150" :src="Img" />
    </div>
    <div class="name">
      Liveus
    </div>
    <div class="introduce">
      <p>Java Spring</p>
    </div>
    <div class="resume">
      <router-link  tag="a" target="_blank"  to="/static/liveusResume.pdf" :style="{color:'#515a6e'}">Resume</router-link>
    </div>
    <Divider :style="dividerStyle" />
    <div class="personinfo">
      This is a test website bulid by vue.js.
      If u are interested in this,
      u can contact me by 178XXXX6306@163.com
    </div>
    <div class="links">
      <router-link tag="a" target="_blank" class="link-style" to="//github.com/Liveus" :style="{color:'#515a6e'}">
        <div class="iconfont link-icon">&#xe732;</div>
      </router-link>
      <router-link tag="a" target="_blank" class="link-style" to="//blog.csdn.net/LoveRestart" :style="{color:'#515a6e'}">
        <div class="iconfont link-icon">&#xe638;</div>
      </router-link>
      <router-link tag="a" target="_blank" class="link-style" to="" :style="{color:'#515a6e'}">
        <div class="iconfont link-icon">&#xe886;</div>
      </router-link>
      <router-link tag="a" target="_blank" class="link-style" to="/static/wechat.jpg" :style="{color:'#515a6e'}">
        <div class="iconfont link-icon">&#xe63d;</div>
      </router-link>
      <router-link tag="a" target="_blank" class="link-style" to="/message" :style="{color:'#515a6e'}">
        <div class="iconfont link-icon">&#xec34;</div>
      </router-link>
    </div>
    <div class="internet-Content-Provider-Wrapper">
      <router-link tag="a" target="_blank" class="internet-Content-Provider" to="//www.beian.miit.gov.cn" :style="{color:'#515a6e'}">
        <div >浙ICP备19023262号-1</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Img: require('../../assets/imgs/avator.png'),
      dividerStyle: {
        'margin-left': '5%',
        'min-width': '90%',
        'max-width': '90%'
      }
    }
  },
  methods: {
  },
  mounted() {
    window.personalinfo = this
  }
}
</script>

<style lang='' scoped>
.avator {
    display: flex;
    width: 50%;
    margin-left: 25%;
    padding-top: 10px;
}
.name {
    margin-top: 20px;
    text-align: center;
    font-size: 30px;
}
.introduce {
    margin-top: 20px;
    font-size: 20px;
    text-align: center;
    padding: 5px;
}
.resume {
    cursor: pointer;
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
}
.personinfo {
    text-align: center;
    font-size: 16px;
    padding: 15px;
}
.links {
    text-align: center;
    display: flex;
    margin-top: 30px;
}
.link-style {
    margin-left: 10%;
}
.link-icon {
    cursor: pointer;
    font-size: 25px;
}
.internet-Content-Provider-Wrapper{
    padding: 15px;
    width: 100%;
    text-align: center;
}
.internet-Content-Provider {
    font-size: 15px;
}
</style>
