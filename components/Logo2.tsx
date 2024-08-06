import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import Mylogo from '@/assets/svg/Mylogo.svg';
const Logo2 = () => {
  return (
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'baseline'}}>
        {/* <Text style={{fontSize:30,color:'#222',fontWeight:'bold'}}>Fagu</Text>
        <Ionicons name='call' size={24} color={Colors.dark.green_Icon} style={{ marginTop:10}}/>
        <Text style={{fontSize:28,color:'#222',fontWeight:'bold'}}>Talk</Text> */}
        <Mylogo width={200} height={100} resizeMode='contain'/>
      </View>
  )
}

export default Logo2

const styles = StyleSheet.create({})