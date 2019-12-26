<template>
   <div class="box">
       <div class="header">
             <h2>福建省厦门市湖里区人民法院</h2>
             <h2>缴纳诉讼费用通知书</h2>
       </div>
    <div>
     <Form>
         <Row>
                <Col span="8" push="14"  class="maininfo-col headerCase">
                   <input type="text" v-model="backFill.noticeTime">
                </Col>
               
         </Row>
      <div class="main">
            <!-- <Row>
                <Col span="4" class="maininfo-col maininfo-col-label">
                    案由
                </Col>
                <Col span="20" class="maininfo-col">
                    <Input v-model="backFill.briefName"></Input>
                </Col>
            </Row> -->
            <Row>
                <Col span="4" class="maininfo-col grid60 maininfo-col-label">
                  
                       一审案号
      
                </Col>
                <Col span="8" class="maininfo-col grid60">
                    <Input v-model="backFill.caseNo"></Input>
                </Col>
                <Col span="4" class="maininfo-col grid60 maininfo-col-label">
                    缴款单位<br/>
                    或个人
                </Col>
                <Col span="8" class="maininfo-col grid60">
                    <Input v-model="backFill.litigantName"></Input>
                </Col>
            </Row>
            <Row>
                <Col span="4" class="maininfo-col grid60 maininfo-col-label">
                  
                       一审<br/>
                        审判庭    
                </Col>
                <Col span="8" class="maininfo-col grid60">
                    <Input v-model="backFill.courtName"></Input>
                </Col>
                <Col span="4" class="maininfo-col grid60 maininfo-col-label">
                    
                    案 由
                </Col>
                <Col span="8" class="maininfo-col grid60">
                    <Input v-model="backFill.briefName"></Input>
                </Col>
            </Row>
            <Row>
                <Col span="4" class="maininfo-col grid60 maininfo-col-label">
                  
                       原预收时间   
                </Col>
                <Col span="8" class="maininfo-col grid60">
                    <Input v-model="backFill.oriAdvanceDate"></Input>
                </Col>
                <Col span="4" class="maininfo-col grid60 maininfo-col-label">
                    
                    原预收金额
                </Col>
                <Col span="8" class="maininfo-col grid60">
                     <Input  style="width:50%;" v-model="backFill.oriAdvanceAmount"></Input>元（小写）
                </Col>
            </Row>
            <Row>
                <Col span="4" class="maininfo-col grid60 maininfo-col-label">
                  
                      缴费项目
      
                </Col>
                <Col span="20" class="maininfo-col grid60" style="justify-content:left">
                    <div style="width: 25%; display:inline-block;border-bottom:1px solid black;"><Input placeholder="缴费项目" v-model="backFill.paymentItem"></Input></div><div style="width: 50%; display:inline-block;border-bottom:1px solid black;"><Input placeholder="大写金额" v-model="backFill.litigationCostBig"></Input></div>
                </Col>
            </Row>
            <Row>
                <Col span="4" class="maininfo-col grid60 maininfo-col-label">
                  
                       应缴交金额
      
                </Col>
                <Col span="20" class="maininfo-col grid60" style="justify-content:left">
                    小写￥<div style="width: 50%; display:inline-block;border-bottom:1px solid black;"><Input placeholder="小写金额" @on-change="changeValue" v-model="backFill.litigationCost"></Input></div>元
                </Col>
            </Row>
         </div>
         <Row style="margin-top:10px;">
                <Col span="12" >
                  
                    一审审判庭：<div style="width: 35%; display:inline-block;border-bottom:1px solid black;"><input type="text"  v-model="backFill.courtName"></div>
      
                </Col>
                <Col span="6">
                    承办人：
                </Col>
                <Col span="6">
                    通知人：
                </Col>
        </Row><br/>
         <div>
            【注意事项】
         </div>
       </Form>
       <div class="label">
           <p>一、请缴款人在收到本通知书之日起七天内向厦门市湖里区人民法院缴纳上述诉讼费用，逾期将依法移送执行。</p>
           <div class="textIndent">
                开户行：兴业银行厦门东区支行
            </div>
            <div class="textIndent">
                户  名：厦门市湖里区人民法院
            </div>
            <div class="textIndent">
                账  号：129500100100182530
            </div>
            <div>二、如有不明事项，请与通知人联系，电话：<div style="width: 35%; display:inline-block;border-bottom:1px solid black;"><input type="text" v-model="backFill.contactNumber"></div>。</div>
       </div>
     </div> 
   </div>

</template>

