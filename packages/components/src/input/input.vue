<template>
  <div class="yd-textarea" v-if="attrs.type === 'textarea'">
    <textarea
      class="yd-textarea__inner"
      :style="textareaStyle"
      v-bind="attrs"
      ref="textarea"
      :value="inputProps.modelValue"
      @input="changeInputVal">

    </textarea>
  </div>
  <div 
    v-else 
    class="yd-input"
    @mouseenter="isEnter = true"
    @mouseleave="isEnter = false"
    :class="styleClass">
    <div class="yd-input__prepend" v-if="slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <input 
      ref="ipt"
      class="yd-input__inner"
      :class="inputStyle"
      :disabled="inputProps.disabled"
      v-bind="attrs"
      :value="inputProps.modelValue"
      @input="changeInputVal" />
    <div class="yd-input__append" v-if="slots.append">
      <slot name="append"></slot>
    </div>
    <div 
      @click="clearValue" 
      v-if="inputProps.clearable && isClearAbled"
      v-show="isEnter"
      class="yd-input__suffix">
      <Icon name="error" />
    </div>
    <div class="yd-input__suffix" v-show="isShowEye">
        <Icon @click="changeType" :name="eyeIcon" />
    </div>
    <div class="yd-input__prefix" v-if="isShowPrefixIcon">
        <Icon :name="inputProps.prefixIcon" />
    </div>
    <div class="yd-input__suffix no-cursor" v-if="isShowSuffixIcon">
        <Icon :name="inputProps.suffixIcon" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import './style/index.less'
import { useAttrs, computed, ref, nextTick, shallowRef, watch, useSlots } from 'vue'
import Icon from '../icon/index'
import { calcTextareaHeight } from './utils'
import { isObject } from '@ydzy-ui/utils'

defineOptions({
  name: 'yd-input'
})
//双向数据绑定&接收属性
type AutosizeObj = {
    minRows?: number
    maxRows?: number
}

type InputProps = {
    modelValue?: string | number
    disabled?: boolean
    size?: string
    clearable?: boolean
    showPassword?: boolean
    prefixIcon?: string
    suffixIcon?: string
    autosize?: boolean | AutosizeObj
}

type InputEmits = {
    (e: 'update:modelValue', value: string): void
    (e: 'change', value: string): void
}

const inputProps = withDefaults(defineProps<InputProps>(), {
  modelValue: ''
})

const isClearAbled = ref(false)
const inputEmits = defineEmits<InputEmits>()

const changeInputVal = (event:Event) => {
  //可清除clearable
  (event.target as HTMLInputElement).value ? isClearAbled.value = true : isClearAbled.value = false
    inputEmits('change', (event.target as HTMLInputElement).value)
    inputEmits("update:modelValue", (event.target as HTMLInputElement).value)

}

//将yd-input的属性全部赋予Input组件
const attrs = useAttrs()
//根据props更改类名

const styleClass = computed(() => {
  return {
    'is-disabled': inputProps.disabled,
    [`yd-input--${inputProps.size}`]: inputProps.size,
    ['yd-input-group yd-input-prepend']: slots.prepend,
    ['yd-input-group yd-input-append']: slots.append
  }
})

const inputStyle = computed(() => {
    return {
        ['yd-input--prefix']: isShowPrefixIcon.value,
    }
})

//清除input value
const isEnter = ref(true)
const clearValue = () => {
    inputEmits("update:modelValue", '')
}

//显示隐藏密码框 showPassword
const ipt = ref()
Promise.resolve().then(() => {
  if (inputProps.showPassword) {
    ipt.value.type = "password"
  }
})
const eyeIcon = ref('browse')

const isShowEye = computed(() => {
    return inputProps.showPassword && inputProps.modelValue && !inputProps.clearable
})

const changeType = () => {
    if (ipt.value.type === "password") {
        eyeIcon.value = 'eye-close'
        ipt.value.type = attrs.type || 'text'
        return
    }
    ipt.value.type = 'password'
    eyeIcon.value = 'browse'
}

//带Icon输入框
const isShowSuffixIcon = computed(() => {
    return inputProps.suffixIcon && !inputProps.clearable && !inputProps.showPassword
})
const isShowPrefixIcon = computed(() => {
    return inputProps.prefixIcon
})

//textarea
const textareaStyle = ref<any>()
const textarea = shallowRef<HTMLTextAreaElement>()
watch(() => inputProps.modelValue, () => {
    if (attrs.type === 'textarea' && inputProps.autosize) {
        const minRows = isObject(inputProps.autosize) ? (inputProps.autosize as AutosizeObj).minRows : undefined
        const maxRows = isObject(inputProps.autosize) ? (inputProps.autosize as AutosizeObj).maxRows : undefined
        nextTick(() => {
            textareaStyle.value = calcTextareaHeight(textarea.value!, minRows, maxRows)
        })
    }

}, { immediate: true })

//复合输入框
const slots = useSlots()
</script>