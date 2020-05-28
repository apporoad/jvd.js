const utils = require('lisa.utils')
const uType = utils.Type

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

exports.isString = (data,options)=>{
    if(data == null || data == undefined)
        return null
    return utils.Type.isString(data)
}

exports.isNumber = (data,options)=>{
    if(data==null || data == undefined)
        return null
    return isNumber(data)
}

exports.isInteger =(data,options)=>{
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

exports.pattern = exports.match  = (data,options, regExp)=>{
    if(data ==null || data == undefined){
        return null
    }
    if(regExp && utils.Type.isRegExp(regExp)){
        return regExp.test(data)
    }
    throw Error('not right regExp' + regExp)
}

var innerGt= (one,value)=>{
    var v1 = one
    var v2 = value
    if(uType.isString(v1) && uType.isString(v2)){
        return v1 > v2
    }
    if(uType.isArray(v1) || uType.isString(v1)){
        v1 = v1.length
    }
    if(uType.isArray(v2) || uType.isString(v2)){
        v2 = v2.length
    }
    return v1 > v2
}
var innerEquils= (one,value)=>{
    var v1 = one
    var v2 = value
    if((uType.isArray(v1) || uType.isString(v1)) && uType.isNumber(v2)){
        return v1.length == v2
    }
    if((uType.isArray(v2) || uType.isArray(v2)) && uType.isNumber(v1)){
        return v2.length == v1
    }
    return v1 == v2
}

exports.gt = exports.greaterThan = (data ,options, value,comparedFn)=>{
     if(data ==null || data == undefined){
        return null
    }
    if(value!=null && value != undefined){
        if(comparedFn){
            return comparedFn(data,value)
        }
        return innerGt(data,value) 
    }
    return false
}
exports.lt = exports.litterThan =(data,options,value,comparedFn)=>{
     if(data ==null || data == undefined){
        return null
    }
    if(value!=null && value != undefined){
        if(comparedFn){
            return !comparedFn(data,value)
        }
        return innerGt(value,data)
    }
    return false
}

exports.between = exports.range = (data,options,low,high,comparedFn)=>{
     if(data ==null || data == undefined){
        return null
    }
    if(low!=null && low!=undefined && high !=null && high!=undefined){
        if(comparedFn){
            return comparedFn(data,low) && comparedFn(high,data)
        }
        return  !innerGt(low,data)  &&  !innerGt(data,high)
    }
    return false
}

exports.oneOf = exports.in = (data , options, array,comparedFn)=>{
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

exports.equils = exports.toBe = exports.is =(data,options,value,compareFn)=>{
      if(data ==null || data == undefined){
        return null
    }
    if(value!=null && value!=undefined){
        if(compareFn)
            return compareFn(data,value)
        return innerEquils(data,value)
    }
    return false
}

exports.$ =  (data , options,value) =>{
    if(data == null || data ==undefined){
        return null
    }
    if(value ==null || value==undefined){
        return true
    }
    return value ? true : false
}