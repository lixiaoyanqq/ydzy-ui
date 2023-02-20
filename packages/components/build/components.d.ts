/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 17:58:12
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-10 18:01:42
 */
import cpy from 'cpy'
import { resolve } from 'path'

const sourceDir = resolve(__dirname, '../src')
//lib文件
const targetLib = resolve(__dirname, '../lib')
//es文件
const targetEs = resolve(__dirname, '../es')
console.log(sourceDir);

const buildLess = async () => {
  await cpy(`${sourceDir}/**/*.less`, targetLib)
  await cpy(`${sourceDir}/**/*.less`, targetEs)
}

buildLess()