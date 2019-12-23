<script>
  // blog类型转化
  function getType(index) {
      if (index === '1') {
          return '原创'
      } else if (index === '2') {
          return '转载'
      } else {
          return '翻译'
      }
  }
  // 时间格式转化
  function formatDate(date) {
        date = new Date(date)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = date.getHours()
        var minute = date.getMinutes()
        minute = minute < 10 ? ('0' + minute) : minute
        var second = date.getSeconds()
        second = second < 10 ? ('0' + second) : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  export default {
    getType,
    formatDate
  }
</script>
