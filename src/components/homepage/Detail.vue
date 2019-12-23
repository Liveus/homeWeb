<template>
    <div class="layout" id="main">
        <Layout>
            <header-bar></header-bar>
            <Content :style="{padding: '0 50px'}">
                <Card>
                    <div class="blog-info">
                        <div class="title-wrapper">
                            <span class="blog-type">{{blog.blogtype}}</span>
                            <span class="blog-title">{{blog.title}}</span>
                        </div>
                        <div class="other-wrapper">
                            <span class="blog-createtime">{{blog.createTime}}</span>
                            <div class="blog-tag">
                                标签：
                                <Tag class="tag" v-for="(item,id) of blog.blogtag" :key="id" >{{item}}</Tag>
                            </div>
                            <div class="blog-tag">
                                分类专栏：
                                <Tag class="tag" v-for="(item,id) of blog.blogclass" :key="id" >{{item}}</Tag>
                            </div>
                            <a class="blog-sourcelink" :href="blog.sourcelink" @click.prevent="downloadSource()">
                                <Tooltip  placement="top" theme="light">
                                    源码下载
                                    <div slot="content">
                                        {{blog.sourcename}}
                                    </div>
                                </Tooltip>
                            </a>
                        </div>
                    </div>
                    <Divider />
                    <mavon-editor
                        class="md"
                        :value="blog.content"
                        :subfield = "prop.subfield"
                        :defaultOpen = "prop.defaultOpen"
                        :toolbarsFlag = "prop.toolbarsFlag"
                        :editable="prop.editable"
                        :scrollStyle="prop.scrollStyle"
                    ></mavon-editor>
                    <div class="recommend-wrapper">
                        <div class="recommend" v-for="(item,id) of recommendBlog" :key="id">
                            <Icon type="ios-arrow-back" size="20" v-if="id===0" />
                            <a :href="item.id" class="recommend-title">
                                {{item.title}}
                            </a>
                            <Icon type="ios-arrow-forward" size="20" v-if="id===1" />
                        </div>
                    </div>
                </Card>
            </Content>
            <footer-bar></footer-bar>
        </Layout>
    </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'
import Common from '@/components/common/common'
export default {
    components: {
        'footer-bar': Footer,
        'header-bar': Header
    },
    props: {
        index: 0
    },
    data () {
        return {
            buttonSize: 'small',
            blogId: Number,
            blog: Object,
            recommendBlog: Array
        }
    },
    methods: {
        async getBlogDetail() {
            await this.$axios.get('/blog/getBlogById/' + this.blogId)
                .then(response => {
                    this.blog = response.data
                    this.blog.blogtype = Common.getType(this.blog.blogtype)
                    this.blog.createTime = Common.formatDate(this.blog.createTime)
                    this.blog.blogtag = this.blog.blogtag.split(',')
                    this.blog.blogclass = this.blog.blogclass.split(',')
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                })

            await this.$axios.get('/blog/getRecommend?value=' + this.blog.createTime + '&type=1')
                .then(response => {
                    this.recommendBlog = response.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                })
        },
        downloadSource() {
            this.$axios.get(this.blog.sourcelink, { responseType: 'blob' })
            .then(({ data }) => {
                let blob = new Blob([data], { type: 'application/vnd.ms-excel' })
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = this.blog.sourcelink.split('/').pop()
                link.click()
            .catch(error => {
                console.error(error)
            })
            })
        }
    },
    mounted() {
        window.blog = this
        this.blogId = this.$route.params.id
        this.getBlogDetail()
    },
    beforeDestroy() {
    },
    computed: {
        prop () {
            let data = {
            subfield: false, // 单双栏模式
            defaultOpen: 'preview', // edit: 默认展示编辑区域, preview: 默认展示预览区域
            editable: false,
            toolbarsFlag: false,
            scrollStyle: true
            }
            return data
        }
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
.recommend-wrapper {
    width: 100%;
    height: 100px;
    display: flex;
}
.recommend {
    width: 50%;
    height: 100%;
    padding: 40px;
    padding-left: 200px;
}
.recommend-title {
    border-bottom: 2px solid #e3e3e3;
    color: #969696;
    text-decoration: none;
    font-size: 20px;
}
.blog-info {
  width: 100%;
}
.title-wrapper {
    padding: 10px;
    width: 100%;
    display: flex;
    height: 100px;
}
.blog-type {
    color: #ca0c16;
    border: 1px solid #f4ced0;
    padding: 4px;
    height: 24px;
}
.blog-title {
    font-size: 24px;
    word-wrap: break-word;
    padding-left: 20px;
}
.other-wrapper {
    width: 100%;
    display: flex;
}
.blog-createtime {
    padding: 5px;
    font-size: 16px;
    height: 26px;
}
.blog-tag {
    margin-left: 20px;
    margin-right: 20px;
}
.tag {
    cursor: pointer;
}
.blog-sourcelink {
    padding: 5px;
    font-size: 16px;
    height: 26px;
}
.top{
    text-align: center;
}
</style>
