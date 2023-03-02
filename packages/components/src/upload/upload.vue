<!--
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-20 17:04:07
 * @LastEditors: dbkey
 * @LastEditTime: 2023-03-02 10:34:11
-->
<template>
  <div class="multipartUpload">
    <el-upload
      action=""
      :class="hideClass ? 'hide' : ''" 
      :list-type="listType"
      v-model:file-list="fileList"
      :on-success="onSuccess"
      :limit="limit"
      :accept="accept"
      :on-error="onError"
      :materialName="materialName"
      :before-upload="onBeforeUpload"
      :disabled="disabled"
      :on-progress="onProgress">
      <el-icon v-show="materialName===''">
        <Plus />
      </el-icon>
      <el-button v-show="materialName!==''" :disabled="disabled">{{materialName}}</el-button>
      <template #file="{ file }" v-if="listType == 'picture-card'">
        <div>
          <img v-if="file.type == 'image'" class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <audio v-else-if="file.type == 'audio'" class="audio" width="50" controls :src="file.url" />
          <video v-else-if="file.type == 'video'" width="146" height="146" muted controls>
            <source :src="file.url">
          </video>
          <img v-else :src="file.url" alt="" class="el-upload-list__item-img">
          <span class="el-upload-list__item-actions" v-if="file.type == 'image'">
            <span class="el-upload-list__item-preview" @click="onPreview(file)">
              <el-icon>
                <zoom-in />
              </el-icon>
            </span>
            <span class="el-upload-list__item-delete" @click="onDownload(file)">
              <el-icon>
                <Download />
              </el-icon>
            </span>
            <span class="el-upload-list__item-delete" @click="onRemove(file)">
              <el-icon>
                <Delete />
              </el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img style="width: 100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
  <div>
    122
  </div>
</template>
<script lang="ts" setup>
import md5 from "js-md5";
import './style/index.less'
import { defineComponent, computed, useSlots, watch, ref, defineProps } from 'vue'
import { Plus, Download, Delete, ZoomIn } from '@element-plus/icons-vue'
import { uploadProps } from './types'
import { mediaAllChunkUpload, mediaChunkUpload,mediaUp, mediaUpByPiece } from './axios'

defineOptions({
  name: 'yd-upload',
});

// type UploadType = {
//   listType?: {
//     type: String,
//     default: 'picture-card',
//   }
  
//   limit?: 999,
//   accept?: String,
//   materialName?: String,
//   tag?:'medias',
//   url?: String,
//   urlType?: String,
//   disabled?: false,
//   sourceMaterial?: false,
//   baseChatbotid?: String
// }

// const props = defineProps<UploadType>()
let props = defineProps({
  listType: { // 必传参数
    type: String,
    default: "picture-card",
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
  // -----------------------
});
const UploadType = ref('text')
const hideClass = ref(false);
let fileList: any = ref([]);
const pieceSize: any = ref(1);
const chunkName: any = ref("");
const gatherPromise: any = ref([]);
const chunkCount: any = ref("");
const dialogImageUrl: any = ref("");
const fileTyle: any = ref("");
const dialogVisible = ref(false);
let fileTypeName = ref("");
const emit = defineEmits(["input", "update:value"]);
const onProgress = (file: any) => {
}
const onBeforeUpload = (rawFile:any) =>{
  let mediaSize: any = ref(0)
  if(rawFile.size <= 0) {
    mediaSize.value = 1
  } else {
    mediaSize.value = rawFile.size / 1024 /1024
  }
  if(rawFile.type == "") {
    ElMessage.error("不支持此格式的文件上传");
    return;
  }
  fileTyle.value = rawFile.type.includes("image/")
    ? "image" : rawFile.type.includes("audio/")
    ? "audio" : rawFile.type.includes("video/")
    ? "video" : ""
  // ----------------------此区域判断素材类型是否符合要求
  fileTypeName.value = rawFile.name.split(".")[1]; // 获取文件
  // -------------------------区分文本文件还是媒体文件
  if (props.listType == 'picture-card' && !(fileTyle.value == "image" || fileTyle.value == "audio" || fileTyle.value == "video")) {
    return ElMessage({ message: "文件类型错误，请上传图片、音频、视频格式的文件", type: "error" });
  }

  // 判断图片素材格式区域
  if( fileTyle.value == "image" && !(fileTypeName.value == "jpg" || fileTypeName.value == "png" || fileTypeName.value == "jpeg") ) {
    ElMessage({ message: "只支持上传jpg/png/jpeg格式的图片", type: "error" })
    return;
  }

  if(fileTyle.value == "image" && mediaSize.value > 2) {
    ElMessage({ message: "图片大小不能超过2M，请重新上传", type: "error" });
    return;
  }

  // 判断音频素材格式区域
  if(fileTyle.value == "audio" && !(fileTypeName.value == "mp3" || fileTypeName.value == "amr" || fileTypeName.value == "m4a")) {
    ElMessage({ message: "只支持上传map3格式的音频", type: "error" });
    return;
  }

  if (fileTyle.value == "audio" && mediaSize.value > 5) {
    ElMessage({ message: "音频大小不能超过5M，请重新上传", type: "error" });
    return;
  }

  // 判断视频素材格式区域

  if(fileTyle.value == "video" && !(fileTypeName.value == "mp4" || fileTypeName.value == "webm")) {
    ElMessage({ message: "只支持上传map4格式的视频", type: "error" });
    return;
  }

  if(fileTyle.value == "video" && mediaSize.value > 10) {
    ElMessage({ message: "视频大小不能超过10M，请重新上传", type: "error" });
    return;
  }

  // ------------------------------------------
  let fileMD5 = ""; //  总文件列表
  const chunkSize = pieceSize.value * 1024 * 1024; //  1MB/片
  chunkCount.value = Math.ceil(rawFile.size / chunkSize); //  总片数
  if (chunkCount.value <= '0') {
    chunkCount.value = 1
  }
  const randomStr = getRanStr(); //随机字符串
  chunkName.value = randomStr + new Date().getTime(); //命名前缀
  gatherPromise.value = [];
  let fileRederInstance = new FileReader();
  fileRederInstance.readAsBinaryString(rawFile);
  fileRederInstance.addEventListener("load", (e) => {
    let fileBolb = e.target.result;
    fileMD5 = md5(fileBolb);
    //api发送formData整体情况包括:
    //fileMd5:md5文件
    //chunkCount:总片数
    //分片文件命名规范:chunkName
    let formData = {
      filename: rawFile.name,
      chunkName: chunkName.value,
      chunkTotal: chunkCount.value,
      fileMd5: fileMD5,
    };
    if(props.sourceMaterial) {
      mediaUp(JSON.stringify(formData)).then(data => {
        if(data.data.code) {
          readChunkMD5(chunkCount.value, rawFile, chunkSize);
        }
      })
    } else {
      mediaAllChunkUpload('uploadMeta', formData).then((data) => {
        if(data.data.code == '200') {
          //针对每个文件chunk处理
          //api请求返回判断是否有传过
          readChunkMD5(chunkCount.value, rawFile, chunkSize);
        }
      })
      
    }
  })
}
const onPreview = (file: any) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
}
const onRemove = (file: any) => {
  fileList.value.forEach((item: any, index) => {
    if (item.url == file.url) {
      fileList.value.splice(index, 1);
      isShowPlus();
      emit("input", fileList.value);
    }
  });
}
const onDownload = (file: any) => {
  let a = document.createElement("a");
  a.href = file.url;
  a.target = "_blank";
  a.download = file.name;
  a.click();
}
const onSuccess = (file: any) => {
  console.log('file',file)
}
const onError = (file: any) => {
  console.log('file',file)
}
const getRanStr = () => {
  const str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let len = str.length;
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += str.charAt(Math.floor(Math.random() * len));
  }
  return result;
}


