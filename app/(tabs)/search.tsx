import Loading from '@/components/Loading'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { fetchMovies } from "@/services/api"
import useFetch from '@/services/useFetch'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'


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
  const [searchQuery, setSearchQuery] = useState('');



  const fetchMoviesCallback = useCallback(() => fetchMovies({ query: searchQuery }), [searchQuery]);
  const {data: movies, loading, error, refetch:loadMovies} = useFetch(fetchMoviesCallback)
  useEffect(() => {
    const timoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      }else{
        setSearchQuery('')
      }
    }, 3000);
    return () => clearTimeout(timoutId);
  }, [searchQuery]);
  return (
    <View className='flex-1 bg-primary items-center justify-center '>
      {/* <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode='cover'
        /> */}

        {/* Logo and SearchBar moved outside the FlatList to avoid unmounting the input */}
        <View className='w-full flex-row justify-center mt-20 items-center'>
          <Image source={icons.logo} className='w-12 h-10' />
        </View>

        <View className='my-5 px-5 w-full'>
          <SearchBar
            value={searchQuery}
            onChangeText={(text: string) => setSearchQuery(text)}
            placeholder='search for movies ...'
          />
        </View>

        <FlatList
          data={movies}
          renderItem={({item})=> <MovieCard {...item}/>}
          keyExtractor={(item) => item.id.toString()}
          className='w-full px-5 mt-2'
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            gap: 16,
            marginVertical:16
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={() => (
            <>
              {loading && (
                <FlatList
                  alwaysBounceVertical={true}
                  data={Array(5).fill(0)}
                  keyExtractor={(_, i) => i.toString()}
                  renderItem={() => <Loading />}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  className="mt-2 pb-32"
                  contentContainerStyle={{ paddingBottom: 10 }}
                  ListHeaderComponent={() => (
                    <View className="px-5 py-5 mt-5">
                      <View className="w-full h-12 rounded-lg mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                      <View className="h-10 rounded w-2/3 mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
                      <View className="h-4 rounded w-1/4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
                    </View>
                  )}
                />
              )}
              {error && (
                <Text className='text-red-500 px-5'>Error: {error?.message}</Text>
              )}
              {!loading && !error && searchQuery.trim()&&movies?.length>0&&(
                <Text className='text-xl text-white font-bold'>Search results for {''}
                <Text className="text-accentText">{searchQuery}</Text>
                </Text>
              )}
            </>
          )}
          ListEmptyComponent={
            !loading && !error ? (
              <View>
                <Text>{searchQuery.trim()? "no movies found":'search for a movie'}</Text>
              </View>
            ):null
          }

        />
      
    </View>
  )
}

export default search