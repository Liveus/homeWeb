<template>
    <div class="layout" >
        <Layout>
            <header-bar></header-bar>
            <Layout >
                <Sider hide-trigger :style="sliderStyle" >
                    <personal-info></personal-info>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <!--搜索区-->
                        <div class="serach" :style="{display: 'flex'}">
                            <AutoComplete search enter-button="Search" placeholder="Search by title, content, tags... TBD"
                            :data = "titleList"
                            @keyup.enter.native="getBlogs"
                            v-model="searchContent"/>
                            <Select v-model="blogType" style="width:200px;margin-left:20px" placeholder="文章类型">
                                <Option v-for="item in blogTypeList" :value="item.value" :key="item.label">{{ item.label }}</Option>
                            </Select>
                            <Select v-model="blogClass" multiple style="width:350px;margin-left:20px" placeholder="分类专栏" value="" >
                                <Option v-for="item in blogClassList" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
                            </Select>
                            <Button type="primary" class="search" @click="getBlogs">Search</Button>
                        </div>
                        <!--分割线-->
                        <Divider />
                        <!--文章列表-->
                        <List item-layout="vertical" class="blogwrapper" >
                          <transition-group tag="li" name="fade">
                            <ListItem v-show="!loading" v-for="item in blogList" :key="item.id" :style="{fontSize: '30px'}"
                            @mouseover.native="rightfulTag = item.id">
                                <ListItemMeta :title="item.title"
                                @click.native="blogDetail(item.id)" class="blogtitle" />
                                <p @click="blogDetail(item.id)" class="blogcontent">{{item.text | ellipsis}}</p>
                                <template slot="action">
                                    <li class="blogtime">
                                        {{item.createTime}}
                                    </li>
                                    <li class="blogtype">
                                        <Icon type="ios-keypad-outline" /> {{item.blogtype}}
                                    </li>
                                    <li class="blogclass">
                                        <Icon type="ios-list-box-outline" />{{item.blogclass}}
                                    </li>
                                    <li>
                                        <Tag v-for="type of item.blogtag" :key="type" size="medium">{{type}}</Tag>
                                    </li>
                                    <li v-if="rightfulTag === item.id" :style="{ color: '#87CEFA' }">
                                        Edit
                                    </li>
                                    <li v-if="rightfulTag === item.id" :style="{ color: '#CD2626' }">
                                        Delete
                                    </li>
                                </template>
                            </ListItem>
                          </transition-group>
                        </List>
                        <!--分割线-->
                        <Divider />
                        <!--底部按钮-->
                        <span>
                          <a class="more" @click="moreblog">More</a>
                        </span>
                        <!--返回顶部-->
                        <BackTop :bottom="40" :right="50">
                          <div class="iconfont link-icon">&#xe615;</div>
                        </BackTop>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import Header from '@/components/homepage/Header'
