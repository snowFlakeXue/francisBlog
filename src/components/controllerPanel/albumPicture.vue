<template>
  <div class="albumManagement">
    <div style="padding:10px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div style="text-align:left;margin-top:1px;">
            <el-button style="margin-top:15px;" type="primary" @click="add">添加图片</el-button>
            <el-table border :data="pagePictureList" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="图片ID" width="70" prop="albumPictureId"></el-table-column>
              <el-table-column
                align="center"
                label="所属相册"
                prop="albumName"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="图片名称"
                prop="albumPictureName"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column align="center" label="图片描述" prop="albumPictureDescription"></el-table-column>
              <el-table-column align="center" label="图片预览" prop="albumPictureUrl">
                <template slot-scope="scope">
                  <el-image
                    :src="scope.row.albumPictureUrl"
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
                    @click.native.prevent="editalbum(scope.$index,pictureList)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click.native.prevent="deletealbum(scope.$index,pictureList)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination background layout="prev, pager, next" :page-size="3" :total="pictureList.length" @current-change="pageChange"></el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="添加图片" :visible.sync="addalbumVisible">
        <div style="text-align:left;">
          <div style="text-align:left">
            <p>请上传图片</p>
            <singlePic ref="addImg"></singlePic>
          </div>
          <p>图片名称</p>
          <el-input placeholder="请输入图片名称" v-model="albumPictureName"></el-input>
          <p>图片描述</p>
          <el-input placeholder="请输入图片描述" v-model="albumPictureDescription"></el-input>
          <p>请选择图片所属相册</p>
          <el-select
            value-key="albumId"
            v-model="selectAlbumName"
            placeholder="请选择"
            @change="change"
          >
            <el-option
              v-for="item in albumList"
              :key="item.albumId"
              :label="item.albumName"
              :value="item.albumId"
            ></el-option>
          </el-select>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="addalbumVisible=false">取消</el-button>
          <el-button @click="confirmAddalbum" type="primary">添加</el-button>
        </div>
      </el-dialog>
      <!-- 修改相册信息 -->
      <el-dialog title="修改图片信息" :visible.sync="modifyalbumVisible">
        <div style="text-align:left;">
          <div style="text-align:left">
            <p>请添加图片</p>
            <singlePic ref="addImg"></singlePic>
          </div>
          <p>相册名称</p>
          <el-input placeholder="请输入相册图片名称" v-model="albumPictureName"></el-input>
          <p>描述</p>
          <el-input placeholder="请输入相册图片描述" v-model="albumPictureDescription"></el-input>
          <p>请选择图片所属相册</p>
          <el-select
            value-key="albumId"
            v-model="selectAlbumName"
            placeholder="请选择"
            @change="change"
          >
            <el-option
              v-for="item in albumList"
              :key="item.albumId"
              :label="item.albumName"
              :value="item.albumId"
            ></el-option>
          </el-select>
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
      // 相册图片列表，存放所有信息
      pictureList: [],
      pagePictureList: [],
      // 相册列表
      albumList: [],
      // 被选中的相册名称
      selectAlbumName: "",
      // 被选中添加的相册id
      addAlbumId: "",
      // 添加模态框是否隐藏
      addalbumVisible: false,
      // 添加和修改时的相册图片名称设置
      albumPictureName: "",
      // 添加和修改时的相册图片描述设置
      albumPictureDescription: "",
      // 修改模态框是否隐藏
      modifyalbumVisible: false,
      // 添加时的图片路径
      addImagUrl: "",
      albumPictureId: ""
    };
  },
  mounted() {
    this.axios.get("/album_picture").then(res => {
      this.pictureList = res.data.data;
      this.pagePictureList = this.pictureList.slice(0,3);
    });
    this.axios.get("/album").then(res => {
      this.albumList = res.data.data;
      this.selectAlbumName = this.albumList[0].albumName;
      this.addAlbumId = this.albumList[0].albumId;
    });
  },
  methods: {
    pageChange(currentPage) {
      this.pagePictureList = this.pictureList.slice((currentPage-1)*3,currentPage*3)
    },
    // 改变时的回调函数，回调参数为id
    change(result) {
      this.addAlbumId = result;
    },
    // 更新相册信息
    refreshalbums() {
      this.axios.get("/album_picture").then(res => {
        this.pictureList = res.data.data;
      });
    },
    remove() {
      this.addAlbumId = "";
      this.albumPictureName = "";
      this.albumPictureDescription = "";
      this.selectAlbumName = "";
      this.$refs.addImg.picSrc = " ";
      this.addImagUrl = "";
    },
    add() {
      this.addalbumVisible = true;
      this.remove();
    },
    // 添加图片
    confirmAddalbum() {
      this.addImagUrl = this.$refs.addImg.picSrc;

      if (
        this.albumPictureName.length !== 0 ||
        this.albumPictureDescription.length !== 0
      ) {
        let body = {
          albumPictureCategory: this.addAlbumId,
          albumPictureName: this.albumPictureName,
          albumPictureDescription: this.albumPictureDescription,
          albumPictureUrl: this.addImagUrl
        };

        this.axios.post("/album_picture", body).then(res => {
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
    deletealbum(index, pictureList) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.pictureList[index].albumPictureId;
        this.axios.delete("/album_picture/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshalbums();
        });
      });
    },
    // 获取图片信息
    editalbum(index, pictureList) {
      this.modifyalbumVisible = true;
      let id = pictureList[index].albumPictureId;
      for (let item of this.pictureList) {
        if (id == item.albumPictureId) {
          this.albumPictureName = item.albumPictureName;
          this.albumPictureDescription = item.albumPictureDescription;
          this.selectAlbumName = item.albumName;
          this.addAlbumId = item.albumPictureCategory;
          this.addImagUrl = item.albumPictureUrl;
        }
      }
      this.albumPictureId = id;
    },
    //    修改相册信息
    confirmModifyalbum() {
      if (
        this.albumPictureName.length !== 0 &&
        this.albumPictureDescription.length !== 0
      ) {
        let body = {
          albumPictureName: this.albumPictureName,
          albumPictureDescription: this.albumPictureDescription,
          albumPictureCategory: this.addAlbumId,
          albumPictureUrl: this.$refs.addImg.picSrc,
          albumPictureId: this.albumPictureId
        };
        this.axios.put("/album_picture", body).then(res => {
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