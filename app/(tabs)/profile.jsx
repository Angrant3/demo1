// ✅ FILE: app/(tabs)/profile.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const [avatarUri, setAvatarUri] = useState(null);

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  const handlePickAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Quyền bị từ chối",
        "Bạn cần cho phép truy cập thư viện ảnh để tiếp tục."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const profileOptions = [
    {
      icon: <AntDesign name="pluscircle" size={24} color="#FFC368" />,
      label: "Add New Pet",
      onPress: () => router.push("/add-new-pet"),
    },
    {
      icon: <AntDesign name="heart" size={24} color="#FFC368" />,
      label: "Favorites",
      onPress: () => router.push("/(tabs)/favorite"),
    },
    {
      icon: <FontAwesome name="inbox" size={24} color="#FFC368" />,
      label: "Inbox",
      onPress: () => router.push("/inbox"),
    },
    {
      icon: <AntDesign name="infocirlceo" size={24} color="#FFC368" />,
      label: "Thông tin",
      onPress: () => router.push("/Aboutapp"),
    },
    {
      icon: <MaterialIcons name="support-agent" size={24} color="#FFC368" />,
      label: "Hỗ trợ",
      onPress: () => router.push("/Support"),
    },
    {
      icon: <MaterialIcons name="logout" size={24} color="#FFC368" />,
      label: "Logout",
      onPress: handleLogout,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin</Text>

      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatar} onPress={handlePickAvatar}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>
              {user?.firstName?.charAt(0).toUpperCase() || "U"}
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.nameText}>{user?.fullName || "User Name"}</Text>
        <Text style={styles.emailText}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {profileOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={item.onPress}
          >
            <View style={styles.iconWrapper}>{item.icon}</View>
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: "#1E4C2F",
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 36,
  },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  nameText: { fontSize: 20, fontWeight: "bold" },
  emailText: { fontSize: 14, color: "#888" },
  optionsContainer: {
    marginTop: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5E6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  iconWrapper: {
    width: 32,
    alignItems: "center",
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
