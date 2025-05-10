// ✅ components/MarkFav.jsx
import { View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from './../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({ pet }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    setFavList(result?.favorites || []);
  };

  const ToggleFav = async () => {
    let updatedFavs;
    if (favList.includes(pet.id)) {
      updatedFavs = favList.filter((id) => id !== pet.id);
    } else {
      updatedFavs = [...favList, pet.id];
    }
    await Shared.UpdateFav(user, updatedFavs);
    setFavList(updatedFavs);
  };

  return (
    <View>
      <Pressable onPress={ToggleFav}>
        <Ionicons
          name={favList.includes(pet.id) ? 'heart' : 'heart-outline'}
          size={30}
          color={favList.includes(pet.id) ? 'red' : 'black'}
        />
      </Pressable>
    </View>
  );
}
