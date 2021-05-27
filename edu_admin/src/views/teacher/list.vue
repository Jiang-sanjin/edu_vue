<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="讲师名" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="讲师职称">
          <el-option v-for="item in TeacherLevel" :key="item.id" :label="item.name" :value="item.id">

          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker v-model="searchObj.gmtCreate" type="datetime" placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchObj.gmtModified" type="datetime" placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getPageList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column prop="teacherLevel.name" label="职称" width="80">
        <!-- <template slot-scope="scope">
          
        </template> -->
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmt_create" label="添加时间" width="160" />

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper" @current-change="getPageList" />

  </div>
</template>




<script>
//引用teacher.js
import teacher from "@/api/edu/teacher";

export default {
  // 定义数据变量
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件
      TeacherLevel:[] //教师职称
    };
  },
  //初始化， 在加载的时候执行
  created() {
    //调用查询列表的方法
    this.getPageList();
    this.getTeacherLevel();
  },
  //存放方法的
  methods: {
    getPageList(page = 1) {
      // console.log(this.searchObj.gmtCreate)
      this.page = page;
      //发送请求从后台获取数据
      teacher
        .getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          // console.log(response);
          // console.log(response.data.rows[0].teacherLevel.name);
          this.list = response.data.rows;
          this.total = response.data.total;
          //当数据获取完了后把Loading 给关闭
          this.listLoading = false;
        })
        .catch(response => {
          console.log(response.data.message);
        });
    },
    //清空
    resetData() {
      this.searchObj = {};
      this.getPageList();
    },
    removeDataById(id) {
      //提示：是否删除
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return teacher.removeById(id);
        })
        .then(() => {
          //已经向后台发送请求了并且是正确的了
          this.$message({
            type: "success",
            message: "删除成功"
          });
          //刷新页面
          this.getPageList();
        })
        .catch(response => {
          //不管点击取消还是删除失败都走这个catch
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            });
          }
        });
    },
    getTeacherLevel(){
      teacher.getTeacherLevel().then(response => {
          // console.log(response.data.teacherLevel);
          this.TeacherLevel = response.data.teacherLevel
          //  console.log(this.TeacherLevel);
          
        })
        .catch(response => {
          console.log(response.data.message);
        });
    }
  }
};
</script>
