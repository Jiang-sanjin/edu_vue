<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="getPageAllList()">全部</a>
                </li>
                <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.title" href="#" @click="search(item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>

          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buy_count_sort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                  <span :class="{hide:buy_count_sort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmt_modified_sort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                  <span :class="{hide:gmt_modified_sort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':price_sort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:price_sort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="this.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <div class="comm-course-list" v-if="this.total>0">
            <ul class="of" id="bna">
              <li v-for="item in this.data" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" :alt="item.title" style="width: 300px;height:200px">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title"
                      class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA" v-if="item.price==0">免费</i>
                      <i class="c-fff fsize12 f-fA" v-if="item.price!=0">{{item.price}}元</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{item.view_count}}人学习</i>
                      |
                      <!-- <i class="c-999 f-fA">9634评论</i> -->
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </div>

          <!-- 分页 -->
          <el-pagination :current-page="page" :page-size="limit" :total="total"
            style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper"
            @current-change="getPageList" />
          <!-- 分页END -->

        </div>

      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from "@/api/course";
import Vue from "vue";
import Router from "vue-router";

export default {
  name: "course",
  data() {
    return {
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 8, // 每页记录数
      data: {}, // 查询返回的数据
      subjectNestedList: [], // 一级分类列表

      searchObj: {}, // 查询表单对象
      oneIndex: -1,
      twoIndex: -1,
      buy_count_sort: "",
      gmt_modified_sort: "",
      price_sort: ""
    };
  },
  watch: {
    // 当路由发送变化的时候、我们应该有一个监听，监听获取参数
    $route(to, from) {
      console.log("watch $route");
      this.getPageList(1, 8);
    }
  },
  created() {
    //课程第一次查询
    this.getPageList(1, 8);
    //查询所有分类
    this.initSubject();
  },

  methods: {
    //查询所有
    getPageAllList() {
      (this.oneIndex = -1), (this.twoIndex = -1), (this.page = 1);
      this.limit = 8;
      this.searchObj = {};
      this.getPageList(this.page, this.limit, this.searchObj);
    },
    functionB() {
      console.log("hanshu1");
    },
    //1 查询数据
    getPageList(page = 1, limit = 8) {
      if (null != this.$route.query.searchObj) {
        console.log("传递的数据" + this.$route.query.searchObj);
        this.searchObj.title = this.$route.query.searchObj;
      }
      this.$router.push({ query: {} }); //清空地址栏参数

      this.page = page;
      //发送请求从后台获取数据
      courseApi
        .getCourseList(this.page, this.limit, this.searchObj)
        .then(response => {
          this.data = response.data.rows;
          this.total = response.data.total;
          // console.log("数据   " + this.data.total);
        })
        .catch(response => {
          this.searchObj = {};
          console.log(response.data);
        });
    },
    //2 查询所有的分类
    initSubject() {
      courseApi.getAllSubject().then(res => {
        this.subjectNestedList = res.data.subject;
        console.log("subjectNestedList " + this.subjectNestedList[1].parent_id);
      });
    },

    search(pId, index) {
      //点击一级分类 查询对应二级分类
      //为了样式生效
      this.oneIndex = index;
      this.twoIndex = -1;
      this.searchObj = {};

      console.log("长度" + this.subjectNestedList.length);
      //pId和所有一级分类比较 取出二级分类
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (pId == this.subjectNestedList[i].id) {
          if (
            null == this.subjectNestedList[i].parent_id ||
            0 == this.subjectNestedList[i].parent_id
          ) {
            // 根据一级分类 条件查询 显示课程
            this.searchObj.subject_parent_id = pId;
            this.searchObj.subject_id = "";
          } else {
            //根据二级分类查询
            this.searchObj.subject_id = pId;
            this.searchObj.subject_parent_id = "";
          }
        }
      }

      this.getPageList();
    },

    //根据销量查询
    searchBuyCount() {
      //为了让样式生效
      this.buy_count_sort = "1";
      this.gmt_modified_sort = "";
      this.price_sort = "";

      this.searchObj.buy_count_sort = "1";
      this.searchObj.gmt_modified_sort = "";
      this.searchObj.price_sort = "";

      this.getPageList(1);
    },
    //根据时间查询
    searchGmtCreate() {
      //为了让样式生效
      this.buy_count_sort = "";
      this.gmt_modified_sort = "1";
      this.price_sort = "";

      this.searchObj.buy_count_sort = "";
      this.searchObj.gmt_modified_sort = "1";
      this.searchObj.price_sort = "";
      this.getPageList(1);
    },
    //根据价格查询
    searchPrice() {
      //为了让样式生效
      this.buy_count_sort = "";
      this.gmt_modified_sort = "";
      this.price_sort = "1";

      this.searchObj.buy_count_sort = "";
      this.searchObj.gmt_modified_sort = "";
      this.searchObj.price_sort = "1";
      this.getPageList(1);
    }
  }
};
</script>
<style>
.active {
  background: #68cb9b;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
