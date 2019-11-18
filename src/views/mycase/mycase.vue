<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div  style="height:100%">
    <div class="home-main"  style="height:100%" >
        <Row :gutter="10"  style="height:45%">

            <Modal
              v-model="detailModal"
              width="630"
              :ok-text="'关闭'"
              cancel-text=""
              @on-ok=""
              title="详情">
                <Row>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      原告
                  </Col>
                  <Col span="21" class="maininfo-col">
                      {{detailLawcase.plaintiffName}}
                  </Col>
              </Row>
              <Row>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      被告
                  </Col>
                  <Col span="21" class="maininfo-col">
                      {{detailLawcase.defendantName}}
                  </Col>
              </Row>
              <Row>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      案件编号
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.caseNo}}
                  </Col>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      案由
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.briefName}}
                  </Col>
              </Row>
              <Row> 
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      法官
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.judgeName}}
                  </Col>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      书记员
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.clerkName}}
                  </Col>
              </Row>
              <Row>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      开庭时间
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.startDate | formatDate}}
                  </Col>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      法庭
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.tribunalName}}
                  </Col>
              </Row>
              <Row>
                  <Col span="3" class="table-border-t" :style="{minHeight: '38px'}">
                      关联案件
                  </Col>
                  <Col span="21" class="table-border-t"  v-if="detailLawcase.associateLawCase != ''" :style="{minHeight: '38px'}">
                      <span v-for="item in detailLawcase.associateLawCase" > <a>{{ item.caseNo }}</a><br/> </span>
                  </Col>
                  <Col span="21"  class="table-border-t" v-else>
                      <span>无</span>
                  </Col>
              </Row>
          </Modal>
            <Col :md="12" :lg="12" style="height:100%;padding-right: 5px;">
                <Row class-name="home-page-row1" :gutter="10"  style="height:100%">                    
                    <Col :md="24" :lg="24" :style="{marginBottom: '10px'}"  style="height:100%">
                        <Card  style="height:100%">
                            <div :style="{textAlign: 'center',marginBottom:'10px'}" >
                                <!-- <span class="img-title" style="font-size:14px">案件总览</span> -->
                                <!-- <div :style="{display: 'inline-block',margin:'0 auto'}">
                                    日期　<span>
                                            <DatePicker :options="dateOptionsAn" v-model="courtStartDate" @on-change="selectCourtStartDate"  placeholder="选择日期"></DatePicker>
                                        </span>
                                    　 -　  <span><DatePicker  :options="dateOptionsAnEnd" v-model="courtEndDate" @on-change="selectCourtEndDate"  placeholder="选择日期"></DatePicker></span>
                                </div> -->
                            </div>
                            <div id="charts-r" :style="{width: '100%',height: '90%',backgroundColor: '#F7F7F7'}">
                            </div>
                        </Card>
                    </Col>              
                </row>
            </Col>
            <Col :md="12" :lg="12" style="height:100%;padding-left: 5px;">
                <Row class-name="home-page-row1" :gutter="10"  style="height:100%">
                    <Card style="height:100%">
                        <div id="charts-m" :style="{width: '100%',height: '100%',backgroundColor: '#F7F7F7'}">
                        </div>
                    </Card>
                </Row>
            </Col>
            
        </Row>
        <Row>
            <Col :md="24" :lg="24" style="height:50%;margin-top:10px">
                <Row class-name="home-page-row1" style="height:100%" :gutter="10">
                    <Col :md="24" :lg="24" :style="{marginBottom: '10px',backgroundColor: '#F7F7F7'}" style="height:100%">
                        <Card style="height:100%">
                            <Spin size="large" fix v-if="spinShow"></Spin>
                            <div  :style="{lineHeight: '20px', paddingBottom: '10px',borderBottom:'1px solid #ccc'}"><span :style="{fontSize:'18px'}"><Icon type="md-notifications" size="24" />逾期预警</span> <a href="#"  v-on:click="showCourtDate" :style="{float: 'right',fontSize:'18px'}">查看更多>></a></div>
                            <div  :style="{height: '95%',textAlign:'center'}">
                                <Table
                                    ref="selection"
                                    border
                                    style="min-height:250px;margin-top:10px;"
                                    :columns="columns"
                                    :data="tableData"></Table>
                                <!-- <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <Page :total="pageData.total"  :page-size="10" :current="pageData.pageNumber" @on-change="changePage"></Page>
                                    </div>
                                </div> -->
                            </div>
                        </Card>
                    </Col>
                </row>
            </Col>
        </Row>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util.js';
