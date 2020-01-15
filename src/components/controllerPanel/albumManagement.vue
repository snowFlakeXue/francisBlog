<template>
  <div class="albumManagement">
    <div style="padding:30px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="19">
          <div style="text-align:left;margin-top:30px;">
            <el-alert title="注意" type="warning" description="请谨慎修改相册信息" show-icon close-text="知道了"></el-alert>
            <el-button style="margin-top:30px;" type="primary" @click="add">添加相册</el-button>

            <el-table border :data="albums" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="序号" width="70" type="index"></el-table-column>
              <el-table-column align="center" label="相册名称" prop="albumName" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column align="center" label="相册描述" prop="albumDescription" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column align="center" label="封面图片" prop="ablumCover">
                <template slot-scope="scope">
                  <el-image
                    :src="scope.row.ablumCover"
                    fit="cover"
                    style="width:100px;height:100px;padding:0px;maigin:0px;"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-edit"
                    @click.native.prevent="editalbum(scope.$index,albums)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click.native.prevent="deletealbum(scope.$index,albums)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="添加相册信息" :visible.sync="addalbumVisible">
        <div style="text-align:left;">
          <div style="text-align:left">
            <p>请添加相册封面</p>
            <singlePic ref="addImg"></singlePic>
          </div>
          <p>姓名</p>
          <el-input placeholder="请输入相册名称" v-model="albumName"></el-input>
          <p>描述</p>
          <el-input placeholder="请输入描述" v-model="albumDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="addalbumVisible=false">取消</el-button>
          <el-button @click="confirmAddalbum" type="primary">添加</el-button>
        </div>
      </el-dialog>
      <!-- 修改相册信息 -->
      <el-dialog title="修改相册信息" :visible.sync="modifyalbumVisible">
        <div style="text-align:left;">
          <div style="text-align:left">
            <p>请添加相册封面</p>
            <singlePic ref="addImg"></singlePic>
          </div>
          <p>相册名称</p>
          <el-input placeholder="请输入相册名称" v-model="albumName"></el-input>
          <p>描述</p>
          <el-input placeholder="请输入描述" v-model="albumDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="modifyalbumVisible=false">取消</el-button>
          <el-button @click="confirmModifyalbum" type="primary">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import singlePic from "../singlePic.vue";
export default {
  name: "albumManagement",
  components: {
    singlePic
  },
  data() {
    return {
      albums: "",
      addalbumVisible: false,
      albumName: "",
      albumDescription: "",
      modifyalbumVisible: false,
      addImagUrl: "",
      albumId:""
    };
  },
  mounted() {
    this.axios.get("/album").then(res => {
      this.albums = res.data.data;
    });
  },
  methods: {
    // 更新相册信息
    refreshalbums() {
      this.axios.get("/album").then(res => {
        this.albums = res.data.data;
        console.log(res);
      });
    },
    remove() {
        this.albumName="";
        this.albumDescription="";
        this.$refs.addImg.picSrc=" ";
        this.addImagUrl="";
    },
    add(){
      this.addalbumVisible=true;
       this.remove();
    },
    // 添加相册
    confirmAddalbum() {
     
      this.addImagUrl = this.$refs.addImg.picSrc;
     
      if (
        this.albumName.length !== 0 ||
        this.albumDescription.length !== 0
      ) {
        let body = {
          albumName: this.albumName,
          albumDescription: this.albumDescription,
          ablumCover: this.addImagUrl
        };
         
        this.axios.post("/album", body).then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.refreshalbums();
        });
        this.addalbumVisible = false;
    
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
   
    },
    deletealbum(index, albums) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.albums[index].albumId;
        this.axios.delete("/album/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshalbums();
        });
      });
    },
    //    获取相册信息
    editalbum(index, albums) {
      this.modifyalbumVisible = true;
      let id = albums[index].albumId;
      for (let item of this.albums) {
        if (id == item.albumId) {
          this.albumName = item.albumName;
          this.albumDescription = item.albumDescription;
          this.$refs.addImg.picSrc = item.ablumCover;
        }
      }
      this.albumId=id;
    },
    //    修改相册信息
    confirmModifyalbum() {
      if (
        this.albumName.length !== 0 &&
        this.albumDescription.length !== 0
      ) {
        let body = {
          albumName: this.albumName,
          albumDescription: this.albumDescription,
          ablumCover: this.$refs.addImg.picSrc,
          albumId:this.albumId
        };
        this.axios.put("/album", body).then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.refreshalbums();
          this.modifyalbumVisible = false;
        });
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
     
    }
  }
};
</script>


<style scoped>
</style>