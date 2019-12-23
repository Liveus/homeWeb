<template>
  <div class="jvm">
    <Tabs value="1">
        <TabPane label="JVM 1" name="1" icon="md-desktop" >
            <div class="maininfo">
                <div class="info">
                    <Card style="width:100%;margin:20px">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            JVM概览
                        </p>
                    </Card>
                </div>
                <div class="status">
                    <Card style="width:100%;margin:20px">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            网络带宽
                        </p>
                        <div class="content-wrapper">
                            <div class="message">
                                <span>上行速度</span>
                                <span class="fontClass">5</span>
                                <span>Mbps</span>
                            </div>
                            <div class="message">
                                <span>下行速度</span>
                                <span class="fontClass">5</span>
                                <span>Mbps</span>
                            </div>
                            <div class="message">
                                <span>JVM线程</span>
                                <span class="fontClass">5</span>
                            </div>
                            <div class="message">
                                <span>下行速度</span>
                                <span class="fontClass">5</span>
                                <span>Mbps</span>
                            </div>
                            <div class="message">
                                <span>下行速度</span>
                                <span class="fontClass">5</span>
                                <span>Mbps</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div class="otherinfo">
                <Card style="width:100%;margin-left:20px;margin-right:20px">
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        JVM使用率
                    </p>
                    <div class="grap-wrapper">
                        <div class="singlegrap">
                            <i-circle :percent="70">
                                CPU使用率
                                <span class="demo-Circle-inner" style="font-size:24px">70%</span>
                            </i-circle>
                        </div>
                        <div class="singlegrap">
                            <i-circle :percent="60">
                                内存使用率
                                <span class="demo-Circle-inner" style="font-size:24px">60%</span>
                            </i-circle>
                        </div>
                        <div class="singlegrap">
                            <i-circle :percent="60">
                                内存使用率
                                <span class="demo-Circle-inner" style="font-size:24px">60%</span>
                            </i-circle>
                        </div>
                        <div class="singlegrap">
                            <i-circle :percent="60">
                                内存使用率
                                <span class="demo-Circle-inner" style="font-size:24px">60%</span>
                            </i-circle>
                        </div>
                    </div>
                </Card>
            </div>
            <div class="oldinfo">
                <Card style="width:100%;margin:20px;">
                </Card>
            </div>
        </TabPane>
        <TabPane label="JVM 2" name="2" icon="md-desktop" >
            标签二的内容
        </TabPane>
        <TabPane label="JVM 3" name="3" icon="md-desktop" >
            标签三的内容
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
        jvminfo: Object
    }
  },
  methods: {
      getJvmInfo() {
            this.$axios.get('/jvm/jvmInfo')
            .then(response => {
                console.log(response.data)
                this.jvminfo = response.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => {
            })
      }
  },
  mounted() {
      window.jvm = this
      // this.getJvmInfo()
  }
}
</script>

<style lang='' scoped>
.maininfo {
    background: #f6f6f6;
    width: 100%;
    height: 200px;
    display: flex;
}
.info {
    width: 30%;
    height: 100%;
    display: flex;
}
.status {
    width: 70%;
    height: 100%;
    display: flex;
}
.content-wrapper {
    display: flex;
}
.message {
    width: 20%;
    display: felx;
}
.fontClass {
    width: 100%;
    font-size: 25px;
    color: #6495ED
}
.otherinfo {
    background: #f6f6f6;
    width: 100%;
    height: 200px;
    display: flex;
}
.grap-wrapper {
    width: 100%;
    display: flex;
}
.singlegrap {
    width: 25%;
}
.oldinfo {
    background: #f6f6f6;
    width: 100%;
    height: 350px;
    display: flex;
}
</style>
