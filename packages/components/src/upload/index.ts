/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-20 17:04:25
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-22 11:56:45
 */
import upload from './upload.vue'
import type {App,Plugin} from "vue"
import withInstall from '@ydzy-ui/utils/withinstall'

const Upload = withInstall(upload)
export default Upload