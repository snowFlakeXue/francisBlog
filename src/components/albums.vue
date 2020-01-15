<template>
    <div class="album">
        <!-- <el-page-header style="padding-top:30px;" @back="goBack" content="相册" title="首页"></el-page-header> -->
        <div class="center">
            <el-row :gutter="20">
                <el-col :span="8" v-for="item in albums" :title="item.albumName" :key="item.albumId">
                  <el-link :href="'/pictures/'+item.albumId" :underline="false">
                    <el-card shadow="hover" class="box">
                       <el-image  :src="item.ablumCover" style="width:100%;height:100%;" ></el-image>
                       <p style=" font-size:20px;">{{item.albumName}}</p>
                       <p style=" font-size:15px;">{{item.albumDescription}}</p>
                      
                    </el-card>
                  </el-link>
                </el-col>
            </el-row>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            albums:[]
        }
    },
    methods:{
         goBack() {
      this.$router.push("/");
    }
    },
    mounted(){
        this.axios.get("/album").then(res=>{
              this.albums=res.data.data;
        })
    }
}
</script>
<style scoped>
.album{
    width:90%;
    margin:0px auto;
    /* background-color: rgba(255, 255, 255, 0.541); */
    padding-bottom:30px;
    font-family: "华文行楷";
   
}
.center{
    width:90%;
    margin:0px auto;
}
.box{
    height:230px;
    text-align:center;
    background-color: rgba(234, 99, 173, 0.144);
    border-radius: 15px;
    padding:0px;
    margin-bottom:20px;
    /* background: url("./../assets/pic.jpg"); */
}
</style>