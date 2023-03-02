<!--
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-10 14:58:26
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-28 13:48:03
-->
<template>
    <div class="ydzy-icon">
        <svg class="icon" :style="iconColor" aria-hidden="true">
            <use :xlink:href="iconName"></use>
        </svg>
        <div v-if="dot" class="ydzy-info" :class="styleDot">{{ badge }}</div>
    </div>
</template>
<script lang="ts">
import './style/index.less'
import { defineComponent, computed, onMounted } from 'vue'
import { iconProps } from './types'

export default defineComponent({
    name: 'yd-icon',
    props: iconProps,
    setup(props) {
        onMounted(() => {
            import('./font/iconfont.js' as any)
        })
        const iconName = computed(() => {
            return `#ydzy-${props.name}`
        })
        const styleDot = computed(() => {
            return {
                [`ydzy-dot`]: props.dot && !props.badge
            }
        })
        const badge = computed(() => {
            return props.badge
        })
        const iconColor = computed(() => {
            return {
                color: props.color
            }
        })
        return {
            iconName,
            styleDot,
            badge,
            iconColor
        }
    }
})
</script>