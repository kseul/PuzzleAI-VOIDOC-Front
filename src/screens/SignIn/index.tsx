import React from 'react';
import {Dimensions, StyleSheet, Pressable, TextInput ,Text, View} from 'react-native';
import SignInHeader from '@components/SignInHeader'

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const SignIn = () => {
  return (
      <View style={styles.container}>
        <SignInHeader />

        <View style={styles.inputMargin}>
          <Text style={styles.label}>이메일</Text>
          <TextInput 
            keyboardType='email-address'
            style={styles.input}
            placeholder="이메일을 입력해주세요" 
          />
        </View>

        <View>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="비밀번호를 입력해주세요" 
          />
        </View>

        <View style={styles.btnContainer}>
          <Pressable
            style={styles.signInScreenButton}
            // onPress={() => navigation.navigate('SignIn')}
            >
            <Text style={styles.signInBtnText}>로그인</Text>
          </Pressable>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },

  label: {
    marginBottom: 7.5,
  },

  input: {
    width: SCREEN_WIDTH - 66,
    height: 48,
    padding: 10,
    borderWidth: 1,
    borderRadius:8,
    borderColor: '#C4C4C4',
  },

  inputMargin: {
    marginBottom: 50,
  },

  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent :'center',
  },

  signInScreenButton:{
    position: 'absolute',
    bottom: 60,
    width: SCREEN_WIDTH - 66,
    backgroundColor:'#065E85',
    borderRadius: 8,
  },

  signInBtnText:{
    color:'#fff',
    textAlign:'center',
    lineHeight: 52,
    fontSize: 18,
    fontWeight: '400',
  },
})

export default SignIn;
