import React from 'react';
import { View, Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import SignInHeader from '@components/SignInHeader'
import { theme } from '~/src/styles/theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  },
  
  btnContainer : {
    position: 'absolute',
    bottom: 60,
    width: SCREEN_WIDTH - 66,
  },
  
  signInScreenButton:{
    flex : 1,
    marginBottom: 15.5,
    backgroundColor: theme.colors.puzzleGreen,
    borderRadius: 8,
  },
  
  signInScreenButtonUp: {
    backgroundColor:'#fff',
    borderWidth: 1,
    borderColor: theme.colors.puzzleGreen,
  },
  
  signInText:{
      color:'#fff',
      textAlign:'center',
      lineHeight: 52,
      fontSize: 18,
      fontWeight: '400',
  },
  
  signUpText:{
    color: theme.colors.puzzleGreen,
  }
})

export default Entry;
