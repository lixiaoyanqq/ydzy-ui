/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-08 18:26:46
 * @LastEditors: dbkey
 * @LastEditTime: 2023-03-02 11:16:17
 */
import * as components from './src/index'
console.log('components',components)
export * from './src/index'
import { App } from 'vue'
export default {
    install: (app: App) => {
        // components.forEach(c => app.use(c));
        for (const c in components) {
            app.use(components[c]);
        }
    }
}
