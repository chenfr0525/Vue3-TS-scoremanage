import { type PiniaPluginContext } from "pinia";
import { toRaw } from "vue";

const __pininaKey='_PINIAKEY_'

type Options={
  key?:string
}

const setStorage=(key:string,value:any):void=>{
  localStorage.setItem(key,JSON.stringify(value))
}

const getStorage=(key:string)=>{
  return (localStorage.getItem(key)? JSON.parse(localStorage.getItem(key) as string) : {})
}

const piniaPlugin=(options:Options)=>{
  return (context:PiniaPluginContext)=>{
    const {store}=context
    const data=getStorage(`${options?.key??__pininaKey}-${store.$id}`)

    store.$subscribe(()=>{
      setStorage(`${options?.key??__pininaKey}-${store.$id}`,toRaw(store.$state))
    })

    return {
      ...data
    }
  }
}

export default piniaPlugin

