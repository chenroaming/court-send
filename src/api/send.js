import Util from '@/libs/util.js';

const service = Util.ajax;

export function querySend (params) {
    return service({
        url: '/court/send/queryDocumentSendSituation.jhtml',
        method: 'POST',
        params
    });
}

// 案件信息及当事人信息及送达情况
export function getInfo (lawCaseId) {
    const params = {
        lawCaseId: lawCaseId
    };
    return service({
        url: '/court/send/queryLawCaseInfo.jhtml',
        method: 'POST',
        params
    });
}

// 文书送达及物流邮件送达情况
export function getSendInfo (lawCaseId, courtNumber) {
    const params = {
        lawCaseId,
        courtNumber
    };
    return service({
        url: '/court/send/queryDiplomsSend.jhtml',
        method: 'POST',
        params
    });
}
export function litigantEvidenceList (lawCaseId, litigantId) {
    const params = {
        lawCaseId,
        litigantId
    };
    return service({
        url: '/court/send/litigantEvidenceList.jhtml',
        method: 'POST',
        params
    });
}

export function queryCurrentSend (lawCaseId, litigantId) {
    const params = {
        lawCaseId
    };
    return service({
        url: '/court/send/queryCurrentSend.jhtml',
        method: 'POST',
        params
    });
}
// export function getLigitantInfo (lawCaseId) {
//     const params = {
//         lawCaseId: lawCaseId
//     };
//     return service({
//         url: '/court/send/queryDiplomsSend.jhtml',
//         method: 'POST',
//         params
//     });
// }

export function getPhones (caseNo) {
    const params = {
        caseNo
    };
    return service({
        url: '/court/send/queryLitigantPhone.jhtml',
        method: 'POST',
        params
    });
}

export function sendME (params) {
    // const params = {
    //     lawCaseId,
    //     fileds
    // };
    return service({
        url: '/court/send/sendMessageAndEmail.jhtml',
        method: 'POST',
        params
    });
}

export function cancelExp (lawCaseId, postId) {
    const params = {
        lawCaseId,
        postId
    };
    return service({
        url: '/court/send/cancelSendExpress.jhtml',
        method: 'POST',
        params
    });
}

export function getEntrustSend (litigantId) {
    const params = {
        litigantId,
    };
    return service({
        url: '/court/send/getEntrustSend.jhtml',
        method: 'GET',
        params
    });
}

export function addAdress (litigantId, address, remark) {
    const params = {
        litigantId,
        address,
        remark
    };
    return service({
        url: '/court/estFile/addAdress.jhtml',
        method: 'GET',
        params
    });
}

export function entrustSendConfirm (sendId) {
    const params = {
        sendId,
    };
    return service({
        url: '/court/send/entrustSendConfirm.jhtml',
        method: 'GET',
        params
    });
}

export function confirm (lawCaseId, litigantId, sendId) {
    const params = {
        lawCaseId,
        litigantId,
        sendId
    };
    return service({
        url: '/court/send/receiveDocumentConfirmForYsd.jhtml',
        method: 'post',
        params
    });
}
export function lawCaseSendComplete (lawCaseId) {
    const params = {
        lawCaseId
    };
    return service({
        url: '/court/send/confirmLawCaseSendComplete.jhtml',
        method: 'POST',
        params
    });
}

export function queryLitigantSend (litigantId) {
    const params = {
        litigantId
    };
    return service({
        url: '/court/send/queryLitigantSend.jhtml',
        method: 'POST',
        params
    });
}

export function postDeliveryBill (lawCaseId, filed) {
    const params = {
        lawCaseId,
        filed
    };
    return service({
        url: '/court/send/postDeliveryBill.jhtml',
        method: 'POST',
        params
    });
}

export function printBill (params) {
    return service({
        url: '/court/send/printExpress.jhtml',
        method: 'POST',
        params
    });
}

// 获取EMS快递送达的信息列表
export function queryLawCaseSendInfoList (params) {
    return service({
        url: '/court/send/queryLawCaseSendInfoList.jhtml',
        method: 'POST',
        params
    });
}
// 获取物流信息
export function getExpressSendInfo (sendId) {
    const params = {
        sendId
    };
    return service({
        url: '/court/send/getExpressSendInfo.jhtml',
        method: 'POST',
        params
    });
}
export function postDeliveryBillList (sendId) {
    const params = {
        sendId
    };
    return service({
        url: '/court/send/postDeliveryBillList.jhtml',
        method: 'POST',
        params
    });
}
/** 
 * 法官获取文件列表
 */
