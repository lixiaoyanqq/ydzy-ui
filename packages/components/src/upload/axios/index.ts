/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-22 14:48:09
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-22 16:26:49
 */
import axios from 'axios'
const requestParams = 'msg/manager/v1'
const baseUrl = "https://csp.bjydzy.com:48083"
const mediaBaseUrl = "https://csp.bjydzy.com:48083"
const mediaRequestParams = "msg/md"
export const mediaAllChunkUpload = (opType: any, data: object) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/${requestParams}/mediaChunkUpload?reqType=${opType}`,
    data: data
  })
}

export const mediaChunkUpload = (opType: any, data: object, chunkName: any, serialNumber: any, chunkSize: any) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/${requestParams}/mediaChunkUpload?reqType=${opType}&chunkName=${chunkName}&chunkNum=${serialNumber}&chunkSize=${chunkSize}`,
    data: data
  })
}

export const mediaUp = (data:any) => {
  return axios({
    method: 'post',
    url: `${mediaBaseUrl}/${mediaRequestParams}/uploadChunkMeta`,
    data: data
  })
}

export const mediaUpByPiece = (data: object, chunkName: any, serialNumber: any, chunkSize: any,tag:any, appId: string, filename:any) => {
  return axios({
    method: 'post',
    url: `${mediaBaseUrl}/${mediaRequestParams}/uploadChunk?filename=${filename}&tag=${tag}&chunkName=${chunkName}&chunkNum=${serialNumber}&chunkSize=${chunkSize}&appId=${appId}`,
    data: data
  })
}