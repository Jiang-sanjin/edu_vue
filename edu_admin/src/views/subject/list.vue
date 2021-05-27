<template>
  <div class="app-container" style="width: 500px">
    <el-input v-model="filterText" placeholder="输入课程进行搜索" prefix-icon="el-icon-search" style="margin-bottom:30px;" />

    <el-button type="primary" @click="dialogFormVisible = true" size="mini" style="margin-bottom:10px">添加一级分类
    </el-button>

    <el-tree ref="subjectTree" :data="subjectList" :props="defaultProps" :filter-node-method="filterNode"
      :expand-on-click-node="false" class="filter-tree" default-expand-all node-key="id" style="width: 300px ">
      <span slot-scope="{ node, data }" class="custom-tree-node"
        style=" display: flex;justify-content: space-between;width: 100%; ">
        <span>{{ node.label }}</span>
        <span>
          <el-button v-if="node.level == 1" type="primary" class="depBtn"
            @click="() => {dialogFormVisible = true; subject.parent_id = data.id}">添加二级分类</el-button>

          <el-button class="depBtn" type="danger" @click="() => remove(node, data)">
            删除</el-button>

        </span>
      </span>
    </el-tree>

    <!-- 添加分类 -->
    <el-dialog :visible.sync="dialogFormVisible" title="添加分类">
      <el-form :model="subject" label-width="80px">
        <el-form-item label="分类标题">
          <el-input v-model="subject.title" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="append()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import subject from "@/api/edu/subject";
export default {
  data() {
    return {
      filterText: "", //搜索的数据
      subjectList: [], //展示的数据
      defaultProps: {
        children: "children",
        label: "title"
      },
      dialogFormVisible: false,
      subject: {
        title: "",
        parent_id: ""
      }
    };
  },

  watch: {
    //监听搜索框
    filterText(val) {
      this.$refs.subjectTree.filter(val);
    },
    // 监听对话框是否开启，关闭时清空数据
    dialogFormVisible() {
      if (this.dialogFormVisible === false) {
        this.subject.title = "";
        this.parent_id = "";
      }
    }
  },

  created() {
    this.fetchNodeList();
  },

  methods: {
    fetchNodeList() {
      subject.getNestedTreeList().then(response => {
        if (response.success === true) {
          this.subjectList = response.data.subjectList;
        }
      });
    },
    filterNode(value, data) {
      // if (!value) return true;
      // return data.title.indexOf(value) !== -1;
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1; //忽略大小写
    },
    // 删除
    remove(node, data) {
      console.log(node);
      console.log(data);

      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return subject.removeById(data.id);
        })
        .then(() => {
          // this.fetchNodeList()// 刷新列表
          this.$refs.subjectTree.remove(node); // 删除节点（效率高）
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(response => {
          // 失败
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
    // 判断存储一级菜单还是二级菜单
    append(data) {
      console.log("id" + this.subject.parent_id);
      if (!this.subject.parent_id) {
        this.appendLevelOne();
      } else {
        this.appendLevelTwo();
      }
    },
    // 添加一级菜单
    appendLevelOne() {
      subject
        .saveLevelOne(this.subject)
        .then(response => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .then(response => {
          this.dialogFormVisible = false; // 如果保存成功则关闭对话框
          this.subject.title = ""; // 重置类别标题
          this.fetchNodeList(); // 刷新列表
        })
        .catch(response => {
          // console.log(response)
          this.$message({
            type: "error",
            message: "保存失败"
          });
        });
    },

    //添加二级菜单
    appendLevelTwo() {
      subject
        .saveLevelTwo(this.subject)
        .then(response => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .then(response => {
          this.dialogFormVisible = false; // 如果保存成功则关闭对话框
          this.fetchNodeList(); // 刷新列表
          this.subject.title = ""; // 重置类别标题
          this.subject.parent_id = ""; // 重置表单parent_id
        })
        .catch(response => {
          // console.log(response)
          this.$message({
            type: "error",
            message: response.data.message
          });
        });
    }
  }
};
</script>


<style>
.depBtn {
  padding: 3px;
}
</style>