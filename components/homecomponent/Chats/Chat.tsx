import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const Chat = ({onPress}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Example data, replace with actual data later
  const userName = "John Doe";
  const recentMessage = "Hey, how are you?";
  const lastMessageTime = "10:30 AM";
  const unreadCount = 3;
  const profileImage = require('@/assets/images/image1.jpg'); // Replace with image URL or null if not present

  const handleLongPress = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <TouchableOpacity onLongPress={handleLongPress} onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            {profileImage ? (
              <Image source={profileImage} style={styles.profileImage} />
            ) : (
              <AntDesign name="user" size={40} color="gray" style={styles.profileIcon} />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.recentMessage}>{recentMessage}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.messageTime}>{lastMessageTime}</Text>
            {unreadCount > 0 && (
              <View style={styles.unreadCountContainer}>
                <Text style={styles.unreadCount}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}

      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.modalOption}>
              <FontAwesome name="eye-slash" size={24} color="gray" />
              <Text style={styles.modalOptionText}>Hide the chat</Text>
            </View>
            <View style={styles.modalOption}>
              <AntDesign name="delete" size={24} color="red" />
              <Text style={styles.modalOptionText}>Delete the chat</Text>
            </View>
            <View style={styles.modalOption}>
              <Ionicons name="star" size={24} color="gold" />
              <Text style={styles.modalOptionText}>Add to fav</Text>
            </View>
            <View style={styles.modalOption}>
              <MaterialIcons name="work" size={24} color="blue" />
              <Text style={styles.modalOptionText}>Add to work</Text>
            </View>
            <View style={styles.modalOption}>
              <MaterialIcons name="person" size={24} color="green" />
              <Text style={styles.modalOptionText}>Add to personal</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileContainer: {
    marginRight: 10,
    // borderWidth:0.5,
    // borderColor:'#222',
    // borderRadius: 25,
    // flexDirection:'row',
    // justifyContent:'center',
    // alignItems:'center'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentMessage: {
    fontSize: 14,
    color: '#757575',
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  messageTime: {
    fontSize: 12,
    color: '#757575',
  },
  unreadCountContainer: {
    backgroundColor: '#dc2626',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  unreadCount: {
    fontSize: 12,
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor:Colors.dark.light_card_background,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth:0.5,
    paddingBottom:10,
    borderBottomColor:'#222'
  },
  modalOptionText: {
    marginLeft: 10,
    fontSize: 18,
  },
});
