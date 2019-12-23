<template>
    <div class="layout">
        <Layout>
            <Content :style="{padding: '0 50px'}">
                <Card>
                    <div style="height: 100%;">
                        Content
                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>

<script>
import Header from '@/components/homepage/Header'
export default {
  components: {
    'header-bar': Header
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='' scoped>
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
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
