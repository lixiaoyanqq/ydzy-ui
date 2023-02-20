/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 16:03:16
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-10 17:37:33
 */
import { series } from 'gulp'
import { publish } from './index'
console.log('1')
export default series(
  async () => publish()
)


