import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
// Adjust the import path as needed
import { router } from 'expo-router';
import Logo from '@/components/Logo';
import { Colors } from '@/constants/Colors';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxhooks';
import { getContacts } from '@/redux/slice/ActionsSlice';
import { addContactsToTheDataBase, getContactsFromDatabase } from '@/redux/slice/SetupSlice';
import { useSQLiteContext } from 'expo-sqlite';

const texts = [
  "We are setting things up for you",
  "Don't worry this is only a one-time process",
  "Almost there, just a moment",
  "Thank you for your patience",
];

const App = () => {
  const db = useSQLiteContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useSharedValue(0);
  
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
 
  const dispatch = useAppDispatch();

  const saveContactsToDatabase = async (contacts: any[]) => {
    try {
    
        await db.execAsync( 
          `
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS Contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            alias TEXT,
            contactUserId TEXT UNIQUE,
            contactUsername TEXT,
            contactEmail TEXT,
            contactPhoneNumber TEXT,
            profilePicture TEXT,
            status TEXT
          )`
        );
       console.log("The contacts which we want to addt o data bas is ",contacts);
        await contacts.forEach(contact => {
           db.runAsync(
            `INSERT INTO Contacts (
              alias,
              contactUserId,
              contactUsername,
              contactEmail,
              contactPhoneNumber,
              profilePicture,
              status
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              contact.alias,
              contact.contactUserId,
              contact.contactUsername,
              contact.contactEmail,
              contact.contactPhoneNumber,
              contact.profilePicture, // Assuming profilePicture is already in base64
              contact.status,
            ]
          );
        });
      
       const response = await db.getAllAsync(`SELECT * FROM Contacts`);
       console.log("the table shows is",response);
    } catch (error) {
      console.error('Failed to save contacts to database:', error);
    }
  };

  const fetchData = async () => {
    try {
      // Step 1: Fetch contacts
      const contactsResponse = await dispatch(getContacts());
  
      // Extract phone numbers from the fetched contacts
    //   const phoneNumbers = contactsResponse.map((contact: any) => contact.phoneNumbers.map((phone: any) => phone.number)).flat();
      console.log(contactsResponse);
      // Step 2: Add contacts to the database
      await dispatch(addContactsToTheDataBase(contactsResponse)).unwrap();
  
      // Step 3: Get contacts from the database
      const contactsFromDbResponse = await dispatch(getContactsFromDatabase()).unwrap();
  
      const data = contactsFromDbResponse;
      console.log(data);
  
      // Save contacts to the SQLite database
      await saveContactsToDatabase(data);
  
      // Navigate to the (tabs) screen
      router.navigate("(tabs)");
  
    } catch (error) {
      console.error('API call failed', error);
      // Optionally, handle the error if needed
    }
  };


// useEffect(() => {
//     (async () => {
//       const data =  await dispatch(getContacts());
//     ;
//     })();
// }, []);
  useEffect(() => {
    fetchData();

    progress.value = withTiming(100, { duration: 6000, easing: Easing.linear });

    const textInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(textInterval);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 2 * Math.PI * 45 * (1 - progress.value / 100),
  }));

  return (
    <View style={styles.container}>
      <Logo />
      <Svg height="100" width="100" viewBox="0 0 100 100" style={styles.progressCircle}>
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="#eee"
          strokeWidth="10"
          fill="none"
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r="45"
          stroke="#000"
          strokeWidth="10"
          fill="none"
          strokeDasharray={2 * Math.PI * 45}
          animatedProps={animatedProps}
        />
      </Svg>
      <Text style={styles.text}>
        {texts[currentIndex]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.green_background, // Colors.dark.green_background
  },
  progressCircle: {
    marginBottom: 20,
  },
  text: {
    color: Colors.dark.green_button,
    textAlign: 'center',
    fontSize:20,
    paddingHorizontal: 20,
  },
});

export default App;
