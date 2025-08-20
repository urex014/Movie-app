import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useCallback, useState } from 'react';
import { FlatList, Image, ScrollView, Text, View } from "react-native";




export default function Index() {
  const router = useRouter();
  const fetchMoviesCallback = useCallback(() => fetchMovies({ query: '' }), []);
  const {data: movies, loading:moviesLoading, error:moviesError, refetch} = useFetch(fetchMoviesCallback)//instead of using the fetchMovies({query: ''}) directly, I used the usecallback to avoid fecthing on every render
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);
  return (
    <View className="flex-1  bg-primary">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, minHeight: '100%' }}
      horizontal={false}
      alwaysBounceVertical={true}
      //@ts-ignore
      refreshControl={refreshing ? { refreshing, onRefresh } : undefined}>
      <Image source={images.bg} className="absolute w-full z-0" />

      {/* Logo stays above list */}
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

      {moviesLoading ? (
        <FlatList
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
            <View className="px-5 mt-5">
              <View className="w-full h-12 rounded-lg mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
              <View className="h-10 rounded w-2/3 mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
              <View className="h-4 rounded w-1/4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
            </View>
          )}
        />
      ) : moviesError ? (
        <Text className="px-5">Error: {moviesError?.message}</Text>
      ) : (
        <FlatList
          data={Array.isArray(movies) ? movies : []}
          renderItem={({ item }) => (
            // <Text className="text-sm text-white">{item.title}</Text>
            <MovieCard {...item} />
            // <Loading />
          )}
          keyExtractor={(item, index) => (item?.id ? String(item.id) : String(index))}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          className="mt-2 pb-32"
          contentContainerStyle={{ paddingBottom: 10 }}
          ListHeaderComponent={() => (
            <View className="px-5 mt-5">
              <SearchBar placeholder="search for a movie" onPress={() => { router.push('/search'); }} />
              <Text className="text-3xl text-white font-bold mt-5 mb-3">Latest Movies</Text>
              </View>
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
      )}
    </ScrollView>
    </View>
  );
}
