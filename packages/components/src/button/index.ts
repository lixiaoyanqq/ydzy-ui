/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 09:54:33
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-22 11:57:00
 */
import button from './button.vue'
import type {App,Plugin} from "vue"
import  withInstall from '@ydzy-ui/utils/withinstall'

const Button = withInstall(button)
export default Button