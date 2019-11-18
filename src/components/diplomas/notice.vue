<template>
   <div class="box">
       <div class="header">
             <h2>福建省厦门市湖里区人民法院</h2>
             <h2>公&emsp;&emsp;告</h2>
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
                     &emsp;&emsp;本院已经受理原告
                    <div style="width: 30%; display:inline-block;border-bottom:1px solid black;text-align: center;"><input type="text" v-model="backFill.plaintiffName"></div>
                    与被告<div style="width: 30%; display:inline-block;border-bottom:1px solid black;text-align: center;"><input type="text" v-model="backFill.defendantName"></div>
                    <div style="width: 30%; display:inline-block;border-bottom:1px solid black;text-align: center;"><input type="text" v-model="backFill.briefName"></div>
                    纠纷一案，现依法向你公告送达 <div style="width: 30%; display:inline-block;border-bottom:1px solid black;text-align: center;"><input type="text" v-model="backFill.caseNo"></div>
                    案件的起诉状、证据材料、应诉通知书、举证通知书、诉讼权利义务告知书、廉政监督卡、民事裁定书、合议庭组成人员告知书及开庭传票。自本公告发出之日起经过60日，即视为送达；提出答辩状和举证的期限分别为公告送达期满后15日和30日内，并定于举证期限届满后次日（遇节假日顺延）
                    上午8时30分在本院殿前人民法庭第四法庭（厦门市湖里区华荣路54号）开庭审理此案，逾期不到庭，本院将依法缺席裁判。 
                </div>
        
                <div class="textIndent">
                  &emsp;&emsp;特此公告
                </div>
               
 
                <Row>
                    <Col span="8" push="18" class="maininfo-col headerCase" style="margin-top:36px;">
                        <p>厦门市湖里区人民法院</p>
                        <p>{{backFill.nowDate}}</p>
                        
                    </Col>
                </Row>
                <div class="textIndent" style="margin-top:15px;font-weight:600">联系方式：厦门市湖里区人民法院（福建省厦门市湖里区华荣路54号）</div>
                <div class="textIndent" style="font-weight:600">殿前法庭审判事务中心 沈春福 0592-2621015</div>
                <div class="textIndent">（扫码下载起诉状及证据副本电子版）</div>
         </div>
         
       </Form>
     
     </div> 
   </div>

</template>

<script type="text/javascript">
import { dbList,createNotice } from '@/api/diplomas.js';
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
        title:'公告'
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

              createNotice(
                this.backFill.lawCaseId,
                this.backFill.litigantName,
                this.backFill.plaintiffName,
                this.backFill.defendantName,
                this.backFill.briefName,
                this.backFill.caseNo
              ).then(res=>{
               if(res.data.state == 100){
                    this.modelHid = false;
                     this.$emit('model',this.modelHid,res.data.file,this.title);
               }else{
                   this.$Message.info(res.data.message);  
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
    border-bottom: 1px solid black; 
    display: inline-block;
    width: 5%;
  }
    input{
      width: 100%;
      height: 30px;
      border: none;
      font-size: 15px;
      text-align: center;
  }
</style>