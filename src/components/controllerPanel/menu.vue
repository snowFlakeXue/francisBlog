<template>
  <div>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="18" :lg="24" :lx="12">
        <el-tabs
          :tab-position="tabPosition"
          style="width:80%;margin:0 auto;"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            class="first"
            :label="item.menuName"
            :name="item.menuId"
            v-for="item in firstMenu"
            :key="item.menuId"
          >
            <el-table border :data="secondMenu" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="序号" width="70" type="index"></el-table-column>
              <el-table-column
                align="center"
                label="菜单名"
                prop="menuName"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                label="菜单描述"
                prop="menuDescription"
                :show-overflow-tooltip="true"
              ></el-table-column>

              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    link="el-link-edit"
                    @click.native.prevent="editmenu(scope.$index,secondMenu)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    link="el-link-delete"
                    @click.native.prevent="deletemenu(scope.$index,secondMenu)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
<el-button type="primary" icon="el-icon-plus" circle style="margin-left:50px;margin-top:30px;" @click="add"></el-button>      </el-col>
    </el-row>
     <!-- 修改菜单信息 -->
      <el-dialog title="修改菜单信息" :visible.sync="modifymenuVisible">
        <div style="text-align:left;">
          <el-select v-model="modifyValue" placeholder="请选择">
            <el-option
              v-for="item in First"
              :key="item.menuId"
              :label="item.menuName"
              :value="item.menuName"
             
            >
             
             
            </el-option>
          </el-select>
          <p>菜单名称</p>
          <el-input placeholder="请输入菜单名称" v-model="menuName"></el-input>
          <p>菜单描述</p>
          <el-input placeholder="请输入菜单描述" v-model="menuDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="modifymenuVisible=false">取消</el-button>
          <el-button @click="confirmModifymenu" type="primary">修改</el-button>
        </div>
      </el-dialog>
      <!-- 添加菜单信息 -->
      <el-dialog title="添加菜单" :visible.sync="addmenuVisible">
        <div style="text-align:left;">
          <p>请选择所属一级菜单</p>
          <el-select v-model="value" placeholder="请选择"   @change="change">
            <el-option
              v-for="item in addFirst"
              :key="item.menuId"
              :label="item.menuName"
              :value="item.menuName"
             
            >
             
            </el-option>
          </el-select>
          <p>菜单名称</p>
          <el-input placeholder="请输入菜单名称" v-model="menuName"></el-input>
          <p>菜单描述</p>
          <el-input placeholder="请输入菜单描述" v-model="menuDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="addlinkVisible=false">取消</el-button>
          <el-button @click="confirmAddmenu" type="primary">添加</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "top",
      firstMenu: "",
      activeName: "",
      secondMenu: [],
      modifymenuVisible:false,
      modifyValue:"",
      menuName:"",
      menuDescription:"",
      First:"",
      parentId:"",
      menuId:"",
      addmenuVisible:false,
      value:"",
      addFirst:"",
      modifyId:""

    };
  },
  mounted() {
    function copy(arr1,arr2){
    for(var i=0;i<arr1.length;i++){
        arr2[i]=arr1[i];
    }
}
    this.axios.get("/menu").then(res => {
      this.firstMenu = res.data.data;
      this.activeName = res.data.data[0].menuId;
      this.secondMenu=res.data.data[0].childMenu;
      this.secondMenu.unshift( this.firstMenu[0]);
 
    });
    
  },
  methods: {
    change(result) {
      this.addAlbumId = result;
    },
    remove(){
      this.menuName="",
      this.menuDescription="",
      this.value=""


    },
    add() {
      this.axios.get('/parent_menu').then(res=>{
          // this.First=res.data.data;
         this.First=JSON.parse(JSON.stringify(res.data.data));
         
         this.addFirst=JSON.parse(JSON.stringify(res.data.data));
          //this.addFirst=res.data.data;
          console.log(typeof(this.addFirst));
          
          let menu={
             "menuId": 0,
             "menuPid": 0,
             "menuName": "选作一级分类",
             "menuDescription": "",
          }
         
          this.addFirst.unshift(menu);
          
        
      });
      this.addmenuVisible = true;
      this.remove();
      },
      refreshmenu() {
      this.axios.get("/menu").then(res => {
        this.firstMenu = res.data.data;
        for (let i = 0; i < res.data.data.length; i++) {
           if (this.activeName == res.data.data[i].menuId) {
            this.secondMenu = res.data.data[i].childMenu;
            this.secondMenu.unshift(res.data.data[i])
           }
          }
      });
      this.axios.get('/parent_menu').then(res=>{
          // this.First=res.data.data;
         this.First=JSON.parse(JSON.stringify(res.data.data));
         
         this.addFirst=JSON.parse(JSON.stringify(res.data.data));
          //this.addFirst=res.data.data;
          console.log(typeof(this.addFirst));
          
          let menu={
             "menuId": 0,
             "menuPid": 0,
             "menuName": "选作一级分类",
             "menuDescription": "",
          }
         
          this.addFirst.unshift(menu);
          
        
      });
    },
    handleClick(tab, event) {
     
      this.axios.get("/menu").then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          if (this.activeName == res.data.data[i].menuId) {
            this.secondMenu = res.data.data[i].childMenu;
            this.secondMenu.unshift(res.data.data[i])
          }
        }
      });
    },
    deletemenu(index, secondMenu) {
        let pid = this.secondMenu[index].menuPid;
        
        if(pid==0){
              this.$confirm("此为一级菜单谨慎删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.secondMenu[index].menuId;
        this.axios.delete("/menu/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshmenu();
        });
      });
     
        }
        else{
             this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.secondMenu[index].menuId;
        this.axios.delete("/menu/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshmenu();
        });
      });
        }
       
      
    },
    editmenu(index, secondMenu) {
     
      this.modifymenuVisible = true;
      let id = this.secondMenu[index].menuId;
      for (let item of this.secondMenu) {
        if (id == item.menuId) {
          
          this.menuName = item.menuName;
          this.menuDescription = item.menuDescription;
          this.modifyId=item.menuPid;
          console.log(this.modifyId);
          // this.modifyValue=item.menuName;
           this.axios.get('/parent_menu').then(res=>{
             alert(this.modifyId);
          for(let i=0;i<res.data.data.length;i++){
            if(this.modifyId==res.data.data[i].menuId){
              this.modifyValue=res.data.data[i].menuName;
              this.parentId=res.data.data[i].menuId;
            }
          }
      });
    
          this.menuId=item.menuId;
        }
        
      }
      
    },
    confirmModifymenu() {
      if (
        this.menuName.length !== 0 &&
        this.menuDescription.length !== 0
      ) {
        let body = {
           menuName: this.menuName,
          menuDescription: this.menuDescription,
          menuPid:this.parentId,
          menuId:this.menuId
        };
        this.axios.put("/menu", body).then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.refreshmenu();
          this.modifymenuVisible = false;
        });
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    // 添加菜单
    confirmAddmenu() {
  
     for(let i in this.addFirst){
        
            if(this.value==this.addFirst[i].menuName){
            
             this.parentId=this.addFirst[i].menuId;
          }
     }   
  
      if (
        this.menuName.length !== 0 ||
        this.menuDescription.length !== 0 
       
      ) {
         
        let body = {
          menuName : this.menuName,
          menuDescription: this.menuDescription,
          menuPid: this.parentId,
         
        };
        this.axios.post("/menu", body).then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.refreshmenu();
        });
        this.addmenuVisible = false;
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    
  }
};
</script>
<style scoped>
</style>