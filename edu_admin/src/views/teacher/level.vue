<template>
  <div class="app-container">
    <div style="width: 54% ;margin-bottom: 20px">
      <el-input v-model="Level.name" style="width: 300px" prefix-icon="el-icon-plus" placeholder="添加职称...">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" @click="addLevel">添加</el-button>
    </div>

    <div>
      <el-table v-loading="listLoading" :data="TeacherLevel" element-loading-text="数据加载中" border fit
        highlight-current-row style="width: 60%">
        <el-table-column prop="id" label="序号" width="180" align="center">

        </el-table-column>

        <el-table-column prop="name" label="职称" width="300">

        </el-table-column>

        <el-table-column label="操作" width="400" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditView(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteHandler(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑职称" :visible.sync="dialogVisible" width="30%">
      <div>
        <table>
          <tr>
            <td>
              <el-tag>职称名</el-tag>
            </td>
            <td>
              <el-input v-model="updateLevel.name" size="small"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//引用teacher.js
import teacher from "@/api/edu/teacher";
export default {
  // 定义数据变量
  data() {
    return {
      listLoading: false, // 是否显示loading信息
      TeacherLevel: [], //教师职称
      Level: {
        id: "",
        name: ""
      },
      updateLevel: {
        name: ""
      },
      dialogVisible: false
    };
  },
  //初始化， 在加载的时候执行
  created() {
    this.getTeacherLevel();
  },
  //存放方法的
  methods: {
    getTeacherLevel() {
      teacher
        .getTeacherLevel()
        .then(response => {
          // console.log(response.data.teacherLevel);
          this.TeacherLevel = response.data.teacherLevel;
          console.log(this.TeacherLevel);
        })
        .catch(response => {
          console.log(response.data.message);
        });
    },
    //添加职称
    addLevel() {
      if (this.Level && this.Level.name) {
        teacher
          .addLevel(this.Level)
          .then(response => {
            // console.log(response);

            return this.$message({
              type: "success",
              message: "保存成功!"
            });
          })
          .then(response => {
            //重新加载页面
            this.getTeacherLevel();
          })
          .catch(response => {
            return this.$message({
              type: "error",
              message: "保存失败!"
            });
          });
      }
    },

    //显示修改职称
    showEditView(data) {
      //展示数据
      Object.assign(this.updateLevel, data);
      this.dialogVisible = true;
    },

    //修改职称
    doUpdate() {
      teacher
        .updateLevel(this.updateLevel)
        .then(response => {
          //修改提示
          this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .then(response => {
          //重新加载页面
            this.getTeacherLevel();
            this.dialogVisible = false;
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: response.data.message
          });
        });
    },
    deleteHandler(data) {
      console.log(data.id);
      //删除
      this.$confirm(
        "此操作将永久删除【" + data.name + "】职称, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          return teacher.deleteLevel(data.id);
        })
        .then(() => {
          //已经向后台发送请求了并且是正确的了
          this.$message({
            type: "success",
            message: "删除成功"
          });
          //刷新页面
          this.getTeacherLevel();
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
    }
  }
};
</script>