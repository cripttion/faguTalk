import { Colors } from "@/constants/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getCurrentDateTime } from "@/helper/CurrentDataAndTime";
import{getTableName} from '@/helper/CreatingTableName';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhotoCapture from "./PhotoCapture";
import { SOCKET_URL } from "@/constants/ApiRoutes";
// Open database connection
interface Todo {
  value: string;
  intValue: number;
}
const ChatScreen = ({ chatPartner }) => {
  const db = useSQLiteContext();
  const [messages, setMessages] = useState([]);
  const[messageType,setMessageType] = useState("Text");
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);
  const [tableName, setTableName] = useState("");
  const [userID, setUserID] = useState("");
  const [connnectId, setConnectID] = useState("");
  const flatListRef = useRef(null);
  const dateTime = getCurrentDateTime();
  const [openCamera,setOpenCamera] = useState(false);
   const fetchMessages = async () => {

    const {userID,chatTableName} = await getTableName(chatPartner);
    console.log("the chat tbael nais isd,",chatTableName)
    const chat = await db.getAllAsync(`SELECT * FROM ${chatTableName}`);

    setMessages(chat);
  };

  useEffect(() => {
    const createTableName = async () => {
      const { userID,chatTableName} = await getTableName(chatPartner);
      console.log("the reakdf",userID,chatTableName);
      setUserID(userID);
      const connecttem = chatTableName;
      setConnectID(connecttem.replace(/_/g, "").split("").sort().join(""));
      setTableName(chatTableName);
    };
    createTableName();
  }, [chatPartner]);

  useEffect(() => {
    const createTable = async () => {
      try {
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender TEXT,
            chatID TEXT,
            message TEXT,
            timestamp TEXT,
            seen BOOLEAN
          );
          CREATE TABLE IF NOT EXISTS All_personal_chats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            partnerTableId TEXT UNIQUE,
            partnerID TEXT UNIQUE,
            partnerProfileImage TEXT,
            partnerLastMessage TEXT,
            alias TEXT,
            lastMessageTime Text
          );
          INSERT OR IGNORE INTO All_personal_chats (partnerTableId, partnerID, partnerProfileImage, partnerLastMessage, alias, lastMessageTime) VALUES ('${chatPartner.id}','${chatPartner.contactUserId}','${chatPartner.profilePicture}',' ','${chatPartner.alias}','');
        `);
      } catch (error) {
        console.error("Error creating tables:", error);
      }
    };

    if (tableName) {
      createTable();
      fetchMessages();
    }
  }, [tableName]);
  useEffect(() => {
    //  `ws://192.168.131.144:8080/chat?user=${connnectId}`
    if (connnectId != "") {
      const socket = new WebSocket(
       `${SOCKET_URL}/chat?user=${connnectId}`
      );
      socket.onopen = () => {
        console.log(
          "wer are connect on ",
          `${SOCKET_URL}/chat?user=${connnectId}`
        );
      };

      socket.onmessage = (event) => {
        console.log("The Evenet is ==>>", event);
        const message = JSON.parse(event.data);
        console.log(message);

        saveMessage(message);
      };
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        Alert.alert(
          "WebSocket Error",
          "An error occurred with the WebSocket connection."
        );
      };

      setWs(socket);

      return () => {
        socket.close();
      };
    }
  }, [connnectId]);

  useEffect(() => {
    // Scroll to the end when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const saveMessage = async (message) => {
    try {
      const {userID,chatTableName} =await getTableName(chatPartner);
      await db.withTransactionAsync(async () => {
        const query = `
  INSERT INTO ${chatTableName} (sender, chatID, message, timestamp, seen) 
  VALUES (?, ?, ?, ?, ?)
`;
        console.log(query);
        const insertedMessageId = await db.runAsync(query, [
          message.sender,
          message.chatID,
          message.message,
          message.timestamp,
          message.seen,
        ]);

        const updatedpersonalTable = await db.runAsync(
          `UPDATE All_personal_chats 
             SET partnerLastMessage = ?, lastMessageTime = ?
             WHERE partnerID = ?`,
          [message.message, message.timestamp, chatPartner.contactUserId]
        );
      });

      fetchMessages(); // Only call this after the transaction is complete
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const sendMessage = () => {
    const message = {
      sender: userID,
      chatID: connnectId,
      message: input,
      timestamp: dateTime,
      seen: false,
    };
    // console.log(message);
    ws.send(JSON.stringify(message));
    setInput("");
  };
  // console.log("The messageIs", messages);
  console.log(chatPartner?.contactUserId);
  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingLeft: 10, paddingRight: 10 }}
        ref={flatListRef}
        onContentSizeChange={() => {
          flatListRef.current.scrollToEnd({ animated: true });
        }}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === userID ? styles.rightMessage : styles.leftMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={()=>setOpenCamera(true)}>
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
      {openCamera && 
      <View style={styles.camera}><PhotoCapture setData={(data)=>{
        setInput(data);
        setMessageType("Image");
      }} closeCamera={setOpenCamera} />
      </View>
      }
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
    borderBottomColor: "#ccc",
  },
  inputContainer: {
    // position:'absolute',
    // bottom:0,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.dark.green_button,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
  },
  timestamp: {
    color: "#888",
    fontSize: 12,
  },

  rightMessage: {
    backgroundColor: Colors.dark.card_third_color,
    alignSelf: "flex-end",
    borderRadius: 10,
    marginTop: 2,
  },
  leftMessage: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
    borderRadius: 10,
    marginTop: 2,
  },
  messageText: {
    color: "#222",
  },
  camera:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    // flex:1
    
  }
});

export default ChatScreen;
