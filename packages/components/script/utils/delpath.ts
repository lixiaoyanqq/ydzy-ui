/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 17:15:37
 * @LastEditors: dbkey
 * @LastEditTime: 2023-03-01 17:38:21
 */
import fs from 'fs'
import { resolve } from 'path'
import { componentPath } from './paths'
const stayFile = ['package.json', 'README.md']

const delPath = async (path: string) => {
  let files: string[] = [];

  if(fs.existsSync(path)) {
    files = fs.readdirSync(path);

    files.forEach(async (file) => {
      let curPath = resolve(path, file)

      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        if (file != "node_modules") await delPath(curPath);
      } else {
        // delete file
        if(!stayFile.includes(file)) fs.unlinkSync(curPath);
      }
    })
    if (path != `${componentPath}/ydzy-ui`) {
      fs.rmdirSync(path)
    }
  }
}
export default delPath