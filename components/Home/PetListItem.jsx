import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PetListItem({ pets }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/pet-details", params: pets })}
      style={{
        padding: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: Colors. NAUNHAT,
        borderRadius: 10,
      }}>
        
      <Image
        source={{ uri: pets.imageUrl }}
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
          borderRadius: 10,
          alignItems: "center",
        }}
      />
      <Text
        style={{
          fontFamily: "specialfont",
          fontSize: 15,
          alignItems: "center",
          textAlign: "center",
        }}>
        {pets?.name}
      </Text>
      <View>
        <Text
          style={{
            fontFamily: "outfit",
            textAlign: "center",
            alignItems: "center",
            color: Colors.BLACK,
          }}>
          {pets?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.BLACK,
            backgroundColor: Colors.FFF1C9,
            borderRadius: 10,
            alignItems: "center",
            textAlign: "center",
          }}>
          {pets?.age}
        </Text>
      </View>
    </TouchableOpacity>
  );
}