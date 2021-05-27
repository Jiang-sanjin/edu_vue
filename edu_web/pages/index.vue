<template>

  <div>
    <!-- 幻灯片 开始 -->
    <div class="block">
      <el-carousel height="460px">
        <!-- <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
          <img style="height:460px;" :src="$target + item.imgPath" :alt="item.describes" />
        </el-carousel-item> -->
        <el-carousel-item>
          <img style="height:460px; width:100%" src="../assets/photo/banner/1442295455437.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <img style="height:460px; width:100%" src="../assets/photo/banner/1442295556203.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <img style="height:460px; width:100%" src="../assets/photo/banner/1442295581911.jpg" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div style="margin-bottom:25px">
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
              <i class="line">／</i>
              <a href="./course" title="全部课程" style="font-size: 14px;color: #46c37b;">全部课程</a>
            </h2>

          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="course in courseList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img style="width: 300px;height:200px" :src="course.cover" class="img-responsive"
                        :alt="course.title">
                      <div class="cc-mask">
                        <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a :href="'/course/'+course.id" :title="course.title"
                        class="course-title fsize18 c-333">{{course.title}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green" >
                        <i class="c-fff fsize12 f-fA" v-if="course.price==0">免费 </i>
                         <i class="c-fff fsize12 f-fA" v-if="course.price!=0">{{course.price}}元</i>
                      </span>
                      
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{course.view_count}}人学习</i>
                        |
                        <!-- <i class="c-999 f-fA">9634评论</i> -->
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>

          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->

      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
              <i class="line">／</i>
              <a href="./teacher" title="全部讲师" style="font-size: 14px;color: #46c37b;">全部讲师</a>

            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name" class="fsize18 c-666">{{teacher.name}}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{teacher.career}}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{teacher.intro}}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>

          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<style scoped>
/* 轮播图CSS */
.block {
  /* padding-top: 25px; */
  padding: 25px 0 25px 0;
  margin: 0 auto;
  max-width: 1100px;
}

.line {
  color: #ccc;
  font-size: 13px;
  margin: 0 20px;
}
</style>

<script>
import index from "@/api/index";
export default {
  data() {
    return {
      //课程数组
      courseList: [],
      //名师数组
      teacherList: []
    };
  },
  created() {
    this.getHotCourseTeacher();
  },
  methods: {
    getHotCourseTeacher() {
      index.getIndexData().then(res => {
        this.courseList = res.data.courseList;
        this.teacherList = res.data.teacherList;
      });
    }
  }
};
</script>