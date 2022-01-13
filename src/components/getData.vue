<template>
  <el-row>
    <el-col :span="5">
      <img src="../assets/logo.png">
      <br/>
      <el-button type="info" @click="beautifulDate('1')">测试函数</el-button>
      <br/>
      <el-button @click="showCollect">收藏</el-button>
      <br/>
      <el-button @click="showLookLater">稍后再看</el-button>
    </el-col>
    <el-col :span="10">
      <div style="margin-top: 15px">
        <el-input
            v-model="title"
            placeholder="输入想搜索的主题"
            class="input-with-select"
            @keyup.enter.prevent="searchEnterFun"
        >
          <template #append>
            <el-button @click="getForm">Go</el-button>
          </template>
        </el-input>
      </div>
      <el-table :data="tableData" style="width: 100%" @row-click="openurl">
        <el-table-column width="250">
          <template #default="scope">
            <p>{{ scope.row.title }}</p>
            <p>{{ getLocalTime(scope.row.ctime) }}</p>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #default="scope">
            <el-button size="small" @click="collect(scope.row)"
            >收藏
            </el-button
            >
            <el-button
                size="small"
                @click="lookLater(scope.row)"
            >稍后再看
            </el-button>
            <el-button
                size="small"
                @click="deleteFromDb(scope.row.id)"
            >我要删了
            </el-button>

          </template>
        </el-table-column>
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
      <!--      <el-pagination layout="total, prev, pager, next, jumper" :total="60" :page-size="10" @current-change="handleCurrentChange"></el-pagination>-->
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
      url_favorite: '/api?m=App&c=Article&a=getHotMainArticle&uid=1638493790&page=1&pagesize=6',
      url_custom: '/api?m=App&c=Article&a=searchArticle&uid=1638493790&page=1&pagesize=20&title=',
      drawer: '',
      title: '',
      drawerUrl: '',
      tableData: [],
      currentPage: 1,
      requestBody: {title: '', pic: '', url: '', status: '', createTime: '', updateTime: ''},
      status1: "1",//收藏
      status2: "2"//稍后再看
    }
  },
  created() {
    this.getForm()
    // this.getApiList()
  },
  methods: {
    getForm() {
      axios.get(this.url_favorite)
          .then(res => {
            let tempdata = res.data.data;
            //  方法1：利用对象访问属性的方法，判断对象中是否存在key
            let result = [];
            let obj = {};
            for (let i = 0; i < tempdata.length; i++) {
              if (!obj[tempdata[i].aid]) {
                //排除非奇点日报里面的url
                if (tempdata[i].url.indexOf("qidianlife") !== -1) {
                  result.push(tempdata[i]);
                }
                obj[tempdata[i].aid] = true;
              }
            }
            console.log(result);
            this.tableData = result;
            this.drawerUrl = this.tableData[0].url
          })
          .catch(err => {
            console.log(err);
          });
    },
    openurl(row) {
      console.log(row.url);
      this.drawer = true
      this.drawerUrl = row.url;
    },
    //点击回车，进行搜索
    searchEnterFun(e) {
      let keyCode = window.event ? e.keyCode : e.which;
      console.log("回车搜索", keyCode, e);
      if (keyCode === 13) {
        this.currentPage = 1;
        this.getForm();
      }
    },
    //监听翻页页码变化
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;        //然后将当前页 = 改变的值
      console.log(this.currentPage)        //点击第几页
      this.getForm()
    },
    collect(row) {
      this.requestBody.title = row.title;
      this.requestBody.pic = row.pic;
      this.requestBody.url = row.url;
      this.requestBody.status = 1;
      this.requestBody.createTime = new Date().getTime();
      this.requestBody.updateTime = new Date().getTime();
      axios.post('/article/add', this.requestBody)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    lookLater(row) {
      this.requestBody.title = row.title;
      this.requestBody.pic = row.pic;
      this.requestBody.url = row.url;
      this.requestBody.status = 2;
      this.requestBody.createTime = new Date().getTime();
      this.requestBody.updateTime = new Date().getTime();
      axios.post('/article/add', this.requestBody)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    showCollect() {
      axios.post('/article/list')
          .then(res => {
            console.log(res)
            this.tableData = res.data.data.list;
            this.drawerUrl = this.tableData[0].url
          })
          .catch(err => {
            console.log(err);
          });
    },
    showLookLater() {

    },
    deleteFromDb(id) {
      axios.post('/article/delete?id=' + id)
          .then(res => {
            this.showCollect()
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  min-height: 800px;
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