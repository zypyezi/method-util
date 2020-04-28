
// 获取大写金额
export const getUpperMoney = (n) => {
    let unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分',
        str = ''

    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
        // return '壹仟元整（示例）'
        return ''
    } else if (Number(n) === 0) {
        return '零元整'
    }

    n += '00'
    let prefix = ''
    let p = n.indexOf('.')

    if (p >= 0) {
        n = n.substring(0, p) + n.substr(p + 1, 2)
    }
    if (Number(n) < 0) {
        n = Math.abs(Number(n)) + ''
        prefix = '负'
    }

    unit = unit.substr(unit.length - n.length)

    for (let i = 0; i < n.length; i++) {
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
    }

    str = str
        .replace(/零(仟|佰|拾|角)/g, '零')
        .replace(/(零)+/g, '零')
        .replace(/零(兆|万|亿|元)/g, '$1')
        .replace(/(兆|亿)万/g, '$1')
        .replace(/(京|兆)亿/g, '$1')
        .replace(/(京)兆/g, '$1')
        .replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟')
        .replace(/^元零?|零分/g, '')
        .replace(/(元|角)$/g, '$1整')

    return prefix + str
}


/**
 * 获取标准金额格式 如 100.00
 * @param money
 * @param s 保留几位小数
 * @returns {*}
 */
export const formatMoney = (money, s = 2) => {
    let num = Number(money)
    let isNegative = num < 0

    if (typeof num === 'number' && !isNaN(num)) {
        let times = Math.pow(10, s),
            des = num * times + 0.5
        des = parseInt(des, 10) / times
        return isNegative ? '-' + des.toFixed(s) :  des.toFixed(s)
    } else {
        return money
    }
}

/**
 *  将金额格式化成  1,222,333,444.00 的形式
 * @param {number} money  单位分
 */
export const formatMoneyByComma = (money) => {
    if (typeof money === 'number' && !isNaN(money)) {
        let tempMoney = formatMoney(money / 100)
        return (
            tempMoney.split('.')[0].replace(/\B(?=(?:\d{3})+\b)/g, ',') +
            '.' +
            tempMoney.split('.')[1]
        )
    } else {
        return money || 0
    }
}


/**
 * 银行卡四位分割 11 2222 3333 4444
 */
export const formatBankCard = (bankcard) => {
    return bankcard.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ')
}

// 银行卡隐私模式显示   显示前四位和后四位  ，中间使用****
export const formatBankCardBySecret = (bankcard) => {
    let value = bankcard.replace(/\s/g,'')
    if(value.length <=8){
        return value
    }
    return value.slice(0,4) + '********' + value.splice(-4)
    // return bankcard.replace(/\D/g, '').replace(/(?<=\d{4})\d+(?=\d{4})/g, '*****')   // 有兼容性问题
}
