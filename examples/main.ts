/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-08 18:16:41
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-17 13:44:03
 */
import {createApp} from 'vue'
import App from './app.vue'
// import 'ydzy-ui/es/style.less'

const app = createApp(App)

import ydzyui from "ydzy-ui"
import { Button } from 'ydzy-ui'
app.use(ydzyui)
// app.use(Button)

app.mount('#app')