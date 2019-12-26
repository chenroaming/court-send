<template>
  <div>
        
    <Card>
        <p slot="title">
                逾期预警案件列表
        </p>
        <Form :model="formItem" style="margin-top:10px;" inline :label-width="150"  @keydown.native.enter.prevent="onRefreshList()">
            <FormItem label="状态选择：">
                <Select v-model="formItem.stage" @on-change="changeStage" placeholder="请选择法院" style="width: 250px;vertical-align:middle;">
                    <Option value="0">全部</Option>
                    <Option value="1">超时未启动送达</Option>
                    <Option value="2">超时未电联</Option>
                    <Option value="3">超时未邮寄</Option>
                    <Option value="4">超时未外出</Option>
                    <Option value="5">超时未移交</Option>
                    <Option value="6">距开庭不足15日未开庭案件</Option>
                </Select>
            </FormItem>
            <div style="display: inline-block;padding-right: 30px;margin-left:30px;">
                <!-- <Button @click="onRefreshList()" >查询</Button> -->
                <!-- <Button @click="clean" style="margin-left: 10px" >清空</Button> -->

            </div>
        </Form>
        <Spin size="large" fix v-if="spinShow"></Spin>
      <Table
        ref="selection"
        border
        style="min-height:200px;"
        :columns="columns"
        :data="tableData"></Table>
        <!-- <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageData.total"  :page-size="10" :current="pageData.pageNumber" @on-change="changePage"></Page>
            </div>
        </div> -->

    </Card>
     <!-- 证据查看 -->
    <Modal
        v-model="viewDipmos"
        title="查看"
        :mask-closable="false"
        :styles="{top: '20px'}"
        :width="modalWidth">
        <div class="components-container">
            <zh-viewer :viewerId="'1'" :fileUrls="filePathAry"></zh-viewer>
        </div>
        <div slot="footer">
            <Button @click="viewDipmos = false"   type="dashed" size="large">关闭</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import {
    warnCase
} from '@/api/homeDate.js';
const R = require("ramda");
import ZhViewer from "@/components/moreFileViewer/moreFileViewer.vue";
import { formatDate } from '@/libs/date';
export default {
    components: {
        ZhViewer
    },
    data () {
        var width = window.innerWidth - 350;
        return {
            modalWidth:width,
            filePathAry:[],
            viewDipmos:false,
            spinShow:false,
            formItem:{
                court:"全院",
                stage:"0"
            },
            loading: true,
            pageData: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            //超时未启动送达
            overTimeNoSend:[],
            //超时未电联
            overPhoneNoSend:[],
            //超时未邮寄
            overEmsNoSend:[],
            //超时未外出
            overOutNoSend:[],
            //超时未移交
            overtrustNoSend:[],
            //距开庭不足15天
            nearOpenCourt:[],
            //全部数据
            allData:[],
            tableData: [],
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '案号',
                    key: 'caseNo',
                    align: 'center',
                    width: 190
                },
                {
                    title: '案件名称',
                    key: 'reason',
                    align: 'center',
                    // width: 180
                },
                {
                    title: '案由',
                    key: 'brief',
                    align: 'center',
                    width: 150,
                    render: (h, params) => {
                        return h('p', {
                            
                        }, params.row.brief ? params.row.brief.name : "");
                    }
                },
                {
                    title: '承办人',
                    key: 'judge',
                    align: 'center',
                    width: 130,
                    render: (h, params) => {
                        return h('p', {
                            
                        }, params.row.judge ? params.row.judge.name : "");
                    }
                },
                {
                    title: '书记员',
                    key: 'clerk',
                    align: 'center',
                    width: 130,
                    render: (h, params) => {
                        return h('p', {
                            
                        }, params.row.clerk ? params.row.clerk.name : "");
                    }
                },
                // {
                //     title: '立案时间',
                //     key: 'filingDate',
                //     align: 'center',
                //     width: 140
                // },
                {
                    title: '预警状态',
                    key: 'overdueType',
                    align: 'center',
                    width: 140
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     align: 'center',
                //     // fixed: 'right',
                //     width: 120,
                //     render: (h, params) => {
                //         console.log()
                //         return h('div', [
                //             h(
                //                 'Button',
                //                 {
                //                     props: {
                //                         type: 'primary',
                //                         disabled:this.formItem.stage == '0' || this.formItem.stage == '1' ? true : false,
                //                         size: 'small'
                //                     },
                //                     on: {
                //                         click: () => {
                //                             if(this.formItem.stage == "2"){
                //                                 this.$router.push({
                //                                     name: "sendY",
                //                                     params: { lawCaseId: params.row.id }
                //                                 });
                //                             }else if(this.formItem.stage == "3" || this.formItem.stage == "4"){
                //                                 let ary = params.row.dates.split("-");
                //                                 console.log(ary)
                //                                 this.$store.commit('setCalYear',Number(ary[0]));
                //                                 this.$store.commit('setCalMonth',Number(ary[1] - 1));
                //                                 this.$router.push({
                //                                     name: "calendar",
                //                                     params: { year: ary[0],month:ary[1]-1,caseNo:params.row.caseNo }
                //                                 });
                //                             }else if(this.formItem.stage == "5"){
                //                                 this.$store.commit("SET_CASENO", params.row.caseNo);
                //                                 this.$router.push({
                //                                     name: "caseInfo",
                //                                     params: { ff: "homeCaseList" }
                //                                 });
                //                             }
                //                         }
                //                     }
                //                 },
                //                 '查看详情'
                //             )
                //         ]);
                //     }
                // }
            ],
        };
    },
    created: function () {

        this.onRefreshList();
    },
    methods: {
        changePage(num) {
            this.pageData.pageNumber = num;
            this.$store.commit('setCasePage',this.pageData.pageNumber);
            this.onRefreshList();
        },
        changeLoading () {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        },
        showDipmos(path){
            this.filePathAry = [];
            this.filePathAry.push(path);
            console.log(this.filePathAry)
            this.viewDipmos = true;

        },
        clean(){

        },
        changeStage(){
            console.log(this.formItem.stage)
            this.spinShow = true;
            switch (this.formItem.stage) {
                case '0':
                    this.tableData = this.allData
                    break;
                case '1':
                    this.tableData = this.overTimeNoSend
                    break;
                case '2':
                    this.tableData = this.overPhoneNoSend
                    break;
                case '3':
                    this.tableData = this.overOutNoSend
                    break;
                case '4':
                    this.tableData = this.overOutNoSend
                    break;
                case '5':
                    this.tableData = this.overtrustNoSend
                    break;
                case '6':
                    this.tableData = this.nearOpenCourt
            } 
            this.spinShow = false;
            
        },
        changeCourt(){
            this.$store.commit('setcaseCourtName',this.formItem.court);
            console.log(this.$store.state.app.caseCourt)
        },
        onRefreshList () {
            this.spinShow = true;
            warnCase().then(res => {
                this.spinShow = false;
                if (res.data.state == 100) {
                     //超时未启动送达
                    var addField1 = x => x.overdueType = "超时未启动送达";
                    this.overTimeNoSend = R.forEach(addField1, res.data.overTimeNoSend);
                    //超时未电联
                    var addField2 = x => x.overdueType = "超时未电联";
                    this.overPhoneNoSend =R.forEach(addField2, res.data.overPhoneNoSend);
                    //超时未邮寄
                    var addField3 = x => x.overdueType = "超时未邮寄";
                    this.overEmsNoSend = R.forEach(addField3, res.data.overEmsNoSend);
                    //超时未外出
                    var addField4 = x => x.overdueType = "超时未外出";
                    this.overOutNoSend = R.forEach(addField4, res.data.overOutNoSend);
                    //超时未移交
                    var addField5 = x => x.overdueType = "超时未移交";
                    this.overtrustNoSend =R.forEach(addField5, res.data.overtrustNoSend);
                     //距开庭不足15天
                    var addField6 = x => x.overdueType = "距开庭不足15天";
                    this.nearOpenCourt = R.forEach(addField6, res.data.nearOpenCourt);

                    let dt1 = R.concat(this.overTimeNoSend)(this.overPhoneNoSend);
                    let dt2 = R.concat(dt1)(this.overEmsNoSend);
                    let dt3 = R.concat(dt2)(this.overOutNoSend);
                    let dt4 = R.concat(dt3)(this.overtrustNoSend);
                    let dt5 = R.concat(dt4)(this.nearOpenCourt);
                    this.allData = dt5;
                    this.tableData = dt5;
                }
            }).catch(err => {
                this.spinShow = false;
            })
        },
        submitEvidence () {

        }
    },
    filters: {
        formatDate (time) {
            if (time == '') {
                return '';
            }
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        },
        whether (boole) {
            return boole ? '是' : '否';
        },
        filCheck (boole) {
            return boole == 0 ? '未确认' : '已确认';
        },
        formatStartDate (time) {
            if (time == '') {
                return '';
            }
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
};
</script>

<style lang="less">
.search-wrapper {
  margin-bottom: 10px;
}
.search-form .ivu-form-item {
  margin-bottom: 10px;
}
.btn-group .ivu-form-item {
  margin-bottom: 0px;
}
.lis{
    margin-bottom:12px;
}
.bookbuilding-table {
  width: 100%;
  min-width: 600px;
  border: 1px solid #e9eaec;
  tr {
    td {
      border-left: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      line-height: 37px;
      text-align: left;
      padding-left: 8px;
    }
    td:first-child {
      border-left: none;
      width: 20%;
    }
    td:nth-child(2) {
      width: 30%;
    }
    td:nth-child(3) {
      width: 20%;
    }
    td:nth-of-type(odd) {
      background: #f8f8f9;
    }
  }
  tr:last-child {
    td {
      border-bottom: none;
    }
  }
}

</style>
