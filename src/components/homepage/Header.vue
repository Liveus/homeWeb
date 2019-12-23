<template>
    <Header>
        <Menu mode="horizontal" theme="dark">
            <div class="info">
                Liveus
            </div>
            <!-- function bar -->
            <function-item></function-item>
        </Menu>
    </Header>
</template>

<script>
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import Functions from '@/components/homepage/Functions'
export default {
  components: {
      'function-item': Functions
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
.info {
    font-size:30px;
    color: white;
    float: left;
    position: relative;
}
.bu {
    cursor: pointer;
}
</style>
