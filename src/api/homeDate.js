import Util from '@/libs/util.js';

const service = Util.ajax;

export function courtList (searchData, pageData) {
    const params = {
        caseNo: searchData.caseNo || '',
        judgeName: searchData.judgeName || '',
        tribunalName: searchData.tribunalName || '',
        briefName: searchData.briefName || '',
        state: searchData.state || '',
        startDate: searchData.startDate || '',
        endDate: searchData.endDate || '',
        pageNumber: pageData.pageNumber || '',
        pageSize: pageData.pageSize || ''
    };
    return service({
        url: '/court/scheduling/list.jhtml',
        method: 'get',
        params
    });
}
/**
 * 案件数量统计
 */
export function caseCount (court) {
    const params = {
        court
    };
    return service({
        url: '/court/indexCount/caseCount.jhtml',
        method: 'get',
        params
    });
}
/**
 * 近三天庭审排期
 */
export function schedulingCase () {
    const params = {

    };
    return service({
        url: '/court/indexCount/schedulingList.jhtml',
        method: 'get',
        params
    });
}
/**
 * 送达情况统计
 * startData  开始时间
 * endDate 结束时间
 * typeDate 年月分类
 */
export function sendCountDate (data) {
    const params = {
        countyear: data.countyear,
        startTime: data.startTime,
        endTime: data.endTime,
        countType: data.countType,
        court:data.court
    };
    return service({
        url: '/court/indexCount/getSendTime.jhtml',
        method: 'get',
        params
    });
}
/**
 * 案件案由分布情况统计
 */
export function caseCountDate (startData, endDate,court) {
    const params = {
        startTime: startData,
        endTime: endDate,
        court
    };
    return service({
        url: '/court/indexCount/getBriefCountTen.jhtml',
        method: 'get',
        params
    });
}
/**
 * 案点击显示案件详情
 */
export function lawCaseSchedulding (lawCaseId) {
    const params = {
        lawCaseId
    };
    return service({
        url: '/court/scheduling/indexLawCaseSchedulding.jhtml',
        method: 'get',
        params
    });
}

/**
 * 首页案件列表
 * stage：案件阶段  0全部，1未排期，2送达中，3已送达，4，已开庭，5已结案
court：殿前法庭，湖里法院
 */
export function getlawCaseStageInfo (stage,court,pageNumber,pageSize) {
    const params = {
        stage,
        court,
        pageNumber,
        pageSize
    };
    return service({
        url: '/court/indexCount/getlawCaseStageInfo.jhtml',
        method: 'get',
        params
    });
}

/**
 * 我的案件--图标
 */
export function personCase () {
    return service({
        url: '/court/case/personCase.jhtml',
        method: 'get',
        
    });
}

/**
 * 我的案件--列表
 */
export function warnCase () {
    return service({
        url: '/court/case/warnCase.jhtml',
        method: 'get',
        
    });
}