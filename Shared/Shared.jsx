//Shared/Shared.jsx
import {doc,setDoc,getDoc,updateDoc } from "firebase/firestore";
import{db} from './../config/FirebaseConfig'


export const GetFavList=async(user)=>{
   const docSnap= await getDoc(doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress));
    if(docSnap?.exists())
        {
            return docSnap.data();
        }
        else
        {
            await setDoc( doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress),{
                email:user?.primaryEmailAddress?.emailAddress,
                favorites:[]
            })
        }
}

const UpdateFav=async( user,favorites)=>{
    const docRef=doc(db, 'UserFavPet',user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef,{
            favorites:favorites
        })
    }
    catch(ee){

    }
}

export default{
    GetFavList,
    UpdateFav,
   
}