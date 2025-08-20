import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'

interface List{
  id:number
  name:string
  age:number
}

const list:List[]=[
  {
    id:1,
    name:"first",
    age:29
  },
  {
    id:2,
    name:"second",
    age:29
  },
  {
    id:3,
    name:"third",
    age:29
  },
  {
    id:4,
    name:"fifth",
    age:29
  }
]
const search = () => {
  return (
    <View className='flex-1 bg-primary items-center justify-center '>
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode='cover'
        />

        {/* <FlatList data={movies} renderItem={({item}) => <MovieCard {...item } />} */}

        {/* /> */}
      
    </View>
  )
}

export default search