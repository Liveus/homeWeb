<template>
  <div class="top-banner">
    <Icon class="back" @click="$router.back(-1)" type="ios-arrow-back" size='40' color = '#8F8F8F' />
    <span class="blogManage" @click="manageBlog">文章管理</span>
    <Input  v-model="title" placeholder="Enter your title..." class="title" size="large"/>
    <ButtonGroup :size="buttonSize" class="buttons">
        <Button :size="buttonSize" @click="onDeploy">Deploy</Button>
        <Button :size="buttonSize" @click="onSave">Save</Button>
        <Button :size="buttonSize" @click="onClear">Clear</Button>
    </ButtonGroup>
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
export default {
  data () {
    return {
        buttonSize: 'large',
        title: ''
    }
  },
  methods: {
      manageBlog() {
        this.$router.push({
          path: `/home/`
        })
      },
      onDeploy() {
        this.$emit('onDeploy', this.title)
      },
      onSave() {
        this.$emit('onSave', this.title)
      },
      onClear() {
        this.$emit('onClear')
      }
  }
}
</script>

<style  scoped>
.top-banner {
    display: flex;
}
.back {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.blogManage {
    color: #8F8F8F;
    font-size: 20px;
    text-align: center;
    padding: 15px;
    cursor: pointer;
}
.title {
    width: 70%;
    height: 40px;
    display: flex;
    padding-top: 5px;
}
.buttons {
    display: flex;
    margin-top: 4px;
    margin-left: 5%;
}
</style>
