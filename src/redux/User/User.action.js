import { useDispatch } from 'react-redux';
import Signin from '../../components/Form/Signin/Signin';
import { auth, GoogleProvider, handleUserProfile } from '../../firebase/utils';
import userType from './User.type';


export const setCurrentUser = user =>({
    type : userType.SET_CURRENT_USER ,
    payload : user
});


  export const signInWithGoogle = ()=>async dispatch =>{
   try{
    const  userData = await auth.signInWithPopup(GoogleProvider)
      dispatch({
      type : userType. SIGN_IN_WIH_GOOGLE_SUCCESS  ,
      payload : true
    })
    
  
  } catch (err){
  //console.log(err)
  }
  
   }
    

export const userSignIn = ({email,password})=>async dispatch =>{
try{
    const userData=  await auth.signInWithEmailAndPassword(email,password);
    console.log(userData)
    setCurrentUser(userData);
      dispatch({
        type : userType.SIGN_IN_SUCCESS ,
        payload : userData
      })
  }catch{
    alert('this email not found please signUp')
  }
};

export const userSignUp =({displayName,email,password,confirmPassword})=>async dispatch=>{
  try{
       const {user} = await auth.createUserWithEmailAndPassword(email,password);
       await handleUserProfile(user,{displayName})
       dispatch({
        type : userType.SIGN_UP_SUCCESS ,
        payload : true
      })
     }catch{
       alert('this email sign already signUp')
     }
};

export const userSignOut = ()=>({
  type : userType.SIGN_OUT_SUCCESS,
})