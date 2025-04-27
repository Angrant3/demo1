import { View,Text,FlatList,Image,StyleSheet,TouchableOpacity,} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import Colors from "./../../constants/Colors";

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  
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
          fontFamily: "specialfont",
          fontSize: 20,
        }}>
        Category
      </Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item?.name);
              category(item?.name);
            }}
            style={{
              flex: 1,
            }}>
            <View
              style={[
                styles.container,
                selectedCategory == item?.name &&
                  styles.selectedCategoryContainer,
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