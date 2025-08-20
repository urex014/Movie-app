import React from 'react'
import { View } from 'react-native'

const Loading = () => {
  return (
    <View className="w-[30%] mb-4">
      <View className="w-full h-52 bg-gray-700 backdrop-blur-md rounded-lg mb-2 animate-pulse" />
      <View className="h-3 bg-gray-700 rounded backdrop-blur-md w-3/4 mb-2 animate-pulse" />
      <View className="h-2 bg-gray-700 rounded backdrop-blur-md w-1/2 mb-1 animate-pulse" />
      <View className="h-2 bg-gray-700 rounded backdrop-blur-md w-1/4 animate-pulse" />
    </View>
  )
}

export default Loading