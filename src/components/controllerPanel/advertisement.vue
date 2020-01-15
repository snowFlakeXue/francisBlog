<template>
  <div class="advertManagement">
    <div style="padding:30px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>广告管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="19">
          <div style="text-align:left;margin-top:30px;">
            <el-alert title="注意" type="warning" description="请谨慎修改广告信息" show-advert close-text="知道了"></el-alert>
            <el-button style="margin-top:30px;" type="primary" @click="add">添加广告</el-button>

            <el-table border :data="adverts" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="序号" width="70" type="index"></el-table-column>
              <el-table-column
                align="center"
                label="广告名称"
                prop="advertisementName"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="广告图片地址"
                prop="advertisementPicture"
                :show-overflow-tooltip="true"
              >
              <template slot-scope="scope">
                  <el-image
                    :src="scope.row.advertisementPicture"
                    fit="cover"
                    style="width:100px;height:100px"
                    :preview-src-list="srcList"
                  ></el-image>
                </template>
              
              </el-table-column>
              <el-table-column
                align="center"
                label="广告链接"
                prop="advertisementUrl"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="广告描述"
                prop="advertisementDescription"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    advert="el-advert-edit"
                    @click.native.prevent="editadvert(scope.$index,adverts)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    advert="el-advert-delete"
                    @click.native.prevent="deletesite_advert(scope.$index,adverts)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 添加广告 -->
      <el-dialog title="添加广告" :visible.sync="addadvertVisible">
         <p>请添加广告图片</p>
        <div style="text-align:left;">
          <div style="text-align:left">
            <singlePic ref="addImg"></singlePic>
          </div>
    
          <p>广告名称</p>
          <el-input placeholder="请输入广告名称" v-model="site_advertName"></el-input>
          <p>广告链接地址</p>
          <el-input placeholder="请输入广告链接地址" v-model="advertUrl"></el-input>
          <p>广告描述</p>
          <el-input placeholder="请输入描述" v-model="site_advertDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="addadvertVisible=false">取消</el-button>
          <el-button @click="confirmAddsite_advert" type="primary">添加</el-button>
        </div>
      </el-dialog>
      <!-- 修改广告信息 -->
      <el-dialog title="修改广告信息" :visible.sync="modifysite_advertVisible">
        <div style="text-align:left;">
           <p>请修改广告图片</p>
           <div style="text-align:left">
            <singlePic ref="addImg"></singlePic>
          </div>
    
          <p>广告名称</p>
          <el-input placeholder="请输入广告名称" v-model="site_advertName"></el-input>
          <p>广告链接地址</p>
          <el-input placeholder="请输入广告链接地址" v-model="advertUrl"></el-input>
          <p>广告描述</p>
          <el-input placeholder="请输入描述" v-model="site_advertDescription"></el-input>
            
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="modifysite_advertVisible=false">取消</el-button>
          <el-button @click="confirmModifysite_advert" type="primary">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import singlePic from "../singlePic.vue";
export default  {
  name: "advertManagement",
  components: {
    singlePic
  },
  data() {
    return {
      
      adverts: "",
     
     
      addadvertVisible: false,
      site_advertName: "",
      site_advertUrl: "",
      site_advertDescription: "",
      modifysite_advertVisible: false,
      addImagUrl: "",
      value:"",
      modifyValue:"",
      advertId:"",
      advertUrl:"",
      srcList: []
    };
  },
  mounted() {
    
    this.axios.get("/advertisement").then(res => {
      this.adverts = res.data.data;
      res.data.data.forEach(element => {
        this.srcList.push(element.advertisementPicture);
      });
    //   for(let i=0;i<res.data.data.length;i++){
    //       this.advert[i].value=res.data.data[i].siteadvertValue;
    //       this.advert[i].label=res.data.data[i].siteadvertName;
    //   }
      
    });
  },
  methods: {
    // 更新广告信息
    refreshadverts() {
      this.axios.get("/advertisement").then(res => {
        this.adverts = res.data.data;
        console.log(res);
      });
    },
 
    remove() {
        this.site_advertName = "",
        this.advertUrl = "",
        this.site_advertDescription = "",
        this.addImagUrl = "";
    },
    add() {
      this.addadvertVisible = true;
      this.remove();
    },
    // 添加广告
    confirmAddsite_advert() {
    this.addImagUrl = this.$refs.addImg.picSrc;
      if (
        this.site_advertName.length !== 0 ||
        this.advertUrl.length !== 0 ||
        this.addImagUrl.length !== 0 ||
        this.site_advertDescription.length !== 0
      ) {
        let body = {
          advertisementName : this.site_advertName,
          advertisementPicture: this.addImagUrl,
          advertisementUrl: this.advertUrl,
          advertisementDescription: this.site_advertDescription
        };
        this.axios.post("/advertisement", body).then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.refreshadverts();
        });
        this.addadvertVisible = false;
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    deletesite_advert(index, adverts) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.adverts[index].advertisementId;
        this.axios.delete("/advertisement/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshadverts();
        });
      });
    },
    //    获取广告信息
    editadvert(index, adverts) {
      this.modifysite_advertVisible = true;
      let id = adverts[index].advertisementId;
      for (let item of this.adverts) {
        if (id == item.advertisementId) {
          this.site_advertName = item.advertisementName;
          this.advertUrl = item.advertisementUrl;
          this.site_advertDescription = item.advertisementDescription;
         
          this.$refs.addImg.picSrc=item.advertisementPicture
          
        }
      }
      this.advertId=id;
  
    },
    //    修改广告信息
    confirmModifysite_advert() {
      if (
        this.site_advertName.length !== 0 &&
        this.advertUrl.length !== 0 &&
        this.site_advertDescription.length !== 0
      ) {
        
        let body = {
           advertisementName : this.site_advertName,
          advertisementPicture: this.$refs.addImg.picSrc,
          advertisementUrl: this.advertUrl,
          advertisementDescription: this.site_advertDescription,
          advertisementId:this.advertId
        };
        this.axios.put("/advertisement", body).then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.refreshadverts();
          this.modifysite_advertVisible = false;
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