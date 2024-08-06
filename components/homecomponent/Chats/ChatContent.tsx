import { Colors } from '@/constants/Colors';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import {  SQLiteDatabase, useSQLiteContext ,} from 'expo-sqlite';
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {getCurrentDateTime} from '@/helper/CurrentDataAndTime';
// Open database connection
interface Todo {
  value: string;
  intValue: number;
}
const ChatScreen = ({ currentUser,chatPartner }) => {
  const db =  useSQLiteContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState(null);
  const [version, setVersion] = useState('');
  const tableName = `chat_${currentUser}_${chatPartner}`;
  const flatListRef = useRef(null);
  const dateTime = getCurrentDateTime();
  const fetchMessages = async () => {
    const chat = await db.getAllAsync(`SELECT * FROM ${tableName}`);
    console.log("The chat is ", chat);
    setMessages(chat);
  };

  useEffect(() => {
    // Create table for the chat if it does not exist
    // Use correct table name for insertion
    
    // Create table for the chat if it does not exist
    const createTable = async () => {
      const response = await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sender TEXT,
          chatID TEXT,
          message TEXT,
          timestamp TEXT,
          seen BOOLEAN
        );
      `);
      console.log(response);
    };

    createTable();

    // Fetch existing messages from the database
 
    fetchMessages();

    // Connect to WebSocket
    const socket = new WebSocket('ws://192.168.246.144:8080/chat?user=cripttiontesting');
    socket.onopen = () => {
    
    };

    socket.onmessage = event => {
      console.log("The Evenet is ==>>",event);
      const message = JSON.parse(event.data);
      console.log(message);

      saveMessage(message);
      
    };
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      Alert.alert('WebSocket Error', 'An error occurred with the WebSocket connection.');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [currentUser, chatPartner]);

  useEffect(() => {
    // Scroll to the end when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
 

  const saveMessage = async (message) => {
    const tableName = `chat_${currentUser}_${chatPartner}`; // Use correct table name for insertion

    await db.withTransactionAsync(async () => {
      const insertedMessageId = await db.runAsync(
        `INSERT INTO ${tableName} (sender, chatID, message, timestamp, seen) VALUES (?, ?, ?, ?, ?)`,
        [message.sender, message.chatID, message.message, message.timestamp, message.seen]
      );
      // console.log("Added data to database with ID:", insertedMessageId);
      console.log("the chages in dat base is ",insertedMessageId.changes); 
    });
    fetchMessages();
    // setMessages((prevMessages) => [...prevMessages, message]);
  };
  const getAllDatabaseNames = async () => {
    const databaseNames = await db.execAsync('SELECT name FROM sqlite_master WHERE type="table"');
    console.log("Database names:", databaseNames);
  };


  const sendMessage = () => {
    const message = {
      sender: currentUser,
      chatID: "cripttiontesting",
      message: input,
      timestamp:dateTime,
      seen: false
    };
    // console.log(message);
    ws.send(JSON.stringify(message));
    setInput('');
  };
console.log("The messageIs",messages);
  return (
    
    <View style={styles.container}>
    
      <FlatList
      style={{paddingLeft:10,paddingRight:10,}}
       ref={flatListRef}
       onContentSizeChange={()=>{
         flatListRef.current.scrollToEnd({animated:true})
       }}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer, 
            item.sender === currentUser ? styles.rightMessage : styles.leftMessage
          ]}>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
      showsVerticalScrollIndicator={false}
      />
      
          <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="camera-alt" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
       
    </View>

   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // flexDirection:'column',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputContainer: {
    // position:'absolute',
    // bottom:0,
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
  sendButtonText: {
    color: '#fff',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  
  rightMessage: {
    backgroundColor:Colors.dark.card_third_color,
    alignSelf: 'flex-end',
    borderRadius:10,
    marginTop:2,
  },
  leftMessage: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
    borderRadius:10,
  },
  messageText: {
    color: '#222',
  },
  
});

export default ChatScreen;
