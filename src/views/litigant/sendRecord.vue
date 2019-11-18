<template>
  <div>
    <Card>
        <h2 style="margin-bottom:10px;">文书列表</h2>
        <Spin size="large" fix v-if="spinShow"></Spin>
      <Table
        ref="selection"
        border
        style="min-height:250px;"
        :columns="columns"
        :data="tableData"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageData.total"  :page-size="10" :current="pageData.pageNumber" @on-change="changePage"></Page>
            </div>
        </div>

    </Card>
    <Modal
        v-model="detailModal"
        width="800px"
        cancel-text="取消"
        :loading="loading"
        title="文书详情">
        <div class="components-container">
            <Row >
                <Col span="5" class="lis" style="text-align: right; padding-right: 5px">
                    受送达人：
                </Col>
                <Col span="19" class="lis">
                    <span>{{sendInfo.liitgantName}}</span>
                </Col>
                <Col span="5" class="lis" style="text-align: right; padding-right: 5px">
                    送达方式：
                </Col>
                <Col span="19" class="lis">
                    <span>{{sendInfo.sendType}}</span>
                </Col>
                <Col span="5" class="lis" style="text-align: right; padding-right: 5px">
                    送达时间：
                </Col>
                <Col span="19" class="lis">
                    <span v-if="sendInfo.date != ''">{{sendInfo.date}}</span>
                    <span v-else>无</span>
                </Col>
                <Col span="5" class="lis" style="text-align: right; padding-right: 5px">
                    送达地址：
                </Col>
                <Col span="19" class="lis">
                     <span v-if="sendInfo.sendAddress != ''">{{sendInfo.sendAddress}}</span>
                     <span v-else>无</span>
                </Col>
                <Col span="5" class="lis" style="text-align: right; padding-right: 5px">
                    文书列表：
                </Col>
                <Col span="19" class="lis">
                    <span v-if="sendInfo.diploms.length == 0">无</span>
                    <a v-for="it in sendInfo.diploms" :key="it.name" @click="showDipmos(it.path)" >{{ it.name }}、</a>
                </Col>
                <Col span="5" class="lis" style="text-align: right; padding-right: 5px">
                    其他材料：
                </Col>
                <Col span="19" class="lis">
                    <span :key="it.name" v-for="it in sendInfo.otherDiploms">
                        <a  @click="showDipmos(it.path)" v-if="it.type == 2 && it.path != ''" >{{ it.name }}、</a>                       
                        <span v-else>{{ it.name }}、</span>
                    </span>
                    <span v-if="sendInfo.otherDiploms.length == 0">无</span>
                </Col>
                <Col span="5" class="lis" style="text-align: right; padding-right: 5px">
                    材料列表：
                </Col>
                <Col span="19" class="lis">
                    <span :key="it.name" v-for="it in sendInfo.meterials">
                        <a  @click="showDipmos(it.path)" v-if="it.path != ''" >{{ it.name }}、</a>                       
                        <span v-else>{{ it.name }}、</span>
                    </span>
                    <span v-if="sendInfo.meterials.length == 0">无</span>
                </Col>
            </Row>
        </div>
        <div slot="footer">
            <Button @click="detailModal = false"   type="dashed" size="large">关闭</Button>
        </div>
    </Modal>
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
    queryAllLitigantSend,
    querySendInfo,
} from '@/api/send.js';

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
            loading: true,
            litigantId:'',
            detailModal: false,
            departmentList: [],
            sendInfo:{
                diploms:[],
                otherDiploms:[],
                meterials:[]
            },
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
                    title: '',
                    key: 'case',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            // h(
                            //     'Icon',
                            //     {
                            //         props: {
                            //             type: 'eye',
                            //         },
                            //         style:{
                            //             fontSize:"30px",
                            //             color:params.row.read ? "#ccc" : "#4CA439"
                            //         },
                            //     },
                            //     ''
                            // ),
                            h(
                                'span',
                                {
                                    props: {
                                        // type: 'eye',
                                    },
                                    style:{
                                        fontSize:"16px",
                                        display: params.row.read ? "none" : "inline-block",
                                        width:"10px",
                                        height:"10px",
                                        borderRadius:"10px",
                                        lineHeight:"20px",
                                        background: "red",
                                        marginRight:"5px"
                                    },
                                },
                                ''
                            ),
                            h(
                                'span',
                                {
                                    style:{
                                        fontSize:"16px",
                                        
                                    },
                                },
                                params.row.ind
                            ),
                        ]);
                    }
                },
                {
                    title: '案号',
                    key: 'caseNo',
                    align: 'center',
                    width: 200
                },
                {
                    title: '送达方式',
                    key: 'sendType',
                    align: 'center',
                    width: 180
                },
                {
                    title: '受送达人',
                    key: 'liitgantName',
                    align: 'center',
                    width: 200
                },
                
                {
                    title: '送达时间',
                    key: 'date',
                    align: 'center',
                    width: 150
                },
                {
                    title: '送达地址',
                    key: 'sendAddress',
                    align: 'center',
                    // width: 200
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    // fixed: 'right',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                           querySendInfo(params.row.sendId).then(res => {
                                               if(res.data.state == 100){
                                                   let data = res.data.data
                                                   data.sendType = this.sendTypes[data.type];
                                                    data.date  = data.sendTime ? formatDate(new Date(data.sendTime), 'yyyy-MM-dd hh:mm') : "";
                                                   this.sendInfo = data;
                                                   if(!params.row.read){
                                                        let num = this.$store.state.app.litigantBages;
                                                        num = num - 1;
                                                        this.$store.commit('setlitigantBages',num)
                                                    }
                                                    params.row.read = true;
                                                    this.detailModal = true;                                    
                                               }else{
                                                   this.$Message.error(res.data.message);
                                               }    
                                               
                                           })
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
        this.onRefreshList();
    },
    methods: {
        changePage(num) {
            this.pageData.pageNumber = num;
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
        onRefreshList () {
            this.spinShow = true;
            queryAllLitigantSend(this.pageData.pageNumber).then(res => {
                this.spinShow = false;
                this.tableData = [];
                if (res.data.state == 100) {
                    let data = res.data.data;
                    // this.pageData.total = res.data.result.total;
                    data.map((item,index) => {
                        item.sendType = this.sendTypes[item.type];
                        item.date = item.sendTime ? formatDate(new Date(item.sendTime), 'yyyy-MM-dd hh:mm') : "";
                        item.ind = index+1;
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
