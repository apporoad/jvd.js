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
        return null
    return utils.Type.isString(data)
}

exports.isNumber = (data)=>{
    if(data==null || data == undefined)
        return null
    return isNumber(data)
}

exports.isInteger =(data)=>{
    if(data == null || data== undefined)
        return null
    return isInteger(data)
}

exports.isFunction = (data)=>{
    if(data == null || data == undefined)
        return null
    return utils.Type.isFunction(data) || utils.Type.isAsyncFunction(data)
}
exports.isSyncFunction = (data)=>{
    if(data == null || data == undefined)
        return null
    return utils.Type.isFunction(data) 
}
exports.isAsyncFunction = (data)=>{
    if(data == null || data == undefined)
        return null
    return utils.Type.isAsyncFunction(data)
}
exports.isJSON = (data)=>{
    if(data == null || data == undefined)
        return null
    return utils.Type.isObject(data)
}
exports.isArray = (data)=>{
    if(data == null || data == undefined)
        return null
    return utils.Type.isArray(data)
}
exports.isRegExp = (data)=>{
    if(data == null || data == undefined)
        return null
    return utils.Type.isRegExp(data)
}
exports.required = (data)=>{
    if(data == null || data == undefined)
        return false
    return true
}
exports.anything = exports.required

exports.pattern = exports.match  = (data, regExp)=>{
    if(data ==null || data == undefined){
        return null
    }
    if(regExp && utils.Type.isRegExp(regExp)){
        return regExp.test(data)
    }
    throw Error('not right regExp' + regExp)
}

exports.gt = exports.greaterThan = (data, value,comparedFn)=>{
     if(data ==null || data == undefined){
        return null
    }
    if(value){
        if(comparedFn){
            return comparedFn(data,value)
        }
        return data > value
    }
    return false
}
exports.lt = exports.litterThan =(data,value,comparedFn)=>{
     if(data ==null || data == undefined){
        return null
    }
    if(value){
        if(comparedFn){
            return !comparedFn(data,value)
        }
        return data < value
    }
    return false
}

exports.between = exports.range = (data,low,high,comparedFn)=>{
     if(data ==null || data == undefined){
        return null
    }
    if(low && high){
        if(comparedFn){
            return comparedFn(data,low) && comparedFn(high,data)
        }
        return data >= low && data <= high
    }
    return false
}

exports.oneOf = exports.in = (data, array,comparedFn)=>{
      if(data ==null || data == undefined){
        return null
    }
    if(array && utils.Type.isArray(array)){
        if(comparedFn){
            utils.ArrayContains(array,data,comparedFn)
        }
        return utils.ArrayContains(array,data)
    }
    return false
}

exports.equils = exports.toBe = exports.is =(data,value,compareFn)=>{
      if(data ==null || data == undefined){
        return null
    }
    if(value){
        if(compareFn)
            return compareFn(data,value)
        return data == value
    }
    return false
}
