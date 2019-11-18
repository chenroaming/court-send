<template>
    <div>
        <p class="title">送达流程登记表</p>
        <p class="openTime">
            <span>确认开庭时间：
                <DatePicker v-model="openingTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="请选择开庭日期" ></DatePicker>
            </span>
            <!-- <span>{{openingTime}}</span> -->
        </p>
        <P class="openCourt">
            <span>确认开庭法庭：
                <Input v-model="openCourt" style="width: 187px" placeholder="输入开庭法庭" />
            </span>
            <!-- <span>{{openCourt}}</span> -->
        </P>
        <table border="1" width="950" align="center" cellspacing="0" cellpadding="6">
            <tbody>
                <tr align="left">
                    <td>
                        <span>案号：</span>
                        <span>{{caseNo}}</span>
                    </td>
                </tr>
                <tr align="left">
                    <td>
                        <span>庭室：</span>
                        <span>{{caseRoom}}</span>
                    </td>
                </tr>
                <tr align="left">
                    <td>
                        <span>当事人、案由：</span>
                        <span>{{litigant}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <br><br>
        <div v-for="(item,index) in plaintiffList">
            <table border="1" width="950" align="center" cellspacing="0" cellpadding="6">
                <tbody class="people">
                    <tr align="left">
                        <td>
                            <span>原告：</span>
                            <span>{{item.plaintiff}}</span>
                        </td>
                        <td>
                            <span>通知开庭时间：</span>
                            <span>{{item.openTiem}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table v-if="item.layerList.length > 0" v-for="(item3,index) in item.layerList" border="1" width="950" align="center" cellspacing="0" cellpadding="6">
                <tbody class="people">
                    <tr align="left">
                        <td>
                            <span>原告（代理人）：</span>
                            <span>{{item3.layer}}</span>
                        </td>
                        <td>
                            <span>通知开庭时间：</span>
                            <span>{{item3.layerOpenTiem}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table v-if="item.plaintiffSendForSite.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>现场领取：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >领取时间</th>
                        <th >领取地点</th>
                        <th >领取情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.plaintiffSendForSite" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <!-- <span>{{item2.remark}}</span> -->
                            <Input v-model="item2.remark" placeholder="输入备注" />
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.plaintiffSendForSite.length > 0">
            <table v-if="item.plaintiffSendForEMS.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>EMS送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达地点</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.plaintiffSendForEMS" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>    
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.plaintiffSendForEMS.length > 0">
            <table v-if="item.plaintiffSendForHome.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>工作人员上门送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达地点</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.plaintiffSendForHome" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.plaintiffSendForHome.length > 0">
            <table v-if="item.plaintiffSendForMail.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="6">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>邮件送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >邮箱地址</th>
                        <th >邮寄时间</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.plaintiffSendForMail" align="center">
                        <td>
                            <span>{{item2.sendEmail}}</span>
                        </td>
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.plaintiffSendForMail.length > 0">
            <table v-if="item.plaintiffSendForNotice.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>公告送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >发布时间</th>
                        <th >报纸刊号</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.plaintiffSendForNotice" align="center">
                        <td>
                            <span>{{item2.releaseDate}}</span>
                        </td>
                        <td>
                            <span>{{item2.newspaper}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.plaintiffSendForNotice.length > 0">
            <table v-if="item.plaintiffSendForCommission.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>委托送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达地点</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.plaintiffSendForCommission" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.plaintiffSendForCommission.length > 0">
            <table v-if="item.plaintiffSendForPhone.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>电话送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >呼叫号码</th>
                        <th >呼叫时间</th>
                        <th >通话情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.plaintiffSendForPhone" align="center">
                        <td>
                            <span>{{item2.num}}</span>
                        </td>
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.plaintiffSendForPhone.length > 0">
            <table v-if="item.plaintiffSendForWechat.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="6" class="methods-title">
                            <span>微信送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.plaintiffSendForWechat" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.plaintiffSendForWechat.length > 0">
            <table v-if="item.plaintiffSendForPlatform.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>平台送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达地址</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.plaintiffSendForPlatform" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.plaintiffSendForPlatform.length > 0">
        </div>
        
        <br><br>
        <div v-for="(item,index) in defendantList">
            <table border="1" width="950" align="center" cellspacing="0" cellpadding="6">
                <tbody class="people">
                    <tr align="left">
                        <td>
                            <span>被告：</span>
                            <span>{{item.defendant}}</span>
                        </td>
                        <td>
                            <span>通知开庭时间：</span>
                            <span>{{item.openTiem}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table v-if="item.layerList.length > 0" v-for="(item3,index) in item.layerList" border="1" width="950" align="center" cellspacing="0" cellpadding="6">
                <tbody class="people">
                    <tr align="left">
                        <td>
                            <span>被告（代理人）：</span>
                            <span>{{item3.layer}}</span>
                        </td>
                        <td>
                            <span>通知开庭时间：</span>
                            <span>{{item3.layerOpenTiem}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.layerList.length > 0">
            <table v-if="item.defendantSendForSite.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>现场领取：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >领取时间</th>
                        <th >领取地点</th>
                        <th >领取情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.defendantSendForSite" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.defendantSendForSite.length > 0">
            <table v-if="item.defendantSendForEMS.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>EMS送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达地点</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.defendantSendForEMS" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.defendantSendForEMS.length > 0">
            <table v-if="item.defendantSendForHome.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>工作人员上门送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达地点</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.defendantSendForHome" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.defendantSendForHome.length > 0">
            <table v-if="item.defendantSendForMail.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="6">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>邮件送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >邮箱地址</th>
                        <th >发送时间</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.defendantSendForMail" align="center">
                        <td>
                            <span>{{item2.sendEmail}}</span>
                        </td>
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.defendantSendForMail.length > 0">
            <table v-if="item.defendantSendForNotice.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>公告送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >发布时间</th>
                        <th >报纸刊号</th>
                        <th >领取情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.defendantSendForNotice" align="center">
                        <td>
                            <span>{{item2.releaseDate}}</span>
                        </td>
                        <td>
                            <span>{{item2.newspaper}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.defendantSendForNotice.length > 0">
            <table v-if="item.defendantSendForCommission.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>委托送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达地址</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.defendantSendForCommission" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.defendantSendForCommission.length > 0">
            <table v-if="item.defendantSendForPhone.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>电话送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.defendantSendForPhone" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.defendantSendForPhone.length > 0">
            <table v-if="item.defendantSendForWechat.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>微信送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.defendantSendForWechat" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.defendantSendForWechat.length > 0">
            <table v-if="item.defendantSendForPlatform.length > 0" border="1" width="950" align="center" cellspacing="0" cellpadding="0">
                <thead>
                    <tr align="left">
                        <th colspan="7" class="methods-title">
                            <span>平台送达：</span>
                        </th>
                    </tr>
                    <tr align="center">
                        <th >送达时间</th>
                        <th >送达地址</th>
                        <th >送达情况</th>
                        <th >备注</th>
                        <th >送达人员</th>
                        <th >审核人</th>
                        <th >审核时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item2,index) in item.defendantSendForPlatform" align="center">
                        <td>
                            <span>{{item2.time}}</span>
                        </td>
                        <td>
                            <span>{{item2.address}}</span>
                        </td>
                        <td>
                            <span>{{item2.status}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.remark" placeholder="输入备注" />
                            <!-- <span>{{item2.remark}}</span> -->
                        </td>
                        <td>
                            <span>{{item2.sendMan}}</span>
                        </td>
                        <td>
                            <Input v-model="item2.reviewer" placeholder="输入审核人" />
                            <!-- <span>{{item2.reviewer}}</span> -->
                        </td>
                        <td>
                            <DatePicker v-model="item2.reviewTime" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择审核日期" ></DatePicker>
                            <!-- <span>{{item2.reviewTime}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <br v-if="item.defendantSendForPlatform.length > 0">
        </div>
        <div style="text-align: center;"><Button type="primary" :loading="standby" @click="submitTable">确认修改</Button></div>
    </div>  
</template>
      
<script type="text/javascript">
    import {getSendInfo2,updateSendInfo} from '@/api/send.js';
export default {
    name: 'sendTable',
    props:[],
    data () {
        return {
            standby:false,
            caseId:'',
            openingTime:'',
            openCourt:'',
            caseNo:'',
            caseRoom:'',
            litigant:'',
            plaintiffList:[],
            defendantList:[],
            paramList:{
                tribunal:'',
                courtTime:'',
                list:[]
            }
        };
    },
    methods: {
        time(time = +new Date()) {//时间戳转换函数
            const date = new Date(time + 8 * 3600 * 1000); // 中国东八区，增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ').substring(0,16);
        },
        time2(time) {//Date对象转时间戳
            const date = new Date(time).getTime()+ 8 * 3600 * 1000;
            return new Date(date).toJSON().substr(0, 19).replace('T', ' ').substring(0,16);
        },
        submitTable(){
            this.standby = true;
            this.paramList.list = [];
            this.paramList.tribunal = this.openCourt;
            this.paramList.courtTime = this.time2(this.openingTime);
            console.log(this.plaintiffList);
            for(const item of this.plaintiffList){
                const newArr = Object.values(item);
                for (const item2 of newArr){
                    if(typeof(item2[0]) == 'object' && item2[0].hasOwnProperty('id')){
                        for(const item3 of item2){
                            const params = {
                                sendId:item3.id,
                                remarks:item3.remark,
                                auditor:item3.reviewer,
                                auditDate:item3.reviewTime ? this.time2(item3.reviewTime) : '',
                            }
                            this.paramList.list.push(params);
                        }
                    }
                }
            }
            for(const item of this.defendantList){
                const newArr = Object.values(item);
                for (const item2 of newArr){
                    if(typeof(item2[0]) == 'object' && item2[0].hasOwnProperty('id')){
                        for(const item3 of item2){
                            const params = {
                                sendId:item3.id,
                                remarks:item3.remark,
                                auditor:item3.reviewer,
                                auditDate:item3.reviewTime ? this.time2(item3.reviewTime) : '',
                            }
                            this.paramList.list.push(params);
                        }
                    }
                }
            }
            
            updateSendInfo(this.paramList).then(res => {
                this.standby = false;
                if(res.data.state == 100){
                    this.$emit('listenToChildEvent',true);
                    return this.$Message.success(res.data.message);
                }
                this.$emit('listenToChildEvent',false);
                this.$Message.warning(res.data.message);
            })
            .catch(error => {
                console.log(error);
                this.$Message.warning('网络错误，请刷新重试！');
            })
        },
        reset(){
            this.openingTime = '';
            this.openCourt = '';
            this.caseNo = '';
            this.caseRoom = '';
            this.litigant = '';
            this.plaintiffList = [];
            this.defendantList = [];
        },
        search(caseId){
            this.caseId = caseId;
            this.reset();
            const status = {'':'暂无信息','-1':'取消','0':'送达中',1:'已送达成功',2:'未送达成功',3:'已阅读'};
            getSendInfo2(caseId).then(res => {
                //原告人信息
                if(res.data.state != 100){
                    return this.$Message.warning(res.data.message);
                }
                this.$emit('listenToChildEvent',false);
                this.litigant = res.data.data.lawInfo.reason;
                this.caseRoom = res.data.data.lawInfo.tribunal2;
                this.openCourt = res.data.data.lawInfo.tribunal1;
                this.caseNo = res.data.data.lawInfo.caseNo;
                this.openingTime = !res.data.data.lawInfo.courtTime ? '' : this.time(res.data.data.lawInfo.courtTime);
                for(const item of res.data.data.info1){
                    const plaintiff = {
                        plaintiff:item.litigant,
                        openTiem:this.openingTime,
                        layerList:[],
                        plaintiffSendForSite:[],
                        plaintiffSendForEMS:[],
                        plaintiffSendForHome:[],
                        plaintiffSendForMail:[],
                        plaintiffSendForNotice:[],
                        plaintiffSendForCommission:[],
                        plaintiffSendForPhone:[],
                        plaintiffSendForWechat:[],
                        plaintiffSendForPlatform:[],
                    }
                    //原告代理人信息
                    if(item.lawyers.length > 0){
                        for(const item2 of item.lawyers){
                            const layerinfo = {
                                layer:item2,
                                layerOpenTiem:this.openingTime,
                            }
                            plaintiff.layerList.push(layerinfo);
                        }
                    }
                    //原告送达情况信息
                    for(const item2 of item.sendInfo){
                        switch(item2.type){
                            case 0:
                                const plaintiffSendForSite = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '湖里法院' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                plaintiff.plaintiffSendForSite.push(plaintiffSendForSite);
                                break;
                            case 1:
                                const plaintiffSendForEMS = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                plaintiff.plaintiffSendForEMS.push(plaintiffSendForEMS);
                                break;
                            case 2:
                                const plaintiffSendForHome = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                plaintiff.plaintiffSendForHome.push(plaintiffSendForHome);
                                break;
                            case 3:
                                const plaintiffSendForMail = {//邮件送达类型
                                    id:item2.id,
                                    sendEmail:!item2.sendEmail ? '' : item2.sendEmail,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                plaintiff.plaintiffSendForMail.push(plaintiffSendForMail);
                                break; 
                            case 4:
                                const plaintiffSendForNotice = {
                                    id:item2.id,
                                    releaseDate:!item2.notice.releaseDate ? '' : item2.notice.releaseDate,
                                    newspaper:!item2.notice.newspaper ? '' : item2.notice.newspaper,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                plaintiff.plaintiffSendForNotice.push(plaintiffSendForNotice);
                                break;
                            case 6:
                                const plaintiffSendForCommission = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                plaintiff.plaintiffSendForCommission.push(plaintiffSendForCommission);
                                break;
                            case 7:
                                const plaintiffSendForPhone = {//电话送达类型，暂时为空
                                    id:item2.id,
                                    num:!item2.oddNumbers ? '' : item2.oddNumbers,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                plaintiff.plaintiffSendForPhone.push(plaintiffSendForPhone);
                                break;
                            case 8:
                                const plaintiffSendForWechat = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                plaintiff.plaintiffSendForWechat.push(plaintiffSendForWechat);
                                break;
                            case 10:
                                const plaintiffSendForPlatform = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                plaintiff.plaintiffSendForPlatform.push(plaintiffSendForPlatform);
                                break;    
                        }
                    }
                    this.plaintiffList.push(plaintiff);
                }
                

                for(const item of res.data.data.info2){
                    //被告人信息
                    const defendant = {
                        defendant:item.litigant,
                        openTiem:this.openingTime,
                        layerList:[],
                        defendantSendForSite:[],
                        defendantSendForEMS:[],
                        defendantSendForHome:[],
                        defendantSendForMail:[],
                        defendantSendForNotice:[],
                        defendantSendForCommission:[],
                        defendantSendForPhone:[],
                        defendantSendForWechat:[],
                        defendantSendForPlatform:[],
                    }
                    //被告代理人信息
                    if(item.lawyers.length > 0){
                        for(const item2 of item.lawyers){
                            const layerinfo = {
                                layer:item2,
                                layerOpenTiem:this.openingTime,
                            }
                            defendant.layerList.push(layerinfo);
                        }
                    }
                    //被告送达情况信息
                    for(const item2 of item.sendInfo){
                        switch(item2.type){
                            case 0:
                                const defendantSendForSite = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '湖里法院' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                defendant.defendantSendForSite.push(defendantSendForSite);
                                break;
                            case 1:
                                const defendantSendForEMS = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                defendant.defendantSendForEMS.push(defendantSendForEMS);
                                break;
                            case 2:
                                const defendantSendForHome = {//上门送达类型
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                defendant.defendantSendForHome.push(defendantSendForHome);
                                break;
                            case 3:
                                const defendantSendForMail = {//邮件送达类型，暂时为空
                                    id:item2.id,
                                    sendEmail:!item2.sendEmail ? '' : item2.sendEmail,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                defendant.defendantSendForMail.push(defendantSendForMail);
                                break; 
                            case 4:
                                const defendantSendForNotice = {
                                    id:item2.id,
                                    releaseDate:!item2.notice.releaseDate ? '' : item2.notice.releaseDate,
                                    newspaper:!item2.notice.newspaper ? '' : item2.notice.newspaper,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                defendant.defendantSendForNotice.push(defendantSendForNotice);
                                break;
                            case 6:
                                const defendantSendForCommission = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                defendant.defendantSendForCommission.push(defendantSendForCommission);
                                break;
                            case 7:
                                const defendantSendForPhone = {//邮件送达类型，暂时为空
                                    id:item2.id,
                                    num:!item2.oddNumbers ? '' : item2.oddNumbers,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                defendant.defendantSendForPhone.push(defendantSendForPhone);
                                break;
                            case 8:
                                const defendantSendForWechat = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                defendant.defendantSendForWechat.push(defendantSendForWechat);
                                break;
                            case 10:
                                const defendantSendForPlatform = {
                                    id:item2.id,
                                    time:!item2.createDate ? '' : this.time(item2.createDate),
                                    address:!item2.sendAddress ? '' : item2.sendAddress,
                                    status:status[item2.state],
                                    remark:!item2.remarks ? '' : item2.remarks,
                                    sendMan:!item2.sender ? '' : item2.sender.name,
                                    reviewer:!item2.auditor ? '' : item2.auditor,
                                    reviewTime:!item2.auditTime ? '' : this.time(item2.auditTime),
                                }
                                defendant.defendantSendForPlatform.push(defendantSendForPlatform);
                                break;    
                        }
                    }
                    this.defendantList.push(defendant);
                }
            })
            .catch(error => {
                console.log(error);
                this.reset();
                this.$Message.warning('网络错误！请刷新重试！');
            })
        },
    },
    mounted () {
        
    }
};
</script>
      
<style lang="css">
    td {
        word-break: break-all;
        word-wrap:break-word;
    }
    table {
        table-layout: fixed;
        border:none;
        border-collapse: collapse;
    }
    .people td {
        width: 50%;
    }
    tr {
        border-color: #e8eaec;
    }
    .methods-title {
        background: linear-gradient(45deg, #6A95B7, #7CA9C8);
        border: none;
    }
    .title {
        text-align: center;
        font-size: 20px;
    }
    .openTime {
        margin: 0 auto;
        text-align: right;
        width: 80%;
    }
    .openCourt {
        margin: 0 auto;
        text-align: right;
        width: 80%;
    }
</style>
      