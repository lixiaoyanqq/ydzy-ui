/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 17:09:04
 * @LastEditors: dbkey
 * @LastEditTime: 2023-03-01 17:45:17
 */
import delPath from '../utils/delpath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from '../utils/paths';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import run from '../utils/run';

//删除ydzy-ui
export const removeDist = () => {
  return delPath(`${pkgPath}/ydzy-ui`);
};

//打包样式
export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${pkgPath}/ydzy-ui/lib/src`))
    .pipe(dest(`${pkgPath}/ydzy-ui/es/src`));
}

//打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath);
};

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);

// import { src, dest } from 'gulp'
// import { componentPath } from '../utils/paths'
// import less from "gulp-less"
// import autoprefixer from 'gulp-autoprefixer'
// import delpath from "../utils/delpath"
// import run from '../utils/run'

// //删除dist
// export const removeDist = () => {
//   return delpath(`${componentPath}/ydzy-ui`)
// }

// //处理样式
// export const buildStyle = () => {
//   return src(`${componentPath}/src/**/style/**.less`)
//     .pipe(less())
//     .pipe(
//       autoprefixer()
//     )
//     .pipe(dest(`${componentPath}/ydzy-ui/lib/src`))
//     .pipe(dest(`${componentPath}/ydzy-ui/es/src`));
// };

// //打包组件
// export const buildComponent = async () => {
//   run('pnpm run build',componentPath)
// }
