<template>
  <div class="linkManagement">
    <div style="padding:30px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>友情链接管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="19">
          <div style="text-align:left;margin-top:30px;">
            <el-alert title="注意" type="warning" description="请谨慎修改友情链接信息" show-link close-text="知道了"></el-alert>
            <el-button style="margin-top:30px;" type="primary" @click="add">添加友情链接</el-button>

            <el-table border :data="links" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="序号" width="70" type="index"></el-table-column>
              <el-table-column
                align="center"
                label="友情链接名"
                prop="friendLinkName"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="链接地址"
                prop="friendLinkUrl"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="图标"
                prop="friendLinkIconValue"
                :show-overflow-tooltip="true"
              >
              
                  <template slot-scope="scope"><svg class="link" aria-hidden="true"><use :xlink:href="scope.row.friendLinkIconValue"></use></svg></template>


              </el-table-column>
              <el-table-column
                align="center"
                label="友情链接描述"
                prop="friendLinkDescription"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    link="el-link-edit"
                    @click.native.prevent="editlink(scope.$index,links)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    link="el-link-delete"
                    @click.native.prevent="deletesite_link(scope.$index,links)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 添加友情链接 -->
      <el-dialog title="添加友情链接" :visible.sync="addlinkVisible">
        <div style="text-align:left;">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in link"
              :key="item.value"
              :label="item.label"
              :value="item.value"
             
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px"><svg class="link" aria-hidden="true">
  <use :xlink:href="item.value"></use>
</svg></span>
            </el-option>
          </el-select>
          <p>友情链接名称</p>
          <el-input placeholder="请输入友情链接名称" v-model="site_linkName"></el-input>
          <p>链接地址</p>
          <el-input placeholder="请输入链接地址" v-model="site_linkUrl"></el-input>
          <p>友情链接描述</p>
          <el-input placeholder="请输入友情链接描述" v-model="site_linkDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="addlinkVisible=false">取消</el-button>
          <el-button @click="confirmAddsite_link" type="primary">添加</el-button>
        </div>
      </el-dialog>
      <!-- 修改友情链接信息 -->
      <el-dialog title="修改友情链接信息" :visible.sync="modifysite_linkVisible">
        <div style="text-align:left;">
          <el-select v-model="modifyValue" placeholder="请选择">
            <el-option
              v-for="item in link"
              :key="item.value"
              :label="item.label"
              :value="item.value"
             
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px"><svg class="link" aria-hidden="true">
  <use :xlink:href="item.value"></use>
</svg></span>
            </el-option>
          </el-select>
          <p>友情链接名称</p>
          <el-input placeholder="请输入友情链接名称" v-model="site_linkName"></el-input>
          <p>链接地址</p>
          <el-input placeholder="请输入链接地址" v-model="site_linkUrl"></el-input>
          <p>友情链接描述</p>
          <el-input placeholder="请输入友情链接描述" v-model="site_linkDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="modifysite_linkVisible=false">取消</el-button>
          <el-button @click="confirmModifysite_link" type="primary">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import iconfont from "@/components/iconfont.js";
export default  {
  name: "linkManagement",
  components: {
    iconfont
  },
  data() {
    return {
      
      links: "",
      link:[{
         value:"#icon-baidu",
         label:"#icon-baidu"
      },
      {
         value:"#icon-guge",
         label:"#icon-guge"
      }
      ],
     
      addlinkVisible: false,
      site_linkName: "",
      site_linkUrl: "",
      site_linkDescription: "",
      modifysite_linkVisible: false,
      value:"",
      modifyValue:"",
      linkId:""
    };
  },
  mounted() {
    
    this.axios.get("/site_friend_link").then(res => {
      this.links = res.data.data;
      
    //   for(let i=0;i<res.data.data.length;i++){
    //       this.link[i].value=res.data.data[i].sitelinkValue;
    //       this.link[i].label=res.data.data[i].sitelinkName;
    //   }
      
    });
  },
  methods: {
    // 更新友情链接信息
    refreshlinks() {
      this.axios.get("/site_friend_link").then(res => {
        this.links = res.data.data;
        console.log(res);
      });
    },
 
    remove() {
        this.site_linkName = "",
        this.site_linkUrl = "",
        this.site_linkDescription = "",
        this.value = "";
    },
    add() {
      this.addlinkVisible = true;
      this.remove();
    },
    // 添加友情链接
    confirmAddsite_link() {
 
      if (
        this.site_linkName.length !== 0 ||
        this.site_linkUrl.length !== 0 ||
        this.value.length !== 0 ||
        this.site_linkDescription.length !== 0
      ) {
        let body = {
          friendLinkName : this.site_linkName,
          friendLinkIconColor: "",
          friendLinkUrl: this.site_linkUrl,
          friendLinkDescription: this.site_linkDescription,
          friendLinkIconValue:this.value
        };
        this.axios.post("/site_friend_link", body).then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.refreshlinks();
        });
        this.addlinkVisible = false;
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    deletesite_link(index, links) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.links[index].friendLinkId;
        this.axios.delete("/site_friend_link/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshlinks();
        });
      });
    },
    //    获取友情链接信息
    editlink(index, links) {
      this.modifysite_linkVisible = true;
      let id = links[index].friendLinkId;
      for (let item of this.links) {
        if (id == item.friendLinkId) {
          this.site_linkName = item.friendLinkName;
          this.site_linkUrl = item.friendLinkUrl;
          this.modifyValue = item.friendLinkIconValue;
          this.site_linkDescription = item.friendLinkDescription;
          
        }
      }
      this.linkId=id;
    },
    //    修改友情链接信息
    confirmModifysite_link() {
      if (
        this.site_linkName.length !== 0 &&
        this.site_linkUrl.length !== 0 &&
        this.site_linkDescription.length !== 0
      ) {
        
        let body = {
          friendLinkName : this.site_linkName,
          friendLinkIconColor: "",
          friendLinkUrl: this.site_linkUrl,
          friendLinkDescription: this.site_linkDescription,
          friendLinkIconValue:this.modifyValue,
          friendLinkId:this.linkId
        };
        this.axios.put("/site_friend_link", body).then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.refreshlinks();
          this.modifysite_linkVisible = false;
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
.link {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size:20px;
}
</style>