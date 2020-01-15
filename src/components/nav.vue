<template>
    <div class="nav" v-show="this.$store.state.admin==''">
         <el-row class="header">
             <el-col :span="12">
                 <el-link type="primary" :underline="false" href="/"><p class="title">{{siteTitle}}</p></el-link>
                 <span class="siteSubtitle">{{siteSubtitle}}</span>

            </el-col> 
           
            <!-- <el-col :span="12" class="menuList" style="padding-left:280px;padding-top:10px">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in menu" :key="item.menuId+1">
                        <el-link :underline="false" href="/categories"><p class="menuContent">{{item.menuName}}</p></el-link>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col> -->
            <el-col :span="12" style="padding-left:280px;padding-top:10px">
                 <el-breadcrumb separator="/" >
                    <el-breadcrumb-item>
                        <el-link :underline="false" href="/categories"><p class="menuContent"><i class="el-icon-folder-opened" style="margin-right:8px;"></i>分类</p></el-link>
                        <el-link :underline="false" href="/albums"><p class="menuContent"><i class="el-icon-camera" style="margin-right:8px;"></i>相册</p></el-link>
                    </el-breadcrumb-item>
                 </el-breadcrumb>
            </el-col>
         </el-row>
    </div>
</template>
<script>
export default {
    name:'nav',
    data(){
        return{
            siteTitle:"",
            siteSubtitle:"",
            menu:[]
        }
        
    },
    mounted(){
        this.axios.get('/site').then(res=>{
            this.siteTitle=res.data.data.siteTitile;
            this.siteSubtitle=res.data.data.siteSubtitle;
        })
        this.axios.get('/parent_menu').then(res=>{
            this.menu=res.data.data;
           
        })
    }
}
</script>
<style scoped>
.nav{
    width:100%;
    height: 100%;
   /* background-color:#fff; */
   background: url("../assets/nav.jpg");
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);


}
.header{
    width:90%;
    padding-left:15%;
    padding-top:0px;
    
}
.title{
    margin:0px;
    padding:8px;
    font-size: 30px;
    font-family: "Bradley Hand ITC", "楷体";
    font-weight:1000;
    font-style:italic;
    color:rgba(234, 99, 173, 0.568);
}
.title:hover{
        color:rgba(234, 99, 173, 0.815);

}
.menuContent{
    font-weight: 700;
    cursor: pointer;
    margin-right:15px;
    color:rgba(234, 99, 173, 0.623);
    font-family: "楷体";
    font-size:16px;
    
}
.menuContent:hover{
    color:rgba(234, 99, 173, 0.815);
}
.siteSubtitle{
    font-size: 13px;
     font-weight: 100;
     position: fixed;
     top:30px;
     left:400px;
     font-family: "楷体"
     
}
</style>
