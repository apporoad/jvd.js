const utils = require('lisa.utils')

function isNumber(val){
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }
}

function isInteger(val){
    var regPos = /^\d+(\.)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.)|([0-9]*[1-9][0-9]*\.)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }
}

exports.isString = (data)=>{
    if(data == null || data == undefined)
        return true
    return utils.Type.isString(data)
}

exports.isNumber = (data)=>{
    if(data==null || data == undefined)
        return true
    return isNumber(data)
}

exports.isInteger =(data)=>{
    if(data == null || data== undefined)
        return true
    return isInteger(data)
}

exports.isFunction = (data)=>{
    if(data == null || data == undefined)
        return true
    return utils.Type.isFunction(data) || utils.Type.isAsyncFunction(data)
}
exports.isSyncFunction = (data)=>{
    if(data == null || data == undefined)
        return true
    return utils.Type.isFunction(data) 
}
exports.isAsyncFunction = (data)=>{
    if(data == null || data == undefined)
        return true
    return utils.Type.isAsyncFunction(data)
}
exports.isJSON = (data)=>{
    if(data == null || data == undefined)
        return true
    return utils.Type.isObject(data)
}
exports.isArray = (data)=>{
    if(data == null || data == undefined)
        return true
    return utils.Type.isArray(data)
}
exports.isRegExp = (data)=>{
    if(data == null || data == undefined)
        return true
    return utils.Type.isRegExp(data)
}
exports.required = (data)=>{
    if(data == null || data == undefined)
        return false
    return true
}
exports.anything = exports.required


    this.pattern = this.match= ()=>{}
    this.greaterThan=()=>{}
    this.litterThan = ()=>{}
    this.between = this.range = ()=>{}
    this.oneOf = this.in= ()=>{}
    this.equils = this.toBe = this.is = ()=>{}