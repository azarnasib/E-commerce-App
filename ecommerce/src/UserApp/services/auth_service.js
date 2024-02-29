import AsyncStorage from "@react-native-async-storage/async-storage";


export const _saveUser=async(user,token)=>{
    await AsyncStorage.setItem('user',JSON.stringify(user))
    await AsyncStorage.setItem('token',JSON.stringify(token))

}

export const _getUser=async()=>{
    const user=await AsyncStorage.getItem('user');
    return JSON.parse(user);
}

export const _getToken=async()=>{
    const token=await AsyncStorage.getItem("token");
    return JSON.parse(token);
}