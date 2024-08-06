import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import Encryption from '@/assets/svg/encryption.svg';
import SecureChat from '@/assets/svg/secure_chat.svg';
import FreeCalls from '@/assets/svg/free_calls.svg';
import Mylogo from '@/assets/svg/Mylogo.svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import Logo from '@/components/Logo';
import * as Contacts from 'expo-contacts';
import { useDispatch } from 'react-redux';
import { getContacts } from '@/redux/slice/ActionsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxhooks';

const Splash = () => {
  const colorScheme = useColorScheme();
  const [step, setStep] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;
  // const dispatch = useAppDispatch();
  const steps = [
    { text: "End-to-end encryption", image: <Encryption width={200} height={200} /> },
    { text: "Secure chat - No chats are saved anywhere", image: <SecureChat width={200} height={200} /> },
    { text: "Free effortless calls", image: <FreeCalls width={200} height={200} /> }
  ];
  // const {phoneNumbers} = useAppSelector(state=>state.actions);
  // useEffect(() => {
  //   (async () => {
  //     const data =  await dispatch(getContacts());
  //   ;
  //   })();
  // }, []);
  useEffect(() => {
    // Animate opacity to 0 and then back to 1 whenever the step changes
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.navigate('/login');
    }
  };

  return (
    <SafeAreaView style={colorScheme === 'dark' ? styles.container : styles.lightContainer}>
      {/* <Logo /> */}
      <Mylogo width={200} height={200} />
      <View style={styles.content}>
        <Animated.View style={[styles.animatedView, { opacity }]}>
          {steps[step].image}
          <Text style={[styles.text, { color: Colors.dark.green_button }]}>
            {steps[step].text}
          </Text>
        </Animated.View>
        </View>
        <View style={styles.bottomThings}>
        <View style={styles.ovalContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.oval,
                { backgroundColor: step === index ? Colors.dark.green_button : 'gray' }
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{step === steps.length - 1 ? 'Start' : 'Next'}</Text>
        </TouchableOpacity>

        </View>
      
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.green_background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    flex: 1,
    backgroundColor: Colors.light.green_background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  animatedView: {
    alignItems: 'center',
  },
  ovalContainer: {
    flexDirection: 'row',
    // marginVertical: 20,
    marginTop:20
  },
  oval: {
    width: 20,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    color: Colors.dark.green_button,
  },
  button: {
    backgroundColor: Colors.dark.green_button,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomThings:{
    position:'absolute',
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
  
    bottom:20,
    right:20,
    left:20,
  }
});
