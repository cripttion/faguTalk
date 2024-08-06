import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { Colors } from '@/constants/Colors';
import Forgot from '@/assets/svg/forgotPassword.svg';
import Logo from '@/components/Logo2';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPassword = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <AntDesign name='left' size={30} color='#222' />
      </TouchableOpacity>
      <View style={styles.topHalf}>
        <Logo />
        <Forgot width={300} height={300} style={styles.forgotIcon} />
      </View>
      <View style={styles.bottomHalf}>
        <View style={styles.curve}></View>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.instruction}>Enter your registered email address to reset your password.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          Your reset password link has been sent to your email. Please check your inbox and follow the instructions.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.green_background,
  },
  backButton: {
    margin: 10,
  },
  topHalf: {
    flex: 1,
    backgroundColor: Colors.dark.green_background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  forgotIcon: {
    marginBottom: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    color: '#888',
    marginVertical: 20,
    textAlign: 'center',
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
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  note: {
    fontSize: 14,
    color: '#888',
    marginVertical: 10,
    textAlign: 'center',
  },
});
