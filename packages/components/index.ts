/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-08 18:26:46
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-10 15:57:12
 */
import components from './src/'
export * from './src/index'
import { App } from 'vue'
export default {
    install: (app: App) => {
        components.forEach(c => app.use(c));
    }
}
