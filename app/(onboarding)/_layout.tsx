import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

const _layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('tokenUserID');
      if(token)
      {
         console.log(token);
         router.replace("(tabs)");
      }
      
    };

    checkLoginStatus();
  }, []);
  return (
    <Stack screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name='login' />
    </Stack>
  )
}

export default _layout