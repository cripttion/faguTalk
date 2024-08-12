import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Logo from "@/assets/svg/welcome.svg";
import { router } from "expo-router";
import Logo2 from "@/assets/svg/Mylogo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { register } from "@/redux/slice/LoginSlice";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

const NewUser = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]);
    }
  };
  const handleRegister = async () => {
    try {
      const requestedData = {
        username: name,
        phoneNumber: `+91${phone}`,
        password: password,
        profilePicture: profileImage ? profileImage.base64 : null, // Ensure profileImage is handled correctly
        status: status || "Hey! I am using Fagu Talk", // Use a default status if it's undefined
        createdAt: new Date().toISOString(), // Set the current date and time
        updatedAt: new Date().toISOString(), // Set the current date and time
      };

      const response = await dispatch(register(requestedData)).unwrap();
      if(response.username)
      {
        ToastAndroid.show("Registration sucessful",ToastAndroid.SHORT);
        router.navigate('/login');
      }
    // Log the response to the console
    
      
    } catch (error) {
      console.error("Registration failed:", error);
      // Optionally, handle the error (e.g., show a message to the user)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign
          name="left"
          size={30}
          color={"#222"}
          style={{ marginLeft: 10, marginTop: 10 }}
        />
      </TouchableOpacity>

      <View style={styles.topHalf}>
        <Logo2 style={styles.logoBackground2} />

        <View style={styles.profileIconContainer}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage.uri }}
              style={styles.profileImage}
            />
          ) : (
            <FontAwesome name="user-circle" size={100} color="#222" />
          )}
          <TouchableOpacity style={styles.addIcon} onPress={pickImage}>
            <FontAwesome name="plus" size={20} color="white" />
          </TouchableOpacity>
         
        </View>
        <Text style={{ color: "#222", marginTop: -20, fontSize: 20 , fontWeight:'bold' }}>
            {name?name:"Add profile photo"}
          </Text>
      </View>

      <View style={styles.bottomHalf}>
        <View style={styles.curve}></View>
        <Logo style={styles.logoBackground} />
        
          <TextInput placeholder="Bio" value={status} onChangeText={setStatus} style={styles.statusInput} />
        

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            onChangeText={setName}
            value={name}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name="phone"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            placeholderTextColor="#888"
            onChangeText={setPhone}
            value={phone}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#888"
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.green_background,
  },
  topHalf: {
    flex: 1,
    backgroundColor: Colors.dark.green_background,
    justifyContent: "center",
    alignItems: "center",
    // position: "relative",
  },
  profileIconContainer: {
    marginTop:50,
    position: "relative",
    // top: "40%",
    transform: [{ translateY: -50 }],
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addIcon: {
    position: "absolute",
    bottom: 0,
    right:0,
    backgroundColor: Colors.dark.green_button,
    borderRadius: 50,
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomHalf: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    position: "relative",
    overflow: "hidden",
  },
  curve: {
    position: "absolute",
    top: -30,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Colors.dark.green_background,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: Colors.dark.green_button,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  logoBackground: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.3,
  },
  logoBackground2: {
    ...StyleSheet.absoluteFillObject,
    width: "200%",
    height: "200%",
    resizeMode: "cover",
    position: "absolute",
    top: -180,
    left: -200,
    opacity: 0.3,
  },
  statusInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 20,
  },
 
});
