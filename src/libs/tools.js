import VueRouter from 'vue-router';
 
 /**
 * @description 下载文件
 * 
 * @param [string] path 路径
 */

export function tools_downLoad (path) {
    let str1 = path.substr(0, 1);
    let pathN = '';
    if(str1 == '/'){
      pathN = path;
    }else{
      pathN ='/' + path;
    }
    var eleLink = document.createElement("a");
    var strs = pathN.split("/");
    for (var i = 0; i < strs.length; i++) {
        if (i == strs.length - 1) {
        var filename = strs[i];
        }
    }
    eleLink.download = filename;
    eleLink.style.display = "none";
    eleLink.href = pathN;
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
}