<template>
  <div class="albumManagement">
    <div style="padding:30px;">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-weight:bolder;">控制面板</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="19">
          <div style="text-align:left;margin-top:10px;">
            <el-button style="margin-top:30px;" type="primary" @click="add">添加分类</el-button>
            <el-table border :data="categoryList" style="margin-top:30px;width:100%">
              <el-table-column align="center" label="分类ID" width="70" prop="categoryId"></el-table-column>
              <el-table-column
                align="center"
                label="分类名称"
                prop="categoryName"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column align="center" label="分类描述" prop="categoryDescription"></el-table-column>
              <el-table-column label="操作" align="center" width="190">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-edit"
                    @click.native.prevent="editCategory(scope.$index,categoryList)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click.native.prevent="deleteCategory(scope.$index,categoryList)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="添加分类" :visible.sync="addCategoryVisible">
        <div style="text-align:left;">
          <p>分类名称</p>
          <el-input placeholder="请输入分类名称" v-model="categoryName"></el-input>
          <p>分类描述</p>
          <el-input placeholder="请输入分类描述" v-model="categoryDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="addCategoryVisible=false">取消</el-button>
          <el-button @click="confirmAddCategory" type="primary">添加</el-button>
        </div>
      </el-dialog>
      <!-- 修改相册信息 -->
      <el-dialog title="修改分类" :visible.sync="modifyCategoryVisible">
        <div style="text-align:left;">
          <p>分类名称</p>
          <el-input placeholder="请输入分类名称" v-model="categoryName"></el-input>
          <p>分类描述</p>
          <el-input placeholder="请输入分类描述" v-model="categoryDescription"></el-input>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="modifyCategoryVisible=false">取消</el-button>
          <el-button @click="confirmModifyCategory" type="primary">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoryManagement",
  data() {
    return {
      // 分类信息列表
      categoryList: [],
      categoryName: "",
      categoryDescription: "",
      addCategoryVisible: false,
      modifyCategoryVisible: false,
      categoryId: ""
    };
  },
  mounted() {
    this.axios.get("/category").then(res => {
      this.categoryList = res.data.data;
    });
  },
  methods: {
    refreshCategory() {
      this.axios.get("/category").then(res => {
        this.categoryList = res.data.data;
      });
    },
    remove() {
      this.categoryName = "";
      this.categoryDescription = "";
    },
    add() {
      this.addCategoryVisible = true;
      this.remove();
    },
    confirmAddCategory() {
      if (
        this.categoryName.length !== 0 ||
        this.categoryDescription.length !== 0
      ) {
        let body = {
          categoryName: this.categoryName,
          categoryDescription: this.categoryDescription
        };
        this.axios.post("/category", body).then(res => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.refreshCategory();
        });
        this.addCategoryVisible = false;
      } else {
        this.$alert("表单内容不能为空", "警告", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    deleteCategory(index, categoryList) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = this.categoryList[index].categoryId;
        this.axios.delete("/category/" + id).then(res => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.refreshCategory();
        });
      });
    },
    editCategory(index, categoryList) {
      this.modifyCategoryVisible = true;
      let id = categoryList[index].categoryId;
      for (let item of this.categoryList) {
        if (id == item.categoryId) {
          this.categoryName = item.categoryName;
          this.categoryDescription = item.categoryDescription;
        }
      }
      this.categoryId = id;
    },
    //    修改相册信息
    confirmModifyCategory() {
      if (
        this.categoryName.length !== 0 ||
        this.categoryDescription.length !== 0
      ) {
        let body = {
          categoryId: this.categoryId,
          categoryName: this.categoryName,
          categoryDescription: this.categoryDescription
        };
        this.axios.put("/category", body).then(res => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.refreshCategory();
          this.modifyCategoryVisible = false;
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