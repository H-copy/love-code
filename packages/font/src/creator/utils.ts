let cmpCount = 0

/**
 * 组件唯一标识
 * @returns 
 */
export const getCmpMark = () => {
  cmpCount += 1
  return `${cmpCount}`
}

