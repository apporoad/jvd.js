const utils = require('lisa.utils')

function JVD(initData){
    _this = this
    this._implements = {}
    this._params = {}
    this.reg = (itemName, implement)=>{
        if(itemName && (utils.Type.isFunction(implement) || utils.Type.isAsyncFunction(implement))){
            switch(itemName){
                case 'test':
                case 'reg':
                case 'add':
                case 'run':
                case 'go':
                    console.log('JVD key string cannot be reged : ' + itemName)
                    return
                default: 
                    this[itemName] = (...params)=>{
                        _this._params[itemName] = params
                        return _this
                    }
                    _this._implements[itemName] = implement 
                    break;
            }
        }
    }
    this.add =  this.reg

    this.test = this.run = this.go = ()=>{}

    this.isString = ()=>{
     
        return this
    }

    this.isNumber = ()=>{
        return this
    }
    this.isInteger =()=>{}

    this.isFunction = ()=>{}
    this.isJson = ()=>{}
    this.isArray = ()=>{}
    this.isRegExp = ()=>{}
    this.required = ()=>{}
    this.nullable = ()=>{}
    this.not = ()=>{}
    this.or = ()=>{}
    this.anything = ()=>{}
    this.pattern = this.match= ()=>{}
    this.greaterThan=()=>{}
    this.litterThan = ()=>{}
    this.between = this.range = ()=>{}
    this.oneOf = this.in= ()=>{}
    this.equils = this.toBe = this.is = ()=>{}

    return this
}


module.exports = () => {  return new JVD()}