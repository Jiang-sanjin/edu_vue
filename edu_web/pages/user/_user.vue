<template>

  <div class="u-r-cont">
    <el-tabs v-model="activeName">
      <el-tab-pane class="current" label="基本资料" name="first">
        <section>

          <!-- 表格 -->
          <el-form label-width="120px" style="margin-right: 50%;">
            <el-form-item label="昵称">
              <el-input v-model="userInfo.nickname" />
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="userInfo.sex" clearable placeholder="请选择">
                <!--
                数据类型一定要和取出的json中的一致，否则没法回填
                value使用动态绑定的值，性别由1 2代替
              -->
                <el-option :value="1" label="女" />
                <el-option :value="2" label="男" />
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userInfo.email" :disabled="true" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="userInfo.mobile" />
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="userInfo.age" :min="0" controls-position="right" />
            </el-form-item>

            <!-- 头像 -->
            <el-form-item label="头像">
              <el-upload :show-file-list="true" :on-success="handleAvatarSuccess" :on-error="handleAvatarError"
                :before-upload="beforeAvatarUpload" class="avatar-uploader"
                action="http://localhost:9000/oss/file/upload">
                <img v-if="userInfo.avatar" :src="userInfo.avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="用户签名">
              <el-input v-model="userInfo.sign" :rows="8" type="textarea" />
              <!-- <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="userInfo.sign">
            </el-input> -->
            </el-form-item>

            <el-form-item>
              <el-button :disabled="saveBtnDisabled" type="primary" @click="save">保存</el-button>
            </el-form-item>
          </el-form>

        </section>
      </el-tab-pane>
      <el-tab-pane class="current" label="密码设置" name="second">
        <section>

          <!-- 邮箱 -->
          <div style="margin-right: 50%;">
            <el-form label-width="120px" :model="params">
              <el-form-item label="邮箱" prop="email" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]">
                <div>
                  <el-input type="text" placeholder="请输入邮箱" v-model="params.email" />
                  <i class="iconfont icon-phone" />
                </div>
              </el-form-item>

              <!-- 验证码 -->
              <el-form-item label="验证码" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
                <div style="width: 100%;display: block;float: right;position: relative">
                  <el-input type="text" placeholder="验证码" v-model="params.code" />
                  <i class="iconfont icon-phone" />
                </div>
                <div class="btn" style="position:absolute;right: 0;top: 6px;width: 20%;">
                  <a href="javascript:" type="button" @click="getCodeFun()" :value="codeTest"
                    style="border: none;background-color: none">{{codeTest}}</a>
                </div>
              </el-form-item>

              <!-- 密码 -->
              <el-form-item label="新密码" prop="password"
                :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                <div>
                  <el-input type="password" placeholder="设置新密码" v-model="params.password" />
                  <i class="iconfont icon-password" />
                </div>
              </el-form-item>

              <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="submitChange()">修改
                </el-button>
              </el-form-item>
            </el-form>
          </div>

        </section>
      </el-tab-pane>

    </el-tabs>

  </div>

</template>
<script>
//引入调用login.js文件
import loginApi from "@/api/login";
//引入调用js-cookie
import cookie from "js-cookie";
import registerApi from "@/api/register";
export default {
  data() {
    return {
      //用户信息
      activeName: "first",
      token: "",
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        email: "",
        nickname: "",
        sex: ""
      },
      userInfo: {
        id: "",
        age: "",
        avatar: "",
        email: "",
        mobile: "",
        nickname: "",
        sex: "",
        sign: ""
      },
      saveBtnDisabled: false, //保存按钮是否禁用

      // 上传图片

      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id

      //修改密码
      params: {
        //封装注册输入的数据
        email: "", //手机号
        code: "", //验证码
        nickname: "", //昵称
        password: ""
      },
      sending: true, //是否发送验证码
      second: 60, //倒计时间
      codeTest: "获取验证码"
    };
  },
  created() {
    this.showInfoFromCookie();
  },

  methods: {
    save() {
      loginApi.updateUser(this.userInfo).then(response => {
        //修改成功
        //提示成功
        this.$message({
          type: "success",
          message: "修改成功！ 🧙‍♂️"
        });
        //刷新cookie存储的user数据
        this.updateUserCookie();
      });
    },
    //头像
    // 文件上传成功
    handleAvatarSuccess(response) {
      if (response.success) {
        this.userInfo.avatar = response.data.url;
        // 强制重新渲染
        this.$forceUpdate();
      } else {
        this.$message.error("上传失败! （非20000）");
      }
    },

    // 文件上传失败（http）
    handleAvatarError() {
      this.$message.error("上传失败! （http失败）");
    },

    // 上传校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt3M;
    },

    //从cookie中获取用户信息
    showInfoFromCookie() {
      //从cookie中获取用户信息
      var userStr = cookie.get("edu_user");
      //userStr是字符串   需要转换为json对象
      if (userStr) {
        this.loginInfo = JSON.parse(userStr);
      }
      loginApi.getUserInfo(this.loginInfo.id).then(response => {
        this.userInfo = response.data.userInfo;
      });
    },
    //刷新cookie存储的user数据
    updateUserCookie() {
      loginApi.getMemberInfo().then(res => {
        this.loginInfo = res.data.userInfo;
        cookie.set("edu_user", this.loginInfo, { domain: "localhost" });
      });
    },

    //验证码
    //给已经输入的手机号发送验证码
    getCodeFun() {
      registerApi.sendCode(this.params.email).then(response => {
        //点完发送  60秒内不让再发
        this.sending = false;
        //调用倒计时的方法
        this.timeDown();
      });
    },

    //定时器  发送验证码倒数
    timeDown() {
      let result = setInterval(() => {
        //setInterval定时器
        --this.second;
        this.codeTest = this.second;
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          //this.disabled = false;
          this.second = 60;
          this.codeTest = "获取验证码";
        }
      }, 1000);
    },
    //修改密码提交的方法
    submitChange() {
      loginApi.ChangePassword(this.params).then(response => {
        // //提示注册成功
        // this.$message({
        //   type: "success",
        //   message: "注册成功! ✌"
        // });
        //跳转到登陆页面
        this.$router.push({
          path: "/login"
        });
      });
    }
  }
};
</script>

<style>
.el-tabs__item {
  font-size: 25px;
  color: black;
  margin-top: 50px;
  height: 0px;
  line-height: 0px;
  opacity: 0.7;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
