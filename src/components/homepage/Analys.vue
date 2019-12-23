<template>
    <div class="layout">
        <Layout>
            <header-bar></header-bar>
            <Layout >
                <Sider hide-trigger :style="{background: '#fff'}" >
                  <Menu :theme="theme" active-name="0" @on-select="selectMenu">
                      <MenuGroup title="运行分析">
                          <MenuItem name="0" class="manew">
                                <div class="iconfont link-icon" >&#xe6ad;</div>
                                平台
                          </MenuItem>
                          <MenuItem name="1" class="manew">
                              <div class="iconfont link-icon" >&#xe7db;</div>
                              ES
                          </MenuItem>
                          <MenuItem name="2" class="manew">
                              <div class="iconfont link-icon" >&#xe633;</div>
                              数据库
                          </MenuItem>
                          <MenuItem name="3" class="manew">
                              <div class="iconfont link-icon" >&#xe634;</div>
                              MQ
                          </MenuItem>
                          <MenuItem name="4" class="manew">
                              <div class="iconfont link-icon" >&#xe623;</div>
                              JVM
                          </MenuItem>
                      </MenuGroup>
                      <MenuGroup title="用户管理">
                          <MenuItem name="5" class="manew">
                              <div class="iconfont link-icon" >&#xe657;</div>
                              用户分析
                          </MenuItem>
                          <MenuItem name="6" class="manew">
                              <div class="iconfont link-icon" >&#xe670;</div>
                              操作流
                          </MenuItem>
                      </MenuGroup>
                      <MenuGroup title="定时任务">
                          <MenuItem name="7" class="manew">
                              <div class="iconfont link-icon" >&#xe627;</div>
                              数据分析
                          </MenuItem>
                          <MenuItem name="8" class="manew">
                              <div class="iconfont link-icon" >&#xe626;</div>
                              任务管理
                          </MenuItem>
                          <MenuItem name="9" class="manew">
                              <div class="iconfont link-icon" >&#xe645;</div>
                              新增定时
                          </MenuItem>
                      </MenuGroup>
                      <MenuGroup title="Blog">
                          <MenuItem name="10" class="manew">
                              <div class="iconfont link-icon" >&#xe617;</div>
                              数据流
                          </MenuItem>
                          <MenuItem name="11" class="manew">
                              <div class="iconfont link-icon" >&#xe67a;</div>
                              时间流
                          </MenuItem>
                      </MenuGroup>
                      <MenuGroup title="其他">
                          <MenuItem name="12" class="manew">
                              <div class="iconfont link-icon" >&#xe62b;</div>
                              其他
                          </MenuItem>
                      </MenuGroup>
                  </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <platfrom v-show="wrappers[0].ifshow"></platfrom>
                        <es v-show="wrappers[1].ifshow"></es>
                        <database v-show="wrappers[2].ifshow"></database>
                        <mq v-show="wrappers[3].ifshow"></mq>
                        <jvm v-show="wrappers[4].ifshow"></jvm>
                        <userAnalys v-show="wrappers[5].ifshow"></userAnalys>
                        <userOperation v-show="wrappers[6].ifshow"></userOperation>
                        <quartzData v-show="wrappers[7].ifshow"></quartzData>
                        <quartzManage v-show="wrappers[8].ifshow"></quartzManage>
                        <quartzNew v-show="wrappers[9].ifshow"></quartzNew>
                        <blogTime v-show="wrappers[10].ifshow"></blogTime>
                        <blogData v-show="wrappers[11].ifshow"></blogData>
                        <otherInfo v-show="wrappers[12].ifshow"></otherInfo>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import Header from '@/components/homepage/Header'
// 运行分析
import jvm from '@/components/homepage/analys/running/jvm'
import es from '@/components/homepage/analys/running/es'
import platfrom from '@/components/homepage/analys/running/platfrom'
import mq from '@/components/homepage/analys/running/mq'
import database from '@/components/homepage/analys/running/database'
// 用户管理
import userAnalys from '@/components/homepage/analys/user/userAnalys'
import userOperation from '@/components/homepage/analys/user/userOperation'
// 定时任务
import quartzManage from '@/components/homepage/analys/quartz/quartzManage'
import quartzData from '@/components/homepage/analys/quartz/quartzData'
import quartzNew from '@/components/homepage/analys/quartz/quartzNew'
// blog
import blogTime from '@/components/homepage/analys/blog/blogTime'
import blogData from '@/components/homepage/analys/blog/blogData'
// 其他
import otherInfo from '@/components/homepage/analys/other/otherInfo'
export default {
  name: 'analys',
  components: {
      'header-bar': Header,
      'platfrom': platfrom,
      'es': es,
      'database': database,
      'mq': mq,
      'jvm': jvm,
      'userAnalys': userAnalys,
      'userOperation': userOperation,
      'quartzManage': quartzManage,
      'quartzData': quartzData,
      'quartzNew': quartzNew,
      'blogTime': blogTime,
      'blogData': blogData,
      'otherInfo': otherInfo
  },
  data () {
    return {
        // 左侧导航栏样式
        theme: 'light',
        before: 0,
        wrappers: [
            {
                'id': 'platfrom',
                'ifshow': false
            },
            {
                'id': 'es',
                'ifshow': false
            },
            {
                'id': 'database',
                'ifshow': false
            },
            {
                'id': 'mq',
                'ifshow': false
            },
            {
                'id': 'jvm',
                'ifshow': false
            },
            {
                'id': 'userAnalys',
                'ifshow': false
            },
            {
                'id': 'userOperation',
                'ifshow': false
            },
            {
                'id': 'quartzData',
                'ifshow': false
            },
            {
                'id': 'quartzManage',
                'ifshow': false
            },
            {
                'id': 'quartzNew',
                'ifshow': false
            },
            {
                'id': 'blogTime',
                'ifshow': false
            },
            {
                'id': 'blogData',
                'ifshow': false
            },
            {
                'id': 'otherInfo',
                'ifshow': false
            }
        ]
    }
  },
  methods: {
      selectMenu(name) {
          this.wrappers[this.before].ifshow = false
          this.wrappers[name].ifshow = true
          this.before = name
      }
  },
  mounted() {
      window.analys = this
  }
}
</script>

<style lang='' scoped>
.manew {
    display: flex;
}
.link-icon {
   font-size: 18px;
   margin-right: 5px;
}
</style>
