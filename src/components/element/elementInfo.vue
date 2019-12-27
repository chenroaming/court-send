<style lang="less">
    .bookbuilding-table {
        width: 100%;
        min-width: 600px;
        margin-bottom: 10px;
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
            border: 1px solid #e9eaec;
            border-right: none;
            border-bottom: none;
            width: 25%;
            /* //   text-align: center */
            }
            td:nth-child(2) {
            width: 75%;
            padding:3px 0px 3px 8px;
            }
            /* // td:nth-child(3) {
            //   width: 20%;
            // } */
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

        .bookbuilding-table .ivu-menu-vertical .ivu-menu-submenu-title{
            padding: 0 !important;
        } 
        .bookbuilding-table .ivu-menu-vertical .ivu-menu-item{
            padding: 6px 24px;
        }
</style>


<template>
    <div>
        <div v-if="element == 1" class="loan-Box">
            <table class="bookbuilding-table" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td>合同信息</td>
                    <td>
                        <Menu @on-select="choice" style="width: 300px;">
                            <Submenu name="1">
                                <template slot="title">
                                    授信合同信息
                                </template>
                                <MenuItem :name="'c0'+item.id" v-for="(item,index) in creditContract" :key="item.id">{{item.name}}
                                </MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    借款合同信息
                                </template>
                                <MenuItem :name="'l1'+item.id" v-for="(item,index) in loanContract" :key="item.id">{{item.name}}
                                </MenuItem>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    保证合同信息
                                </template>
                                <MenuItem :name="'g2'+item.id" v-for="(item,index) in guaranteeContract" :key="item.id">{{item.name}}
                                </MenuItem>
                            </Submenu>
                            <Submenu name="4">
                                <template slot="title">
                                    抵押合同信息
                                </template>
                                <MenuItem :name="'m3'+item.id" v-for="(item,index) in mortgageContract" :key="item.id">{{item.name}}
                                </MenuItem>
                            </Submenu>
                            <Submenu name="5">
                                <template slot="title">
                                    质押合同信息
                                </template>
                                <MenuItem :name="'p4'+item.id" v-for="(item,index) in pledgeContract" :key="item.id">{{item.name}}
                                </MenuItem>
                            </Submenu>
                        </Menu>
                    </td>
                </tr>
                <tr>
                    <td>放款日期</td>
                    <td><span>{{litigation.loan}}</span></td>
                </tr>
                <tr>
                    <td>实际到期日期</td>
                    <td><span>{{litigation.maturity}}</span></td>
                </tr>
                <tr>
                    <td>逾期还款日期</td>
                    <td><span>{{litigation.overdue}}</span></td>
                </tr>
                <tr>
                    <td>欠款最新截至时间</td>
                    <td><span>{{litigation.cutoff}}</span></td>
                </tr>
                <tr>
                    <td>欠款本金</td>
                    <td><span>{{litigation.arrears}}</span></td>
                </tr>
                <tr>
                    <td>利息</td>
                    <td><span>{{litigation.interest}}</span></td>
                </tr>
                <tr>
                    <td>罚息</td>
                    <td><span>{{litigation.penaltyInterest}}</span></td>
                </tr>
                <tr>
                    <td>复利</td>
                    <td><span>{{litigation.compoundInterest}}</span></td>
                </tr>
                <tr>
                    <td>最新欠款利息</td>
                    <td><span>{{litigation.nInterest}}</span></td>
                </tr>
                <tr>
                    <td>最新欠款罚息</td>
                    <td><span>{{litigation.npInterest}}</span></td>
                </tr>
                <tr>
                    <td>最新欠款复利</td>
                    <td><span>{{litigation.ncdInterest}}</span></td>
                </tr>
                <tr>
                    <td>最新欠款利息等</td>
                    <td><span>{{litigation.newArrears}}</span></td>
                </tr>
                <tr>
                    <td>违约金金额</td>
                    <td><span>{{litigation.liquidatedDamages}}</span></td>
                </tr>
                <tr>
                    <td>实现债权的费用</td>
                    <td><span>{{litigation.claim}}</span></td>
                </tr>
                <tr>
                    <td>律师费</td>
                    <td><span>{{litigation.lawyerFee}}</span></td>
                </tr>
                <tr>
                    <td>保全费</td>
                    <td><span>{{litigation.securityFee}}</span></td>
                </tr>
                <tr>
                    <td>公告费</td>
                    <td><span>{{litigation.announcementFee}}</span></td>
                </tr>
                <tr>
                    <td>实现债权其他费用</td>
                    <td><span>{{litigation.otherFee}}</span></td>
                </tr>
                <tr>
                    <td>是否支持夫妻共同债</td>
                    <td>
                        <RadioGroup v-model="litigation.isPublic">
                            <Radio disabled label="yes">
                                <span>是</span>
                            </Radio>
                            <Radio disabled label="no">
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </td>
                </tr>
                <tr>
                    <td>结婚登记时间</td>
                    <td><span>{{litigation.marryTime}}</span></td>
                </tr>
                <tr>
                    <td>离婚登记时间</td>
                    <td><span>{{litigation.divorceTime}}</span></td>
                </tr>
                <tr>
                    <td>适用的法律条文</td>
                    <td><span>{{litigation.legalProvisions}}</span></td>
                </tr>
                <tr>
                    <td>法律法规</td>
                    <td><span>{{litigation.regulations}}</span></td>
                </tr>
                <tr>
                    <td>诉前保全裁定案号</td>
                    <td><span>{{litigation.caseNumber}}</span></td>
                </tr>
                <tr>
                    <td>保全被申请人</td>
                    <td><span>{{litigation.preservationMan}}</span></td>
                </tr>
                <tr>
                    <td>申请保全时间</td>
                    <td><span>{{litigation.preservationTime}}</span></td>
                </tr>
                <tr>
                    <td>财产保全金额</td>
                    <td><span>{{litigation.preservationMoney}}</span></td>
                </tr>
                <tr>
                    <td>财产保全费</td>
                    <td><span>{{litigation.preservationFee}}</span></td>
                </tr>
                <tr>
                    <td>作出保全裁定时间</td>
                    <td><span>{{litigation.rulingTime}}</span></td>
                </tr>
                <tr>
                    <td>解除保全申请时间</td>
                    <td><span>{{litigation.releasePreservation}}</span></td>
                </tr>
                <tr>
                    <td>保全财产情况</td>
                    <td><span>{{litigation.preservationStatus}}</span></td>
                </tr>
                <tr>
                    <td>核对状态</td>
                    <td> <Button type="primary" :loading="confirmLoading" @click="checkLawCase">{{lawCaseChecked ? '未核对' : '已核对'}}</Button></td>
                </tr>
            </table>
        </div>
        <div v-if="element == 2" class="loan-Box">
            <table class="bookbuilding-table" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td>合同名称</td>
                    <td>
                    <span>{{contract.name}}</span>
                    </td>
                </tr>
                <tr>
                    <td>合同签订时间</td>
                    <td>
                    <span>{{contract.time}}</span>
                    </td>
                </tr>
                <tr>
                    <td>信用卡信息</td>
                    <td>
                    <Menu @on-select="creditChoice" style="width: 300px;">
                        <Submenu name="1">
                            <template slot="title">
                                点击展开信用卡信息
                            </template>
                            <MenuItem :name="item.id" v-for="(item,index) in creditInfo" :key="item.id">{{'信用卡（' + item.cardNo + '）'}}</MenuItem>
                        </Submenu>
                    </Menu>
                    </td>
                </tr>
                <tr>
                    <td>是否支持夫妻共同债</td>
                    <td>
                        <RadioGroup v-model="couple.isPublic">
                            <Radio disabled label="yes">
                                <span>是</span>
                            </Radio>
                            <Radio disabled label="no">
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </td>
                </tr>
                <tr>
                    <td>结婚登记时间</td>
                    <td><span>{{couple.marry}}</span></td>
                </tr>
                <tr>
                    <td>离婚登记时间</td>
                    <td><span>{{couple.divorce}}</span></td>
                </tr>
                <tr>
                    <td>请求支付的事实与理由</td>
                    <td><span>{{pay.reason}}</span></td>
                </tr>
                <tr>
                    <td>申请支付金额（元）</td>
                    <td><span>{{pay.money}}</span></td>
                </tr>
                <tr>
                    <td>有价证券</td>
                    <td><span>{{pay.securities}}</span></td>
                </tr>
                <tr>
                    <td>支付令申请费（元）</td>
                    <td><span>{{pay.applicationFee}}</span></td>
                </tr>
                <tr>
                    <td>申请支付令时</td>
                    <td><span>{{pay.applyTime}}</span></td>
                </tr>
                <tr>
                    <td>作出支付令时间</td>
                    <td><span>{{pay.completeTime}}</span></td>
                </tr>
                <tr>
                    <td>终结督促程序申请费（元）</td>
                    <td><span>{{endProcess.fee}}</span></td>
                </tr>
                <tr>
                    <td>终结督促程序裁定作出时间</td>
                    <td><span>{{endProcess.time}}</span></td>
                </tr>
                <tr>
                    <td>终结督促程序的原因</td>
                    <td><span>{{endProcess.reason}}</span></td>
                </tr>
                <tr>
                    <td>核对状态</td>
                    <td><Button type="primary" :loading="confirmLoading" @click="checkLawCase">{{lawCaseChecked ? '未核对' : '已核对'}}</Button></td>
                </tr>
            </table>
        </div>
        <Modal
            v-model="modal5"
            title="查看信用卡信息"
            width="700px"
            >
            <div class="loan-box">
                <table class="bookbuilding-table" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td>信用卡卡号</td>
                        <td><span>{{creditCard.num}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡种类</td>
                        <td><span>{{creditCard.type}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡申请时间</td>
                        <td><span>{{creditCard.applyTime}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡核准发卡时间</td>
                        <td><span>{{creditCard.issueTime}}</span></td>
                    </tr>
                    <tr>
                        <td>信用额度（元）</td>
                        <td><span>{{creditCard.quota}}</span></td>
                    </tr>
                    <tr>
                        <td>透支利率</td>
                        <td><span>{{creditCard.overRate}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡合约名称</td>
                        <td><span>{{creditCard.name}}</span></td>
                    </tr>
                    <tr>
                        <td>利息约定</td>
                        <td><span>{{creditCard.interestAgreement}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡欠款最新截至时间</td>
                        <td><span>{{creditCard.deadline}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡最新欠款本金（元）</td>
                        <td><span>{{creditCard.principal}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡最新欠款利息（元）</td>
                        <td><span>{{creditCard.interest}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡最新欠款滞纳金（违约金）（元）</td>
                        <td><span>{{creditCard.latePayment}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡年费（元）</td>
                        <td><span>{{creditCard.annualFee}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡分期手续费（元）</td>
                        <td><span>{{creditCard.handlingFee}}</span></td>
                    </tr>
                    <tr>
                        <td>其他费用项目及金额（元）</td>
                        <td><span>{{creditCard.otherFee}}</span></td>
                    </tr>
                    <tr>
                        <td>违约金约定</td>
                        <td><span>{{creditCard.defaultAgreement}}</span></td>
                    </tr>
                    <tr>
                        <td>实现债权的费用</td>
                        <td><span>{{creditCard.agreementFee}}</span></td>
                    </tr>
                    <tr>
                        <td>实现债权费用的约定</td>
                        <td><span>{{creditCard.feeAgreement}}</span></td>
                    </tr>
                    <tr>
                        <td>律师费（元）</td>
                        <td><span>{{creditCard.lawyerFee}}</span></td>
                    </tr>
                    <tr>
                        <td>保全费（元）</td>
                        <td><span>{{creditCard.securityFee}}</span></td>
                    </tr>
                    <tr>
                        <td>公告费（元）</td>
                        <td><span>{{creditCard.announcementFee}}</span></td>
                    </tr>
                    <tr>
                        <td>信用卡取现手续费（元）</td>
                        <td><span>{{creditCard.cashFee}}</span></td>
                    </tr>
                    <tr>
                        <td>其他项目费用（年费、取现手续费、分期手续费）的约定</td>
                        <td><span>{{creditCard.otherProjectFee}}</span></td>
                    </tr>
                    <tr>
                        <td>最新截止时间后利息计算标准</td>
                        <td><span>{{creditCard.endStandard}}</span></td>
                    </tr>
                    <tr>
                        <td>最新截止时间后违约金（滞纳金）计算标准</td>
                        <td><span>{{creditCard.endFeeStandard}}</span></td>
                    </tr>
                    <tr>
                        <td>合同信息</td>
                        <td>
                            <Menu @on-select="guaranteeChioce" style="width: 300px;">
                                <Submenu name="1">
                                    <template slot="title">
                                        保证合同信息
                                    </template>
                                    <MenuItem :name="item.id" v-for="(item,index) in guarantee2" :key="item.id">{{item.name}}
                                    </MenuItem>
                                </Submenu>
                            </Menu>
                        </td>
                    </tr>
                </table>
            </div>
            <div slot="footer">
                <Button @click="modal5 = false"  type="dashed" size="large">关闭</Button>
            </div>
        </Modal>
        <!-- 保证合同信息 -->
    <Modal v-model="modal7"
    title="保证合同信息"
    width="700px"
    >
        <div>
            <table class="bookbuilding-table" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td>保证合同名称</td>
                    <td><span>{{guaranteeContract2.name}}</span></td>
                </tr>
                <tr>
                    <td>合同签订时间</td>
                    <td><span>{{guaranteeContract2.time}}</span></td>
                </tr>
                <tr>
                    <td>保证人</td>
                    <td><span>{{guaranteeContract2.people}}</span></td>
                </tr>
                <tr>
                    <td>保证期间</td>
                    <td><span>{{guaranteeContract2.timeRange}}</span></td>
                </tr>
                <tr>
                    <td>保证方式</td>
                    <td><span>{{guaranteeContract2.methods}}</span></td>
                </tr>
                <tr>
                    <td>保证范围</td>
                    <td><span>{{guaranteeContract2.range}}</span></td>
                </tr>
            </table> 
        </div>
        <div slot="footer">
            <Button @click="modal7 = false"  type="dashed" size="large">关闭</Button>
        </div>
    </Modal>
    <!-- 查看合同信息 -->
        <Modal
        v-model="modal6"
        :title=titleArr[titleIndex]
        width="700px"
        >
        <div>
            <table class="bookbuilding-table" cellspacing="0" cellpadding="0" border="0" v-show="titleIndex == 0">
                <tr>
                    <td>授信合同名称</td>
                    <td><span>{{credit.name}}</span></td>
                </tr>
                <tr>
                    <td>是否诉请解除该授信合同</td>
                    <td>
                        <RadioGroup v-model="credit.isRelease">
                            <Radio disabled label="yes">
                                <span>是</span>
                            </Radio>
                            <Radio disabled label="no">
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </td>
                </tr>
                <tr>
                    <td>授信人</td>
                    <td><span>{{credit.creditPeople}}</span></td>
                </tr>
                <tr>
                    <td>授信合同签订时间</td>
                    <td><span>{{credit.creditTime}}</span></td>
                </tr>
                <tr>
                    <td>授信合同期间</td>
                    <td><span>{{credit.creditRange}}</span></td>
                </tr>
                <tr>
                    <td>授信金额</td>
                    <td><span>{{credit.creditMoney}}</span></td>
                </tr>
            </table>   
            <table class="bookbuilding-table" cellspacing="0" cellpadding="0" border="0" v-show="titleIndex == 1">
                <tr>
                    <td>借款合同名称</td>
                    <td><span>{{loan.name}}</span></td>
                </tr>
                <tr>
                    <td>借款人</td>
                    <td><span>{{loan.creditPeople}}</span></td>
                </tr>
                <tr>
                    <td>是否诉请解除该借款合同</td>
                    <td>
                        <RadioGroup v-model="loan.isRelease">
                            <Radio disabled label="yes">
                                <span>是</span>
                            </Radio>
                            <Radio disabled label="no">
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </td>
                </tr>
                <tr>
                    <td>签订借款合同时间</td>
                    <td><span>{{loan.time}}</span></td>
                </tr>
                <tr>
                    <td>借款本金</td>
                    <td><span>{{loan.money}}</span></td>
                </tr>
                <tr>
                    <td>借款期限</td>
                    <td><span>{{loan.range}}</span></td>
                </tr>
                <tr>
                    <td>还款方式</td>
                    <td><span>{{loan.methods}}</span></td>
                </tr>
                <tr>
                    <td>借款利率</td>
                    <td><span>{{loan.loanRate}}</span></td>
                </tr>
                <tr>
                    <td>罚息利率</td>
                    <td><span>{{loan.penaltyRate}}</span></td>
                </tr>
                <tr>
                    <td>复利利率</td>
                    <td><span>{{loan.compoundRate}}</span></td>
                </tr>
                <tr>
                    <td>罚息/复利约定</td>
                    <td><span>{{loan.rateAgreement}}</span></td>
                </tr>
                <tr>
                    <td>解除合同或提前收贷约定</td>
                    <td><span>{{loan.releaseAgreement}}</span></td>
                </tr>
                <tr>
                    <td>违约金约定</td>
                    <td><span>{{loan.defaultAgreement}}</span></td>
                </tr>
                <tr>
                    <td>实现债权费用的约定</td>
                    <td><span>{{loan.feeAgreement}}</span></td>
                </tr>
                <tr>
                    <td>送达约定</td>
                    <td><span>{{loan.sendAgreement}}</span></td>
                </tr>
            </table> 
            <table class="bookbuilding-table" cellspacing="0" cellpadding="0" border="0" v-show="titleIndex == 2">
                <tr>
                    <td>保证合同名称</td>
                    <td><span>{{guarantee.name}}</span></td>
                </tr>
                <tr>
                    <td>保证人</td>
                    <td><span>{{guarantee.guaranteePeople}}</span></td>
                </tr>
                <tr>
                    <td>保证方式</td>
                    <td><span>{{guarantee.methods}}</span></td>
                </tr>
                <tr>
                    <td>保证期间</td>
                    <td><span>{{guarantee.timeRange}}</span></td>
                </tr>
                <tr>
                    <td>保证合同签订时间</td>
                    <td><span>{{guarantee.time}}</span></td>
                </tr>
                <tr>
                    <td>保证范围</td>
                    <td><span>{{guarantee.guaranteeRange}}</span></td>
                </tr>
            </table> 
            <table class="bookbuilding-table" cellspacing="0" cellpadding="0" border="0" v-show="titleIndex == 3">
                <tr>
                    <td>抵押合同名称</td>
                    <td><span>{{mortgage.name}}</span></td>
                </tr>
                <tr>
                    <td>抵押合同签订时间</td>
                    <td><span>{{mortgage.time}}</span></td>
                </tr>
                <tr>
                    <td>抵押物权属</td>
                    <td><span>{{mortgage.ownership}}</span></td>
                </tr>
                <tr>
                    <td>抵押物名称</td>
                    <td><span>{{mortgage.articleName}}</span></td>
                </tr>
                <tr>
                    <td>抵押担保范围</td>
                    <td><span>{{mortgage.range}}</span></td>
                </tr>
                <tr>
                    <td>办理抵押登记时间</td>
                    <td><span>{{mortgage.handletime}}</span></td>
                </tr>
            </table>
            <table class="bookbuilding-table" cellspacing="0" cellpadding="0" border="0" v-show="titleIndex == 4">
                <tr>
                    <td>质押合同名称</td>
                    <td><span>{{pledge.name}}</span></td>
                </tr>
                <tr>
                    <td>质押合同签订时间</td>
                    <td><span>{{pledge.time}}</span></td>
                </tr>
                <tr>
                    <td>质押物权属</td>
                    <td><span>{{pledge.ownership}}</span></td>
                </tr>
                <tr>
                    <td>质押物名称</td>
                    <td><span>{{pledge.articleName}}</span></td>
                </tr>
                <tr>
                    <td>质押担保范围</td>
                    <td><span>{{pledge.range}}</span></td>
                </tr>
                <tr>
                    <td>办理质押登记时间</td>
                    <td><span>{{pledge.handletime}}</span></td>
                </tr>
            </table> 
        </div>
        <div slot="footer">
            <Button @click="modal6 = false"  type="dashed" size="large">关闭</Button>
        </div>
        </Modal>
    </div>
</template>

<script>
    import {
        getInfo,
        getSendInfo,
        sendME,
        confirm,
        printBill,
        postDeliveryBill,
        litigantEvidenceList,
        getEntrustSend,
        addAdress,
        getPart,
        getEdit,
        wechatMessageTemplate,
        getWeiXinInfo,
        sendEditLitigant,
        createElementJudgement,
        getCtInfo,
        checkFactor,
        getContractInfo,
        confirmOnLawCase,
    } from "@/api/send.js";
export default {
    name: 'elementInfo',
    props:['lawcaseId','element'],
    data () {
        return {
            modal5:false,
            modal6:false,
            modal7:false,
            partCardId:"",
            onlineLawCaseId:"", //诉前案件id
            titleArr:['查看授信合同信息','查看借款合同信息','查看保证合同信息','查看抵押合同信息','查看质押合同信息'],
            guarantee2:[],
            // element:0,  //1是金融借款合同，2是信用卡信息,0就不是这两个，就不显示
            elementSw:false,//要素信息显示开关，避免要素信息过长影响布局
            creditContract:[],
            loanContract:[],
            guaranteeContract:[],
            mortgageContract:[],
            pledgeContract:[],
            lawCaseChecked:false,//要素信息是否已核对
            confirmLoading:false,//核对按钮加载状态
            contract:{
                name:'',
                time:''
            },
            couple:{
                isPublic:'',
                marry:'',
                divorce:''
            },
            pay:{
                reason:'',
                money:'',
                securities:'',
                applicationFee:'',
                applyTime:'',
                completeTime:'' 
            },
            endProcess:{
                fee:'',
                time:'',
                reason:''
            },
            creditInfo:[],
            litigation:{
                amount:'',
                request:'',
                loan:'',
                maturity:'',
                overdue:'',
                cutoff:'',
                arrears:'',
                interest:'',
                penaltyInterest:'',
                compoundInterest:'',
                nInterest:'',
                npInterest:'',
                ncdInterest:'',
                newArrears:'',
                liquidatedDamages:'',
                isPublic:'',
                claim:'',
                lawyerFee:'',
                securityFee:'',
                announcementFee:'',
                otherFee:'',
                marryTime:'',
                divorceTime:'',
                legalProvisions:'',
                regulations:'',
                caseNumber:'',
                preservationMan:'',
                preservationTime:'',
                preservationMoney:'',
                preservationFee:'',
                rulingTime:'',
                releasePreservation:'',
                preservationStatus:'',
            },
            creditCard:{
                num:'',
                name:'',
                interestAgreement:'',
                deadline:'',
                principal:'',
                interest:'',
                latePayment:'',
                annualFee:'',
                handlingFee:'',
                otherFee:'',
                defaultAgreement:'',
                feeAgreement:'',
                lawyerFee:'',
                securityFee:'',
                announcementFee:'',
                cashFee:'',
                otherProjectFee:'',
                endStandard:'',
                endFeeStandard:''  
            },
            credit:{
                name:'',
                isRelease:'',
                creditPeople:'',
                creditTime:'',
                creditRange:'',
                creditMoney:''
            },
            loan:{
                name:'',
                creditPeople:'',
                isRelease:'',
                time:'',
                money:'',
                range:'',
                methods:'',
                loanRate:'',
                penaltyRate:'',
                compoundRate:'',
                rateAgreement:'',
                releaseAgreement:'',
                defaultAgreement:'',
                feeAgreement:'',
                sendAgreement:''
            },
            guarantee:{
                name:'',
                guaranteePeople:'',
                methods:'',
                timeRange:'',
                time:'',
                guaranteeRange:''
            },
            mortgage:{
                name:'',
                time:'',
                ownership:'',
                articleName:'',
                range:'',
                handletime:''
            },
            pledge:{
                name:'',
                time:'',
                ownership:'',
                articleName:'',
                range:'',
                handletime:''
            },
            guaranteeContract2:{
                name:'',
                time:'',
                people:'',
                timeRange:'',
                methods:'',
                range:''
            },
            titleIndex:0,
            //以上为查看要素信息相关data
        };
    },
    methods: {
        time(time = +new Date()) {//时间戳转换函数
            var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ').substring(0,10);
        },
        choice(name){
        this.titleIndex = name[1];
        let infoid = name.substring(2);
        switch(name.substring(0,2)){
            case 'c0':
                getCtInfo('cc',infoid).then(res => {
                    this.credit.name = res.data.data.name;
                    this.credit.isRelease = res.data.data.relieve == true ? 'yes' : 'no';
                    this.credit.creditPeople = res.data.data.creditGrantor;
                    this.credit.creditTime = res.data.data.sign == null ? '' : this.time(res.data.data.sign);
                    this.credit.creditRange = res.data.data.periodRange == null ? '' :res.data.data.periodRange.replace('至',' - ');
                    this.credit.creditMoney = res.data.data.amount;
                    this.modal6 = true;
                    console.log(this.modal6);
                })
            break;
            case 'l1':
                getCtInfo('lc',infoid).then(res => {
                    console.log(res.data.data);
                    this.loan.name = res.data.data.name;
                    this.loan.creditPeople = res.data.data.borrower;
                    this.loan.isRelease = res.data.data.relieve == true ? 'yes' : 'no';
                    this.loan.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                    this.loan.money = res.data.data.amount;
                    this.loan.range = res.data.data.askTime == null ? '' : res.data.data.askTime.replace('至',' - ');
                    this.loan.methods = res.data.data.repaymentMethod;
                    this.loan.loanRate = res.data.data.borrowingRate;
                    this.loan.penaltyRate = res.data.data.penaltyRate;
                    this.loan.compoundRate = res.data.data.compoundRate;
                    this.loan.rateAgreement = res.data.data.penaltyAndCompoundAppointment;
                    this.loan.releaseAgreement = res.data.data.relieveAndPayLoanAppointment;
                    this.loan.defaultAgreement = res.data.data.violationFundAppointment;
                    this.loan.feeAgreement = res.data.data.bondFeeAppointment;
                    this.loan.sendAgreement = res.data.data.sendAppointment;
                    this.modal6 = true;
                })
            break;
            case 'g2':
                getCtInfo('gc',infoid).then(res => {
                    this.guarantee.name = res.data.data.name;
                    this.guarantee.guaranteePeople = res.data.data.guarantor;
                    this.guarantee.methods = res.data.data.guarantorMethod;
                    this.guarantee.timeRange = res.data.data.guarantorDate == null ? '' : res.data.data.guarantorDate.replace('至',' - ');
                    this.guarantee.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                    this.guarantee.guaranteeRange = res.data.data.guaranteeScope;
                    this.modal6 = true;
                })
            break;
            case 'm3':
                getCtInfo('mc',infoid).then(res => {
                        this.mortgage.name = res.data.data.name;
                        this.mortgage.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                        this.mortgage.ownership = res.data.data.ownership;
                        this.mortgage.articleName = res.data.data.collateral;
                        this.mortgage.range = res.data.data.mortgageRange;
                        this.mortgage.handletime = res.data.data.mortgageTime == null ? '' : this.time(res.data.data.mortgageTime);
                        this.modal6 = true;
                    })
            break;
            case 'p4':
                getCtInfo('pc',infoid).then(res => {
                    console.log(res.data.data);
                    this.pledge.name = res.data.data.name;
                    this.pledge.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                    this.pledge.ownership = res.data.data.ownership;
                    this.pledge.articleName = res.data.data.pledge;
                    this.pledge.range = res.data.data.pledgeRange;
                    this.pledge.handletime = res.data.data.pledgeTime == null ? '' : this.time(res.data.data.pledgeTime);
                    this.modal6 = true;
                })
            break;
        }
        },
        creditChoice(name){
            getCtInfo('cdInfo',name).then(res => {
                if(res.data.state == 100){
                    this.creditCard.num = res.data.data.cardNo;
                    this.creditCard.name = res.data.data.contractName;
                    this.creditCard.interestAgreement = res.data.data.interestAgreement;
                    this.creditCard.deadline = res.data.data.latestDeadLineForArrears == null ? '' : this.time(res.data.data.latestDeadLineForArrears);
                    this.creditCard.principal = res.data.data.nowArrearsAmount;
                    this.creditCard.interest = res.data.data.nowArrearsInterest;
                    this.creditCard.latePayment = res.data.data.nowLateFee;
                    this.creditCard.annualFee = res.data.data.annualFee;
                    this.creditCard.handlingFee = res.data.data.byStagesFee;
                    this.creditCard.otherFee = res.data.data.proAndFee;
                    this.creditCard.defaultAgreement = res.data.data.lateFeeAppointment;
                    this.creditCard.feeAgreement = res.data.data.bondFeeAppointment;
                    this.creditCard.lawyerFee = res.data.data.lawyerFee;
                    this.creditCard.securityFee = res.data.data.preservationFee;
                    this.creditCard.announcementFee = res.data.data.announcementFee;
                    this.creditCard.cashFee = res.data.data.enchashmentFee;
                    this.creditCard.otherProjectFee = res.data.data.anotherApponintment;
                    this.creditCard.endStandard = res.data.data.nowInterestStandard;
                    this.creditCard.endFeeStandard = res.data.data.nowLateFeeStandard;
                    this.creditCard.type = res.data.data.cardType;
                    this.creditCard.applyTime = res.data.data.applyCardDate == null ? '' : this.time(res.data.data.applyCardDate);
                    this.creditCard.issueTime = res.data.data.auditDate == null ? '' : this.time(res.data.data.auditDate);
                    this.creditCard.overRate = res.data.data.overdrawRate;
                    this.creditCard.agreementFee = res.data.data.bondFee;
                    this.creditCard.quota = res.data.data.lineOfCredit;
                    this.modal5 = true;
                }else{
                    this.$Message.error(res.data.message);
                }
            })
            getContractInfo(this.lawcaseId,this.partCardId,'gc',name).then(res => {
                if(res.data.state == 100){
                    this.guarantee2 = res.data.nameList;
                }
            })
        },
        guaranteeChioce(name){
            getCtInfo('gc',name).then(res => {
                this.guaranteeContract2.name = res.data.data.name;
                this.guaranteeContract2.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                this.guaranteeContract2.people = res.data.data.guarantor;
                this.guaranteeContract2.timeRange = res.data.data.guarantorDate == null ? '' : res.data.data.guarantorDate.replace('至',' - ');
                this.guaranteeContract2.methods = res.data.data.guarantorMethod;
                this.guaranteeContract2.range = res.data.data.guaranteeScope;
                this.modal7 = true;
            })
        },
        checkLawCase(){
            this.confirmLoading = true;
            confirmOnLawCase(this.lawcaseId,this.lawCaseChecked).then(res => {
                this.confirmLoading = false;
                if(res.data.state == 100){
                    this.$Message.success(res.data.message);
                    this.lawCaseChecked = !this.lawCaseChecked;
                }else if(res.data.state == 101){
                    this.$Message.error(res.data.message);
                }
            })
        },
    },
    mounted () {
        console.log(this.lawcaseId,this.element);
        getEdit(this.lawcaseId).then(res => {
            if(res.data.state == 100){
                this.lawCaseChecked = res.data.flag;
            }
        })
        if(this.element == 1){
            getPart(this.lawcaseId).then(res => {
                this.creditContract = [];
                this.loanContract = [];
                this.guaranteeContract = [];
                this.mortgageContract = [];
                this.pledgeContract = [];
                res.data.loan.creditContractInformationSet == '' ? [] : res.data.loan.creditContractInformationSet.map(item => {
                    return item.enable == true ? this.creditContract.push(item) : false;
                });
                res.data.loan.loanContractInformations == '' ? [] : res.data.loan.loanContractInformations.map(item => {
                    return item.enable == true ? this.loanContract.push(item) : false;
                });
                res.data.loan.guaranteeContractInformations == '' ? [] : res.data.loan.guaranteeContractInformations.map(item => {
                    return item.enable == true ? this.guaranteeContract.push(item) : false;
                });
                res.data.loan.mortgageContractInformations == '' ? [] : res.data.loan.mortgageContractInformations.map(item => {
                    return item.enable == true ? this.mortgageContract.push(item) : false;
                });
                res.data.loan.pledgeContractInformations == '' ? [] : res.data.loan.pledgeContractInformations.map(item => {
                    return item.enable == true ? this.pledgeContract.push(item) : false;
                });
                this.litigation.loan = res.data.loan.loan == null ? '' : this.time(res.data.loan.loan);
                this.litigation.maturity = res.data.loan.payment == null ? '' : this.time(res.data.loan.payment);
                this.litigation.overdue = res.data.loan.overdueRepayment == null ? '' : this.time(res.data.loan.overdueRepayment);
                this.litigation.cutoff = res.data.loan.latestDeadLineForArrears == null ? '' : this.time(res.data.loan.latestDeadLineForArrears);
                this.litigation.arrears = res.data.loan.principalArrears;
                this.litigation.interest = res.data.loan.interest;
                this.litigation.penaltyInterest = res.data.loan.penaltyInterest;
                this.litigation.compoundInterest = res.data.loan.compoundInterest;
                this.litigation.nInterest = res.data.loan.nowInterest;
                this.litigation.npInterest = res.data.loan.nowPenaltyInterest;
                this.litigation.ncdInterest = res.data.loan.nowCompoundInterest;
                this.litigation.newArrears = res.data.loan.nowInterestOnArrears;
                this.litigation.liquidatedDamages = res.data.loan.liquidatedDamages;
                this.litigation.claim = res.data.loan.debtExpense;
                this.litigation.lawyerFee = res.data.loan.lawyerFees;
                this.litigation.securityFee = res.data.loan.preservationFee;
                this.litigation.announcementFee = res.data.loan.announcementFee;
                this.litigation.otherFee = res.data.loan.anotherDebtExpense;
                this.litigation.isPublic = res.data.loan.jointDebts == true ? 'yes' : 'no';
                this.litigation.marryTime = res.data.loan.marriage == null ? '' : this.time(res.data.loan.marriage);
                this.litigation.divorceTime = res.data.loan.divorce == null ? '' : this.time(res.data.loan.divorce);
                this.litigation.legalProvisions = res.data.loan.legalProvisions;
                this.litigation.regulations = res.data.loan.lawAndRegulations;
                this.litigation.caseNumber = res.data.loan.preservationCaseNo;
                this.litigation.preservationMan = res.data.loan.preservationRespondent;
                this.litigation.preservationTime = res.data.loan.applyForPreservation == null ? '' : this.time(res.data.loan.applyForPreservation);
                this.litigation.preservationMoney = res.data.loan.preservationAmount;
                this.litigation.preservationFee = res.data.loan.preservationAmountFee;
                this.litigation.rulingTime = res.data.loan.preservationTime == null ? '' : this.time(res.data.loan.preservationTime);
                this.litigation.releasePreservation = res.data.loan.firePreservationTime == null ? '' : this.time(res.data.loan.firePreservationTime);
                this.litigation.preservationStatus = res.data.loan.preservationSituation;
            })
        }else{
            getPart(this.lawcaseId).then(res => {
                this.creditInfo = [];
                this.partCardId = res.data.creditCard.id;
                res.data.creditCard.creditCardInformations.map(item => {
                    return item.enable == true ? this.creditInfo.push(item) : false;
                });
                this.contract.name = res.data.creditCard.contractName;
                this.contract.time = res.data.creditCard.signContractTime == null ? '' : this.time(res.data.creditCard.signContractTime);
                this.couple.isPublic = res.data.creditCard.jointdebts == null ? '' : (res.data.creditCard.jointdebts == true ? 'yes' : 'no');
                this.couple.marry = res.data.creditCard.marriageTime == null ? '' : this.time(res.data.creditCard.marriageTime);
                this.couple.divorce = res.data.creditCard.divorceTime == null ? '' : this.time(res.data.creditCard.divorceTime);
                this.pay.reason = res.data.creditCard.reasonContent;
                this.pay.money = res.data.creditCard.applyAmount;
                this.pay.securities = res.data.creditCard.securities;
                this.pay.applicationFee = res.data.creditCard.applyFee;
                this.pay.applyTime = res.data.creditCard.applyTime == null ? '' : this.time(res.data.creditCard.applyTime);
                this.pay.completeTime = res.data.creditCard.makeApplyTime == null ? '' : this.time(res.data.creditCard.makeApplyTime);
                this.endProcess.fee = res.data.creditCard.endApplyFee;
                this.endProcess.time = res.data.creditCard.endMakeTime == null ? '' : this.time(res.data.creditCard.endMakeTime);
                this.endProcess.reason = res.data.creditCard.endReason;
            })
        }
    }
};
</script>