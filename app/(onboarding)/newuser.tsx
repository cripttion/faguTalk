import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Logo from '@/assets/svg/welcome.svg';
import { router } from 'expo-router';
import Logo2 from '@/assets/svg/Mylogo.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewUser = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name='left' size={30} color={'#222'} style={{ marginLeft: 10, marginTop: 10 }} />
      </TouchableOpacity>  
    
      <View style={styles.topHalf}>
      <Logo2 style={styles.logoBackground2} />

        <View style={styles.profileIconContainer}>
          <FontAwesome name="user-circle" size={100} color="#222" />
          <TouchableOpacity style={styles.addIcon}>
            <FontAwesome name="plus" size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ color: '#222', marginTop: 20, fontSize:20}}>Add profile photo</Text>
        </View>
      </View>
      
      <View style={styles.bottomHalf}>
        <View style={styles.curve}></View>
        <Logo style={styles.logoBackground} />
        {/* <Logo2 /> */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button}>
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileIconContainer: {
    position: 'absolute',
    top: '40%',
    transform: [{ translateY: -50 }],
    alignItems: 'center',
  },
  addIcon: {
    position: 'absolute',
    bottom:50,
    right: 30,
    backgroundColor: Colors.dark.green_button,
    borderRadius: 50,
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHalf: {
    flex: 2,
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
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: Colors.dark.green_button,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  logoBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity:0.3
  },
  logoBackground2: {
    ...StyleSheet.absoluteFillObject,
    width:"200%",
    height: '200%',
    resizeMode: 'cover',
    position: 'absolute',
    top: -180,
    left: -200,
    opacity:0.3
  },
});
