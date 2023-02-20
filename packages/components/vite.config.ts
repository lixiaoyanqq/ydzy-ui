/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 10:10:16
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-17 11:54:17
 */


import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite';
export default defineConfig(
    {
        build: {
            target: 'modules',
            //打包文件目录
            outDir: "es",
            //压缩
            minify: false,
            //css分离
            cssCodeSplit: true,
            rollupOptions: {
                //忽略打包vue文件
                external: ['vue', /\.less/],
                input: ['src/index.ts'],
                output: [
                    {
                        format: 'es',
                        //不用打包成.es.js,这里我们想把它打包成.js
                        // entryFileNames: '[name].js',
                        entryFileNames: '[name].mjs',
                        //让打包目录和我们目录对应
                        preserveModules: true,
                        //配置打包根目录
                        // dir: 'es',
                        exports: 'named',
                        preserveModulesRoot: 'src',
                        //配置打包根目录
                        dir: resolve(__dirname, './ydzy-ui/es'),
                    },
                    {
                        format: 'cjs',
                        entryFileNames: '[name].js',
                        //让打包目录和我们目录对应
                        preserveModules: true,
                        //配置打包根目录
                        // dir: 'lib',
                        exports: 'named',
                        preserveModulesRoot: 'src',
                        dir: resolve(__dirname, './ydzy-ui/lib'),
                    }
                ]
            },
            emptyOutDir: false,
            lib: {
                entry: './index.ts',
                formats: ['es', 'cjs'],
                name: 'ydzy',
            }
        },
        plugins: [
            vue(),
            DefineOptions(),
            dts({
              outputDir: [
                resolve(__dirname, './ydzy-ui/es/src'),
                resolve(__dirname, './ydzy-ui/lib/src')
              ],
              //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
              tsConfigFilePath: '../../tsconfig.json'
            }),
            //因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
            dts({
              outputDir: resolve(__dirname, './ydzy-ui/lib/src'),
              tsConfigFilePath: '../../tsconfig.json'
            }),
            {
              name: 'style',
              generateBundle(config, bundle) {
                //这里可以获取打包后的文件目录以及代码code
                const keys = Object.keys(bundle)
                for(const key of keys) {
                  const bundler: any = bundle[key as any]
                  //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件
                  this.emitFile({
                    type: 'asset',
                    fileName: key,//文件名名不变
                    source: bundler.code.replace(/\.less/g, '.css')
                  })
                }
              }
            }
        ],
        resolve: {
          alias: {
            '@': resolve(__dirname, 'src'),
          }
        },
        test: {
          environment: "happy-dom"
        },
    }
)

