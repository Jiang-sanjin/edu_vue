<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>

        <!--
          v-show：是否显示上传组件
          :key：类似于id，如果一个页面多个图片上传控件，可以做区分
          :url：后台上传的url地址
          @close：关闭上传组件
          @crop-upload-success：上传成功后的回调 -->
        <image-cropper v-show="imagecropperShow" :width="300" :height="300" :key="imagecropperKey"
          :url="BASE_API+'/oss/file/upload'" field="file" @close="close" @crop-upload-success="cropSuccess" />

      </el-form-item>

      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="讲师职称">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option v-for="item in TeacherLevel" :key="item.id" :label="item.name" :value="item.id">

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from "@/api/edu/teacher";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

// 初始化参数
const defaultFrom = {
  name: "",
  sort: 0,
  level: 0,
  career: "",
  intro: "",
  avatar: "http://img.sanjin.work/avatar/40A61AF8FEDD5B297500347AC385D702.jpg"
};

export default {
  
  // 声明插件
  components: { ImageCropper, PanThumb },

  data() {
    return {
      TeacherLevel: [], //教师职称
      teacher: defaultFrom,
      saveBtnDisabled: false, // 不启用disabled， 保存按钮为亮色

      // 上传图片
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0 // 上传组件id
    };
  },
  // watch的作用可以监控一个值的变换,并调用因为变化需要执行的方法。
  //监听路由是否发生变化
  watch: {
    $route(to, from) {
      //当监听的路由这个方法执行的时候，
      //我们是不是判断此路由过来的参数是否存在，
      //如果不存在，那就说明是新增
      //如果存在那么说明修改过来的
      this.init();
    }
  },
  created() {
    // 在加载的时候执行了这个方法，可以调用这个根据ID来插叙的方法
    // 执行此方法、获取我们的参数
    this.init();
    this.getTeacherLevel()
  },
  methods: {
    init() {
      // 判断是否有参数
      if (this.$route.params && this.$route.params.id) {
        // 当加载页面的时候就要获取参数的值了
        this.selectById(this.$route.params.id);
      } else {
        //this.teacher = defaultFrom
        // 没有参数  清空
        this.teacher = { ...defaultFrom };
      }
    },
    // 1、 怎么判断是否是新增还是修改
    // 2、 根据teacher.id来判断

    saveOrUpdate() {
      //当点击按钮的时候，让保存按钮为浅色， 不启用
      this.saveBtnDisabled = true;
      //判断teacher.id是否存在  存在则为修改
      if (this.teacher.id) {
        this.updateById();
      } else {
        this.save();
      }
    },
    save() {
      
      teacher
        .save(this.teacher)
        .then(response => {
          return this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .then(response => {
          this.$router.push({ path: "/teacher/list" });
        })
        .catch(response => {
          return this.$message({
            type: "error",
            message: "保存失败!"
          });
        });
    },
    updateById() {
      teacher
        .updateById(this.teacher)
        .then(response => {
          //修改提示
          this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .then(response => {
          this.$router.push({ path: "/teacher/list" });
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: response.data.message
          });
        });
    },
    selectById(id) {
      teacher
        .selectById(id)
        .then(response => {
          this.teacher = response.data.teacher;
          // console.log(this.teacher.teacherLevel.name)
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: "获取失败"
          });
        });
    },
    close() {
      //关闭上传框
      this.imagecropperShow = false;
      //给框id修改
      this.imagecropperKey = this.imagecropperKey + 1;
    },

    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data);
      this.imagecropperShow = false;
      this.teacher.avatar = data.url;
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    getTeacherLevel() {
      teacher
        .getTeacherLevel()
        .then(response => {
          console.log(response.data.teacherLevel);
          this.TeacherLevel = response.data.teacherLevel;
          //  console.log(this.TeacherLevel);
        })
        .catch(response => {
          console.log(response.data.message);
        });
    }
  }
};
</script>

