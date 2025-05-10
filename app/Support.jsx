//app\Support.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export default function Support() {
  const { user } = useUser();
  const [feedback, setFeedback] = useState("");

  const handleSend = async () => {
    if (!feedback.trim()) return Alert.alert("Lỗi", "Vui lòng nhập nội dung.");
    try {
      await addDoc(collection(db, "Feedback"), {
        user: user?.primaryEmailAddress?.emailAddress,
        content: feedback,
        timestamp: Date.now(),
      });
      setFeedback("");
      Alert.alert("Cảm ơn bạn!", "Yêu cầu đã được gửi.");
    } catch (err) {
      Alert.alert("Lỗi", "Không thể gửi phản hồi.");
    }
  };

  return (
    <ImageBackground
      source={require("./../assets/images/imghotro.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Hỗ trợ</Text>
        <TextInput
          multiline
          placeholder="Nhập yêu cầu, góp ý..."
          value={feedback}
          onChangeText={setFeedback}
          style={styles.input}
        />
        <Button title="Gửi" onPress={handleSend} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginTop:10,
    padding: 10,
    marginHorizontal: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
   
  },
  input: {
    backgroundColor: "transparent",
    padding: 50,
    borderRadius: 12,
    height: 500,
    marginBottom: 40,
    textAlignVertical: "top",
    fontSize: 18, 
    borderWidth: 5,             
    borderColor: "transparent"
  },
  
});
