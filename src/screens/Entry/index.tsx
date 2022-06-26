import React from 'react';
import { View, Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import SignInHeader from '@components/SignInHeader'

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const Entry = ({ navigation } ) => {
  return (
    <View style={styles.container}>
      <SignInHeader />
      <View style={styles.btnContainer}>
        <Pressable
            style={styles.signInScreenButton}
            onPress={() => navigation.navigate('SignIn')}
            >
            <Text style={styles.signInText}>로그인</Text>
        </Pressable>
        <Pressable
            style={[styles.signInScreenButton, styles.signInScreenButtonUp]}
            onPress={() => navigation.navigate('SignUp')}
            >
            <Text style={[styles.signInText, styles.signUpText]}>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent :'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },

  btnContainer : {
    position: 'absolute',
    bottom: 60,
  },
  
  signInScreenButton:{
    flex : 1,
    width: SCREEN_WIDTH,
    marginBottom: 15.5,
    backgroundColor:'#065E85',
    borderRadius: 8,
  },
  
  signInScreenButtonUp: {
    backgroundColor:'#fff',
    borderWidth: 1,
    borderColor: '#065E85',
  },
  
  signInText:{
      color:'#fff',
      textAlign:'center',
      lineHeight: 52,
      fontSize: 18,
      fontWeight: '400',
  },
  
  signUpText:{
    color:'#065E85',
  }
})

export default Entry;
