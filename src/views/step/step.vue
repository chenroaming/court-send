<template>
  <div style="position:relative;">
    <Affix :offset-top="100">
    <Card class="side-bar">
        <p slot="title">
            <Icon type="navicon"></Icon>
            <!-- <span>{{isHistory ? "案件搜索" : "历史案件搜索"}}</span>   -->
            案件搜索
            <span v-show="isHistory" @click="showHis" class="right-texts">
                <Icon type="md-arrow-dropright-circle" size="18"/>
                历史案号
            </span>
            <span v-show="!isHistory" @click="showHis" class="right-texts">
                <Icon type="md-arrow-dropleft-circle" size="18"/>
                退出
            </span>
        </p>
        <div v-show="isHistory" class="card-content">
            <Form :model="searchData" :label-width="40" @keydown.native.enter.prevent="searchList">
                <FormItem label="案号">
                    <Input v-model="searchData.caseNo" placeholder="请输入案号" />
                </FormItem>
                <FormItem style="text-align: right;">
                    <Button @click="resetSearch">重置</Button>
                    <Button type="primary" style="margin-left: 8px" @click="searchList">查询</Button>
                </FormItem>
            </Form>
            <!-- <Tabs >
                <TabPane label="案号检索">案号检索</TabPane>
                <TabPane label="历史案号检索">历史案号检索</TabPane>
            </Tabs> -->
            <div class="search-list">
                <li v-for="item in searchContent" @click="selectCase(item.id)">案号：<br>{{ item.caseNo }}</li>
                <Page @on-change="pageChange" :current="pageData.pageNumber" :total="pageData.total" :page-size="pageData.pageSize" simple style="position:absolute;bottom:10px;left: 50%;margin-left: -80px;"></Page>
            </div>
            <div v-show="emptyData" style="text-align: center;color:#999;">暂无数据</div>
        </div>
        <div v-show="!isHistory" class="card-content">
            <Form :model="searchData2" :label-width="70" @keydown.native.enter.prevent="searchList2">
                <FormItem label="历史案号">
                    <Input v-model="searchData2.caseNo" placeholder="请输入历史案号" />
                </FormItem>
                <FormItem style="text-align: right;">
                    <Button @click="resetSearch2">重置</Button>
                    <Button type="primary" style="margin-left: 8px" @click="searchList2">查询</Button>
                </FormItem>
            </Form>
            <!-- <Tabs >
                <TabPane label="案号检索">案号检索</TabPane>
                <TabPane label="历史案号检索">历史案号检索</TabPane>
            </Tabs> -->
            <div v-show="isHistory" class="search-list">
                <li v-for="item in searchContent" @click="selectCase(item.id)">案号：<br>{{ item.caseNo }}</li>
                <Page @on-change="pageChange" :current="pageData.pageNumber" :total="pageData.total" :page-size="pageData.pageSize" simple style="position:absolute;bottom:10px;left: 50%;margin-left: -80px;"></Page>
            </div>
            <div v-show="!isHistory" class="search-list">
                <li v-for="item in searchContent2" @click="selectCase(item.id)">案号：<br>{{ item.caseNo }}</li>
                <Page @on-change="pageChange2" :current="pageData2.pageNumber" :total="pageData2.total" :page-size="pageData2.pageSize" simple style="position:absolute;bottom:10px;left: 50%;margin-left: -80px;"></Page>
            </div>
            <div v-show="emptyData && isHistory" style="text-align: center;color:#999;">暂无数据</div>
            <div v-show="emptyData2 && !isHistory" style="text-align: center;color:#999;">暂无数据</div>
        </div>
    </Card>
    </Affix>
    <div class="right-wrapper" v-show="selectCaseComplete">
      <button style="float:right;z-index: 999;position: absolute;right:30px;top:30px;cursor: pointer;" class="ivu-btn ivu-btn-primary" type="primary" @click="printF">打印</button>
      <Card  id="printArea">
        <!--startprint-->
        <div class="title">案号: {{ caseNo }} </div>
        <mySteps :current="2" direction="vertical" v-show="stepList.length > 0">
            <myStep v-for="(item, index) in stepList" :icon="index == 0 ? 'ios-create-outline' : '' " :status="index == 0 ? 'process' : 'finish'" :title="item.createDate | formatStartDate" :content="item.operatorContent" :people="item.operatorName"></myStep>
        </mySteps>
        <div v-show="stepList.length == 0" style="text-align: center;color:#999;">
          暂无数据
        </div>
        <!--endprint-->
      </Card>
    </div>

  </div>
</template>