<script type="text/javascript">
import { dbList } from '@/api/diplomas.js';
export default {
    data(){
        return{
        //   backFill:{
        //         caseNo:'',
        //         briefName:'',
        //         litiganName:'',
        //         startTime:'',
        //         tribunalAddress:''

        //     }
        modelHid:true,
        title:'收取诉讼费通知书'
        }
    },
     props: {
        backFill:[Array,Object]
        // produceIsSuccess:Number
    },
    methods: {
           changeValue(){
               let v = this.convertCurrency(this.backFill.litigationCost);
               this.backFill.litigationCostBig = v;
           },
            convertCurrency(money) {
                //汉字的数字
                var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
                //基本单位
                var cnIntRadice = new Array('', '拾', '佰', '仟');
                //对应整数部分扩展单位
                var cnIntUnits = new Array('', '万', '亿', '兆');
                //对应小数部分单位
                var cnDecUnits = new Array('角', '分', '毫', '厘');
                //整数金额时后面跟的字符
                var cnInteger = '整';
                // var cnInteger = '';
                //整型完以后的单位
                // var cnIntLast = '元';
                var cnIntLast = '元';
                //最大处理的数字
                var maxNum = 999999999999999.9999;
                //金额整数部分
                var integerNum;
                //金额小数部分
                var decimalNum;
                //输出的中文金额字符串
                var chineseStr = '';
                //分离金额后用的数组，预定义
                var parts;
                if (money == '') { return ''; }
                money = parseFloat(money);
                if (money >= maxNum) {
                    //超出最大处理数字
                    return '';
                }
                if (money == 0) {
                    chineseStr = cnNums[0] + cnIntLast + cnInteger;
                    return chineseStr;
                }
                //转换为字符串
                money = money.toString();
                if (money.indexOf('.') == -1) {
                    integerNum = money;
                    decimalNum = '';
                } else {
                    parts = money.split('.');
                    integerNum = parts[0];
                    decimalNum = parts[1].substr(0, 4);
                }
                //获取整型部分转换
                if (parseInt(integerNum, 10) > 0) {
                    var zeroCount = 0;
                    var IntLen = integerNum.length;
                    for (var i = 0; i < IntLen; i++) {
                    var n = integerNum.substr(i, 1);
                    var p = IntLen - i - 1;
                    var q = p / 4;
                    var m = p % 4;
                    if (n == '0') {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                        }
                        //归零
                        zeroCount = 0;
                        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                    if (m == 0 && zeroCount < 4) {
                        chineseStr += cnIntUnits[q];
                    }
                    }
                    chineseStr += cnIntLast;
                }
                //小数部分
                if (decimalNum != '') {
                    var decLen = decimalNum.length;
                    for (var i = 0; i < decLen; i++) {
                    var n = decimalNum.substr(i, 1);
                    if (n != '0') {
                        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                    }
                }
                if (chineseStr == '') {
                    chineseStr += cnNums[0] + cnIntLast + cnInteger;
                } else if (decimalNum == '') {
                    chineseStr += cnInteger;
                }
                return chineseStr;
                },
        dipPro(litigantId,panelList){
            // var _this = this;
            // console.log(panelList);
            // console.log('组件调用') 
                let data = {
                    litigantId:litigantId.toString(),
                    name:panelList,
                    caseNo:this.backFill.caseNo,
                    oriAdvanceDate:this.backFill.oriAdvanceDate,
                    oriAdvanceAmount:this.backFill.oriAdvanceAmount,
                    briefName:this.backFill.briefName,
                    litigantName:this.backFill.litigantName,
                    startTime:this.backFill.startTime,
                    tribunalAddress:this.backFill.tribunalAddress,
                    contactPhone:this.backFill.contactPhone,
                    judgeName:this.backFill.judgeName,
                    clerkName:this.backFill.clerkName,
                    noticeTime:this.backFill.noticeTime,
                    plaintiffName:this.backFill.plaintiffName,
                    defendantName:this.backFill.defendantName,
                    defendantNameBriefName:this.backFill.defendantNameBriefName,
                    litigantStatusName:this.backFill.litigantStatusName,
                    allMembers:this.backFill.allMembers,
                    department:this.backFill.department,
                    sendAddress:this.backFill.sendAddress,
                    sendDiploms:this.backFill.sendDiploms,
                    costMoney:this.backFill.costMoney,
                    converCaseNo:this.backFill.converCaseNo,
                    plaintiffNamePhone:this.backFill.plaintiffNamePhone,
                    defendantNamePhone:this.backFill.defendantNamePhone,
                    plaintiffLawyerNamePhone:this.backFill.plaintiffLawyerNamePhone,
                    defendantLawyerNamePhone:this.backFill.defendantLawyerNamePhone,
                    closeDate:this.backFill.closeDate,
                    converStartDate:this.backFill.converStartDate,
                    startDate:this.backFill.startDate,
                    proofPeriod:this.backFill.proofPeriod,
                    filingDate:this.backFill.filingDate,
                    type:'add',
                    litigationCostBig:this.backFill.litigationCostBig,
                    litigationCost:this.backFill.litigationCost,
                    contactNumber:this.backFill.contactNumber,
                    paymentItem:this.backFill.paymentItem,
                }  
              dbList(
                  data
              ).then(res=>{
               if(res.data.state == 100){
                    this.modelHid = false;
                     this.$emit('model',this.modelHid,res.data.result,this.title);
               }
          }).catch(() => {
                this.$Message.error('网络错误，生成失败。');  
            });
        }
        
    }
}

</script>
<style lang="less" scoped>
  .box{
      margin: 0 auto;
      width: 700px;
      height: 100%;
      display: block;
    font-size: 15px;
  }
  .header{
      width:100%;
      text-align: center;
  }
  .main{
      width: 100%;
      height: 100%;
      border:1px solid black;
  }
  .maininfo-col{
     border-right:1px solid black !important;
     border-bottom:1px solid black !important;
  }
 
  .maininfo-col{
      text-align: center;
      line-height:25px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .ivu-form-item{
      margin-bottom: 3px;
  }
  .grid60{
      height: 70px;
  }
  .textIndent{
      text-indent:2em;  
  }
   .grid100{
      height: 100px;
  }
  .label{
      font-size: 15px;
  }
    input{
      width: 100%;
      height: 30px;
      border: none;
      font-size: 15px;
      text-align: center;
  }
  .headerCase{
    border:none !important;
    background-color: white !important;
}
</style>