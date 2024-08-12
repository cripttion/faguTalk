import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ToastAndroid } from 'react-native';
import { Colors } from '@/constants/Colors';
import Loginsvg from '@/assets/svg/welcome.svg'; // Replace with your actual SVG import
import { router } from 'expo-router';

import Logo from '@/assets/svg/Mylogo.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxhooks';
import { login, setMobileNumber, setPassword } from '@/redux/slice/LoginSlice';
import Icon  from 'react-native-vector-icons/Ionicons';

const Login = () => {
  const loginState = useAppSelector((state) => state.login);
  const [mobileNumber, setMobileNumbers] = useState("");
  const [password, setPasswrods] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const{isSuccess} = useAppSelector(state=>state.login);
  const handleLogin = async () => {
    await dispatch(setMobileNumber(mobileNumber));
    await dispatch(setPassword(password));
    const response =  await dispatch(login()).unwrap();
   if(response.status==="200")
   {
     ToastAndroid.show('Login sucessfull',ToastAndroid.SHORT);
     router.navigate("(stackScreens)/firstLoadingScreen");
   }
    
  }


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHalf}>
        <Loginsvg />
        <Logo width={300} height={300} style={styles.logo} />
      </View>

      <View style={styles.bottomHalf}>
        <View style={styles.curve}></View>
        
        <View style={styles.inputContainer}>
          <Icon name="call-outline" size={24} color="#888" style={styles.icon} />
          <TextInput
            onChangeText={setMobileNumbers}
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
          <TextInput
            onChangeText={setPasswrods}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#888" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => router.navigate('/newuser')}>
            <Text style={styles.linkText}>New user?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate('/forgotpassword')}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Loginsvg />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.green_background, // Overall background color
  },
  topHalf: {
    flex: 1,
    backgroundColor: Colors.dark.green_background, // Top half background
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -50 }], // Center the logo
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  curve: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Colors.dark.green_background,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: Colors.dark.green_button,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  linkText: {
    color: Colors.dark.green_button,
    fontSize: 14,
  },
});
