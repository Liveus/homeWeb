<template>
    <div class="layout">
        <Layout>
            <header-bar></header-bar>
            <Layout >
                <Sider hide-trigger :style="{background: '#fff'}" >
                    <Menu theme="light" width="auto" >
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import Header from '@/components/homepage/Header'
import Common from '@/components/common/common'
export default {
  name: 'manage',
  components: {
      'header-bar': Header
  },
  data () {
    return {
        loading: true,
        blogList: Array,
        searchContent: '',
        blogType: '',
        blogClass: [],
        page: 1,
        pageSize: 10
    }
  },
  methods: {
      getAllBlogs() {
        this.$axios.get('/blog/manageBlog?' + 'searchContent=' + this.searchContent + '&blogType=' + this.blogType + '&blogClass=' + this.blogClass + '&page=' + this.page + '&pageSize=' + this.pageSize)
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
      }
  },
  computed() {
  },
  created() {
  },
  mounted() {
    // window.vue = this
    // this.searchContent = ''
    // this.getAllBlogs()
  },
  destroyed() {
  }
}
</script>

<style lang='' scoped>
</style>
