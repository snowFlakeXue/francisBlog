<template>
  <div class="login">
      <div class="wrap-mask">
      <div class="content">
        <div class="boxCard">
          <div class="title">Login</div>
          <p class="font left">账号</p>
          <el-input v-model="account" ></el-input>
          <p class="font left">密码</p>
          <el-input v-model="pwd" show-password ></el-input>
          <el-button type="primary" class="font  button" @keyup.13="click" @click="login">登录</el-button>
        </div> 
      </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
        account:"",
        pwd:""
    }
  },
  methods:{
      login(){
          let body={
              	"userAccount":this.account,
	            "userPassword":this.pwd
          }
          this.axios.post("/sign_in",body).then(res=>{
            if(res.data.code==0){
                this.$store.state.admin = res.data.data.username;
                        this.$message({
                            message: '登陆成功，欢迎您！管理员：' + this.$store.state.admin,
                            type: 'success'
                        });
                this.$router.push('/controller');
            }
             else this.$message.error('账号或密码错误');
          })
      }
     
  }
}
</script>


<style scoped>
.login{
    position:fixed;
    padding:0px;
    margin-top:20px;
    width:100%;
    height: 100%;
    background: url("../assets/loginBackground.jpg" ) no-repeat center top;
    /* position: relative; */
    background-size: cover;
    opacity:0.65;
    
    
 
}
/* .warp-mask{
    height:100%;
    width:100%;
    background-color: rgba(0,0,0,0.5);
    z-index:999
   
} */
.content{
    background: rgba(0,0,0, 0.4);
    width:400px;
    height:460px;
    position: absolute;
    left:520px;
    top:70px;
    
    text-align: left;
    border-radius:1em;
    box-shadow: 3px 3px 6px #666; 
    
}
.title{
    font-family: "Edwardian Script ITC", Times, serif;
    font-size:70px;
    color: aliceblue;
    text-align:center;
   
}
.font{
    font-family: "方正舒体";
    font-size:20px;
    color: aliceblue;
    
}
.right{
    text-align:right;
}
.left{
    text-align: left;
}
.button{
     margin-left:1%;
     margin-top:64px;
     width:99%;
}
.boxCard{
    margin:30px 10px;
}
.el-input__inner{
    background-color: "";
}
</style>
