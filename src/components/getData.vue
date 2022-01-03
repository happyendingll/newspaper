<template>
  <el-row>
    <el-col  :span="5">
        <img src="../assets/logo.png">
    </el-col>
    <el-col  :span="10">
      <div style="margin-top: 15px">
        <el-input
            v-model="title"
            placeholder="输入想搜索的主题"
            class="input-with-select"
            @keyup.enter.prevent="searchEnterFun($event)"
        >
          <template #append>
            <el-button @click="getForm">Go</el-button>
          </template>
        </el-input>
      </div>
      <el-table :data="tableData" style="width: 100%" @row-click="openurl">
        <el-table-column prop="title" width="180" />
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
    </el-col>
    <el-col :offset="1" :span="7">
      <iframe :src=this.drawerUrl style="width: 100%;height: 100%"></iframe>
    </el-col>
  </el-row>
<!--  <el-drawer v-model="drawer" :modal="false" :show-close="false" :open-delay="200">-->
<!--    <iframe :src=this.drawerUrl style="width: 100%;height: 100%"></iframe>-->
<!--  </el-drawer>-->
</template>

<script>
const axios = require('axios');
export default {
  name: "getData",
  data() {
    return {
      url_favorite:'/api?m=App&c=Article&a=getHotMainArticle&uid=1638493790&page=1&pagesize=50',
      url_java:'/api?m=App&c=index&a=getCategoryArticle&uid=1638493790&fid=8&page=1&pagesize=10',
      url_custom:'/api?m=App&c=Article&a=searchArticle&uid=1638493790&page=1&pagesize=50&title=',
      drawer:'',
      title:'',
      drawerUrl:'http://www.qidianlife.com/Singular/index.php?m=App&c=Article&a=index&id=7267',
      tableData:[]
    }
  },
  created() {
    this.getForm()
  },
  methods:{
    getForm() {
      axios.get(this.url_custom+this.title)
          .then(res=> {
            let tempdata = res.data.data;
            //  方法1：利用对象访问属性的方法，判断对象中是否存在key
                let result = [];
                let obj = {};
                for(let i =0; i<tempdata.length; i++){
                     if(!obj[tempdata[i].aid]){
                          //排除非奇点日报里面的url
                          if(tempdata[i].url.indexOf("qidianlife")!==-1){
                            result.push(tempdata[i]);
                          }
                          obj[tempdata[i].aid] = true;
                      }
                 }
                console.log(result);
                this.tableData=result;
          })
          .catch(err=> { console.log(err); });
    },
    openurl(row) {
      console.log(row.url);
      this.drawer=true
      this.drawerUrl=row.url;
    },
    //点击回车，进行搜索
    searchEnterFun (e){
      let keyCode = window.event ? e.keyCode : e.which;
      console.log("回车搜索", keyCode, e);
      if (keyCode === 13) {
        this.getForm();
      }
    },
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