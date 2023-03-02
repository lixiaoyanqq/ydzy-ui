/*
 * @Descripttion: 
 * @version: 
 * @Author: dbkey
 * @Date: 2023-02-28 13:34:01
 * @LastEditors: dbkey
 * @LastEditTime: 2023-02-28 13:37:16
 */
import { ExtractPropTypes } from 'vue'
export const iconProps = {
    name: {
        type: String
    },
    dot: {
        type: Boolean
    },
    badge: {
        type: String
    },
    color: {
        type: String
    }
}
export type IconProps = ExtractPropTypes<typeof iconProps>