export function otherGetFiles (lawCaseId) {
    const params = {
        lawCaseId
    };
    return service({
        url: '/online/evidenceAttachment/getAllFiles.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 法官获取文件列表
 */
export function otherGetFiles2 (lawCaseId) {
    const params = {
        lawCaseId
    };
    return service({
        url: '/online/evidenceAttachment/getAllFiles.jhtml',
        method: 'GET',
        params
    });
}


/** 
 * 查询该案件是否允许修改
 */
export function getEdit (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/part/getEdit.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 获取全部合同信息
 */
export function getPart (lawId) {
    const params = {
        lawId
    };
    return service({
        url: '/online/part/getPart.jhtml',
        method: 'GET',
        params
    });
}


/** 
 * 微信模板接口
 */
export function wechatMessageTemplate (lawCaseId,litigantId) {
    const params = {
        lawCaseId,
        litigantId
    };
    return service({
        url: '/court/send/wechatMessageTemplate.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 微信模板接口
 */
export function getWeiXinInfo (litigantId) {
    const params = {
        litigantId
    };
    return service({
        url: '/court/send/getWeiXinInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 当事人信息修改
 */
export function sendEditLitigant (litigantId,idCard,phone,telephone) {
    const params = {
        litigantId,
        idCard,
        phone,
        telephone
    };
    return service({
        url: '/court/send/sendEditLitigant.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 邮件查询
 */
export function queryMail (data) {
    return service({
        url: '/court/send/queryMail.jhtml',
        method: 'POST',
        data
    });
}

/**
 * 邮件查询
 */
export function createMailExcel (data) {
    return service({
        url: '/court/send/createMailExcel.jhtml',
        method: 'POST',
        data
    });
}

/** 
 * 个人页台账
 */
export function personalAccount (params) {

    return service({
        url: '/court/send/personalAccount.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 个人页台账导出
 */
export function accountForExcel (data) {

    return service({
        url: '/court/send/accountForExcel.jhtml',
        method: 'post',
        data
    });
}

/** 
 * 当事人所有送达记录
 */
export function queryAllLitigantSend (pageNumber) {
    const params = {
        pageNumber
    }
    return service({
        url: '/court/send/queryAllLitigantSend.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 查询送达记录具体信息
 */
export function querySendInfo (sendId) {
    const params = {
        sendId
    }
    return service({
        url: '/court/send/querySendInfo.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 查询当事人送达文书
 */
export function countLitigantSend () {
    
    return service({
        url: '/court/send/countLitigantSend.jhtml',
        method: 'GET',
       
    });
}

/** 
 * 送达流程登记表
 */
export function getSendInfo2 (lawId) {
    const params = {
        lawId
    }
    return service({
        url: '/court/send/getSendInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 修改送达流程登记表
 */
export function updateSendInfo (data) {
    return service({
        url: '/court/send/updateSendInfo.jhtml',
        method: 'post',
        data
    });
}

/** 
 * 判决书生成接口
 */
export function createElementJudgement (lawCaseId) {
    const params = {
        lawCaseId
    }
    return service({
        url: '/dp/createElementJudgement.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 获取单个信用卡详情
 */
export function getCtInfo (infoType,infoId) {
    const params = {
        infoType,
        infoId
    };
    return service({
        url: '/online/part/getCtInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 要素信息核对
 */
export function checkFactor (lawCaseId,check) {
    const params = {
        lawCaseId,
        check
    };
    return service({
        url: '/online/evidenceAttachment/checkFactor.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 查询保证合同纠纷要素信息
 */
export function getContractInfo (lawId,partId,infoType,cdInfoId,gcIds) {
    const params = {
        lawId,
        partId,
        infoType,
        cdInfoId,
        gcIds
    };
    return service({
        url: '/online/part/getContractInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 更改案件是否可在已申请界面编辑（法院端）
 */
export function confirmOnLawCase (onlineLawCaseId,flag) {
    const params = {
        onlineLawCaseId,
        flag
    };
    return service({
        url: '/online/part/confirmOnLawCase.jhtml',
        method: 'GET',
        params
    });
}