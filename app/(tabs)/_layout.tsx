import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, Vibration, View } from 'react-native'
function TabIcon({focused, icon, title}:any){
  if(focused){
  return(
    <ImageBackground source={images.highlight} className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
            <Image source={icon} tintColor="#151312" className="size-5" />
            <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
          </ImageBackground>
  )
}else{
  return(
    <View className='size-full justify-center items-center mt-4 rounded-full'>
      <Image source={icon} tintColor='#A8B5DB' className='size-5' />
    </View>
  )
}
}
const _layout = () => {
  return (
    <Tabs
      screenListeners={{
        tabPress:()=>{Vibration.vibrate(30)}
      }}
      screenOptions={{
        tabBarShowLabel:false,
        tabBarItemStyle:{
          width: '100%',
          justifyContent:'center',
          alignItems:'center'
          
        },
        tabBarStyle:{
          backgroundColor: '#0f0D23',
          borderRadius: 50,
          marginHorizontal:20,
          marginBottom:36, 
          height:52,
          position:'absolute',
          overflow:'hidden',
          borderWidth: 1,
          borderColor: "#0d0D23"
        }
      }}
    >
      <Tabs.Screen name="index" options={{title:'home', headerShown:false, tabBarIcon: ({focused})=>(
        <>
          <TabIcon focused ={focused} icon={icons.home} title='home' />
        </>
      )}} />

      <Tabs.Screen name="search" options={{title:'Search', headerShown:false, tabBarIcon: ({focused})=>(
        <TabIcon focused={focused} icon={icons.search} title='search' />
      )}} />

      <Tabs.Screen name="saved" options={{title:'Saved', headerShown:false, tabBarIcon: ({focused})=>(
          <TabIcon focused={focused} icon={icons.save} title='saved' />
      )}} />

      <Tabs.Screen name="profile" options={{title:'Profile', headerShown:false, tabBarIcon: ({focused})=>(
        <TabIcon focused={focused} icon={icons.person} title="profile" />
      )}} />
    </Tabs>
  )
}

export default _layout