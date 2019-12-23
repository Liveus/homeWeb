<template>
<div >
    <Layout class="layout" :style="backgroundDiv">
        <div class="login-wrapper">
            <div class="items">
                <Icon type="ios-contact-outline" color="white" size="40" />
                <Input :size="size" v-model="username"
                 placeholder="Enter name" />
            </div>
            <div class="items">
                <Icon type="ios-key-outline" color="white" size="40" />
                <Input :size="size" v-model="password" @keyup.enter.native="login"
                type="password" placeholder="Enter password" />
            </div>
            <Button class="submit" @click="login" >
                <span class="subBtn">Enter</span>
            </Button>
        </div>
    </Layout>
</div>
</template>

<script>
export default {
    data () {
        return {
            backgroundDiv: {
                backgroundImage: 'url(' + require('../../assets/imgs/background/gujian.jpg') + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'
            },
            size: 'large',
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (this.username === '' || this.password === '') {
                this.$Message.error({
                    content: 'username or passWord cannot be null',
                    onClose: this.cleanInput()
                })
                return
            }
            let param = new URLSearchParams()
            param.append('userName', this.username)
            param.append('passWord', this.password)
            this.$axios.post('/user/login', param)
            .then(response => {
                if (response.data.result === 'success') {
                    this.$Message.success({
                            content: 'Login Success'
                            }
                        )
                    var json = response.data
                    // 将用户名和token存入sessionStorage
                    localStorage.setItem('userName', json.user.name)
                    localStorage.setItem('userToken', json.token)
                    // 将用户名和token存入vuex
                    this.$store.dispatch('setUser', json.user.name)
                    this.$store.dispatch('setToken', json.token)
                    // 定位到主页
                    this.$router.push('/home')
                } else {
                    this.$Message.error({
                        content: 'error username or passWord',
                        onClose: this.cleanInput()
                    })
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => {
            })
        },
        cleanInput() {
            this.username = ''
            this.password = ''
        }
    },
    mounted() {
        window.vue = this
    },
    beforeRouteEnter: (to, from, next) => {
        // 组件内守卫
        // 已登录状态回到登录界面，即 登出
        next(vm => {
            vm.$store.dispatch('setUser', null)
        })
    }
}
</script>

<style  scoped>

>>> .ivu-input{
    background: transparent;
    border: none;
    border-bottom: 1px solid white;
    border-radius: 0px;
    outline:none;
}
>>> .ivu-btn, .ivu-btn:active, .ivu-btn:focus{
    background: transparent;
    border: none;
    background:rgba(255, 251, 240, 0.3);
    outline:none;
}
>>> .ivu-icon {
    height: 40px;
    margin-top: 20px;
    margin-right: 20px;
}
.layout {
    height: 100vh;
    display: flex;
}
.login-wrapper {
    position: relative;
    width: 30%;
    height: 40%;
    margin-left: 35%;
    margin-top: 15%;
    z-index: 100;
}
.items {
    display: flex;
    width: 100%;
    height: 80px;
    margin-top: 20px;
    background: transparent;
}
.submit {
    margin-top: 20px;
    height: 50px;
    width: 90%;
    font: 20px white;
    color: white;
    border-radius: 50px;
    margin-left: 60px;
}
</style>
