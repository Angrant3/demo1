// ✅ FILE: app/pet-details/index.jsx
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../config/FirebaseConfig";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const nav = useNavigation();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    nav.setOptions({ headerTransparent: true, headerTitle: "" });
  }, []);

  const InitiateChat = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const otherEmail = pet?.useremail;

    const docId1 = `${userEmail}_${otherEmail}`;
    const docId2 = `${otherEmail}_${userEmail}`;

    const q = query(collection(db, "Chat"), where("id", "in", [docId1, docId2]));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const chatDoc = querySnapshot.docs[0];
      router.push({ pathname: "/chat", params: { id: chatDoc.id } });
      return;
    }

    const newChatId = docId1;
    await setDoc(doc(db, "Chat", newChatId), {
      id: newChatId,
      users: [
        {
          email: userEmail,
          imageUrl: user?.imageUrl,
          name: user?.fullName,
        },
        {
          email: otherEmail,
          imageUrl: pet?.userimageUrl,
          name: pet?.username,
        },
      ],
      userIds: [userEmail, otherEmail],
    });

    router.push({ pathname: "/chat", params: { id: newChatId } });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <OwnerInfo pet={pet} />
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={InitiateChat} style={styles.btnAdopt}>
          <Text style={styles.adoptText}>Nhận Nuôi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAdopt: {
    padding: 15,
    backgroundColor: "#FFC368",
    borderRadius: 20,
    width: "80%",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    alignItems: "center",
  },
  adoptText: {
    color: "#F2F2F2",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "OutfitExtraBold",
  },
});