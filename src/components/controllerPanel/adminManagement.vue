<template>
  <div class="adminManagement">
    <div style="padding:30px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="19">
          <div style="text-align:left;margin-top:30px;">
            <el-alert title="注意" type="warning" description="请谨慎修改管理员信息" show-icon close-text="知道了"></el-alert>
            <el-button style="margin-top:30px;" type="primary" @click="add">添加管理员</el-button>

            <el-table border :data="admins" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="序号" width="70" type="index"></el-table-column>
              <el-table-column align="center" label="用户名" prop="username" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column align="center" label="账号" prop="userAccount" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column align="center" label="密码" prop="userPassword" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column align="center" label="个人描述" prop="userDescription" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column align="center" label="用户头像" prop="userAvatar" @click="click">
                <template slot-scope="scope">
                  <el-image
                    :src="scope.row.userAvatar"
                    fit="cover"
                    style="width:100px;height:100px"
                    :preview-src-list="srcList"
                  ></el-image>
                  
                </template>
               
              </el-table-column>
              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-edit"
                    @click.native.prevent="editAdmin(scope.$index,admins)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click.native.prevent="deleteAdmin(scope.$index,admins)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 添加管理员 -->
      <el-dialog title="添加管理员信息" :visible.sync="addAdminVisible">
        <div style="text-align:left;">
          <div style="text-align:left">
            <singlePic ref="addImg"></singlePic>
          </div>
          <p>姓名</p>
          <el-input placeholder="请输入管理员姓名" v-model="adminName"></el-input>
          <p>账号</p>
          <el-input placeholder="请输入账号" v-model="adminAccount"></el-input>
          <p>密码</p>
          <el-input placeholder="请输入密码" v-model="adminPassword"></el-input>
          <p>描述</p>
          <el-input placeholder="请输入描述" v-model="adminDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="addAdminVisible=false">取消</el-button>
          <el-button @click="confirmAddAdmin" type="primary">添加</el-button>
        </div>
      </el-dialog>
      <!-- 修改管理员信息 -->
      <el-dialog title="修改管理员信息" :visible.sync="modifyAdminVisible">
        <div style="text-align:left;">
          <div style="text-align:left">
            <singlePic ref="addImg"></singlePic>
          </div>
          <p>账号</p>
          <el-input placeholder="请输入账号" v-model="adminAccount" disabled></el-input>
          <p>姓名</p>
          <el-input placeholder="请输入管理员姓名" v-model="adminName"></el-input>
          <p>密码</p>
          <el-input placeholder="请输入密码" v-model="adminPassword"></el-input>
          <p>描述</p>
          <el-input placeholder="请输入密码" v-model="adminDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="modifyAdminVisible=false">取消</el-button>
          <el-button @click="confirmModifyAdmin" type="primary">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import singlePic from "../singlePic.vue";
export default {
  name: "adminManagement",
  components: {
    singlePic
  },
  data() {
    return {
      admins: "",
      addAdminVisible: false,
      adminName: "",
      adminAccount: "",
      adminPassword: "",
      adminDescription: "",
      modifyAdminVisible: false,
      addImagUrl: "",
      srcList: []
    };
  },
  mounted() {
    this.axios.get("/admin").then(res => {
      this.admins = res.data.data;
      res.data.data.forEach(element => {
        this.srcList.push(element.userAvatar);
      });
    });
  },
  methods: {
   
    // 更新管理员信息
    refreshAdmins() {
      this.axios.get("/admin").then(res => {
        this.admins = res.data.data;
        console.log(res);
      });
    },
    remove() {
        this.adminAccount="",
        this.adminName="",
        this.adminPassword="",
        this.adminDescription="",
        this.$refs.addImg.picSrc="";
    },
    add(){
      this.addAdminVisible=true;
       this.remove();
    },
    // 添加管理员
    confirmAddAdmin() {
     
      this.addImagUrl = this.$refs.addImg.picSrc;
      if (
        this.adminName.length !== 0 ||
        this.adminAccount.length !== 0 ||
        this.adminPassword.length !== 0 ||
        this.adminDescription.length !== 0
      ) {
        let body = {
          userAccount: this.adminAccount,
          username: this.adminName,
          userPassword: this.adminPassword,
          userDescription: this.adminDescription,
          userAvatar: this.$refs.addImg.picSrc
        };
        this.axios.post("/admin", body).then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.refreshAdmins();
        });
        this.addAdminVisible = false;
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
   
    },
    deleteAdmin(index, admins) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let account = this.admins[index].userAccount;
        this.axios.delete("/admin/" + account).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshAdmins();
        });
      });
    },
    //    获取管理员信息
    editAdmin(index, admins) {
      this.modifyAdminVisible = true;
      let account = admins[index].userAccount;
      for (let item of this.admins) {
        if (account == item.userAccount) {
          this.adminName = item.username;
          this.adminAccount = item.userAccount;
          this.adminPassword = item.userPassword;
          this.adminDescription = item.userDescription;
          this.$refs.addImg.picSrc = item.userAvatar;
        }
      }
    },
    //    修改管理员信息
    confirmModifyAdmin() {
      if (
        this.adminName.length !== 0 &&
        this.adminPassword.length !== 0 &&
        this.adminAccount.length !== 0 &&
        this.adminDescription.length !== 0
      ) {
        let body = {
          userAccount: this.adminAccount,
          username: this.adminName,
          userPassword: this.adminPassword,
          userDescription: this.adminDescription,
          userAvatar: this.$refs.addImg.picSrc
        };
        this.axios.put("/admin", body).then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.refreshAdmins();
          this.modifyAdminVisible = false;
        });
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
     
    }
  }
};
</script>


<style scoped>
</style>