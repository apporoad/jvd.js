const utils = require('lisa.utils')

function JVD(initData){
    _this = this
    _this._implements = {}
    _this._params = {}
    _this.reg = (itemName, implement)=>{
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
                    _this[itemName] = (...params)=>{
                        _this._params[itemName] = params
                        return _this
                    }
                    _this._implements[itemName] = implement 
                    break;
            }
        }
    }
    _this.add =  _this.reg

    _this.test = _this.run = _this.go = ()=>{}

    _this.isString = ()=>{
     
        return _this
    }

    _this.isNumber = ()=>{
        return _this
    }
    _this.isInteger =()=>{}

    _this.isFunction = ()=>{}
    _this.isJson = ()=>{}
    _this.isArray = ()=>{}
    _this.isRegExp = ()=>{}
    _this.required = ()=>{}
    _this.nullable = ()=>{}
    _this.not = ()=>{}
    _this.or = ()=>{}
    _this.anything = ()=>{}
    _this.pattern = _this.match= ()=>{}
    _this.greaterThan=()=>{}
    _this.litterThan = ()=>{}
    _this.between = _this.range = ()=>{}
    _this.oneOf = _this.in= ()=>{}
    _this.equils = _this.toBe = _this.is = ()=>{}

    return _this
}


module.exports = () => {  return new JVD()}