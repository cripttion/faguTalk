import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Appbar, Searchbar, Avatar, Menu } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const db = SQLite.useSQLiteContext();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async() => {
    const data = await db.getAllAsync('SELECT * FROM Contacts');
    setContacts(data);
  };

  const onChangeSearch = query => setSearchQuery(query);

  const filteredContacts = contacts.filter(contact =>
    contact.alias.toLowerCase().includes(searchQuery.toLowerCase())
  );
console.log(contacts);
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <View style={styles.headerContent}>
          <Appbar.BackAction color='#222' onPress={() => router.back()} />
          <Text style={styles.headerTitle}>Contacts</Text>
        </View>
        <View style={styles.headerActions}>
          <Appbar.Action icon="refresh" color='#222' onPress={fetchContacts} />
          <Menu
           style={{marginTop:50}}
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                color='#222'
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item onPress={() => {}} title="Add contacts" />
            {/* <Menu.Item onPress={() => {}} title="Option 2" /> */}
          </Menu>
        </View>
      </Appbar.Header>
      <View style={styles.content}>
        <Searchbar
          placeholder="Search..."
          placeholderTextColor={"gray"}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
          iconColor='gray'
          cursorColor={'gray'}
        />
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>router.navigate(`personalchat/${item.id}`)} style={styles.contactItem}>
              <Avatar.Image
                size={50}
                source={
                  item.profilePhoto
                    ? { uri: `data:image/png;base64,${item.profilePhoto}` }
                    : require('@/assets/images/secure_chat.png')
                }
              />
              <View style={styles.contactInfo}>
                <Text style={styles.alias}>{item.alias}</Text>
                <Text style={styles.phoneNumber}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.contactList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.green_background
  },
  header: {
   
    backgroundColor: Colors.dark.green_background,
    marginTop:-30,
    flexDirection:'row',
    justifyContent:'space-between' // Remove shadow on Android
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#222',
    
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // overflow: 'hidden',
  },
  searchbar: {
    margin: 10,
    marginBottom: 0,
    backgroundColor:Colors.dark.green_background,
    elevation:5,
    color:'#222'
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactInfo: {
    marginLeft: 10,
  },
  alias: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#555',
  },
  contactList: {
    paddingBottom: 20,
  },
});

export default ContactsScreen;
