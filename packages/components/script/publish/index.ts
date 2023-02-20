/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 17:09:25
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-17 11:25:45
 */
import { componentPath, pkgPath } from '../utils/paths'
import run from '../utils/run'
import { src, dest } from 'gulp'
//复制
const copypackage = async () => {
  console.log('2','复制')
  return src(`${pkgPath}/transitpkg/**`).pipe(dest(`${componentPath}/ydzy-ui/`));
};

//发布组件
export const publish = async () => {
  //先给transitpkg升个版本
  console.log('3','发布')
  await run('pnpm version patch', `${pkgPath}/transitpkg`)
  //复制到dist目录
  console.log('4','制到dist目录')
  await copypackage()
  //在dist下执行发布命令
  console.log('5','在dist下执行发布命令')
  await run('npm publish --access=public', `${componentPath}/ydzy-ui`)
  // run('pnpm publish')

}