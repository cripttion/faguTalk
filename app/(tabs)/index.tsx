import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Colors } from '@/constants/Colors';
import { router, useFocusEffect } from 'expo-router';
import Logo2 from '@/components/Logo';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chat from '@/components/homecomponent/Chats/Chat';
import SearchBar from '@/components/homecomponent/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '@/hooks/reduxhooks';
import { setIsSuccess } from '@/redux/slice/LoginSlice';
import FloatingBootmIcon from '@/components/homecomponent/FloatingBootmIcon';
import { useSQLiteContext } from 'expo-sqlite';
import { getContacts } from '@/redux/slice/ActionsSlice';

const Home= () => {
    const db = useSQLiteContext();
    const [activeSection, setActiveSection] = useState('Chats');
    const[searchTerm,setSearchTerm] = useState("");
    const [allChats,setAllChats] =useState([]);
    const dispatch = useAppDispatch();
 
    const handleLogout = async()=>{
        await AsyncStorage.removeItem("tokenUserID");
        dispatch(setIsSuccess(false));
        router.replace("(onboarding)")
    }


  
    useFocusEffect(
      useCallback(() => {
        fetchContacts();
      }, [])
    );
    const fetchContacts = async () => {
      try {
        const data = await db.getAllAsync(`SELECT * FROM All_personal_chats`);
        
        setAllChats(data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHalf}>
       <View >
        <Logo2 />
       </View>
       <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name='scan1' size={28} color='#222' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <MaterialIcons name='account-circle' size={28} color='#222' />
          </TouchableOpacity>
        </View>
      </View>
     
      <View style={styles.bottomHalf}>
        {/* <View style={styles.curve}></View> */}
        <SearchBar onSearch={(data)=>setSearchTerm(data)}/>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, activeSection === 'Chats' && styles.activeButton]}
            onPress={() => setActiveSection('Chats')}
          >
            <Text style={styles.buttonText}>Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, activeSection === 'Groups' && styles.activeButton]}
            onPress={() => setActiveSection('Groups')}
          >
            <Text style={styles.buttonText}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, activeSection === 'Feed' && styles.activeButton]}
            onPress={() => setActiveSection('Feed')}
          >
            <Text style={styles.buttonText}>Feed</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {activeSection==='Chats'&&<>
            {allChats&&allChats?.map((data,index)=>(

              <Chat data={data} key={index} onPress={()=>router.navigate(`(stackScreens)/personalchat/${data?.partnerID}`)}/>
            ))}
              
          </>}
        </ScrollView>
       
        <FloatingBootmIcon />
        </View>
    
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.green_background, // Overall background color
  },
  topHalf: {
    // flex: 1,
   
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20,
    backgroundColor: Colors.dark.green_background, // Top half background
    
     },

  bottomHalf: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingTop: 40,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  curve: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: Colors.dark.green_background,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  iconsContainer:{
    flexDirection:'row',
    gap:20,
    alignItems:"center",
    
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  activeButton: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.dark.green_button,
  },
  iconButton:{

  }
});
