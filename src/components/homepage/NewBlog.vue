<template>
  <Layout >
    <newBlog-header @onDeploy="onDeploy" @onSave="onSave" @onClear="onClear" :title="title"></newBlog-header>
    <Layout>
      <Content>
        <mavon-editor v-model="value" :toolbars="toolbars" @keydown="onAutoSave" ref=md
        @save="onAutoSave" @imgAdd="imgAdd" class="mavon" />
      </Content>
      <!-- <Sider class="fastkey" hide-trigger></Sider> -->
    </Layout>
    <more-info :switchCase="switchCase" @doSaveOrDeploy="doSaveOrDeploy" @cancel="cancel" ></more-info>
    <BackTop ></BackTop>
  </Layout>
</template>

<script>
import newBlogHeader from '@/components/homepage/newBlogHeader'
import MoreInfo from '@/components/homepage/MoreInfo'
export default {
  components: {
    'more-info': MoreInfo,
    'newBlog-header': newBlogHeader
  },
  data () {
    return {
      toolbars: {
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              underline: true, // 下划线
              mark: true, // 标记
              superscript: true, // 上角标
              quote: true, // 引用
              ol: true, // 有序列表
              link: true, // 链接
              imagelink: true, // 图片链接
              help: true, // 帮助
              code: true, // code
              subfield: true, // 是否需要分栏
              fullscreen: true, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              /* 1.3.5 */
              undo: true, // 上一步
              trash: true, // 清空
              save: true, // 保存（触发events中的save事件）
              /* 1.4.2 */
              navigation: true // 导航目录
            },
      // markdown样式
      codeStyle: 'github',
      // 标题
      title: '',
      // markdown文本
      value: '',
      // 渲染内容
      text: '',
      // 文章标签
      tagList: [],
      // 分类专栏
      classList: [],
      finalclassList: [],
      newclassList: [],
      // 资源链接
      sourcename: '',
      sourcelink: '',
      // 文章类型
      typeSelected: '',
      // 保存&发布开关
      switchCase: false,
      // 保存类型：保存？发布
      saveType: Number
    }
  },
  methods: {
    // 初始化
    readFile(filePath) {
      this.$axios.get('../../../static/blogTemplate.txt')
      .then(response => {
          this.value = response.data
      })
    },
    // 自动保存--无实际作用
    onAutoSave() {
      this.$Message.success({
        content: '保存成功',
        duration: 2
      })
    },
    // 保存按钮
    onSave(title) {
      this.title = title
      if (this.title.length === 0) {
        this.$Message.warning('标题不能为空')
      } else if (this.value.length === 0) {
        this.$Message.warning('内容不能为空')
      } else {
        this.saveType = 1
        this.switchCase = true
      }
    },
    // 发布按钮
    onDeploy(title) {
      this.title = title
      if (this.title.length === 0) {
        this.$Message.warning('标题不能为空')
      } else if (this.value.length === 0) {
        this.$Message.warning('内容不能为空')
      } else {
        this.saveType = 2
        this.switchCase = true
      }
    },
    // 清除按钮
    onClear() {
      this.value = ''
      this.text = ''
      this.title = ''
    },
    // 执行保存或发布
    doSaveOrDeploy(tagList, classList, sourcename, sourcelink, typeSelected, switchCase) {
      this.tagList = tagList
      this.classList = classList
      this.sourcename = sourcename
      this.sourcelink = sourcelink
      this.typeSelected = typeSelected
      // 按钮修改状态
      this.switchCase = switchCase
      let param = new URLSearchParams()
      this.finalclassList = []
      this.newclassList = []
      for (var i = 0; i < classList.length; i++) {
        if (classList[i].id === 0) {
          this.newclassList.push(classList[i].value)
        } else {
          this.finalclassList.push(classList[i].id)
        }
      }
      param.append('title', this.title)
      param.append('content', this.value)
      // 纯文本暂时用value代替
      param.append('text', this.value)
      param.append('theme', this.codeStyle)
      param.append('blogtag', tagList)
      param.append('blogclass', this.finalclassList)
      param.append('newBlogClass', this.newclassList)
      param.append('blogtype', typeSelected)
      param.append('sourcename', sourcename)
      param.append('sourcelink', sourcelink)
      param.append('isfinished', this.saveType)
      this.$axios.post('/blog/submit', param)
        .then(response => {
          this.blogList = response.data
          this.$Message.success({
              content: 'Deploy Succeed'
          })
        })
        .catch(error => {
          this.$Message.warning({
            content: 'Deploy falied'
          })
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 取消
    cancel(switchCase) {
      this.switchCase = switchCase
    },
    // 绑定@imgAdd event
    imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData()
        formdata.append('file', $file)
        this.$axios({
              url: '/blog/uploadBlogSource',
              method: 'post',
              data: formdata,
              headers: { 'Content-Type': 'multipart/form-data' }
        }).then((url) => {
              // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
              /**
              * $vm 指为mavonEditor实例，可以通过如下两种方式获取
              * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
              * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
              */
              this.$refs.md.$img2Url(pos, url.data)
        })
    }
  },
  created() {
  },
  mounted() {
    window.vue = this
    this.readFile()
  }
}
</script>

<style lang='' scoped>
.fastkey {
  background: #dfd8d2;
  display: flex;
}
.mavon {
  z-index: 0;
}
</style>
