import { SET_APPKEYS, SAVE_LAYOUT } from '../constants/config'

export const registerApp = (appKeys, instance) => ({
  type : SET_APPKEYS,
  appKeys,
  instance
})

export const saveLayout = (layout) => ({
  type: SAVE_LAYOUT,
  layout
})