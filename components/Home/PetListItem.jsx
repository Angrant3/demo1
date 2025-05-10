//components/PetListItem.jsx
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from './../../components/MarkFav'

export default function PetListItem({ pets }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/pet-details", params: pets })}
      style={{
        padding: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: Colors.EBD4B1,
        borderRadius: 10,
      }}>
        <View style={{
          position:'absolute',
          zIndex:10,
          right:10,
          top:10,
        }}>
          <MarkFav pet={pets}  />
        </View>
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
            backgroundColor: Colors.WHITE,
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