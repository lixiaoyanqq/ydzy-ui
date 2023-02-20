/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-08 18:21:23
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-17 13:40:30
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite';

export default defineConfig({
    plugins:[vue(), DefineOptions()]
})
