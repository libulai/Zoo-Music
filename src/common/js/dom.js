//判断是否存在class名
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

//增加class名
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }

    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

/*
获取/设置 元素属性
*/
export function getData(el, name, val) {
    const totName = 'data-' + name
    if (!val) {
        return el.getAttribute(totName)
    } else {
        return el.setAttribute(totName, val)
    }
}

/*
样式兼容性封装
*/

let elementStyle = document.createElement('div').style

const prefix = (() =>{
    let pre = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for(let i in pre){
        if(elementStyle[pre[i]] !== 'undefined'){
            return i
        }
    }

    return false

})()

export function prefixStyle (style){
    if(prefix === false){
        return false
    }

    if(prefix === 'standard'){
        return style
    }

    return prefix + style.charAt(0).toUpperCase() + style.substr(1)
} 
