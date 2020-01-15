<template>
  <div class="controller">
    <el-menu
      unique-opened="true"
      class="el-menu-demo"
      mode="horizontal"
      router
      background-color="rgba(234, 99, 173, 0.233)"
      style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:42px;"
      text-color="#fff"
      active-text-color="rgba(234, 99, 173, 0.14)"
    >
      <el-menu-item>
        <p style="margin:0 auto;font-size:18px;">
          <i class="el-icon-s-operation"></i>博客后台管理中心
        </p>
      </el-menu-item>
      <el-menu-item index="/" target="_blank">主页</el-menu-item>
      <div style="float:right;color:#fff;margin:15px 30px;">
        <i class="el-icon-user-solid"></i>
        管理员：{{this.$store.state.admin}}
      </div>
    </el-menu>
    <el-row>
      <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
        <el-menu :default-active="activeIndex" router class="el-menu-vertical-demo"  style="border-radius:8px;" >
          <el-menu-item index="/controller/iconManagement">
            <i class="el-icon-picture-outline-round"></i>
         <span>图标管理</span>
          </el-menu-item>
          <el-menu-item index="/controller/chart">
            <i class="el-icon-tickets"></i>
            <span>数据图表</span>
          </el-menu-item>
       
          <el-menu-item index="/controller/TagManagement">
            <i class="el-icon-star-off"></i>
            <span>网站标签管理</span>
          </el-menu-item>
          <el-menu-item index="/controller/tag">
            <i class="el-icon-tickets"></i>
            <span>文章标签管理</span>
          </el-menu-item>
     
              
     
          
          
          
          <el-menu-item index="/controller/linkManagement">
            <i class="el-icon-link"></i>
            <span>友情链接管理</span>
          </el-menu-item>
          <el-menu-item index="/controller/advertisement">
            <i class="el-icon-goods"></i>
            <span>广告管理</span>
          </el-menu-item>
          <el-menu-item index="/controller/basinManagement">
            <i class="el-icon-collection"></i>
            <span>基本信息管理</span>
          </el-menu-item>
         
          
        
                 <el-menu-item index="/controller/albumManagement">
            <i class="el-icon-folder-opened"></i>
            <span>相册管理</span>
          </el-menu-item>
          <el-menu-item index="/controller/albumPicture">
            <i class="el-icon-camera"></i>
            <span>相册图片管理</span>
          </el-menu-item>
        


          
          <el-menu-item index="/controller/category">
            <i class="el-icon-edit-outline"></i>
            <span>文章分类管理</span>
          </el-menu-item>
          <el-menu-item index="/controller/menu">
            <i class="el-icon-s-shop"></i>
            <span>菜单管理</span>
          </el-menu-item>
          
        
                    <el-menu-item index="/controller/blogComment">
            <i class="el-icon-s-promotion"></i>
            <span>博客评论管理</span>
          </el-menu-item>
          <el-menu-item index="/controller/blog">
            <i class="el-icon-s-management"></i>
            <span>博客内容管理</span>
          </el-menu-item>
          
         <el-menu-item index="/controller/adminManagement">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="24" :sm="24" :md="19" :lg="19" :xl="19">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "controller",
  data(){
     return{
        activeIndex:"2"
     }
  }

};
</script>
<style scoped>
.controller{
   font-family:"华文行楷";
   font-size:20px;
   /* background: url('./../assets/control.jpg');
   background-size: cover; */
}
.el-menu-item{
   height:40px;
}
</style>