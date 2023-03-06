/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-03-02 11:22:34
 * @LastEditors: dbkey
 * @LastEditTime: 2023-03-02 11:22:42
 */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
}