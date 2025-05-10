import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";


export default function PetSubInfo({ pet }) {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
    {/* Dòng 1 */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between", 
        marginBottom: 10, 
      }}
    >
      {/* Card 1 */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.EBD4B1,
          padding: 10,
          marginRight: 5, // khoảng cách giữa 2 card cùng hàng
          borderRadius: 20,
        }}
      >
        <PetSubInfoCard
          icon={require("./../../assets/images/schedule.png")}
          title="Độ tuổi"
          value={pet?.age}
        />
      </View>
  
      {/* Card 2 */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.EBD4B1,
          padding: 10,
          marginLeft: 5,
          borderRadius: 20,
        }}
      >
        <PetSubInfoCard
          icon={require("./../../assets/images/weight.png")}
          title="Cân Nặng"
          value={pet?.weight}
        />
      </View>
    </View>
  
    {/* Dòng 2 */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {/* Card 3 */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.EBD4B1,
          padding: 10,
          marginRight: 5,
          borderRadius: 20,
        }}
      >
        <PetSubInfoCard
          icon={require("./../../assets/images/gender.png")}
          title="Giới tính"
          value={pet?.sex}
        />
      </View>
  
      {/* Card 4 */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.EBD4B1,
          padding: 10,
          marginLeft: 5,
          borderRadius: 20,
        }}
      >
        <PetSubInfoCard
          icon={require("./../../assets/images/card.png")}
          title="Loại"
          value={pet?.breed}
        />
      </View>
    </View>
  </View>
  
  );
}
