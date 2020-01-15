<template>
  <div class="home">
    <el-row :gutter="16">
        <el-col :span="18">
        <div class="list">
           
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in list"
            :key="index"
            :timestamp="item.blogCreateTime|dataFormat('yyyy-MM-dd hh:mm:ss')"
            placement="top"
          >
            <el-link :href="'/blogContent/'+item.blogId">{{item.blogTitle}}</el-link>
          </el-timeline-item>
        </el-timeline>
     
        </div>
         </el-col>
     
      <el-col :span="6">
        <el-card class="leftCard leftCard1" shadow="hover" :body-style="{ padding: '3px' }">
          <div class="demo-basic--circle">
            <el-avatar :size="80" :src="siteAvatar" id="avater"></el-avatar>
            <div class="siteTitile">{{siteTitile}}</div>

            <div class="siteDescription">{{siteDescription}}</div>
            <div class="tags">
              <ul class="tagList">
                <li v-for="item in tags" :key="item.siteTagId">
                  <el-tooltip :content="item.siteTagDescription" placement="top">
                        <div class="tag" :style="{backgroundColor:item.siteTagColor}">{{item.siteTagName}}</div>
                  </el-tooltip>
                </li>
              </ul>
            </div>
            <div style="margin-top:2px;">
               <el-divider></el-divider>
            </div>
            <div class="icons">
              <ul class="iconList">
                <li v-for="item in icons" :key="item.siteIconId">
                  <el-tooltip :content="item.siteIconUrl" placement="top">
                                  <svg class="icon" aria-hidden="true"><use :xlink:href="item.siteIconValue"></use></svg>
                  </el-tooltip>
                </li>
              </ul>
            </div>
           
          </div>
        </el-card>
        <el-card shadow="hover" class="leftCard2" :body-style="{ padding: '8px' }">
          <div style="color:rgb(234, 99, 173);font-family:华文行楷;font-size:27px;">友情链接</div>
          <ul class="firiend" v-for="item in friendLinks" :key="item.friendLinkId">
            <li>
              <el-tooltip :content="item.friendLinkDescription" placement="top">
                  <svg class="icon" aria-hidden="true"><use :xlink:href="item.friendLinkIconValue"></use></svg>
              </el-tooltip>
              <a :href="item.friendLinkUrl" target="_blank" >{{item.friendLinkUrl}}</a>
            </li>
          </ul>
        </el-card>
        <el-card shadow="hover" class="leftCard">
        <el-carousel height="200px">
        <el-carousel-item v-for="(item,index) in adverts" :key="index+1" style="text-align:center">
          <a :href="item.advertisementUrl" target="_blank" :title="item.advertisementName">
                      <el-image :src="item.advertisementPicture" style="width:100%;height:100%;" fit="cover"></el-image>
          </a>
        </el-carousel-item>
      </el-carousel>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      list: [],
       siteAvatar: "",
      tags: [],
      icons:[],
      siteDescription:"",
      siteTitile:"",
    
      friendLinks:[],
      adverts:[]
    };
  },
  mounted() {
    let id = Number(this.$route.params.id);
    this.axios.get("/blog_category/" + id).then(res => {
      this.list = res.data.data;
     
    });
     this.axios.get("/site").then(res => {
      this.siteAvatar = res.data.data.siteAvatar;
       this.siteDescription = res.data.data.siteDescription;
        this.siteTitile = res.data.data.siteTitile;
    });
    this.axios.get("/site_tag").then(res => {
   
      this.tags = res.data.data;
    });
     this.axios.get("/site_icon").then(res => {
       this.icons = res.data.data;
    });
     this.axios.get("/site_friend_link").then(res => {
       this.friendLinks = res.data.data;
    });
    this.axios.get("/advertisement").then(res => {
       this.adverts = res.data.data;
    });
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
.home {
  margin: 80px auto;
  width: 80%;
  cursor: pointer;
}
.list {
 
  background-color: rgba(234, 99, 173, 0.26);
  /* margin-top: 60px; */
  padding-top: 30px;
  border-radius: 16px;
  
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
#avater:hover {
 transform: rotate(666turn);
            transition-duration: 59s;
            transition-timing-function: cubic-bezier(.34, 0, .84, 1)
           
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
 
   margin-right: 8px;
   font-family:"Ink Free","楷体";
   display: inline-block;
   margin-bottom: 4px;

}

.iconList {
  list-style: none;
  text-align: center;
}
.iconList li {
  margin-right: 28px;

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
  font-size:34px;
  font-family:"Edwardian Script ITC","楷体";
  font-style: italic;
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
  color: rgba(77, 247, 247, 0.568);
  font-family: "Perpetua";


}
a:hover{
  text-decoration: none;
  color: rgb(139, 36, 93);
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
.siteTitile{
  font-family:"Edwardian Script ITC","方正舒体";
  font-size: 30px;
  margin-top:15px;
   font-weight:700
}
.siteDescription{
  font-family:"Edwardian Script ITC","华文行楷";
  font-weight:200;
  color: #a9a9a9b9;
  font-size: 14px;
}
.leftCard1{
  background: url("./../assets/right1.jpg") no-repeat;
  background-size: cover;
  opacity:0.7;

}
.leftCard2{
  background: url("./../assets/friend.jpg") no-repeat;
  background-size: cover;
  opacity:0.7;
}
</style>