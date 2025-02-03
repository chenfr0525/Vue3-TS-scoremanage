export const setLocalStorage = (
  key:string,
  value?:string,
  hours?:number
)=>{
  value = JSON.stringify(value)
  if(!value){
    localStorage.removeItem(key)
  }else{
    let Hours = hours ||24;
    let exp = new Date();
    localStorage[key]=JSON.stringify({
      value,
      expires:exp.getTime()+Hours*1000*60*60
    })
  }
}
export const getLocalStorage = (key:string)=>{
  try{
    let ls = JSON.parse(localStorage[key]);
    if(!ls || ls.expires<Date.now()){
      return ""
    }else{
      return JSON.parse(ls.value)
    }
  }catch(e){
    return localStorage[key]
  }
}