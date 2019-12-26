<template>
  <div>
        
    <Card>
        <p slot="title">
                案件列表
        </p>
        <Form :model="formItem" style="margin-top:10px;" inline :label-width="150"  @keydown.native.enter.prevent="onRefreshList()">
            <FormItem label="承办部门：">
                <Select v-model="formItem.court" @on-change="changeCourt" placeholder="请选择法院" style="width: 200px;vertical-align:middle;">
                    <Option value="全院">全院</Option>
                    <Option value="殿前法庭">殿前法庭</Option>
                </Select>
            </FormItem>
            <FormItem label="案件阶段：">
                <Select v-model="formItem.stage" @on-change="changeStage" placeholder="请选择法院" style="width: 200px;vertical-align:middle;">
                    <Option value="0">全部</Option>
                    <Option value="1">排期中</Option>
                    <Option value="2">送达中</Option>
                    <Option value="3">已送达</Option>
                    <Option value="4">已开庭</Option>
                    <Option value="5">已结案</Option>
                </Select>
            </FormItem>
            <div style="display: inline-block;padding-right: 30px;margin-left:30px;">
                <Button @click="onRefreshList()" >查询</Button>
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
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageData.total"  :page-size="10" :current="pageData.pageNumber" @on-change="changePage"></Page>
            </div>
        </div>

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
    getlawCaseStageInfo
} from '@/api/homeDate.js';

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
            litigantId:'',
            departmentList: [],
            pageData: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            sendTypes: [
                "现场领取",
                "EMS送达",
                "工作人员上门送达",
                "电子邮件送达",
                "公告送达",
                "H5确认阅读",
                "委托送达",
                "电话送达",
                "微信送达",
                "调解送达",
                "平台送达"
            ],
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
                    width: 150
                },
                {
                    title: '承办人',
                    key: 'judge',
                    align: 'center',
                    width: 130
                },
                {
                    title: '书记员',
                    key: 'clerk',
                    align: 'center',
                    width: 130
                },
                {
                    title: '立案时间',
                    key: 'filingDate',
                    align: 'center',
                    width: 140
                },
                {
                    title: '审限届满时间',
                    key: 'expireDate',
                    align: 'center',
                    width: 140
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    // fixed: 'right',
                    width: 120,
                    render: (h, params) => {
                        console.log()
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        disabled:this.formItem.stage == '0' || this.formItem.stage == '1' ? true : false,
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            if(this.formItem.stage == "2"){
                                                this.$router.push({
                                                    name: "sendY",
                                                    params: { lawCaseId: params.row.id }
                                                });
                                            }else if(this.formItem.stage == "3" || this.formItem.stage == "4"){
                                                let ary = params.row.dates.split("-");
                                                console.log(ary)
                                                this.$store.commit('setCalYear',Number(ary[0]));
                                                this.$store.commit('setCalMonth',Number(ary[1] - 1));
                                                this.$router.push({
                                                    name: "calendar",
                                                    params: { year: ary[0],month:ary[1]-1,caseNo:params.row.caseNo }
                                                });
                                            }else if(this.formItem.stage == "5"){
                                                this.$store.commit("SET_CASENO", params.row.caseNo);
                                                this.$router.push({
                                                    name: "caseInfo",
                                                    params: { ff: "homeCaseList" }
                                                });
                                            }
                                        }
                                    }
                                },
                                '查看详情'
                            )
                        ]);
                    }
                }
            ],
        };
    },
    created: function () {
        console.log(this.$store.state.app.cachePage)
        if (this.$route.params){
            let court = this.$route.params.court;
            let stage = this.$route.params.stage;
            if(court == '殿前法庭'){
                this.formItem.court = '殿前法庭';
            }else{
                this.formItem.court = '全院';
            }
            switch(stage){
                case '受理案件':
                    this.formItem.stage = '0';
                    break;
                case '排期中案件数':
                    this.formItem.stage = '1';
                    break;
                case '送达中案件数':
                    this.formItem.stage = '2';
                    break;
                case '已送达案件数':
                    this.formItem.stage = '3';
                    break;
                case '已开庭案件数':
                    this.formItem.stage = '4';
                    break;
                case '已结案件数':
                    this.formItem.stage = '5';
                    break;
            }
            console.log(court)
            console.log(stage)
            if(!stage){
                this.formItem.stage = this.$store.state.app.caseStage;
                this.pageData.pageNumber = this.$store.state.app.casePage;
            }
            if(!court){
                this.formItem.court = this.$store.state.app.caseCourt;
            }
            this.$store.commit('setcaseCourtName',this.formItem.court);
            this.$store.commit('setCaseStage',this.formItem.stage);
            console.log(this.formItem.stage)
        }else{
            this.formItem.court = '殿前法庭';
            this.formItem.stage = '0';
        }
        console.log(this.formItem.stage)
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
            this.$store.commit('setCaseStage',this.formItem.stage);
            this.onRefreshList ();
        },
        changeCourt(){
            this.$store.commit('setcaseCourtName',this.formItem.court);
            console.log(this.$store.state.app.caseCourt)
        },
        onRefreshList () {
            this.spinShow = true;
            getlawCaseStageInfo(this.formItem.stage,this.formItem.court,this.pageData.pageNumber,10).then(res => {
                this.spinShow = false;
                this.tableData = [];
                if (res.data.state == 100) {
                    let data = res.data.data;
                    // this.pageData.total = res.data.result.total;
                    data.map(item => {
                        item.sendType = this.sendTypes[item.type];
                        item.filingDate = item.filingDate ? formatDate(new Date(item.filingDate), 'yyyy-MM-dd') : "";
                        item.expireDate = item.expireDate ? formatDate(new Date(item.expireDate), 'yyyy-MM-dd') : "无";
                        item.dates = item.start_date ? formatDate(new Date(item.start_date), 'yyyy-MM-dd') : "无";
                    });
                    this.tableData = data;
                    this.pageData.total = res.data.total;
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
