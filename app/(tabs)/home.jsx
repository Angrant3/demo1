//"app\(tabs)\home
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import PetListByCategory from "../../components/Home/PetListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import index from './../index';

export default function Home() {
  return (
    <View
      style={{
        
        padding: 20,
        marginTop: 20,
      }}>
      {/* Headers */}
      <Header />

      {/* Sliders */}
      <Slider />

      {/* Category + List of Pets */}
      <PetListByCategory />

      {/* Add new Pet  */}
      <Link href={'/add-new-pet'}
       style={styles.addNewPetContainer}>
        <MaterialIcons name="pets" size={24} color="black" />
        <Text
          style={{
            fontFamily: "specialfont",
            fontSize: 15,
          }}>
          Thêm vật Nuôi Mới
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.EBD4B1,
    borderColor: Colors.BLACK,
    justifyContent: "center",
  },
});