

export const axios = () => {

}


export const fetch = () => {
    
}


export const ajax = () => {

}


export const xhr = () => {
    
}


/**
 * 
 * @param {*} url 接口地址
 * @param {*} data  接口数据
 * @param {*} callback 回调函数 {name: 回调函数名字， fn: 回调函数}
 * @param {*} removeCookieFromUrl  是否将cookie添加至url后面
 */
export const jsonP = (url, data={}, callback, removeCookieFromUrl) =>{
    window[callback.name] = callback.fn
    let fullUrl = url + '?callback=' + callback.name
    if(!removeCookieFromUrl){
      let cookieArr = document.cookie.split(';')
      for (let i = 0; i < cookieArr.length; i++) {
        let nv = cookieArr[i].split('=')
        data[nv[0].replace(/(^\s*)|(\s*$)/g, '')] = nv[1]
      }
    }
    for (let i in data) {
      fullUrl += '&' + i + '=' + data[i]
    }
    let script = document.createElement('script')
    script.src = fullUrl

    document.getElementsByTagName('head')[0].appendChild(script)
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(script)
    }, 300)
}