const readChunkMD5 = (chunkCount: any, file: any, chunkSize: any) => {
  for (let i = 0; i < chunkCount; i++) {
    const { chunk, start, end } = getChunkInfo(file, i, chunkSize);
    uploadChunk({ chunk, currentChunk: i, file, chunkCount })
    //当所有的请求结果返回，收集并判断是否传完
    let allCode = [];
    let successData;
    Promise.all(gatherPromise.value).then(res => {
      res.forEach((item:any) => {
        if(item.hasOwnProperty('code')) {
          allCode.push(item.code)
          if(item.hasOwnProperty("data") && item.data != null) {
            successData = item.data;
          }
          if(item.code != '200') {
            ElMessage({ message: item.msg, type: "error" });
          }
        }
      })
      if (allCode.length === chunkCount && successData) {
        let fileData = {
          imgType: file.type,
          type: fileTyle.value,
          name: successData.filename,
          url: successData.mediaUrl,
          thumbnailUrl: successData.thumbnailUrl,
        }
        fileList.value.push(fileData);
        emit("input", fileList.value);
        isShowPlus();
      }
    })
  }
}
const isShowPlus = () => {
  if (fileList.value.length >= props.limit) {
    hideClass.value = true;
  } else {
    hideClass.value = false;
  }
}
const getChunkInfo = (file, currentChunk, chunkSize) => {
  let start = currentChunk * chunkSize;
  let end = Math.min(file.size, start + chunkSize);
  let chunk = file.slice(start, end);
  return { start, end, chunk };
}
const uploadChunk = (chunkInfo: any) => {
  let fetchForm = new FormData();
  fetchForm.append("file", chunkInfo.chunk);
  let serialNumber = formatNum(chunkInfo.currentChunk, 3);
  if (props.sourceMaterial) {
    let proms = new Promise((resolve, reject) => {
      mediaUpByPiece(
        fetchForm,
        chunkName.value,
        serialNumber,
        chunkInfo.chunk.size,
        props.tag,
        props.baseChatbotid,
        chunkInfo.file.name,
      )
    }).then(res => {
      resolve(res);
    }).catch(res => {
      reject(err);
    })
    gatherPromise.value.push(proms);
  } else {
    let proms = new Promise((resolve, reject) => {
      mediaChunkUpload("uploadChunk", fetchForm, chunkName.value, serialNumber, chunkInfo.chunk.size).then(data => {
        resolve(data.data);
      }).catch((err) => {
        reject(err);
      })
    })
    gatherPromise.value.push(proms);
  }
}
const formatNum = (num: any, type: any) => {
  let len = num.toString().length;
  while (len < type) {
    num = "0" + num;
    len++;
  }
  return num;
}


watch(
  () => {
    return props.url;
  },
  (newUrl, oldUrl) => {
    console.log('newUrl',newUrl)
    console.log('oldUrl',oldUrl)
    if (newUrl !== "") {
      fileList.value.length = 0;
      fileList.value.push({ url: newUrl, name: newUrl, type: props.urlType });
    }
  },
  {
    immediate: true,
  },
);

</script>
<style lang="scss" scoped>
.audio {
  margin-top: 44px;
  width: 146px;
}

:deep(.hide .el-upload--picture-card) {
  display: none;
}
</style>
