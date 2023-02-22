/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 09:23:49
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-21 16:07:05
 */


import { ExtractPropTypes } from 'vue'

export const uploadProps = {
  listType: {
    type: String,
    default: 'picture-card'
  },
  limit: {
    type: Number,
    default: 999,
  },
  accept: {
    type: String,
    default: "",
  },
  materialName: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default() {
      return 'medias'
    }
  },
  url: {
    type: String,
    default: "",
  },
  urlType: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default() {
      return false;
    },
  },
  //-------------- 区分素材库接口和普通分片上传接口
  sourceMaterial: {
    type: Boolean,
    default() {
      return false;
    },
  },
  baseChatbotid: {
    type: String,
    default: "",
  },
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>