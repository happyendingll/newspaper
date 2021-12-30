<template>
  <el-row>
    <el-col :offset="6" :span="12"><div class="grid-content bg-purple">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="title" width="180" />
        <el-table-column prop="biaoqian" label="biaoqian" width="180" />
<!--        <el-table-column prop="pic" label="pic" />-->
        <el-table-column align="right">
        <template #default="scope">
          <el-image
              style="width: 200px; height: 100px"
              :src="scope.row.pic"
              :fit="contain"
          ></el-image>
        </template>
        </el-table-column>
      </el-table>
    </div></el-col>
  </el-row>
</template>

<script>
const axios = require('axios');
export default {
  name: "getData",
  data() {
    return {
      url_favorite:'/api?m=App&c=Article&a=getHotMainArticle&uid=1638493790&page=1&pagesize=10',
      url_java:'/api?m=App&c=index&a=getCategoryArticle&uid=1638493790&fid=8&page=1&pagesize=10',

      tableData:[]
    }
  },
  created() {
    this.getForm()
  },
  methods:{
    getForm() {
      axios.get(this.url_java)
          .then(res=> {
            console.log(res.data.data);
            this.tableData=res.data.data;
          })
          .catch(err=> { console.log(err); });
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>