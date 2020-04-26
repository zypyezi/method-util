
// 获取文件后缀名
export const getFileSuffix = (fileName='') => {
    let index = fileName.lastIndexOf('.')
    return fileName.substring(index + 1)
}

// 过滤数组重复数据
export const getUniqueArr = (arr, newArr) => {
    let num,
        me = this

    if ( arr.length >0 && arr.indexOf(num = arr.shift()) == -1 ) {
        newArr.push(num)
    }

    arr.length && unique(arr, newArr)
}

//获取url search 参数
export const getSearchParams = (name, search) => {
    if(!search){
        return null;
    }else{
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }
}

//从身份证号码中获取出生日期/性别信息
export const  getInfoFromIdCard = (id) => {
    /**
     * 校验身份证合法性
     * @param {*} code
     */
    let identityCodeValid = code => {
        const city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        let tip = "";
        let pass = true;
        if (!code || !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }

        else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            code = code.toUpperCase();
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                let last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        if(tip){
            console.log(tip)
        }
        return pass;
    }
    if (!identityCodeValid(id)) {
        return null
    }
    // 15位身份证号码：第7、8位为出生年份(两位数)，第9、10位为出生月份，第11、12位代表出生日期，第15位代表性别，奇数为男，偶数为女。
    // 18位身份证号码：第7、8、9、10位为出生年份(四位数)，第11、第12位为出生月份，第13、14位代表出生日期，第17位代表性别，奇数为男，偶数为女。
    if (id.length == 15) {
        return {
            birthday: moment(`19${id.substr(6, 6)}`,'YYYYMMDD'),
            sex: id[15] % 2
        }
    } else {
        return {
            birthday: moment(`${id.substr(6, 8)}`,'YYYYMMDD'),
            sex: id[15] % 2
        }
    }
}
