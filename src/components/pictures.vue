<template>
<div class="pictures">
    <el-row :gutter="300" class="pic">
        <el-col :span="6" v-for="item in album" :key="item.albumPictureId"  >
            
                <el-image  style="width:320px;height:240px;" :src="item.albumPictureUrl" fit="cover"></el-image>
            
        </el-col>
    </el-row>
</div>
   
</template>
<script>
export default {
    name:'picture',
    data(){
        return{
            album:[]
        }
      
    },
    mounted(){

        let id = Number(this.$route.params.id);
        
        this.axios.get('/category_picture/'+id).then(res=>{
            console.log(res.data.data);
               this.album=res.data.data;
             
        });
        
       
    }
}
</script>
<style scoped>
.pictures{
    width:98%;
    margin:0 auto;
    margin-top:80px;
    text-align:center;
    background-color:rgba(234, 99, 173, 0.26);
    padding:30px;
    border-radius: 16px;
    background-color:  rgba(255, 255, 255, 0.541);
    
    
}

.pic{
    width:100%;
    margin:0 auto;
}
</style>