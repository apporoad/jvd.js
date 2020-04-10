const utils = require('lisa.utils')
function JVD() {
    var _this = this
    this._implements = {}
    this._queue = []
    this.reg = (itemName, implement) => {
        if (itemName && (utils.Type.isFunction(implement) || utils.Type.isAsyncFunction(implement))) {
            switch (itemName) {
                case 'test':
                case 'reg':
                case 'add':
                case 'run':
                case 'go':
                case 'or':
                case 'not':
                    console.log('JVD key string cannot be reged : ' + itemName)
                    return
                default:
                    this[itemName] = (...args) => {
                        _this._queue.push({
                            item: itemName,
                            params: args,
                            type: 'validator'
                        })
                        return _this
                    }
                    _this._implements[itemName] = implement
                    break;
            }
        }
    }
    this.add = this.reg

    this.test = this.run = this.go = async (data,options) => {
        var trueOrFalse = true
        for (var i = 0; i < _this._queue.length; i++) {
            var pre = i == 0 ? null : _this._queue[i - 1]
            var current = _this._queue[i]
            var next = i + 1 >= _this._queue.length ? null : _this._queue[i + 1]
            if (current.type == 'validator') {
                var params = [data,options].concat(current.params)
                var result = await Promise.resolve(_this._implements[current.item].apply(_this, params))
                if (result == null) {
                    continue
                } else if (result) {
                    if (pre && pre.type == 'operation' && pre.item == 'not') {
                        trueOrFalse = false
                        if (next && next.type == 'operation' && next.item == 'or') {
                            continue
                        } else {
                            break
                        }
                    } else {
                        trueOrFalse = true
                        if (next && next.type == 'operation' && next.item == 'or') {
                            break
                        }
                        else {
                            continue
                        }
                    }
                } else {
                    if (pre && pre.type == 'operation' && pre.item == 'not') {
                        trueOrFalse = true
                        if (next && next.type == 'operation' && next.item == 'or') {
                            break
                        }
                        else {
                            continue
                        }
                    } else {
                        trueOrFalse = false
                        if (next && next.type == 'operation' && next.item == 'or') {
                            continue
                        } else {
                            break
                        }
                    }
                }
            } else {
                continue
            }
        }
        return trueOrFalse
    }

    this.isJVD = ()=>{return true}
    
    this.not = () => {
        _this._queue.push({
            item: 'not',
            type: 'operation'
        })
        return _this
    }
    this.or = () => {
        _this._queue.push({
            item: 'or',
            type: 'operation'
        })
        return _this
    }

    return this
}

module.exports = JVD