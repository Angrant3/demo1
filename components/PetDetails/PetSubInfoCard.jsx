import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

export default function PetSubInfoCard({ icon, title, value }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backfaceVisibility: Colors.WHITE,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        gap: 8,
        flex: 1,
      }}>
      <Image source={icon} style={{ width: 40, height: 40 }} />
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 15,
            color: Colors.xam8f8e8d,
            marginLeft: 5,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "specialfont",
            fontSize: 15,
            marginLeft: 5,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
