
declare class TransInfo{
  /**
   * 转换成功数量
   */
  succuss: Number

  /**
   * 转换失败数量
   */
  fail : Number
}
/**类声明*/
declare class JVD{

    /**
     * 字符串表达式转换结果，用于判断字符串是否可以转换为jvd
     */
    transInfo : TransInfo
    
    /**
     * 注册新验证到JVD对象
     * jvd.reg('hello', (data,options,yourParam) => { }
     * jvd.hello('hi')
     * @param itemName 方法名
     * @param implement 实现方法，可以同步，可以异步
     */
    reg(itemName : string, implement : Function)
    
    /**
     * 同reg
     * @param itemName 
     * @param implement 
     */
    add(itemName: string , implement :Function)

    /**
     * 执行验证方法
     * @param data 需要验证的数据
     * @param options 扩展使用的options
     */
    test(data:any,options:Object) :Boolean
    
    /**
     * 同test
     * @param data 
     * @param options 
     */
    run(data:any,options:Object) :Boolean

    /**
     * 同test
     * @param data 
     * @param options 
     */
    go (data:any,options:Object) :Boolean

    /**
     * 是否是JVD，永远返回true
     */
    isJVD() : Boolean

    /**
     * 取反，对后一个的验证节点起效
     * not().gt(1)  同 小于等于1
     */
    not(): JVD

    /**
     * 或操作
     */
    or() : JVD

    /**
     *   is  instance of  string
     *  是否是字符串
     */
     isString() : JVD

     /**
      *  is instance  of number
      *  是否是数字
      */
    isNumber():JVD

    /**
     *  is instance of int
     *  是否为整数
     */
    isInteger():JVD
    
    /**
     * is a function ( include sync and async)
     * 是否是函数（包括同步和异步）
     */
    isFunction():JVD

    /**
     * is a sync function
     * 是否是同步函数
     */
    isSyncFunction():JVD

    /**
     * is an async function
     * 是否是异步函数
     */
    isAsyncFunction():JVD

    /**
     * 是否是JSON
     */
    isJSON():JVD

    isArray():JVD

    isRegExp():JVD

    /**
     *  is required ， not empty 
     *  是否必填
     */
    required():JVD

    /**
     *  is anything but not empty (just like required)
     *  同required
     */
    anything():JVD

    /**
     * 是否满足正则
     * @param regex 正则表达式
     */
    pattern(regex : RegExp):JVD

    /**
     * 是否满足正则 同pattern
     * @param regex 正则表达式
     */
    match(regex : RegExp):JVD

    /**
     * short for greater than
     * @param value 
     * @param greaterFn 可空，比较函数
     */
    gt(value , greaterFn? :Function): JVD

    greaterThan(value, greaterFn? : Function) :JVD

    /**
     * short for litter than
     * @param value 
     * @param greaterFn 可空，比较函数
     */
    lt(value ,greaterFn? : Function) : JVD

    litterThan(value:number,greaterFn? : Function) :JVD

    /**
     * between low and high
     * @param low 最小值
     * @param high 最大值
     * @param greaterFn 可空，比较函数
     */
    between(low :number , high : number,greaterFn? : Function):JVD

    /**
     * between low and high
     * @param low 最小值
     * @param high 最大值
     * @param greaterFn 可空，比较函数
     */
    range(low :number , high : number,greaterFn? : Function):JVD

    /**
     * one of Array
     * @param array 
     * @param compareFn 可空，比较函数
     */
    oneOf(array : Array,compareFn? : Function): JVD

    /**
     * one of Array
     * @param array 
     * @param compareFn 可空，比较函数
     */
    in(array : Array,compareFn? : Function): JVD

    /**
     * 是否相等
     * @param value 
     * @param compareFn 可空，比较函数
     */
    equils(value, compareFn?:Function):JVD

    /**
     * 是否相等
     * @param value 
     * @param compareFn 可空，比较函数
     */
    toBe(value, compareFn?:Function):JVD

    /**
     * 是否相等
     * @param value 
     * @param compareFn 可空，比较函数
     */
    is(value, compareFn?:Function):JVD

    /**
     * 空实现，根据传值判断是否返回true，不传值返回true
     * @param value 
     */
    $(value? : Boolean):JVD
}

declare function JVD(s:string): JVD

export = JVD

// declare namespace JVD {
// 	interface Options {
// 		/**
// 		Set to `false` to avoid spawning subprocesses and instead only resolve the locale from environment variables.
// 		@default true
// 		*/
// 		readonly spawn?: boolean;
// 	}
// }

// declare const JVD: {
// 	/**
// 	@returns The locale.
// 	@example
// 	```
// 	const locale = require('locale.js');
// 	locale.set(['demo','real'])
	
// 	console(locale('demo'))
// 	console(locale.get('demo'))
// 	```
// 	*/
// 	(str:string,lang?: string): JVD;


// 	/**
// 	 * get locale string
// 	 * 获取本地化（国际化）字符
// 	 * @param str 原始字符
// 	 * @param lang 语言
// 	 @returns The locale string.
// 	 */
// 	isString(str:string,lang?: string): JVD;

// 	/**
// 	 * add locale map to cache 
// 	 * 添加国际化支持
// 	 * @param arrayOrJson 数组或者json
// 	 * @param lang  语言
// 	 */
// 	isNumber(arrayOrJson , lang?: string) :JVD ;

// };

// export = JVD;