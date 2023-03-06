/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-08 18:21:23
 * @LastEditors: dbkey
 * @LastEditTime: 2023-03-02 11:54:35
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite';

export default defineConfig({
    plugins:[vue(), DefineOptions()]
})