<script>
import myStep from "@/components/step";
import mySteps from "@/components/steps";
import { queryProcessNote } from "@/api/global.js";
import { queryCaseNo,queryHistoryNo } from "@/api/case.js";
import { formatDate } from "@/libs/date";
export default {
  components: {
    mySteps: mySteps,
    myStep: myStep
  },
  data() {
    return {
      stepList: [],
      searchData: {
        caseNo: this.$store.getters.caseNo
      },
      searchData2: {
        caseNo: ''
      },
      pageData: {
        pageNumber: 1,
        pageSize: 5,
        total: 0
      },
      pageData2: {
        pageNumber: 1,
        pageSize: 5,
        total: 0
      },
      caseNo:'',
      emptyData: false,
      emptyData2:false,
      searchContent: [],
      searchContent2:[],
      isHistory:true,
      // loading
      selectCaseComplete: false
    };
  },
  created() {
    this.searchList();
  },
  methods: {
    showHis(){
      this.isHistory = !this.isHistory;
    },
    searchList() {
      this.pageData.pageSize = 5;
      this.searchContent = [];
      this.$store.commit("SET_CASENO", this.searchData.caseNo);
      queryCaseNo(this.searchData.caseNo, this.pageData).then(res => {
        if (res.data.state == 100) {
          
          if (res.data.result.content.length == 0) {
            this.emptyData = true;
          } else {
            this.emptyData = false;
            this.pageData.total = res.data.result.total;
            res.data.result.content.map((item, index) => {
              let contentData = {
                id: item.id,
                caseNo: item.caseNo
              };
              this.searchContent.push(contentData);
            });
            this.selectCase(res.data.result.content[0].id);
          }
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    searchList2(){
      this.pageData2.pageSize = 5;
      this.searchContent2 = [];
      // this.$store.commit("SET_CASENO", this.searchData.caseNo);
      queryHistoryNo(this.searchData2.caseNo, this.pageData2).then(res => {
        if (res.data.state == 100) {
          
          if (res.data.content.length == 0) {
            this.emptyData2 = true;
          } else {
            this.emptyData2 = false;
            this.pageData2.total = res.data.total;
            res.data.content.map((item, index) => {
              let contentData = {
                id: item.id,
                caseNo: item.caseNo
              };
              this.searchContent2.push(contentData);
            });
            this.selectCase(res.data.content[0].id);
          }
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    resetSearch() {
      this.searchData.caseNo = "";
      this.searchContent = [];
    },
    resetSearch2() {
      this.searchData2.caseNo = "";
      this.searchContent2 = [];
    },
    pageChange(pageNum) {
      this.pageData.pageNumber = pageNum;
      this.searchList();
    },
    pageChange2(pageNum) {
      this.pageData2.pageNumber = pageNum;
      this.searchList2();
    },
    printF() {
      let subOutputRankPrint = document.getElementById("printArea");
      console.log(subOutputRankPrint.innerHTML);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
      // var bdhtml=window.document.body.innerHTML;
      // var sprnstr="<!--startprint-->";
      // var eprnstr="<!--endprint-->";
      // var prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+18);
      // prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
      // window.document.body.innerHTML=prnhtml;
      // window.print();
      // window.document.body.innerHTML=bdhtml;
    },
    selectCase(id) {
      queryProcessNote(id).then(res => {
        if (res.data.state == 100) {
          this.caseNo = res.data.caseNo;
          this.stepList = res.data.result;
          this.selectCaseComplete = true;
        }
      });
    }
  },
  filters: {
    formatDate(time) {
      if (time == "") {
        return "";
      }
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    whether(boole) {
      return boole ? "是" : "否";
    },
    filCheck(boole) {
      return boole == 0 ? "未确认" : "已确认";
    },
    formatStartDate(time) {
      if (time == "") {
        return "";
      }
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style lang="less">
.side-bar {
  display: inline-block;
  width: 250px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 99;
  transition: all 0.5s;
}
.ivu-card .ivu-card-head {
  padding: 8px 16px;
}
.close-icon {
  margin-left: 130px;
  cursor: pointer;
}
.close-icon:hover {
  color: #40a9ff;
}
.card-content {
  min-height: 480px;
  .ivu-form-item {
    margin-bottom: 8px;
  }
}
#courtdate li {
  margin-bottom: 6px;
  font-size: 14px;
  cursor: pointer;
}
.search-list {
  padding: 10px;
  max-height: 360px;
  overflow-y: auto;
  li {
    margin-bottom: 8px;
    font-size: 14px;
    cursor: pointer;
    list-style: none;
  }
  li:hover {
    color: #40a9ff;
  }
}
#courtdate li:hover {
  color: #40a9ff;
}
.right-wrapper {
  display: inline-block;
  width: 100%;
  padding-left: 260px;
  position: absolute;
  top: 0px;
  left: 0px;
  transition: all 0.5s;
  .ivu-card {
    margin-bottom: 20px;
    .ivu-card-head {
      border-top: 2px solid #40a9ff;
      p {
        color: #fff;
      }
      .right-btn {
        float: right;
        cursor: pointer;
        color: #fff;
      }
    }
  }
}
.title {
  font-size: 20px;
  font-weight: 600;
  padding: 0px 15px 10px;
}
.right-texts{
  cursor: pointer;
  float:right;
  font-size: 14px;
  line-height: 26px;
}
</style>
