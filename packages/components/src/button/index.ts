/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 09:54:33
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-10 15:56:37
 */
import button from './button.vue'
import type {App,Plugin} from "vue"
// import { withInstall } from '@ydzy-ui/utils'

// const Button = withInstall(button)
// export default Button
type SFCWithInstall<T> = T&Plugin
const withInstall = <T>(comp:T) => {
    (comp as SFCWithInstall<T>).install = (app:App)=>{
        //注册组件
        app.component((comp as any).name,comp)
    }
    return comp as SFCWithInstall<T>
}
const Button = withInstall(button)
export default Button