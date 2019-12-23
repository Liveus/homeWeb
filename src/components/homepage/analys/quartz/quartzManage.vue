<template>
  <div>
    <List header="Header" footer="Footer" border>
        <ListItem>
          This is a piece of text.
        </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      jobs: Array
    }
  },
  methods: {
    getAllJobs() {
        this.$axios.get('/job/queryjob?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
        .then(response => {
            console.log(response.data)
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
    this.getAllJobs()
  }
}
</script>

<style lang='' scoped>
</style>
