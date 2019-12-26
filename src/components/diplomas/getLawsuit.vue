<template>
   <div class="box">
       <div class="header">
             <h2>福建省厦门市湖里区人民法院</h2>
             <h2>领取诉讼文书通知书</h2>
       </div>
    <div>
     <Form>
          <Row>
                <Col span="8" push="14"  class="maininfo-col headerCase">
                   <input type="text" v-model="backFill.caseNo">
                </Col>
               
         </Row>
         <div class="main">
            <Row>
                <!-- <Col span="8" class="maininfo-col headerCase"> -->
                    <div style="width: 22%; display:inline-block;border-bottom:1px solid black;text-align: center;"><input type="text" v-model="backFill.litigantName"></div>：
                <!-- </Col> -->
           </Row>
            
                <div class="lineHeight">
                     &emsp;&emsp;本院受理
                    <div style="width: 35%; display:inline-block;border-bottom:1px solid black;"><input type="text" v-model="backFill.plaintiffName"></div>
                    诉你<div style="width:35%; display:inline-block;border-bottom:1px solid black;"><input type="text" v-model="backFill.briefName"></div>
                    一案，现将领取诉讼文书事宜告知如下：
                    
                    <div class="textIndent">一、你方应于收到本通知书之日起三日内至本院殿前人民法庭领取起诉状副本、证据、传票、应诉通知书等诉讼文书；</div>
                    <div class="textIndent">二、如因交通不便或其他原因要求邮寄或通过电子邮件、微信等方式送达的，你方应于收到本通知书之日告知本院。本院将按照你方提供并确认的送达方式和送达地址进行送达；</div>
                    <div class="textIndent">三、如你方在指定期间内未领取诉讼文书，也未告知送达地址的，本院将按照推定地址进行送达。</div>
                </div>
               
           
                <div style="margin-top:10px;" class="textIndent">殿前人民法庭地址：福建省厦门市湖里区华荣路54号。</div>
                <div class="textIndent">联系电话：0592-2621015，联系人：沈春福。</div>
                <Row>
                    <Col span="8" push="18" class="maininfo-col headerCase">
                        <p>{{backFill.noticeTime}}</p>
                        <!-- <p>（院印）</p> -->
                    </Col>
                </Row>
         </div>
         
       </Form>
     
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
        title:'领取诉讼文书通知书'
        }
    },
     props: {
        backFill:[Array,Object]
    },
    methods: {
           
        dipPro(litigantId,panelList){
            // var _this = this;
            // console.log(panelList);
            // console.log('组件调用')  
                let data = {
                    litigantId:litigantId.toString(),
                    name:panelList,
                    caseNo:this.backFill.caseNo,
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
  }
.headerCase{
    border:none !important;
    background-color: white !important;
}
 .textIndent{
      text-indent:2em;  
  }
.lineHeight{
    line-height: 26px;
}
.ivu-form-item{
    margin-bottom:11px;
}
  .underline100{
      text-align: center;
    border-bottom: 1px solid black; 
    display: inline-block;
    width: 10%;
  }
     input{
      width: 100%;
      height: 30px;
      border: none;
      font-size: 15px;
      text-align: center;
  }
</style>