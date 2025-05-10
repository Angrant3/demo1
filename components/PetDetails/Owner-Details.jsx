// component/Owner-Details.jsx.
// import React, { useEffect, useState } from "react";
// import { View, Text, Image, StyleSheet, FlatList } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../config/FirebaseConfig";
// import Colors from "../constants/Colors";

// export default function OwnerDetails() {
//   const { useremail } = useLocalSearchParams();
//   const [ownerInfo, setOwnerInfo] = useState(null);
//   const [pets, setPets] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const q = query(collection(db, "Pets"), where("useremail", "==", useremail));
//       const querySnapshot = await getDocs(q);
//       const petsData = [];
//       querySnapshot.forEach((doc) => {
//         petsData.push(doc.data());
//       });

//       if (petsData.length > 0) {
//         setOwnerInfo({
//           username: petsData[0].username,
//           useremail: petsData[0].useremail,
//           userimageUrl: petsData[0].userimageUrl,
//         });
//       }

//       setPets(petsData);
//     };

//     fetchData();
//   }, [useremail]);

//   const renderPetItem = ({ item }) => (
//     <View style={styles.petItem}>
//       <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
//       <View style={styles.petDetails}>
//         <Text style={styles.petText}>{item.name}</Text>
//         <Text style={styles.petSubText}>{item.breed}</Text>
//         <Text style={styles.petSubText}>{item.category}</Text>
//       </View>
//       <View style={styles.statusBox}>
//         <Text style={{ color: "white" }}>{/* Tình trạng */}</Text>
//       </View>
//     </View>
//   );

//   if (!ownerInfo) return <Text style={{ padding: 20 }}>Đang tải...</Text>;

//   return (
//     <View style={{ padding: 20 }}>
//       {/* Thông tin chủ */}
//       <View style={styles.ownerContainer}>
//         <Image
//           source={{ uri: ownerInfo.userimageUrl }}
//           style={styles.ownerImage}
//         />
//         <View style={styles.ownerInfo}>
//           <Text style={styles.ownerName}>{ownerInfo.username}</Text>
//           <Text style={styles.ownerEmail}>{ownerInfo.useremail}</Text>
//         </View>
//       </View>

//       {/* Danh sách thú nuôi */}
//       <FlatList
//         data={pets}
//         renderItem={renderPetItem}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={{ marginTop: 20 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   ownerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 20,
//     backgroundColor: "#eee",
//     padding: 15,
//     borderRadius: 20,
//   },
//   ownerImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//   },
//   ownerInfo: {
//     flex: 1,
//   },
//   ownerName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   ownerEmail: {
//     fontSize: 14,
//     color: "#555",
//   },
//   petItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.camFFD699,
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 20,
//     gap: 10,
//   },
//   petImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     backgroundColor: "#ccc",
//   },
//   petDetails: {
//     flex: 1,
//   },
//   petText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   petSubText: {
//     fontSize: 12,
//   },
//   statusBox: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#ccc",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
