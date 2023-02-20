/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 13:51:53
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-10 17:26:41
 */

import { series, parallel } from 'gulp'
import { removeDist, buildStyle, buildComponent } from './index'
export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
)
)

// import { spawn } from 'child_process'
// import { series, src, dest, task, parallel } from 'gulp'
// import { componentPath } from '../utils/paths'
// import less from "gulp-less"
// import autoprefixer from 'gulp-autoprefixer'
// const run = async (command: string) => {
//     //cmd表示命令，args代表参数，如 rm -rf  rm就是命令，-rf就为参数
//     const [cmd, ...args] = command.split(' ')
//     return new Promise((resolve, reject) => {
//         const app = spawn(cmd, args, {
//             cwd: componentPath,//目录指的是组件库根目录
//             stdio: 'inherit', //输出共享给父进程
//             shell: true //mac不需要开启，windows下git base需要开启支持
//         })
//         //执行完毕关闭并resolve
//         app.on('close', resolve)
//     })
// }

// //处理样式
// const buildStyle = () => {
//   console.log('开始打包样式')
//     return src(`${componentPath}/src/**/style/**.less`)
//         .pipe(less())
//         .pipe(
//             autoprefixer()
//         )
//         .pipe(dest(`${componentPath}/dist/lib/src`))
//         .pipe(dest(`${componentPath}/dist/es/src`));
// };
// //打包组件
// const buildComponent = async () => {
//   await run(`cd ${componentPath}`)
//   run('pnpm run build')
// }

// export default series(
//   async () => run(`rm -rf ${componentPath}/dist`), 
//   parallel(
//     async () => buildStyle(),
//     async () => buildComponent()
//   )
  
// )
