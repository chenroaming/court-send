import Util from '@/libs/util.js';

const service = Util.ajax;

/**
 *
 * @param {案件编号} caseNo
 * @param {案件所处阶段} process  1立案建档 2 排班 3 文书送达 4举证阶段  5质证阶段  6开庭阶段 7案件结案
 * @param {案由} briefName
 * @param {立案时间开始} fillingDateStart
 * @param {立案时间截止} fillingDateEnd
 * @param {每页条数} pageSize
 * @param {页码} pageNumber
 */
export function getDiplomsLawCaseList (params) {
  return service({
    url: '/dp/getDiplomsLawCaseList.jhtml',
    method: 'GET',
    params
  });
}

/**
 *
 *
 * @export
 * @param {要预览的目录} directory 结构：caseId,dirTypeParentId,fileId
 * @param {每页条数} pageSize
 * @param {文件名称} fileName
 * @param {页码} pageNumber
 * @returns
 */
export function getDiplomsFileList (params) {
  return service({
    url: '/dp/getDiplomsFileList.jhtml',
    method: 'GET',
    params
  });
}

export function downloadDiplomsList (data) {
  return service({
    url: '/dp/downloadDiplomsList.jhtml',
    method: 'POST',
    data
  });
}

export function uploadElectronicFile (files) {
  const params = {
    files
  }
  return service({
    url: '/court/send/uploadElectronicFile.jhtml',
    method: 'get',
    params
  });
}

export function decDiploms (params) {
  return service({
    url: '/dp/decDiploms.jhtml',
    method: 'POST',
    params
  })
}

/**
 * 创建目录
 * @param {*} params 
 */
export function createCaseDir (params) {
  return service({
    url: '/dp/createCaseDir.jhtml',
    method: 'get',
    params
  })
}

/**
 * 创建案件根目录
 * @param {*} params 
 */
export function createCaseTableDir (data) {
  return service({
    url: '/dp/createCaseTableDir.jhtml',
    method: 'post',
    data
  })
}

/**
 * 上传文件到电子卷宗
 */
export function dirTypeAndUploadDiploms (fileList, caseId,dirTypeName,dirTypeParentId,original) {
  let params = new FormData()
  for(var i=0;i<fileList.length;i++){
      params.append('fileList', fileList[i])
  }
  let config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  var str = '/dp/dirTypeAndUploadDiploms.jhtml?caseId='+caseId+'&dirTypeName='+dirTypeName + '&dirTypeParentId='+dirTypeParentId+ '&original='+original;
  var strs = encodeURI(str)
  return service.post(strs, params, config)
}

/**
 * 是否有无原件
 */
export function checkDiploms (fileId,original) {
  const params = {
    fileId,
    original
  }
  return service({
    url: '/dp/checkDiploms.jhtml',
    method: 'get',
    params
  });
}

/**
 * 审核接口
 * @param {*} params 
 */
export function verifyDiploms (fileId) {
  const params = {
    fileId
  }
  return service({
    url: '/dp/verifyDiploms.jhtml',
    method: 'get',
    params
  })
}

/**
 * 生成归档卷宗接口
 * @param {*} params 
 */
export function createProcessExc (lawCaseId) {
  const params = {
    lawCaseId
  }
  return service({
    url: '/court/process/createProcessExc.jhtml',
    method: 'get',
    params
  })
}

/**
 * 删除文件接口
 * @param {*} params 
 */
export function delDiploms (fileIdList) {
  const data = {
    fileIdList
  }
  return service({
    url: '/dp/delDiploms.jhtml',
    method: 'post',
    data
  })
}

/**
 * 移动文件接口
 *fileIdList 文件id数组
 *dirTypeId  要移到该目录的目录id
 */
export function updateFileDirType (fileIdList,dirTypeId) {
  const data = {
    fileIdList,
    dirTypeId
  }
  return service({
    url: '/dp/updateFileDirType.jhtml',
    method: 'post',
    data
  })
}


/**
 * 导入诉前证据
 * @param {*} params 
 */
export function saveEviToArchive (lawCaseId) {
  const params = {
    lawCaseId
  }
  return service({
    url: '/dp/saveEviToArchive.jhtml',
    method: 'get',
    params
  })
}