<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://upload-z2.qiniup.com"
      :accept="accept"
      list-type="picture-card"
      :data="uptoken"
      :limit="1"
      :before-upload="beforeAvatarUpload"
      :on-success="handleSuccessChange"
      :on-error="handleError"
      :on-preview="handlePictureCardPreview"
      ref="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
</template>

<script>
let configration = require("./configration");
export default {
  data() {
    return {
      accept: "image/jpeg,image/gif,image/png,image/bmp",
      uptoken: {
        token: "",
        key: ""
      },
      //图片外链
      picSrc: "",
       dialogImageUrl: '',
        dialogVisible: false
     
    };
  },
  methods: {
     handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    //清空当前选中图片
    remove() {
      this.$refs.upload.clearFiles();
      
    },
   // 存储预处理
    beforeAvatarUpload(file) {
     
      const isSize = new Promise(function(resolve, reject) {
        let width = 3600;
        let height = 3600;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width <= width && img.height <= height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
        
          return file;
        },
        () => {
          this.$message.error("图片像素太大");
          return Promise.reject();
        }
      );
      return isSize;
    },
    //上传成功后执行
    handleSuccessChange(response) {
      //上传成功后在图片框显示图片
   
      //http://puq6mpm87.bkt.clouddn.com/1563357848
      //获取资源外链
      this.picSrc = configration.domainName+ this.uptoken.key;
      console.log(this.picSrc)
      //重置token与key
     
    },
    //上传失败后执行
    handleError() {
      alert("上传失败");
    },
    //初始化token与key
    initialization() {
      this.axios.get("/token").then(response => {
        this.uptoken.token = response.data.data;
        // 用时间戳作为文件名
        this.uptoken.key = Math.round(new Date() / 1000);
      });
    }
  },
  mounted() {
    //初始化token与key
    this.axios.get("/token").then(response => {
      this.uptoken.token = response.data.data;
      console.log(response.data.data);
      this.uptoken.key = Math.round(new Date() / 1000);
    });
  }
};
</script>

<style scoped>
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

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>