
/**类声明*/
declare class JVD{

     isString() : JVD
    isNumber():JVD
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