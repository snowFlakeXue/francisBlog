<template>
    <div class="footer" v-show="this.$store.state.admin==''">
        <span>站点总访问量 {{totalPageView}}</span> | <span>当日访问量 {{todayPageView}}</span>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
              totalPageView:"",
              todayPageView:""
        }
    },
    mounted(){
        this.axios.get('/site').then(res=>{
            this.totalPageView=res.data.data.totalPageView;
            this.todayPageView=res.data.data.todayPageView;
        })
    }
}
</script>
<style scoped>
.footer{
    width:80%;
    margin:30px auto;

  text-align: center;
  color: #a9a9a9b9;
  
}
</style>