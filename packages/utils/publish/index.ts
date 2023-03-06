/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-03-06 11:23:44
 * @LastEditors: dbkey
 * @LastEditTime: 2023-03-06 14:13:22
 */
import run from '../../components/script/utils/run';
// import { pkgPath } from '../../../utils/paths'
// import { pkgPath } from '../../components/script/utils/paths'
import { series } from 'gulp';
export const publishComponent = async () => {
  run('release-it', `.`);
};
export default series(async () => publishComponent());
