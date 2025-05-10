// ✅ FILE: app/(tabs)/inbox.jsx
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation, useRouter } from "expo-router";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function Inbox() {
  const { user } = useUser();
  const navigation = useNavigation();
  const router = useRouter();
  const [chatList, setChatList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getChats = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const q = query(
      collection(db, "Chat"),
      where("userIds", "array-contains", user.primaryEmailAddress.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    const chatData = [];

    for (let chatDoc of querySnapshot.docs) {
      const chat = chatDoc.data();

      // Lấy thông tin người còn lại trong cuộc trò chuyện
      const otherUser = chat.users.find(
        (u) => u.email !== user.primaryEmailAddress.emailAddress
      );

      let avatar = null;

      // Tìm trong bảng Pets ảnh đại diện
      const petQuery = query(
        collection(db, "Pets"),
        where("useremail", "==", otherUser.email)
      );
      const petSnapshot = await getDocs(petQuery);
      if (!petSnapshot.empty) {
        const petDoc = petSnapshot.docs[0].data();
        avatar = petDoc.userimageUrl || null;
      }

      chatData.push({
        id: chatDoc.id,
        name: otherUser.name,
        email: otherUser.email,
        avatar,
      });
    }

    setChatList(chatData);
  };

  useEffect(() => {
    getChats();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getChats();
    setRefreshing(false);
  };

  const goToChat = (chatId) => {
    router.push({ pathname: "/chat", params: { id: chatId } });
  };

  const renderAvatar = (item) => {
    if (item.avatar) {
      return (
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />
      );
    } else {
      return (
        <View style={styles.initialsCircle}>
          <Text style={styles.initialsText}>
            {item.name?.charAt(0).toUpperCase()}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Tiêu đề */}
      <Text style={styles.title}>Tin nhắn</Text>

      {/* Danh sách trò chuyện */}
      <FlatList
  data={chatList}
  keyExtractor={(item) => item.id}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => goToChat(item.id)}
    >
      {renderAvatar(item)}
      <Text style={styles.nameText}>{item.name}</Text>
    </TouchableOpacity>
  )}
  ItemSeparatorComponent={() => <View style={styles.separator} />}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  nameText: {
    fontSize: 18,
    marginLeft: 12,
    color: "#333",
  },
  initialsCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFC368",
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#FFA500", // Màu cam
    marginVertical: 6,
  },
  
});
