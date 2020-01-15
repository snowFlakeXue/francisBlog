<template>
<div class="comment">
<div class="custom-tree-container">
    <div class="block">
      <p>评论管理</p>
      <el-tree
        :data="showCommentList"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
       
      ></el-tree>
    </div>
    <el-dialog title="评论详情" :visible.sync="infoCommentVisible">
      <div style="text-align:left;">
        <p>评论所属人名称</p>
        <span>{{blogCommentUsername}}</span>
        <p>评论所属博客</p>
        <span>{{blogCommentBlogId}}</span>
        <p>评论时间</p>
        <span>{{new Date(blogCommentDate)}}</span>
        <p>评论内容</p>
        <span>{{blogCommentContent}}</span>
      </div>
      <div style="text-align:right;margin-top:50px;">
        <el-button @click="infoCommentVisible=false" type="primary">确定</el-button>
      </div>
    </el-dialog>
</div>
</div>
  
  
</template>

<script>
import singlePic from "../singlePic.vue";
export default {
  name: "blogCommentManagement",
  data() {
    return {
      showCommentList: [],
      commentList: [],
      infoCommentVisible: false,
      blogCommentUsername: "",
      blogCommentBlogId: "",
      blogCommentDate: "",
      blogCommentContent: ""
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    remove(node, data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = data.id;
        this.axios.delete("/blog_comment/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.init();
        });
      });
    },
    info(node, data) {
      let id = data.id;
      this.commentList.forEach(element => {
       
        if (element.blogCommentId === id) {
          this.blogCommentUsername = element.blogCommentUsername;
          this.blogCommentBlogId = element.blogCommentBlogId;
          this.blogCommentDate = element.blogCommentDate;
          this.blogCommentContent = element.blogCommentContent;
        }
      });
      this.infoCommentVisible = true;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
      
          <span>评论id：{data.id}</span>
          <span>评论内容：{data.label}</span>
          <span>
            <el-link
              type="success"
              style="text-decoration:none"
              icon="el-icon-notebook-1"
              on-click={() => this.info(node, data)}
            >
              查看详情
            </el-link>
          </span>
          <span>
            <el-link
              type="danger"
             
              icon="el-icon-delete"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-link>
          </span>
        </span>
      );
    },
    init() {
      this.axios.get("/blog_comment").then(res => {
        let commentList = res.data.data;
        this.commentList = commentList;
        commentList.forEach(element => {
          let showElement = {
            id: element.blogCommentId,
            label: element.blogCommentContent.substring(0, 35),
            blogCommentParentId: element.blogCommentParentId
          };
          this.showCommentList.push(showElement);
        });
        this.showCommentList.forEach(element => {
          let blogCommentParentId = element.blogCommentParentId;
          if (blogCommentParentId !== 0) {
            this.showCommentList.forEach(ele => {
              if (ele.id == blogCommentParentId) {
                if (!ele.children) {
                  ele.children = [];
                }
                delete element.blogCommentParentId;
                ele.children.push(element);
              }
            });
          }
        });
        this.showCommentList = this.showCommentList.filter(
          ele => ele.blogCommentParentId === 0
        );
        this.showCommentList.forEach(element => {
          delete element.blogCommentParentId;
        });
      });
    }
  }
};
</script>


<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
 
}
.comment{
  width:90%;
  margin:30px auto;
}
</style>