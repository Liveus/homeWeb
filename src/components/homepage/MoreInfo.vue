<template>
    <Modal
        :value="switchCase"
        title="发布文章"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="blog-tag">文章标签：
            <div class="tag" v-for="(item,index) of tagList" :key="index">
                <Input :value="item" placeholder="" style="width: 50px" @keyup.enter.native="updateTag(index,item)"/>
                <Button shape="circle" icon="ios-close" :size="buttonSize" @click="deleteTag(index)"></Button>
            </div>
            <div class="newTag">
                <Input v-show="isTagShow" v-model="tag" placeholder="" style="width: 50px" @keyup.enter.native="addNewTag" v-on:blur="addNewTag"/>
                <Button v-show="isTagShow" shape="circle" icon="ios-close" :size="buttonSize" @click="cancelAddTag"></Button>
            </div>
            <Button v-show="addTagAble" type="text" icon="ios-add-circle-outline" @click="newTag">添加类型</Button>
        </div>
        <div class="blog-class">分类专栏：
            <div class="Class" v-for="(item,index) of classList" :key="index">
                <Input :value="item.value" placeholder="" style="width: 50px" @keyup.enter.native="updateClass(index,item)"/>
                <Button shape="circle" icon="ios-close" :size="buttonSize" @click="deleteClass(index)"></Button>
            </div>
            <div class="newClass">
                <Input v-show="isClassShow" v-model="Class" placeholder="" style="width: 50px" @keyup.enter.native="addNewClass"/>
                <Button v-show="isClassShow" shape="circle" icon="ios-close" :size="buttonSize" @click="cancelAddClass"></Button>
            </div>
            <Button type="text" icon="ios-add-circle-outline" @click="newClass">新建分类</Button>
        </div>
        <div class="originClass">
            <CheckboxGroup >
                <Checkbox :choosed="choosed" class="chooseClass" v-for="(item,index) of choosenList" :key="index"
                @change.native="choseClass(index)" border>{{item.value}}</Checkbox>
            </CheckboxGroup>
        </div>
        <div class="blog-type">文章类型：
            <Select style="width:100px" v-model="typeSelected" @on-change="selectType">
                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
        </div>
        <div class="blog-source">资源链接：
            <Input v-model="sourcename" placeholder="请填写链接资源" style="width: 300px" />
            <Upload action="http://127.0.0.1:80/blog/uploadSource" :on-success="uploadSourceSucc">
                <Button type="text" >上传资源</Button>
            </Upload>
        </div>
    </Modal>
</template>

<script>
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
export default {
  props: {
    switchCase: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
        buttonSize: 'small',
        addTagAble: true,
        tag: '',
        Class: '',
        isTagShow: false,
        isClassShow: false,
        choosed: false,
        // 标签
        tagList: [],
        // 分类专栏
        classList: [],
        choosenList: [],
        // 资源链接
        sourcename: '',
        sourcelink: '',
        // 文章类型
        typeList: [
            {
                id: 1,
                value: '原创',
                label: '原创'
            },
            {
                id: 2,
                value: '转载',
                label: '转载'
            },
            {
                id: 3,
                value: '翻译',
                label: '翻译'
            }
        ],
        typeSelected: '',
        border: ['1']
    }
  },
  methods: {
      newTag() {
          if (this.tagList.length < 3) {
            this.isTagShow = true
          }
      },
      addNewTag() {
          console.log('add:')
          this.tagList.push(this.tag)
          if (this.tagList.length === 3) {
            this.isTagShow = false
            this.addTagAble = false
          }
          this.tag = ''
      },
      updateTag(index, newvalue) {
          console.log('update:' + index)
          console.log('update:' + newvalue)
          this.tagList[index] = newvalue
      },
      deleteTag(index) {
          console.log('delete:' + index)
          this.tagList.splice(index, 1)
          this.addTagAble = true
      },
      cancelAddTag() {
          this.isTagShow = false
          this.tag = ''
      },
      newClass() {
          this.isClassShow = true
      },
      addNewClass() {
          console.log('addNewClass:')
          this.classList.push({
                    id: 0,
                    value: this.Class
                })
          this.Class = ''
      },
      cancelAddClass() {
          this.isClassShow = false
          this.Class = ''
      },
      updateClass(index, newvalue) {
          console.log('updateClass:' + index)
          console.log('updateClass:' + newvalue)
          this.classList[index] = newvalue
      },
      deleteClass(index) {
          console.log('deleteClass:' + index)
          for (var i = 0; i < this.choosenList.length; i++) {
              console.log(this.classList[index])
              console.log('zz:' + this.choosenList[i].value)
              if (this.classList[index] === this.choosenList[i].value) {
                  this.choosenList[i].choosed = false
              }
          }
          this.classList.splice(index, 1)
      },
      choseClass(index) {
          if (this.choosenList[index].choosed) {
            for (var i = 0; i < this.classList.length; i++) {
                if (this.choosenList[index].value === this.classList[i]) {
                    this.classList.splice(i, 1)
                }
            }
            this.choosenList[index].choosed = false
          } else {
            this.classList.push(
                {
                    id: this.choosenList[index].label,
                    value: this.choosenList[index].value
                }
                )
            this.choosenList[index].choosed = true
          }
      },
      selectType() {
      },
      getClassList() {
        this.$axios.get('/blogClass/getAll')
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
              var val = {
                  value: response.data[i].typeName,
                  label: response.data[i].id,
                  choosed: false
              }
              this.choosenList.push(val)
            }
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => {
          this.loading = false
        })
      },
      uploadSourceSucc(response, file, fileList) {
          this.sourcelink = response
      },
      ok() {
          this.$emit('doSaveOrDeploy', this.tagList, this.classList, this.sourcename, this.sourcelink, this.typeSelected, false)
      },
      cancel() {
          this.$emit('cancel', false)
      }
  },
  created() {
  },
  mounted() {
    window.moreinfo = this
    this.getClassList()
  }
}
</script>

<style lang='' scoped>
.blog-tag, .blog-class, .blog-type, .blog-source{
    display: flex;
    text-align: center;
    line-height: 32px;
}
.tag, .Class {
    margin-right: 4px;
}
.newTag, .newClass {
    margin-right: 4px;
}
.originClass {
    width: 100%;
    margin: 10px;
    margin-left: 15%;
}
.chooseClass {
    margin: 5px;
}
</style>
