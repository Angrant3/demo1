//app\add-new-pet.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { db } from "./../config/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Colors from "./../constants/Colors";

export default function AddNewPet() {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [about, setAbout] = useState("");
  const handleAddPet = async () => {
    if (!name || !breed || !age || !imageUrl) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      await addDoc(collection(db, "Pets"), {
        name,
        category,
        breed,
        age,
        imageUrl,
        about,
        useremial: user?.primaryEmailAddress?.emailAddress || "unknown",
        createdAt: new Date(),
      });
      Alert.alert("Thành công", "Thú cưng mới đã được thêm.");
      // Reset form
      
      setName("");
      setCategory("");
      setBreed("");
      setAge("");
      setWeight("");
      setImageUrl("");
      setAbout("");
    } catch (error) {
      console.error("Lỗi khi thêm thú cưng:", error);
      Alert.alert("Lỗi", "Không thể thêm thú cưng. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Thêm Thú Cưng Mới</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />
       <TextInput
        style={styles.input}
        placeholder="Loài thú"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Giống"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Tuổi"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cân nặng"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="URL Hình Ảnh"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
     <TextInput
        style={styles.input}
        placeholder="Thông tin thêm về vật nuôi "
        value={about}
        onChangeText={setAbout}
      />
      <Button
    
       title="Thêm Thú Cưng" onPress={handleAddPet}  color={Colors.NAUNHAT} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    padding:15,
    borderRadius: 8,
    marginVertical:10,
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontFamily: "outfit",
  },
  
});
