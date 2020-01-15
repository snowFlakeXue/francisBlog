<template>
  <div id="app">
  <div class="header">
     <Nav/>
  </div>
   <div class="main">
        <router-view/>
    </div>
    <div class="bottom">
        <Footer/>
    </div>    
   
    <div class="backTop">
      <backTop />
    </div>
   
   
  </div>
</template>

<script>
import backTop from "./components/backTop.vue";
import Nav from "./components/nav.vue";
import Footer from "./components/footer.vue";
export default {
  name: 'App',
  components: {
    Nav,
    backTop,
    Footer
    
  }
}
</script>

<style>
body{
  margin:0px;
  background-color:  rgba(234, 99, 173, 0.14);
}
.backTop {
  position: fixed;
  bottom: 5px;
  right: 5px;
  z-index: 999;
}
.header{
  height:50px;
  position:fixed;
  top:0px;
  left:0px;
  z-index:20;
  width:100%;
   /* background-color: rgba(255, 255, 255, 0.541); */
}

</style>
