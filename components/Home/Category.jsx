import { View,Text,FlatList,Image,StyleSheet,TouchableOpacity,} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import Colors from "./../../constants/Colors";
import { Dimensions } from 'react-native';

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 4;

  const getCategories = async () => {
    setCategoryList([]);
    const snapShot = await getDocs(collection(db, "Category"));
    snapShot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View
      style={{
        marginTop: 5,
      }}>
      <Text
        style={{
          fontFamily: "OutfitExtraBold",
          fontSize: 20,
        }}>
        Loại Vật Nuôi 
      </Text>
      <FlatList
  data={categoryList}
  horizontal={true}
  pagingEnabled={true} // 👈 Cuộn theo trang
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item, index) => index.toString()}
  snapToInterval={screenWidth} // 👈 Snap từng "page"
  decelerationRate="fast"
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedCategory(item?.name);
        category(item?.name);
      }}
      style={{
        width: itemWidth,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={[
          styles.container,
          selectedCategory === item?.name && styles.selectedCategoryContainer,
        ]}>
        <Image
          source={{ uri: item?.imageUrl }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
          }}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "outfit",
        }}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.NAUDAM,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.EBD4B1,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.NAUDAM,
    borderColor: Colors.NAUDAM,
  },
});