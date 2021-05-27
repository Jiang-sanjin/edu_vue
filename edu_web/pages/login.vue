<template>
  <div class="sign main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="loginVo">

        <el-form-item class="input-prepend restyle" prop="email" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]">
          <div >
            <el-input type="text" placeholder="邮箱" v-model="loginVo.email"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="loginVo.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="loginUser()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_self" href="#"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import '../assets/css/sign.css'
import '../assets/css/iconfont.css'

import cookie from 'js-cookie' //引入下载的插件
import loginApi from '@/api/login'
export default {
  layout: 'sign',

  data () {
    return {
      loginVo:{ //封装手机号 密码
        email:'',
        password:''
      },
      loginInfo:{} //用户信息
    }
  },

  methods: {
    loginUser(){ //用户登录
      //第一步 调用接口进行登录返回token字符串
      loginApi.loginUser(this.loginVo).then(res=>{
        //第二步 把获取的token字符串放到cookie里面 (参数:key-value-作用范围)
          cookie.set("edu_token", res.data.token,{domain:'localhost'});
          //第三步 创建在request.js中创建拦截器 判断cookie中是否有token
          //第四步 调用接口 根据token获取用户信息 在页面显示
          loginApi.getMemberInfo().then(res=>{
            this.loginInfo = res.data.userInfo;
            cookie.set("edu_user",this.loginInfo,{domain:'localhost'});
          //第五步 页面跳转到首页
          window.location.href = '/'
        })
      })
    },
  
  }
}
</script>
<style>
.el-form-item__error{
  z-index: 9999999;
}
</style>
