<template>
  <div class="albumManagement">
    <div style="padding:10px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div style="text-align:left;margin-top:20px;">
            <el-button size="small" round style="margin-top:5px;" type="primary" @click="add">+添加博文</el-button>
            <el-table border :data="blogListData.list" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="博客id" width="70" type="index" prop="blogId"></el-table-column>
              <el-table-column
                align="center"
                label="标题"
                prop="blogTitle"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="浏览量"
                prop="blogViews"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="封面图片"
                prop="blogCover"
               
              >
                <template slot-scope="scope">
                  <el-image
                    :src="scope.row.blogCover"
                    fit="contain"
                    style="width:100px;height:100px;padding:0px;maigin:0px;"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="评论数"
                prop="blogReply"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="所属分类"
                prop="blogCategoryName"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="标签集"
                prop="blogTags"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="创建时间"
                prop="blogCreateTime"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="修改时间"
                prop="blogUpdateTime"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-edit"
                    @click.native.prevent="editalbum(scope.$index,blogListData.list)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click.native.prevent="deleteBlog(scope.$index,blogListData.list)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div class="page">
               <el-pagination background small layout="prev, pager, next" :page-count="blogListData.totalPage" @current-change="pageChange"
      :current-page.sync="blogListData.currentPage"></el-pagination>

      </div>
    </div>
  </div>
</template>

<script>
import singlePic from "../singlePic.vue";
export default {
  name: "blogManagement",
  components: {
    singlePic
  },
  data() {
    return {
      // 博客列表内容(分页)
      blogListData: "",

    };
  },
  mounted() {
    this.axios.get("/blog/1").then(res => {
      this.blogListData = res.data.data;
    });
  },
  methods: {
    pageChange(currentPage) {
      this.axios.get("/blog/" + currentPage).then(res => {
      this.blogListData = res.data.data;
    });
    },
    getBlogList(pageIndex) {
      this.axios.get("/blog/" + pageIndex).then(res => {
        this.blogListData = res.data.data;
      });
    },
    editalbum(index, list){
      this.$router.push({name:'blogEdit',params:{id:this.blogListData.list[index].blogId}});
    },
    // 删除博客触发事件
    deleteBlog(index, list) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.blogListData.list[index].blogId;
        this.axios.delete("/blog/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.getBlogList(this.blogListData.currentPage);
        });
      });
    },
    add(){
      this.$router.push({path:'/blog_edit'});
    }
  }
};
</script>

<style scoped>
.page{
  width:80%;
  margin:20px auto;
  text-align:center;
  background-color:""
  
}

</style>