import echarts from 'echarts';
const R = require("ramda");
import {
    personCase,
    warnCase
} from '@/api/homeDate';
import { formatDate } from '@/libs/date';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
    name: 'home',
    components: {
        swiper,
        swiperSlide
    },
    data () {
        return {
            toDoList: [],
            courtName:"全部",
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            showAddNewTodo: false,
            newToDoItemValue: '',
            spinShow:false,
            name: '',
            monthInput: true,
            yearInput: false,
            detailModal: false,
            loading: true,
            nowLoginDay: '',
            recentDay: '',
            litigantLogin: this.$store.getters.access == 'litigant',
            startDate: '',
            dots: '',
            yearMonth: 1,
            items: [2, 6, 4, 5],
            newCase: '',
            acceptCase: '',
            sendStartDate: '',
            sendEndData: '',
            yearDate: '',
            beforeDate: '',
            afterDate: '',
            courtStartDate: '',
            courtEndDate: '',
            sourceData: false,
            courtxdata: [],
            courtydata: [],
            value1: 0,
            pageData: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableData:[],
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '超时未启动送达',
                    key: 'overTimeNoSend',
                    align: 'center',
                    width: 190
                },
                {
                    title: '超时未电联',
                    key: 'overPhoneNoSend',
                    align: 'center',
                    width: 190
                },
                {
                    title: '超时未邮寄',
                    key: 'overEmsNoSend',
                    align: 'center',
                    width: 190
                },
                
                {
                    title: '超时未外出',
                    key: 'overOutNoSend',
                    align: 'center',
                    width: 190
                },
                {
                    title: '超时未移交',
                    key: 'overtrustNoSend',
                    align: 'center',
                    // width: 200
                },
                {
                    title: '距开庭不足15日未开庭案件',
                    key: 'nearOpenCourt',
                    align: 'center',
                    // width: 200
                },
                
            ],
            detailLawcase: [],
            setting: {
                dots: 'outside',
                radiusDot: true
            },
            courtPlans: [],
            dateOptions: {
                disabledDate: time => {
                    let endDateVal = this.sendEndData;
                    return (
                        time.getTime() > Date.now() ||
            time.getTime() > new Date(endDateVal).getTime()
                    );
                }
            },
            dateOptionsEnd: {
                disabledDate: time => {
                    let beginDateVal = this.sendStartDate;
                    return (
                        time.getTime() < new Date(beginDateVal).getTime() ||
            time.getTime() > Date.now()
                    );
                }
            },
            dateOptionsAnEnd: {
                disabledDate: time => {
                    let beginDateVal = this.courtStartDate;
                    return (
                        time.getTime() < new Date(beginDateVal).getTime() ||
            time.getTime() > Date.now()
                    );
                }
            },
            dateOptionsAn: {
                disabledDate: time => {
                    let endDateVal = this.courtEndDate;
                    return (
                        time.getTime() > Date.now() ||
            time.getTime() > new Date(endDateVal).getTime()
                    );
                }
            }
        };
    },
    created () {
        
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    mounted () {
        this.getCount();
        this.getCase();

    },
    methods: {
        compare (property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        getCase(){
            this.spinShow = true;
            warnCase().then(res => {
                this.spinShow = false;
                if(res.data.state == 100){
                    //超时未启动送达
                    let data1 = res.data.overTimeNoSend;
                    //超时未电联
                    let data2 = res.data.overPhoneNoSend;
                    //超时未邮寄
                    let data3 = res.data.overEmsNoSend;
                    //超时未外出
                    let data4 = res.data.overOutNoSend;
                    //超时未移交
                    let data5 = res.data.overtrustNoSend;
                     //距开庭不足15天
                    let data6 = res.data.nearOpenCourt;
                    let arr = [];

                    for(let i=0;i<5;i++){
                        let data = {
                            overTimeNoSend:data1[i] ? data1[i].caseNo : "",
                            overPhoneNoSend:data2[i] ? data2[i].caseNo : "",
                            overEmsNoSend:data3[i] ? data3[i].caseNo : "",
                            overOutNoSend:data4[i] ? data4[i].caseNo : "",
                            overtrustNoSend:data5[i] ? data5[i].caseNo : "",
                            nearOpenCourt:data6[i] ? data6[i].caseNo : "",
                        }
                        if(data.overTimeNoSend == "" 
                        && data.overPhoneNoSend == "" 
                        && data.overEmsNoSend == "" 
                        && data.overOutNoSend == "" 
                        && data.overtrustNoSend == ""
                        && data.nearOpenCourt == ""){
                            break;
                        }
                        arr.push(data)
                    }
                    this.tableData = arr;
                }else{
                    this.$Message.error(res.data.message);
                }
            })
        },
         // 环形图
        getCount(){
            personCase().then(res => {
                if (res.data.state == 100) {
                    var ary1 = {
                        value: res.data.noticeSend,
                        name: '公告（件）'
                    };
                    var ary2 = {
                        value: res.data.trustSend,
                        name: '委托（件）'
                    };
                    var ary3 = {
                        value: res.data.outSend,
                        name: '外出（件）'
                    };
                    var ary4 = {
                        value: res.data.emsSend,
                        name: '邮寄（件）'
                    };
                    var ary5 = {
                        value: res.data.sendCase,
                        name: '正在送达（件）'
                    };
                    var ary6 = {
                        value: res.data.phoneSend,
                        name: '已电联（件）'
                    };
                    var caseAry = [ary4, ary1, ary2, ary3, ary6];
                    var waitshCase = [ary5];
                    console.log(waitshCase)
                    console.log(caseAry)
                    this.drawChart1(waitshCase, caseAry);
                    //条形图
                    this.courtxdata = ['案件总数','未启动送达','未启动送达','已送达'];
                    this.courtydata = [res.data.allLawCase,res.data.noSendCase,res.data.sendCase,res.data.overSendCase];
                    this.drawChart3(this.courtxdata, this.courtydata);
                } else if (res.data.state == 101) {
                    this.$Message.error(res.data.message);
                }
            });
        },
        changePage(num) {
            this.pageData.pageNumber = num;
            // this.onRefreshList();
        },
        changeCourt(){
            console.log(this.courtName)
            this.getCount();
            
            // 案件案由分布统计表
            this.getcaseCount();
        },
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        detailM (id) {
            this.detailModal = true;
        },
        changeLoading () {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        },
        drawChart1 (waitshCase, aryData) {
            let that = this;
            let myChart = echarts.init(document.getElementById('charts-m'));
            var option1 = {
                title: {
                    // text: '案件处理统计',
                    textStyle: {
                        fontWeight: 'normal'
                    }
                },
                series: [
                    {
                        name: '正在送达（件）',
                        type: 'pie',
                        selectedMode: false,
                        radius: [0, '30%'],
                        // center: ['50%', '50%'],
                        label: {
                            normal: {
                                position: 'inner',
                                formatter: '{c}\n\n{a}\n\n\n\n',
                                fontSize: 12,
                                fontWeight: 600
                            }
                        },
                        data: waitshCase,
                        itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                 },
                                normal:{
                                    color:function(params) {
                                    //自定义颜色
                                    var colorList = [          
                                            '#EBA95D',
                                        ];
                                        return colorList[params.dataIndex]
                                     }
                                }
                          }
                    },
                    {
                        name: '案件数量',
                        type: 'pie',
                        radius: ['45%', '90%'],
                        center: ['50%', '50%'],
                        label: {
                            normal: {
                                position: 'inner',
                                // formatter: '{b|{b}：}{c}  {per|{d}%}',
                                formatter: ' {c} \n{b}',
                                fontSize: 12,
                            }
                        },
                        data: aryData,
                        itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                 },
                                normal:{
                                    color:function(params) {
                                    //自定义颜色
                                    var colorList = [          
                                            '#F3E671', '#8F8FF6', '#D888FF', '#88DC92', '#FF8888',
                                        ];
                                        return colorList[params.dataIndex]
                                     }
                                }
                          }
                    }
                ]
            };
            myChart.setOption(option1);
            // myChart.on('click', function (param) {
            //   that.$router.push({
            //     name: "homeCaseList_index",
            //     params: { court: that.courtName,stage:option1.series[param.seriesIndex].data[param.dataIndex].name }
            //   });
            // });
        },
        drawChart3 (xaxisdata, seriesdata) {
            let myChart = echarts.init(document.getElementById('charts-r'));
            myChart.setOption({
                // title: {
                //     text: '案件总览',
                //     textStyle: {
                //         fontWeight: 'normal',
                //     },
                //     x: 'center',
                //     top:"bottom",
                //     itemGap: 20,
                // },
                tooltip: {
                    trigger: 'axis',
                    showDelay: 5,
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: xaxisdata,
                    axisLabel: {
                        interval: 0, // 横轴信息全部显示
                        formatter: function (val) {
                            var strs = val.split(''); // 字符串数组
                            var str = '';
                            for (var i = 0, s; (s = strs[i++]);) {
                                str += s;
                                if (!(i % 3)) str += '\n';
                            }
                            return str;
                        }
                    }
                },
                yAxis: {
                    type: 'value'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#ccc'
                        }
                    }
                },
                grid:{
                    x:'10%',
                    y:'5%',
                },
                series: [
                    {
                        data: seriesdata,
                        type: 'bar',
                        barWidth: 50, // 柱图宽度
                        // 配置样式
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#135B91',
                                        '#DE6676',
                                        '#23C97C',
                                        '#EBA95D',
                                        'rgb(195,229,235)',
                                        'rgb(255,140,70)',
                                        'rgb(39,114,123)',
                                        'rgb(193,35,43)',
                                        'rgb(205,206,16)',
                                        'rgb(155,202,99)'
                                    ];
                                    return colorList[params.dataIndex];
                                },
                                barBorderRadius: [5, 5, 5, 5]
                            }
                        },
                    }
                ]
            });
        },
        changeYearMonth (num) {
            this.yearMonth = num;
            if (num == 2) {
                this.monthInput = false;
                this.yearInput = true;
                var yearDate = null;
                var startDate = null;
                var endDate = null;
                this.sendCourtAj(yearDate, startDate, endDate, this.yearMonth);
            } else {
                this.monthInput = true;
                this.yearInput = false;
                this.sendCourtAj();
            }
        },
        showCourtDate () {
            // util.openNewPage(this, 'courtdate');
            this.$router.push({
                name: 'mycaseList_index'
            });
        },
        sendCourtAj (yearDate, startDate, endDate, type) {
                let data = {
                    countyear: yearDate,
                    startTime: startDate,
                    endTime: endDate,
                    countType: type,
                    court:this.courtName
                }
        },
        selectStartDate (value) {
            this.sendStartDate = value;
            if (this.sendEndData != '') {
                var startDate = formatDate(new Date(this.sendStartDate), 'yyyy-MM');
                var endDate = formatDate(new Date(this.sendEndData), 'yyyy-MM');
                var yearDate = null;
                console.log(this.sendEndData);
                this.sendCourtAj(yearDate, startDate, endDate, this.yearMonth);
            }
        },
        selectEndDate (value) {
            this.sendEndData = value;
            if (this.sendStartDate != '') {
                var startDate = formatDate(new Date(this.sendStartDate), 'yyyy-MM');
                var endDate = formatDate(new Date(this.sendEndData), 'yyyy-MM');
                var yearDate = null;
                console.log(this.sendEndData);
                this.sendCourtAj(yearDate, startDate, endDate, this.yearMonth);
            }
        },
        selectyearDate (value) {
            this.yearDate = value;
            var startDate = null;
            var endDate = null;
            this.sendCourtAj(this.yearDate, startDate, endDate, this.yearMonth);
        },
        selectCourtStartDate (value) {
            this.courtStartDate = value;
            if (this.courtEndDate != '') {
                this.caseDate();
            }
        },
        selectCourtEndDate (value) {
            this.courtEndDate = value;
            if (this.courtStartDate != '') {
                this.caseDate();
            }
        },
        caseDate () {
            var startDate = formatDate(new Date(this.courtStartDate), 'yyyy-MM-dd');
            var endDate = formatDate(new Date(this.courtEndDate), 'yyyy-MM-dd');
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    },
    filters: {
        formatDate (time) {
            if (time == '') {
                return '';
            }
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd  hh:mm:ss');
        }
    }
};
</script>
<style>
/* .ivu-card-body{
    padding: 8px;
} */
.single-page {height: 100%; }
.ivu-card-body{
    height:100%
}
</style>