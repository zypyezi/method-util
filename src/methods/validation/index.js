
export const isMobile = (mobile) => {
    return /^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(mobile)
}


export const isEmail = ( email ) => {
    return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)
}

export const isNumber=(number)=>{
    let v = /^\d*$/
    return v.test(Number(number))
}

export const isBlank = (value)=> {
    var v = /\S/
    return !v.test(value)
}


export const isEmpty = (data, excludeZero = true, needTrim = false) => {
    if(typeof data == 'string'){
        if(needTrim){
            return !data.trim()
        }else{
            return !data
        }
    }
    if(typeof data == 'number' && !excludeZero){
        if(data === 0) return true
    }
    if(Object.prototype.toString.call(data).slice(8, 14) == 'Object'){
    return Object.keys(data).length == 0
    }
    if(Object.prototype.toString.call(data).slice(8, 13) == 'Array'){
    return data.length == 0
    }
    return !data
}


export const isEqual = () => {
    
}
