import { Colors } from '@/constants/Colors';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs} from 'expo-router';

export default function TabLayout() {

  

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.dark.green_background, // Set your desired background color here
          borderTopWidth: 0,
          padding:10, 
          paddingBottom:20,
          height:70,
        },
        tabBarActiveTintColor: Colors.dark.green_Icon, // Color for active tab icon
        tabBarInactiveTintColor: '#444', // Color for inactive tab icon
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"

        options={{
          title: 'Chat',
       
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore" // Ensure this matches the route for the Explore screen
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              name={focused ? "map-search" : "map-search-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="call" // Ensure this matches the route for the Call screen
        options={{
          title: 'Call',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "call" : "call-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="meet" // Ensure this matches the route for the Meet screen
        options={{
          title: 'Meet',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name={focused ? "globe" : "globe"}
              color={color}
            />
          ),
        }}
      />
      
    </Tabs>
  );
}
