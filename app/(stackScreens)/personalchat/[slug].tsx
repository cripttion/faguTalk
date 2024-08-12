import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView, ImageBackground } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import ChatScreen from '@/components/homecomponent/Chats/ChatContent';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

const PersonalChat = () => {
  const db = useSQLiteContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const { slug } = useLocalSearchParams();
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, [slug]);

  const fetchContacts = async () => {
    try {
      const data = await db.getAllAsync(`SELECT * FROM Contacts WHERE contactUserId='${slug}'`);
   
      setContactData(data[0]);
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };
// console.log(slug);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.navigate('(tabs)')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileContainer} onPress={() => setModalVisible(true)}>
          <Image 
            source={contactData?.profilePicture
              ? { uri: `data:image/png;base64,${contactData?.profilePicture}` }
              : require('@/assets/images/secure_chat.png')} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.userName}>{contactData?.alias || "Loading..."}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#fff', padding: 5, borderRadius: 10 }]}>
            <Ionicons name="call" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#fff', padding: 5, borderRadius: 10 }]}>
            <Ionicons name="videocam" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container2}>
        <ImageBackground source={require('@/assets/images/image.png')} style={styles.backgroundImage}>
          {contactData ? (
            <View style={styles.chatContainer}>
              <ChatScreen chatPartner={contactData} />
            </View>
          ) : (
            <Text style={styles.loadingText}>Loading chat...</Text>
          )}
        </ImageBackground>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PersonalChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.green_background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: Colors.dark.green_background,
    
  },
  iconButton: {
    marginHorizontal: 5,
  },
  profileContainer: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:5,
  },
  container2: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire area
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  chatContainer: {
    flex: 1,
    // padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: to make text more readable
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.dark.green_button,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    borderRadius: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  loadingText:{

  }
});
