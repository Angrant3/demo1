import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

import Colors from '@/constants/Colors';


export default function Tablayout() {
  return (
   <Tabs
   screenOptions={{
    
    tabBarActiveTintColor:Colors.NAUHOIDAM
   }}
   >
    <Tabs.Screen name ='home' 
    options={{
      title:'Trang Chủ ',
      headerShown:false,
      tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
    }}
    />
    <Tabs.Screen name ='favorite' options={{
      title:'Yêu Thích ',
      headerShown:false,
      tabBarIcon:({color})=><Ionicons name="heart" size={24} color={color} />
    }}

     />
    <Tabs.Screen name ='inbox'  options={{
      title:'Tin Nhắn ',
      headerShown:false,
      tabBarIcon:({color})=><Ionicons name="chatbubble" size={24} color={color} />
    }}
    
    />
    <Tabs.Screen name ='profile' options={{
      title:'Thông Tin ',
      headerShown:false,
      tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color} />
    }}
     />
  
   </Tabs>
  )
}