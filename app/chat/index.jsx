
// ✅ FILE: app/chat/index.jsx
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../../config/FirebaseConfig';
import { doc, onSnapshot, collection, addDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(doc(db, 'Chat', id), 'messages'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    });
    return unsub;
  }, [id]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    await addDoc(collection(doc(db, 'Chat', id), 'messages'), {
      text,
      sender: user?.primaryEmailAddress?.emailAddress,
      timestamp: Date.now(),
    });
    setText('');
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={{ padding: 10 }}>{item.sender}: {item.text}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput value={text} onChangeText={setText} style={styles.input} placeholder="Nhập tin nhắn..." />
        <Button title="Gửi" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});