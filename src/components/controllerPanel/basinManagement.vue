<template>
  <div class="basinManagement">
    <div style="padding:30px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>基本信息管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="19">
          <div style="text-align:left;margin-top:30px;">
            <el-alert
              title="注意"
              type="warning"
              description="请谨慎修改基本信息信息"
              show-basin
              close-text="知道了"
            ></el-alert>

            <el-table border :data="basins" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="序号" width="70" type="index"></el-table-column>
              <el-table-column
                align="center"
                label="标题"
                prop="siteTitile"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="副标题"
                prop="siteSubtitle"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="站点描述"
                prop="siteDescription"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="站点logo"
                prop="siteLogo"
              
              >
                <template slot-scope="scope">
                  <el-image
                    :src="scope.row.siteLogo"
                    fit="cover"
                    style="width:50px;height:50px;border-radius:50%;"
                    :preview-src-list="srcList1"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="站长头像"
                prop="siteAvatar"
                
              >
                <template slot-scope="scope">
                  <el-image
                    :src="scope.row.siteAvatar"
                    fit="cover"
                    style="width:50px;height:50px;border-radius:50%;"
                    :preview-src-list="srcList2"
                  ></el-image>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    basin="el-basin-edit"
                    @click.native.prevent="editbasin(scope.$index,basins)"
                  >修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 修改基本信息 -->
      <el-dialog title="修改基本信息信息" :visible.sync="modifysite_basinVisible">
        <div style="text-align:left;">
          <p>请修改站点logo</p>
          <div style="text-align:left">
            <singlePic ref="addImg1"></singlePic>
          </div>
          <p>请修改站点站长头像</p>
          <div style="text-align:left">
            <singlePic1 ref="addImg2"></singlePic1>
          </div>

          <p>标题</p>
          <el-input placeholder="请输入标题" v-model="site_basinTitle"></el-input>
          <p>副标题</p>
          <el-input placeholder="请输入副标题" v-model="site_basinSubtitle"></el-input>
          <p>站点描述</p>
          <el-input placeholder="请输入描述" v-model="site_basinDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="modifysite_basinVisible=false">取消</el-button>
          <el-button @click="confirmModifysite_basin" type="primary">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import singlePic from "../singlePic.vue";
import singlePic1 from "../singlePic1.vue";
export default {
  name: "basinManagement",
  components: {
    singlePic,
    singlePic1
  },
  data() {
    return {
      basins: "",
      site_basinTitle: "",
      site_basinSubtitle: "",
      site_basinDescription: "",
      modifysite_basinVisible: false,
      addImagUrl1: "",
      addImagUrl2: "",
      basinId: "",
      srcList1: [],
      srcList2: []
    };
  },
  mounted() {
    this.axios.get("/site").then(res => {
      this.basins = Array(res.data.data);
      this.srcList1.push(res.data.data.siteLogo);
    this.srcList2.push(res.data.data.siteAvatar);
    });
    
    
  },
  methods: {
    // 更新基本信息
    refreshbasins() {
      this.axios.get("/site").then(res => {
        this.basins = Array(res.data.data);
        console.log(res);
      });
    },

    //    获取基本信息
    editbasin(index, basins) {
      this.modifysite_basinVisible = true;
      let id = basins[index].siteId;
      for (let item of this.basins) {
        if (id == item.siteId) {
          this.site_basinTitle = item.siteTitile;
          this.site_basinSubtitle = item.siteSubtitle;
          this.site_basinDescription = item.siteDescription;

          this.$refs.addImg1.picSrc = item.siteLogo;
          this.$refs.addImg2.picSrc = item.siteAvatar;
        }
      }
      this.basinId = id;
    },
    //    修改基本信息信息
    confirmModifysite_basin() {
      if (
        this.site_basinTitle.length !== 0 &&
        this.site_basinSubtitle.length !== 0 &&
        this.site_basinDescription.length !== 0
      ) {
        let body = {
          siteTitile: this.site_basinTitle,
          siteLogo: this.$refs.addImg1.picSrc,
          siteAvatar: this.$refs.addImg2.picSrc,
          siteSubtitle: this.site_basinSubtitle,
          siteDescription: this.site_basinDescription,
          siteId: this.basinId
        };
        this.axios.put("/site", body).then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.refreshbasins();
          this.modifysite_basinVisible = false;
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