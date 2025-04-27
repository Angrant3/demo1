//app\_layout.jsx
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { ClerkProvider } from '@clerk/clerk-expo'
import { useAuth } from '@clerk/clerk-expo'
import * as SecureStore from "expo-secure-store";
import { useEffect } from 'react';


SplashScreen.preventAutoHideAsync();
const tokenCache={
  async getToken(key){
    try{
      const item = await SecureStore.getItemAsync(key)
      if(item){
        console.log(`${key} was used \n  `) 
      } else {
        console.log(`No value stored under key: ` +key )
      }
      return item
    }catch(error){
      console.error(`SecureStore get item error: `, error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
    
  },
  async saveToken(key  , value ){
    try{
      return SecureStore.setItemAsync(key,value)
    }catch(err){
      return
    }
  }
}
export default function RootLayout() {
  
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const [loaded] = useFonts({
    "spacemono": require('../assets/fonts/SpaceMono-Regular.ttf'),
    "candal": require('../assets/fonts/Candal-Regular.ttf'),
    "poetfont" : require('../assets/fonts/PoetsenOne-Regular.ttf'),
    "specialfont" : require('../assets/fonts/SpecialGothicExpandedOne-Regular.ttf'),
    "outfitfont": require("../assets/fonts/Outfit-VariableFont_wght.ttf"),
    "outfitbold": require("../assets/fonts/Outfit-Bold.ttf"),
    "calsans": require("../assets/fonts/CalSans-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
   
      
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login/index"  options={{headerShown:false}}/>
      </Stack>
    </ClerkProvider>
  );
}
