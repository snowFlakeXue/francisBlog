<template>
  <div class="blogContent">
    <div class="center">
      <el-page-header
        style="padding-top:30px;"
        @back="goBack"
        :content="blogCategoryName+'/'+blogTitle"
        title="首页"
      ></el-page-header>
               <p class="blogTitle">{{blogTitle}}</p>

      <ul class="blogTags">
        <!-- <li>
        </li> -->
        <li v-for="value in tags" :key="value.tagId">
          <div class="blogTag" :style="{backgroundColor:value.tagColor}">{{value.tagName}}</div>
        </li>
      </ul>

      <div>
        <i class="el-icon-date"></i>
        <span>创建时间：{{blogCreateTime|dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
        <i class="el-icon-date"></i>
        <span>更新时间：{{blogUpdateTime|dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
        <span>
          <i class="el-icon-user"></i>
          访问量:{{blogViews}}
        </span>
        <span>
          <i class="el-icon-chat-dot-square"></i>
          评论量:{{blogReply}}
        </span>
      </div>
      <!-- <div class="cover" v-show="blogCover!=''&&blogCover!=Null">
               <el-image :src="blogCover" fit="contain" style="height:300px;width:95%"></el-image>
      </div>-->
      <div v-html="content" class="content">{{content}}</div>

      <div class="comment">
        <h2>评论</h2>
        <div>
          <el-button
            class="edit"
            type="primary"
            icon="el-icon-edit"
            @click="addCommentModalvisible = true"
            circle
          ></el-button>
        </div>
      </div>
      <el-dialog class="addDialog" title="评论留言" :visible.sync="addCommentModalvisible">
        <el-form :model="comment">
          <el-form-item label="用户名">
            <el-input v-model="comment.blogCommentUsername"></el-input>
          </el-form-item>
          <el-form-item label="评论内容">
            <el-input type="textarea" v-model="comment.blogCommentContent"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="add">取 消</el-button>
          <el-button type="primary" @click="addComment">确 定</el-button>
        </div>
      </el-dialog>

      <div class="commentDetail">
        <el-card class="card" shadow="never" v-for="item in list" :key="item.blogCommentId" :body-style="{ padding: '6px 10px'}">
          <div style="font-size:20px;color:rgb(234, 99, 173)">{{item.blogCommentUsername}}:</div>
          <div class="time">{{item.blogCommentDate|dataFormat('yyyy-MM-dd hh:mm:ss')}}</div>
          <div style="font-size:14px;text-indent:2em">{{item.blogCommentContent}}</div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogCategoryName: "",
      blogTitle: "",
      tags: [],
      blogCreateTime: "",
      blogUpdateTime: "",
      blogViews: "",
      blogReply: "",
      blogCover: "",
      content: "",
      list: [],
      addCommentModalvisible: false,
      comment: {
        blogCommentUsername: "",
        blogCommentContent: ""
      }
    };
  },
  mounted() {
    let id = Number(this.$route.params.id);
    this.axios.get("/blog_content/" + id).then(res => {
      this.blogCategoryName = res.data.data.blogCategoryName;
      this.blogTitle = res.data.data.blogTitle;
      this.blogCreateTime = Number(res.data.data.blogCreateTime);
      this.blogUpdateTime = Number(res.data.data.blogUpdateTime);
      this.blogViews = res.data.data.blogViews;
      this.blogReply = res.data.data.blogReply;
      this.blogCover = res.data.data.blogCover;
      this.content = res.data.data.blogContent;
      this.tags = res.data.data.blogTags;
    });
    this.axios.get("/comment/" + id).then(res => {
      this.list = res.data.data;
    });
  },
  methods: {
    add(){
     
    
       this.comment={
          blogCommentUsername: "",
        blogCommentContent: ""
       };
         this.addCommentModalvisible=true;
    },
    goBack() {
      this.$router.push("/");
    },
    addComment() {
      this.comment.blogCommentBlogId = Number(this.$route.params.id);
      this.comment.blogCommentParentId = 0;
      this.axios.post("/blog_comment/", this.comment).then(result => {
        if (result.data.code == 0) {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          
          this.axios.get("/comment/" + Number(this.$route.params.id)).then(res => {
            this.list = res.data.data;
          });
          this.comment.blogCommentContent=" ";
          this.comment.blogCommentUsername=" ";
          this.addCommentModalvisible = false;
        } else {
          this.$alert("提交失败", "警告", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
    }
  },
  filters: {
    dataFormat: function(value, fmt) {
      let getDate = new Date(value);
      let o = {
        "M+": getDate.getMonth() + 1,
        "d+": getDate.getDate(),
        "h+": getDate.getHours(),
        "m+": getDate.getMinutes(),
        "s+": getDate.getSeconds(),
        "q+": Math.floor((getDate.getMonth() + 3) / 3),
        S: getDate.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    }
  }
};
</script>
<style scoped>

.blogContent {
  width: 80%;
  margin: 70px auto;
  /* text-align:center; */
  background-color: rgba(255, 255, 255, 0.541);
  padding-bottom: 30px;
  font-family: "华文仿宋"
 
}

.blogTags {
  list-style: none;
  padding: 0px;
  margin: 0px;
  margin-bottom: 20px;
}
.blogTags li {
  margin-right: 8px;
  display: inline-block;
}
.blogTag {
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
}
.blogTitle {
  font-size: 25px;
}
.center {
  width: 80%;
  margin: 0 auto;
}
.comment {
  margin: 30px auto;
}
el-card {
  height: 80px;
  width: 100%;
  
}
.edit {
  position: fixed;
  top: 608px;
  left: 1244px;
}
.addDialog{
  font-family: "Perpetua","楷体";
}
.card{
  margin-bottom:20px;
}
.time{
  font-family:"华文行楷";
  font-weight:200;
  color: #a9a9a9b9;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 5px;
}
</style>