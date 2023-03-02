/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 15:34:27
 * @LastEditors: dbkey
 * @LastEditTime: 2023-03-01 17:20:12
 */
import type { App, Plugin } from 'vue';
export type SFCWithInstall<T> = T & Plugin
export default <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
    // 所以要加上这个条件
    const name = (comp as any).name || (comp as any).__name
    app.component(name, comp as SFCWithInstall<T>)
  }
  return comp as SFCWithInstall<T>
}