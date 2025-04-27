import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './../../config/FirebaseConfig'

export default function Slider() {

    const [sliderList,setSliderList]=useState([]);
    useEffect(()=>{
        GetSliders();
    },[])

    const GetSliders=async()=>{
        setSliderList([]);
        const snapshot=await getDocs(collection(db,'slider'));
        snapshot.forEach((doc)=>{
            console.log(doc.data());
            setSliderList((silike)=>[...silike, doc.data()])
    })
}

  return (
    <View style={{
        marginTop:10
    }}>
        <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item})=>(
            <View>
                    <Image 
                    source ={{uri:item?.imageUrl}}
                    style={styles.sliderImage}
                   />

            </View>
        )}
        />
      {/* <Text>Slider</Text> */}
    </View>
  )
}
const styles = StyleSheet.create({
  sliderImage:{
    width: Dimensions.get('screen').width*0.99,
    height:200,
    borderRadius:15,
    marginRight:15
    
  }
})
