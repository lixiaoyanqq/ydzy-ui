<!--
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-08 18:37:01
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-17 13:44:33
-->
<template>
    <!-- <button>测试按钮</button> -->
    <button class="yd-button" :class="styleClass">
        <!-- <Icon /> -->
        <span class="yd-button-text" v-if="slots.default">
            <slot />
        </span>
        <!-- <Icon /> -->
    </button>
</template>
<script lang="ts">
import './style/index.less'
import { defineComponent, computed, useSlots } from 'vue'
import { buttonProps } from './types'
import Icon from '../icon/icon.vue'

export default defineComponent({
    name: 'yd-button',
    props: buttonProps,
    components: { Icon },
    setup(props) {
        console.log('props',props)
        const styleClass = computed(() =>{
            return {
                [`yd-button--${props.type}`]: props.type,
                'is-plain': props.plain,
                'is-round': props.round,
                'is-disabled': props.disabled,
                [`yd-button--${props.size}`]: props.size,
            }
        }) 
        const iconFont = computed(() => {
            const iconName = props.icon
            const position = props.iconPosition
            return {
                iconName,
                position
            }
        })
      const slots = useSlots() 
      return {
            styleClass,
            Icon,
            iconFont,
            slots
        };
    }
})
</script>