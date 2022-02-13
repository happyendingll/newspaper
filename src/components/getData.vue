<template>
  <el-row>
    <el-col :span="5">
      <img src="../assets/logo.png">
    </el-col>
    <el-col :span="10">
      <div style="margin-top: 15px">
        <el-input
            v-model="title"
            placeholder="输入想搜索的主题"
            class="input-with-select"
            @keyup.enter.prevent="searchEnterFun"
        >
          <template #prepend>
            <el-button @click="showCollect">Star</el-button>
          </template>
          <template #append>
            <el-button @click="getForm">Go</el-button>
          </template>
        </el-input>
      </div>
      <el-table :data="tableData" @row-click="openurl" v-infinite-scroll="loadForm" infinite-scroll-distance="300px"
                class="infinite-list" style="overflow: auto;width: 100%">
        <el-table-column width="250">
          <template #default="scope">
            <p>{{ scope.row.title }}</p>
            <p>{{ getLocalTime(scope.row.ctime) }}</p>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #default="scope">
            <el-button v-if="this.listType == 'qidian'" size="small" @click="collect(scope.row)">收藏</el-button>
            <el-button v-if="this.listType == 'collect'" size="small" @click="deleteFromDb(scope.row.id)">我要删了
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
    </el-col>
    <el-col :offset="1" :span="7">
      <iframe :src=this.drawerUrl style="width: 100%;height: 100%"></iframe>
    </el-col>
  </el-row>
</template>

<script>
const axios = require('axios');
import {h} from 'vue'
// import { ElNotification } from 'element-plus'
export default {
  name: "getData",
  data() {
    return {
      url_favorite: '/api?m=App&c=Article&a=getHotMainArticle&uid=1638493790&page=1&pagesize=6',
      url_custom: '/api?m=App&c=Article&a=searchArticle&uid=1638493790&page=1&pagesize=20&title=',
      tableData: [],
      drawerUrl: '',
      listType: '',
      requestBody: {title: '', pic: '', url: '', status: '', createTime: '', updateTime: ''},
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
            this.tableData = res.data.data;
            this.drawerUrl = this.tableData[0].url
            this.listType = 'qidian'
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
      this.getForm()
    },
    collect(row) {
      this.requestBody.title = row.title;
      this.requestBody.pic = row.pic;
      this.requestBody.url = row.url;
      this.requestBody.status = 1;
      this.requestBody.createTime = new Date().getTime();
      this.requestBody.updateTime = new Date().getTime();
      axios.post('/article', this.requestBody)
          .then(res => {
            console.log(res);
            this.showMesg("收藏成功")
          })
          .catch(error => {
            console.log(error);
          });
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    showCollect() {
      axios.get('/article')
          .then(res => {
            this.tableData = res.data.content;
            this.drawerUrl = this.tableData[0].url
            this.listType = 'collect'
          })
          .catch(err => {
            console.log(err);
          });
    },
    deleteFromDb(id) {
      axios.delete('/article',{data:[id]})
          .then(res => {
            this.showMesg("删除成功")
            this.showCollect()
          })
          .catch(err => {
            console.log(err);
          });
    },
    loadForm() {
      axios.get(this.url_favorite)
          .then(res => {
            for (let i = 0; i < res.data.data.length; i++) {
              this.tableData.push(res.data.data[i])
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    showMesg(mesg) {
      this.$notify({
        title: '通知',
        message: h(
            'i',
            {style: 'color: teal'},
            mesg
        ),
      })
    },
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

.infinite-list {
  height: 800px;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
