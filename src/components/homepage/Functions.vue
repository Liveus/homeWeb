<template>
    <div class="layout-nav" >
        <MenuItem name="1" v-show="islogin">
            <Icon type="ios-navigate"></Icon>
            <router-link to="/newBlog" class="function">Write</router-link>
        </MenuItem>
        <MenuItem name="2" v-show="islogin">
            <Icon type="ios-information-circle"></Icon>
            <router-link to="/info" class="function">Info</router-link>
        </MenuItem>
        <MenuItem name="3" v-show="islogin">
            <Icon type="ios-analytics"></Icon>
            <router-link to="/analys" class="function">Analys</router-link>
        </MenuItem>
        <MenuItem name="4" v-show="islogin">
            <Icon type="ios-build"></Icon>
            <router-link to="/manage" class="function">Manage</router-link>
        </MenuItem>
        <MenuItem name="5" v-show="islogin">
            <Icon type="ios-log-out" />
            <span class="function" @click="logout">Logout</span>
        </MenuItem>
        <MenuItem name="6" v-show="!islogin">
            <Icon type="ios-log-out" />
            <span class="function" @click="login">Login</span>
        </MenuItem>
        <Modal v-model="isquit" width="360" @on-ok="ok"
            @on-cancel="cancel">
            <p slot="header" style="color:#000;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>退出账号</span>
            </p>
            <div style="text-align:center">
                <p>是否退出当前账号？</p>
            </div>
            <!-- <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>
            </div> -->
        </Modal>
    </div>
</template>

<script>
export default {
  data () {
    return {
        isquit: false
    }
  },
  methods: {
        ok() {
            this.$axios.get('/user/logout')
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => {
            })
            this.$Message.success({
                content: 'Logout Success'
            })
            this.$store.commit('userStatus', null)
        },
        cancel() {
            this.isquit = false
        },
        logout() {
            this.isquit = true
        },
        login() {
            this.$router.replace({ path: '/login' })
      }
  },
  computed: {
    islogin() {
        if (localStorage.getItem('userName') && localStorage.getItem('userToken')) {
            // 调用mutations中的userStatus方法
            this.$store.commit('userStatus', localStorage.getItem('userName'))
        } else {
            this.$store.commit('userStatus', null)
        }
        return this.$store.getters.status
    }
  }
}
</script>

<style lang='' scoped>
.layout-nav {
    width: 525px;
    margin: 0 auto;
    margin-right: 20px;
}
.function {
    color: white;
}
</style>
