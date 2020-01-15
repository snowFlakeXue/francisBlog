<template>
  <div class="iconManagement">
    <div style="padding:30px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>图标管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="19">
          <div style="text-align:left;margin-top:30px;">
            <el-alert title="注意" type="warning" description="请谨慎修改图标信息" show-icon close-text="知道了"></el-alert>
            <el-button style="margin-top:30px;" type="primary" @click="add">添加图标</el-button>

            <el-table border :data="icons" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="序号" width="70" type="index"></el-table-column>
              <el-table-column
                align="center"
                label="图标名"
                prop="siteIconName"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="链接"
                prop="siteIconUrl"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="图标"
                prop="siteIconValue"
                :show-overflow-tooltip="true"
              >
              
                  <template slot-scope="scope"><svg class="icon" aria-hidden="true"><use :xlink:href="scope.row.siteIconValue"></use></svg></template>


              </el-table-column>
              <el-table-column
                align="center"
                label="图标描述"
                prop="siteIconDescription"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-edit"
                    @click.native.prevent="editIcon(scope.$index,icons)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click.native.prevent="deletesite_icon(scope.$index,icons)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 添加图标 -->
      <el-dialog title="添加图标" :visible.sync="addIconVisible">
        <div style="text-align:left;">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in Icon"
              :key="item.value"
              :label="item.label"
              :value="item.value"
             
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px"><svg class="icon" aria-hidden="true">
  <use :xlink:href="item.value"></use>
</svg></span>
            </el-option>
          </el-select>
          <p>图标名称</p>
          <el-input placeholder="请输入图标名称" v-model="site_iconName"></el-input>
          <p>链接</p>
          <el-input placeholder="请输入链接" v-model="site_iconUrl"></el-input>
          <p>图标描述</p>
          <el-input placeholder="请输入描述" v-model="site_iconDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="addIconVisible=false">取消</el-button>
          <el-button @click="confirmAddsite_icon" type="primary">添加</el-button>
        </div>
      </el-dialog>
      <!-- 修改图标信息 -->
      <el-dialog title="修改图标信息" :visible.sync="modifysite_iconVisible">
        <div style="text-align:left;">
          <el-select v-model="modifyValue" placeholder="请选择">
            <el-option
              v-for="item in Icon"
              :key="item.value"
              :label="item.label"
              :value="item.value"
             
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px"><svg class="icon" aria-hidden="true">
  <use :xlink:href="item.value"></use>
</svg></span>
            </el-option>
          </el-select>
          <p>图标名称</p>
          <el-input placeholder="请输入图标名称" v-model="site_iconName"></el-input>
          <p>链接</p>
          <el-input placeholder="请输入链接" v-model="site_iconUrl"></el-input>
          <p>图标描述</p>
          <el-input placeholder="请输入描述" v-model="site_iconDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="modifysite_iconVisible=false">取消</el-button>
          <el-button @click="confirmModifysite_icon" type="primary">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import iconfont from "@/components/iconfont.js";
export default  {
  name: "iconManagement",
  components: {
    iconfont
  },
  data() {
    return {
      
      icons: "",
      Icon:[{
         value:"#icon-weixin",
         label:"#icon-weixin"
      },
      {
         value:"#icon-Facebook",
         label:"#icon-Facebook"
      },
      {
         value:"#icon-momo",
         label:"#icon-momo"
      },
      {
         value:"#icon-tuite",
         label:"#icon-tuite"
      },
      {
         value:"#icon-weibo",
         label:"#icon-weibo"
      },
      {
         value:"#icon-QQ",
         label:"#icon-QQ"
      },
       {
         value:"#icon-github",
         label:"#icon-github"
      }
      ],
     
      addIconVisible: false,
      site_iconName: "",
      site_iconUrl: "",
      site_iconDescription: "",
      modifysite_iconVisible: false,
      addImagUrl: "",
      value:"",
      modifyValue:"",
      iconId:""
    };
  },
  mounted() {
    
    this.axios.get("/site_icon").then(res => {
      this.icons = res.data.data;
      
    //   for(let i=0;i<res.data.data.length;i++){
    //       this.Icon[i].value=res.data.data[i].siteIconValue;
    //       this.Icon[i].label=res.data.data[i].siteIconName;
    //   }
      
    });
  },
  methods: {
    // 更新图标信息
    refreshicons() {
      this.axios.get("/site_icon").then(res => {
        this.icons = res.data.data;
        console.log(res);
      });
    },
 
    remove() {
        this.site_iconName = "",
        this.site_iconUrl = "",
        this.site_iconDescription = "",
        this.value = "";
    },
    add() {
      this.addIconVisible = true;
      this.remove();
    },
    // 添加图标
    confirmAddsite_icon() {
 
      if (
        this.site_iconName.length !== 0 ||
        this.site_iconUrl.length !== 0 ||
        this.value.length !== 0 ||
        this.site_iconDescription.length !== 0
      ) {
        let body = {
          siteIconName : this.site_iconName,
          siteIconColor: "",
          siteIconUrl: this.site_iconUrl,
          siteIconDescription: this.site_iconDescription,
          siteIconValue:this.value
        };
        this.axios.post("/site_icon", body).then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.refreshicons();
        });
        this.addIconVisible = false;
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    deletesite_icon(index, icons) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.icons[index].siteIconId;
        this.axios.delete("/site_icon/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshicons();
        });
      });
    },
    //    获取图标信息
    editIcon(index, icons) {
      this.modifysite_iconVisible = true;
      let id = icons[index].siteIconId;
      for (let item of this.icons) {
        if (id == item.siteIconId) {
          this.site_iconName = item.siteIconName;
          this.site_iconUrl = item.siteIconUrl;
          this.modifyValue = item.siteIconValue;
          this.site_iconDescription = item.siteIconDescription;
          
        }
      }
      this.iconId=id;
    },
    //    修改图标信息
    confirmModifysite_icon() {
      if (
        this.site_iconName.length !== 0 &&
        this.site_iconUrl.length !== 0 &&
        this.site_iconDescription.length !== 0
      ) {
        
        let body = {
          siteIconName : this.site_iconName,
          siteIconColor: "",
          siteIconUrl: this.site_iconUrl,
          siteIconDescription: this.site_iconDescription,
          siteIconValue:this.modifyValue,
          siteIconId:this.iconId
        };
        this.axios.put("/site_icon", body).then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.refreshicons();
          this.modifysite_iconVisible = false;
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
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size:20px;
}
</style>