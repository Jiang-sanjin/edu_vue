<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">我购买的课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
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
                    <img :src="item.course_cover" class="img-responsive" :alt="item.course_title" style="width: 300px;height:200px">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.course_id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.course_id" :title="item.course_title"
                      class="course-title fsize18 c-333">{{item.course_title}}</a>
                  </h3>
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
import orders from "@/api/orders";
import Vue from "vue";
import Router from "vue-router";

export default {
  data() {
    return {
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 8, // 每页记录数
      data: {} // 查询返回的数据
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
  },

  methods: {
    //1 查询数据
    getPageList(page = 1, limit = 8) {
      this.page = page;
      //发送请求从后台获取数据
      orders.getUserCourse(this.page, this.limit).then(response => {
        this.data = response.data.rows;
        this.total = response.data.total;
        console.log("数据   " + response.data.total);
      });
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