import PersonalInfo from '@/components/homepage/PersonalInfo'
import Common from '@/components/common/common'
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'
export default {
  name: 'home',
  components: {
      'header-bar': Header,
      'personal-info': PersonalInfo
  },
  data () {
    return {
      news: Object,
      // 博客列表
      blogList: Array,
      // 新获取的blog
      orginlist: Array,
      // 搜索结果
      titleList: [],
      errored: '',
      loading: true,
      // 搜索内容
      searchContent: '',
      rightfulTag: Number,
      // 当前页
      page: 1,
      // 显示数量
      pageSize: 10,
      isAll: false,
      blogTypeList: [
            {
                value: '0',
                label: '不限'
            },
            {
                value: '1',
                label: '原创'
            },
            {
                value: '2',
                label: '转载'
            },
            {
                value: '3',
                label: '翻译'
            }

        ],
        blogClassList: [],
        blogType: '',
        blogClass: [],
        // slider 样式
        sliderStyle: {
            background: '#fff',
            width: '300px',
            'min-width': '300px'
        }
    }
  },
  methods: {
    blogDetail(id) {
        let routeData = this.$router.resolve({path: `/blog/detail/${id}`})
        window.open(routeData.href, '_blank')
    },
    getBlogs() {
      // get all blog
      this.$axios.get('/blog/getBlog?' + 'searchContent=' + this.searchContent + '&blogType=' + this.blogType + '&blogClass=' + this.blogClass + '&page=' + this.page + '&pageSize=' + this.pageSize)
        .then(response => {
          this.blogList = response.data.records
          for (var i = 0; i < this.blogList.length; i++) {
            this.blogList[i].blogtype = Common.getType(this.blogList[i].blogtype)
            this.blogList[i].createTime = Common.formatDate(this.blogList[i].createTime)
            this.blogList[i].blogtag = this.blogList[i].blogtag.split(',')
          }
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => {
        })
      // get all blogClass
      this.$axios.get('/blogClass/getAll')
        .then(response => {
          this.blogClassList = response.data
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 获取更多blog
    moreblog() {
      if (this.isAll) {
        this.$Message.warning({
          content: '无更多内容',
          duration: 1.5
        })
      } else {
        this.page++
        this.$axios.get('/blog/getBlog?' + 'searchContent=' + this.searchContent + '&blogType=' + this.blogType + '&blogClass=' + this.blogClass + '&page=' + this.page + '&pageSize=' + this.pageSize)
          .then(response => {
            this.orginlist = response.data.records
            if (response.data.records.length < 10) {
              this.isAll = true
            }
            for (var i = 0; i < this.orginlist.length; i++) {
              this.orginlist[i].blogtype = Common.getType(this.orginlist[i].blogtype)
              console.log(this.orginlist[i])
              this.orginlist[i].blogtag = this.orginlist[i].blogtag.split(',')
            }
            this.blogList = this.blogList.concat(this.orginlist)
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => {
          })
    }
  },
    getTitles(searchTitle) {
      let param = new URLSearchParams()
      param.append('searchTitle', searchTitle)
      this.$axios.post('/blog/searchTitle', param)
        .then(response => {
          this.titleList = response.data
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => {
        })
    },
    getSocket() {
        // this.$axios.get('/blog/getBlog?' + 'searchContent=' + this.searchContent + '&blogType=' + this.blogType + '&blogClass=' + this.blogClass + '&page=' + this.page + '&pageSize=' + this.pageSize)
        //   .then(response => {
        //     this.orginlist = response.data.records
        //     if (response.data.records.length < 10) {
        //       this.isAll = true
        //     }
        //     for (var i = 0; i < this.orginlist.length; i++) {
        //       this.orginlist[i].blogtype = Common.getType(this.orginlist[i].blogtype)
        //       console.log(this.orginlist[i])
        //       this.orginlist[i].blogtag = this.orginlist[i].blogtag.split(',')
        //     }
        //     this.blogList = this.blogList.concat(this.orginlist)
        //   })
        //   .catch(error => {
        //     console.log(error)
        //     this.errored = true
        //   })
        //   .finally(() => {
        //   })

        // var sock = new SockJS('http://19.86.11.77:18227/kaili-basic/sock-js?companyCode=99999')
        // sock.onopen = function() {
        //   console.log('open')
        //   sock.send('test')
        // }

        // sock.onmessage = function(e) {
        //   console.log('message', e.data)
        //   sock.close()
        // }

        // sock.onclose = function() {
        //   console.log('close')
        // }

      // 获取消息
      // var socket = new WebSocket('ws://127.0.0.1:8082/websocket?companyCode=99999')
      // var socket = new WebSocket('ws://19.86.11.77:18222/websocket?companyCode=99999&siteId=1&userId=1')
      var socket = new WebSocket('ws://19.86.11.77:18227/kaili-basic/websocket?companyCode=99999&siteId=1&userId=1')
      socket.onopen = function () {
        console.log('websocket 连接成功')
      }
      socket.onmessage = function(e) {
        try {
          console.log(e.data)
          this.news = JSON.parse(e.data)
          console.log(JSON.parse(e.data))
        } catch (err) {
          console.log('err' + err)
        }
      }
    }
  },
  mounted() {
    window.vue = this
    // 初始化搜索词
    this.searchContent = ''
    // 查询blogs
    this.getBlogs()
    // this.getSocket()
  },
  filters: {
    // 版本号显示12位，超过12位显示...
    ellipsis: function(value) {
      if (!value) return ''
      if (value.length > 300) {
        return value.slice(0, 300) + '...'
      }
      return value
    }
  },
  watch: {
      searchContent: function(newStr, oldStr) {
          this.getTitles(newStr)
      }
  }
}
</script>

<style lang='' scoped>
>>> .ivu-spin-main {
    margin-left: 50%;
    margin-top: 400px;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.search {
    margin-left: 10px;
}
.info {
    font-size:30px;
    color: white;
    float: left;
    position: relative;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.blogwrapper {
  min-height: 100vh;
}
.blogtitle {
  cursor: pointer;
}
.blogcontent {
    font-size: 16px;
    cursor: pointer;
}
.blogtime {
  cursor: default;
}
.blogtype {
  cursor: default;
}
.blogclass {
  cursor: default;
}
.spin {
    height: 100vh;
    z-index: 100;
}
.link-icon {
    cursor: pointer;
    font-size: 35px;
}
.more {
  color: #969696;
  font-size: 30px;
  border-bottom: 2px solid #e3e3e3;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0s;
}
</style>
