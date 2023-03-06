/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-17 11:20:48
 * @LastEditors: dbkey
 * @LastEditTime: 2023-03-02 11:15:10
 */
import * as components from "../index"
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
      YdButton: typeof components.Button
      YdInput: typeof components.Input
      YdIcon: typeof components.Icon
      // YdUpload: typeof components.Upload
  }
}
export { }