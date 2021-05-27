
<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="学院">
            <img src="../assets/img/风车.png" width="30%" height="30%" alt="学院">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link :key="this.$route.path" to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>


          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <router-link to="/mypay" id="headerMsgCountId" title="我的课程">
                <em class="icon18 news-icon">&nbsp;</em>
              </router-link>
              <!-- <a id="headerMsgCountId" href="../pages/mypay" title="我的课程">
                <em class="icon18 news-icon">&nbsp;</em>
              </a> -->
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <router-link to="/user">
                <img :src="loginInfo.avatar" width="30" height="30" class="vam picImg" alt>
                <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
              </router-link>
              <!-- <a href="/user" title>
                <img :src="loginInfo.avatar" width="30" height="30" class="vam picImg" alt>
                <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
              </a> -->
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>

          <div class="h-r-search">
            <el-input placeholder="输入你想学的课程" v-model="search">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
            </el-input>
          </div>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <nuxt />
    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：xxxxxxxxx(北京) xxxxxxx(深圳)</span>
                <span>Email：xxxxxxxx.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©xxxxxxxxxxx</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="../assets/img/wx-icon-32.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="../assets/img/wb-icon-32.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import "../assets/css/reset.css";
import "../assets/css/theme.css";
import "../assets/css/global.css";
import "../assets/css/web.css";
import "../assets/css/base.css";
import "../assets/css/activity_tab.css";
import "../assets/css/bottom_rec.css";
import "../assets/css/nice_select.css";
import "../assets/css/order.css";
import "../assets/css/swiper-3.3.1.min.css";
import "../assets/css/pages-weixinpay.css";
import "../assets/css/sign.css";
import loginApi from "@/api/login";
import cookie from "js-cookie"; //引入下载的插件
import { Message } from "element-ui"; //引入下载的插件
export default {
  data() {
    return {
      search: "", // 搜索条件
      token: "",
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: ""
      }
    };
  },
  created() {
    this.showInfo();
  },
  methods: {
    //在cookie中获取用户信息
    showInfo() {
      let userStr = cookie.get("edu_user");
      //在cookie中取出来的是字符串 转变位JSON
      if (userStr) {
        this.loginInfo = JSON.parse(userStr);
      }
   
    },
    //退出登录
    logout() {
      //清空cookie值
      cookie.set("edu_token", "", { domain: "localhost" });
      cookie.set("edu_user", "", { domain: "localhost" });
      //回到首页
      window.location.href = "/";
    },
    // 点击搜索按钮
    searchClick() {
      if (this.search != "") {
        this.$router.replace({
          name: "course",
          query: { searchObj: this.search }
        });
        this.search = "";
      }
    }
  }
};
</script>
