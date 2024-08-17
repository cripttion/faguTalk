import AsyncStorage from "@react-native-async-storage/async-storage";

const getTableName = async(chatPartner)=>{
    const userID = await AsyncStorage.getItem("tokenUserID");
    // setUserID(userID);
    const currentUserID = userID.split("-")[4];
    const chatPartnerUserID = chatPartner.contactUserId.split("-")[4];
    const chatTableName = `chat_${currentUserID}_${chatPartnerUserID}`;
    
    return {userID,chatTableName};
}

export  {getTableName};
