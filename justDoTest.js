
it = (title , fn) =>{
    // if(fn)
    //   fn()
  }
expect = ()=>{
return {
    toBe : ()=>{},
    toBeTruthy :()=>{}  
  }
}

global.debug = (title,fn)=>{
  if(fn)
    fn()
}
require('./test')