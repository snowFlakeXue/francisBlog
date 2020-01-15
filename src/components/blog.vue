<template>
  <div class="blog">
     <div>
        <el-card :body-style="{ padding: '0px' }" class="centerCard" v-for="item in blogs" :key="item.blogId" shadow="hover">
          <div class="cardHeader">
                           <el-link type="primary" :underline="false"><p class="blogTitle">{{item.blogTitle}}</p></el-link>

             <ul class="blogTags">
               <!-- <li>           
               </li> -->
               <li v-for="value in item.blogTags" :key="value.tagId">
                 <el-tooltip :content="value.tagDescription" placement="top">
                        <div class="blogTag" :style="{backgroundColor:value.tagColor}">{{value.tagName}}</div>
                  </el-tooltip>
               </li>
             </ul>
        <div class="list">
                <i class="el-icon-date"></i> <span>创建时间：{{item.blogCreateTime|dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                <i class="el-icon-date"></i> <span>更新时间：{{item.blogUpdateTime|dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                <span><i class="el-icon-user"></i> 访问量:{{item.blogViews}}</span>
               <span><i class="el-icon-chat-dot-square"></i> 评论量:{{item.blogReply}}</span>
             </div>
          </div>
          
          <div class="blogCard">
            
          
             
             
             <div class="cover" v-show="item.blogCover!=''&&item.blogCover!=Null">
               <el-image :src="item.blogCover" fit="contain" style="height:300px;width:100%"></el-image>
              
             </div>
             <p style="font-family:楷体;font-weight:700;font-size:18px;">概要:</p>
             <p class="summary">{{item.blogSummary}}</p>
             <el-link type="success" style="float:right;font-family:楷体;font-size:18px;" :href="'/blogContent/' + item.blogId" :underline="false">查看详情 ></el-link>
         </div>
        </el-card>
    </div>
           <p style="color:#409EFF;font-family:华文行楷;font-size:20px;"   @click="moreCategories">查看更多...</p>
    
   
  </div>
</template>

<script>
import moment from "moment"
import iconfont from "@/components/iconfont.js";
export default {
  name: "blog",
  data() {
    return {
      siteAvatar: "",
      tags: [],
      icons:[],
      siteDescription:"",
      siteTitile:"",
      blogs:[],
      count:0,
      totalPage:1,
      friendLinks:[],
      adverts:[]
    };
  },
  created(){
     this.count=1;
      this.axios.get("/blog/"+this.count).then(res => {
     this.blogs = res.data.data.list;
      this.totalPage=res.data.data.totalPage;
      for(let i=0;i<res.data.data.list.length;i++){
         this.blogs[i] = res.data.data.list[i];
        this.blogs[i].blogCreateTime=Number(res.data.data.list[i].blogCreateTime);
        this.blogs[i].blogUpdateTime=Number(res.data.data.list[i].blogUpdateTime)
     
      }
     
    });
  },
  
  filters: {
    dataFormat:function (value, fmt) {
 let getDate = new Date(value);
 let o = {
 'M+': getDate.getMonth() + 1,
 'd+': getDate.getDate(),
 'h+': getDate.getHours(),
 'm+': getDate.getMinutes(),
 's+': getDate.getSeconds(),
 'q+': Math.floor((getDate.getMonth() + 3) / 3),
 'S': getDate.getMilliseconds()
 };
 if (/(y+)/.test(fmt)) {
 fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
 }
 for (let k in o) {
 if (new RegExp('(' + k + ')').test(fmt)) {
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
 }
 }
  return fmt;
  }
  },
  methods:{
    moreCategories(){
     
     if(this.count<=this.totalPage){
        this.count=this.count+1;
         this.axios.get("/blog/"+this.count).then(res => {
      for(let i=0;i<res.data.data.list.length;i++){
         this.blogs.push(res.data.data.list[i]);
     
      } 
    });
     for(let i=0;i<this.blogs.push(res.data.data.list[i]);i++){
         Number(this.blogs[i].blogCreateTime)
         Number(this.blogs[i].blogUpdateTime)
  
     }
     }
     else  this.$message.error('暂无更多信息'); 
    }
  }
};
</script>


<style scoped>
.home {
  margin: 80px auto;
  width: 80%;
  cursor: pointer;
}
.centerCard {
  /* background-color: rgba(255, 255, 255, 0.541); */
  margin-bottom:30px;
  padding-bottom:10px;
  background: url("./../assets/blogCard.jpg")

}
.leftCard {
  background-color: rgba(255, 255, 255, 0.541);
  margin-bottom:20px;
  /* height: 600px; */
}
.demo-basic--circle {
  margin-top: 4px;
  /* margin-left:68px; */
  width: 95%;
  margin: 4px auto;
  text-align: center;
}
.tag {
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
}
.tagList {
  list-style: none;
}
.tagList li {
   display: inline-block;
  margin-right: 5px;
  margin-top: 5px;
}
.iconList {
  list-style: none;
  text-align: center;
}
.iconList li {
  margin-right: 8px;

  display: inline-block;
}
.icon {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size:20px;
}
span{
  padding-right:10px;
}
.cover{
  width:98%;
  /* height:200px; */
  margin:20px auto;
  text-align:center;
  
}
.blogTags{
    list-style: none;
    padding:0px;
    margin:0px;
    margin-bottom: 15px;

}
.blogTags li{
   margin-right: 8px;
   font-family:"Ink Free","楷体";

  display: inline-block;
}
.blogTag{
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
.blogTitle{
  font-size:23px;
  font-family:"Edwardian Script ITC","方正舒体";
  /* font-style: italic; */
  font-weight:700;
  height:17px;
  margin-top:3px;
  margin-right:18px;

}
.firiend{
  list-style: none;
  padding:0px;
}
a{
  text-decoration: none;
  color: rgba(234, 99, 173, 0.568);

}
a:hover{
  text-decoration: none;
  color: rgb(234, 99, 173);
}
.blogCard{
  width:80%;
  margin:0 auto;
}
.cardHeader{
  margin-top:10px;
  padding-left:38px;
}
.list{
  font-size:14px;
  font-family:"Perpetua","楷体";
}
.summary{
  font-family:"Perpetua","楷体";
  font-size:18px;
}

</style>
