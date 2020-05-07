
// 复制一段文字
export const copyText = (text) => {
    let el = document.createElement("textarea")
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand("Copy")
    document.body.removeChild(el)
    console.log("复制成功")
}

// 

