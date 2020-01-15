<template>
  <div class="TagManagement">
    <div style="padding:30px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>网站标签管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="19">
          <div style="text-align:left;margin-top:30px;">
            <el-alert title="注意" type="warning" description="请谨慎修改标签信息" show-icon close-text="知道了"></el-alert>
            <el-button style="margin-top:30px;" type="primary" @click="add">添加标签</el-button>

            <el-table border :data="Tags" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="序号" width="70" type="index"></el-table-column>
              <el-table-column
                align="center"
                label="标签名"
                prop="siteTagName"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="标签描述"
                prop="siteTagDescription"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="颜色"
                prop="siteTagColor"
              >
              <template slot-scope="scope">
                  <div class="colorBox" :style="{backgroundColor:scope.row.siteTagColor}"></div>
              </template>
              
             
              
              </el-table-column>
              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-edit"
                    @click.native.prevent="editTag(scope.$index,Tags)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click.native.prevent="deleteTag(scope.$index,Tags)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 添加标签 -->
      <el-dialog title="添加标签信息" :visible.sync="addTagVisible">
        <div style="text-align:left;">
          <p>标签名</p>
          <el-input placeholder="请输入标签名" v-model="TagName"></el-input>
          <p>标签描述</p>
          <el-input placeholder="请输入标签描述" v-model="TagDescription"></el-input>
          <p>请选择标签颜色</p>
          <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
          <p>标签颜色值为：{{color}}</p>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="addTagVisible=false">取消</el-button>
          <el-button @click="confirmAddTag" type="primary">添加</el-button>
        </div>
      </el-dialog>
      <!-- 修改标签信息 -->
      <el-dialog title="修改标签信息" :visible.sync="modifyTagVisible">
        <div style="text-align:left;">
         <p>标签名</p>
          <el-input placeholder="请输入标签名" v-model="TagName"></el-input>
          <p>标签描述</p>
          <el-input placeholder="请输入标签描述" v-model="TagDescription"></el-input>
          <p>请选择标签颜色</p>
          <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
          <p>标签颜色值为：{{color}}</p>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="modifyTagVisible=false">取消</el-button>
          <el-button @click="confirmModifyTag" type="primary">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import singlePic from "../singlePic.vue";
export default {
  name: "TagManagement",
  components: {
    singlePic
  },
  data() {
    return {
      color: "rgba(255, 69, 0, 0.68)",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577"
      ],
      Tags: "",
      addTagVisible: false,
      TagName: "",
      TagDescription: "",
      modifyTagVisible: false,
      tagId:"",
    };
  },
  mounted() {
    this.axios.get("/site_tag").then(res => {
      this.Tags = res.data.data;
      console.log(JSON.stringify(this.Tags));
    });
  },
  methods: {
    // 更新标签信息
    refreshTags() {
      this.axios.get("/site_tag").then(res => {
        this.Tags = res.data.data;
      });
    },
    remove() {
        (this.TagName = ""),
        (this.TagDescription = ""),
        (this.color = "");
    },
    add() {
      this.addTagVisible = true;
      this.remove();
    },
    // 添加标签
    confirmAddTag() {
      if (
        this.TagName.length !== 0 ||
        this.color.length !== 0 ||
        this.TagDescription.length !== 0
      ) {
        let body = {
          siteTagName: this.TagName,
          siteTagDescription: this.TagDescription,
          siteTagColor: this.color
        };
        this.axios.post("/site_tag", body).then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.refreshTags();
        });
        this.addTagVisible = false;
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    deleteTag(index, Tags) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.Tags[index].siteTagId;
        this.axios.delete("/site_tag/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshTags();
        });
      });
    },
    //    获取标签信息
    editTag(index, Tags) {
      this.modifyTagVisible = true;
      let id = Tags[index].siteTagId;
      console.log(id);
      for (let item of this.Tags) {
        if (id == item.siteTagId) {
          this.TagName = item.siteTagName;
          this.TagDescription = item.siteTagDescription;
          this.color = item.siteTagColor;
          this.tagId=item.siteTagId;
        }
      }
      
    },
    //    修改标签信息
    confirmModifyTag() {
      if (
        this.TagName.length !== 0 &&
        this.color.length !== 0 &&
        this.TagDescription.length !== 0
      ) {
        let body = {
           siteTagName: this.TagName,
           siteTagColor : this.color,
           siteTagDescription: this.TagDescription,
           siteTagId:this.tagId
        };
        this.axios.put("/site_tag", body).then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.refreshTags();
          this.modifyTagVisible = false;
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
.colorBox{
  margin:0 auto;
  width:16px;
  height:16px;
  color:#fff;
  border-radius: 50%;
}
</style>