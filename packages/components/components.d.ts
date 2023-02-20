/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-17 11:20:48
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-17 11:21:33
 */
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
      yButton: typeof import('ydzy-ui').Button
      yInput: typeof import('ydzy-ui').Input
  }
}
export { }