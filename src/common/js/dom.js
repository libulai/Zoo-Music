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