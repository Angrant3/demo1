//app\Aboutapp.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Info() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin ứng dụng</Text>
      <Text style={styles.content}>
        Ứng dụng giúp kết nối người yêu thú cưng, cho phép đăng, tìm kiếm và nhận nuôi thú cưng.
        {"\n\n"}Phiên bản: 1.0.0
        {"\n"}Phát triển bởi: Nhóm Yêu Thú Cưng
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});
