<template>
  <div class="demo-wrap">
    <div>
       <el-row :gutter="20">
         <el-col :span="16">
            <el-input placeholder="请输入标题" v-model="blogTitle"></el-input>
      <el-input type="textarea" placeholder="请输入博客概要" v-model="summary"></el-input>
        <div style="margin-top:10px;">
           <el-select
        value-key="categoryId"
        v-model="selectCategoryName"
        placeholder="请选择"
        @change="change"
        style="margin-right:10px;"
      >
        <el-option
          v-for="item in categoryList"
          :key="item.categoryId"
          :label="item.categoryName"
          :value="item.categoryId"
        ></el-option>
      </el-select>
      <el-select v-model="tags" multiple placeholder="请选择标签">
        <el-option
          v-for="item in tagList"
          :key="item.tagId"
          :label="item.tagName"
          :value="item.tagId"
        ></el-option>
      </el-select>
        </div>
        
         </el-col>
         <el-col :span="8">
                  <singlePic ref="addImg" ></singlePic>


         </el-col>
       </el-row>
     
      
      <vue-simplemde v-model="content" :configs="configs" ref="markdownEditor" />
      <el-button  type="primary" round @click="uploadBlog">上传</el-button>

    </div>
  </div>
</template>

<script>
import VueSimplemde from "vue-simplemde/src/index.vue";
import hljs from "highlight.js";
window.hljs = hljs;
import singlePic from "./singlePic.vue";
export default {
  name: "index",
  components: {
    VueSimplemde,
    singlePic
  },
  data() {
    return {
      tagList: [],
      tags: [],
      coverUrl: "",
      content: "",
      summary: "",
      configs: {},
      output: "",
      type: "markdown",
      blogTitle: "",
      blogCategoryId: "",
      categoryList: [],
      selectCategoryName: "",
      addCategoryId: ""
    };
  },
  computed: {
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
    }
  },
  mounted() {
    this.axios.get("/blog_content/" + this.$route.params.id).then(res => {
      let blogInfo = res.data.data;
      this.content = blogInfo.blogContent;
      this.selectCategoryName = blogInfo.blogCategoryName;
      this.addCategoryId = blogInfo.blogCategoryId;
      this.blogTitle = blogInfo.blogTitle;
      this.summary = blogInfo.blogSummary;
      blogInfo.blogTags.forEach(element => {
        this.tags.push(element.tagId);
      });
    });
    this.axios.get("/category").then(res => {
      this.categoryList = res.data.data;
      this.selectCategoryName = this.categoryList[0].categoryName;
      this.addCategoryId = this.categoryList[0].categoryId;
    });
    this.axios.get("/tag").then(res => {
      this.tagList = res.data.data;
    });
  },
  methods: {
    change(result) {
      this.addCategoryId = result;
    },
    uploadBlog() {
      let blogContent = this.simplemde.markdown(this.content);
      this.coverUrl = this.$refs.addImg.picSrc;
      if (this.$route.params.id) {
        if (this.blogTitle != null && blogContent != null) {
          let body = {
            blogId: this.$route.params.id,
            blogTitle: this.blogTitle,
            blogCover: this.coverUrl,
            blogContent: blogContent,
            blogCategoryId: this.addCategoryId,
            blogSummary: this.summary,
            tags: this.tags
          };
          this.axios.put("/blog", body).then(res => {
            this.$message({
              showClose: true,
              message: "更新成功",
              type: "success"
            });
            this.$router.push({ path: "/controller/blog" });
          });
        }
      } else {
        if (this.blogTitle != null && blogContent != null) {
          let body = {
            blogTitle: this.blogTitle,
            blogCover: this.coverUrl,
            blogContent: blogContent,
            blogCategoryId: this.addCategoryId,
            blogSummary: this.summary,
            tags: this.tags
          };
          this.axios.post("/blog", body).then(res => {
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success"
            });
            this.$router.push({ path: "/controller/blog" });
          });
        }
      }
    },
    updateBlog() {
      let blogContent = this.simplemde.markdown(this.content);
      let body = {
        blogId: this.$route.params.id,
        blogTitle: this.blogTitle,
        blogCover: this.coverUrl,
        blogContent: blogContent,
        blogCategoryId: this.addCategoryId
      };
    }
  }
};
</script>

<style>
@import "simplemde/dist/simplemde.min.css";
@import "highlight.js/styles/atom-one-dark.css";
@import "github-markdown-css";
.demo-wrap{
  width:80%;
  margin:30px auto;
}
</style>