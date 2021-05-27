<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <div class="i-teacher-list" v-if="this.total>0">
            <ul class="of">
              <li v-for="teacher in this.list" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank">
                      <img :src="teacher.avatar" :alt="teacher.name">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank"
                      class="fsize18 c-666">{{teacher.name}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{teacher.intro}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{teacher.career}}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </div>
          <div v-else class="none-product">抱歉没有找到相关的讲师</div>
        </div>

        <!-- 分页 -->
        <el-pagination :current-page="page" :page-size="limit" :total="total"
          style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper"
          @current-change="getPageList" />
        <!-- 分页END -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>

<script>
import teacherApi from "@/api/teacher";
export default {
  // 定义数据变量
  data() {
    return {
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 8, // 每页记录数
      searchObj: {} // 查询条件
    };
  },
  //初始化， 在加载的时候执行
  created() {
    //调用查询列表的方法
    this.getPageList();
  },
  methods: {
    //分页切换
    getPageList(page = 1, limit = 8) {
      // console.log(this.searchObj.gmtCreate)
      this.page = page;
      //发送请求从后台获取数据
      teacherApi
        .getTeacherList(this.page, this.limit, this.searchObj)
        .then(response => {
          // console.log("数据  "+response.data.rows[0].teacherLevel.name);
          // console.log(response.data.rows[0].teacherLevel.name);
          this.list = response.data.rows;
          this.total = response.data.total;
          //当数据获取完了后把Loading 给关闭
          this.listLoading = false;
        })
        .catch(response => {
          console.log(response.data);
        });
    }
  }
};
</script>
