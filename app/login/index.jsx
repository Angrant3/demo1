//app\login\index.jsx
import { View, Text, Image, Pressable, ImageBackground } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useAuth, useClerk, useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import * as SecureStore from "expo-secure-store";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    }
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const clerk = useClerk();
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const onPress = useCallback(async () => {
    try {
      if (!isLoaded) {
        console.log("Đang tải dữ liệu xác thực...");
        return;
      }

      if (isSignedIn) {
        console.log("Người dùng đã đăng nhập, chuyển hướng đến home");
        router.replace("/(tabs)/home");
        return;
      }

      console.log("Bắt đầu quá trình đăng nhập Google...");
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "myapp",
          path: "/(tabs)/home",
        }),
      });

      console.log("Kết quả SSO flow:", { createdSessionId });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        console.log("Đăng nhập thành công!");
        router.replace("/(tabs)/home");
      } else {
        console.log("Không nhận được createdSessionId");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow, router, isSignedIn, isLoaded]);

  return (
    <ImageBackground         
      source={require("../../assets/images/bgindex.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Nội dung nằm cố định ở dưới */}
      <View style={{ 
        position: 'absolute', 
        bottom: 140, 
        width: '100%', 
        paddingHorizontal: 20, 
        alignItems: 'center' 
      }}>
        <Text style={{
          fontSize: 25,
          fontFamily: 'OutfitExtraBold',
          textAlign: 'center',
          color: 'black',
          marginBottom: 10,
        }}>
         Hãy Chuẩn Bị Đón Nhận Người Bạn Mới
        </Text>

        <Pressable
          onPress={onPress}
          style={{
            padding: 10,
            backgroundColor: Colors.NAUHOIDAM,
            width: '100%',
            borderRadius: 14,
          }}
        >
          <Text style={{
            fontSize: 30,
            fontFamily: 'OutfitExtraBold',
            textAlign: 'center',
            color: 'white',
          }}>
            Bắt Đầu
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
