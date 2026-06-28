
import Taro from '@tarojs/taro'

type ShareOptions = {
  title?: string
  path?: string
  imageUrl?: string
}

export const defaultShareConfig = {
  title: '家长工具库 - 陪伴孩子成长每一步',
  path: '/pages/index/index',
  imageUrl: ''
}

export function useShare(options?: ShareOptions) {
  const shareConfig = {
    title: options?.title || defaultShareConfig.title,
    path: options?.path || defaultShareConfig.path,
    imageUrl: options?.imageUrl || defaultShareConfig.imageUrl
  }

  const onShareAppMessage = () =&gt; {
    return {
      title: shareConfig.title,
      path: shareConfig.path,
      imageUrl: shareConfig.imageUrl
    }
  }

  const onShareTimeline = () =&gt; {
    return {
      title: shareConfig.title,
      query: '',
      imageUrl: shareConfig.imageUrl
    }
  }

  return {
    onShareAppMessage,
    onShareTimeline
  }
}

