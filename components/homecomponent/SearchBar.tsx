import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = () => {
    // Handle the search action here
    onSearch(searchTerm)
    console.log('Search Term:', searchTerm);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="search" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearchSubmit}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:Colors.dark.green_background,
    borderRadius: 20,
    paddingHorizontal: 10,
    elevation: 1, // Optional: Adds shadow for Android
    shadowColor: '#000', // Optional: Adds shadow for iOS
    shadowOffset: { width: 0, height: 1 }, // Optional: Adds shadow for iOS
    shadowOpacity: 0.2, // Optional: Adds shadow for iOS
    shadowRadius: 1, // Optional: Adds shadow for iOS
  },
  icon: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
});
