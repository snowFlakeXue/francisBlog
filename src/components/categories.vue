<template>
    <div class="categories">
        <div class="title">
           <h2>分类</h2>
           <p>目前共计{{total}}个分类</p>
        </div>
      
       <ul class="list">
           <el-link :href="'/category/'+item.categoryId" v-for="item in list" :key="item.categoryId" style="display:block;margin-bottom:20px;">
           <el-card>
           <li>
               {{item.categoryName}}
              </li>
               </el-card>
           </el-link>
       </ul>
    </div>
</template>
<script>
export default {
      data(){
          return{
              list:[],
              total:0
          }
      },
      mounted(){
          this.axios.get('/category').then(res=>{
              this.list=res.data.data;
              this.total=res.data.data.length;
          })
      }
}
</script>
<style scoped>
.title{
    width:80%;
    margin:0px auto;
    text-align:center;
    padding-top:5px;
    font-size:24px;
}
.categories{
    width:80%;
    margin:0px auto;
    /* background-color: rgba(255, 255, 255, 0.541); */
    background: url("./../assets/blogCard.jpg");
    padding-bottom:30px;
    font-family: "华文行楷"
}
.list{
    width:80%;
    margin:0 auto;
    padding:0px;
    font-size:18px;
}

</style>