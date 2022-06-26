import React from 'react';
import {StyleSheet, TouchableOpacity, TextInput ,Text, View} from 'react-native';
import SignInHeader from '@components/SignInHeader'


const SignIn = () => {
  return (
      <View style={styles.container}>
        <SignInHeader />

        <View style={styles.inputMargin}>
          <Text style={styles.label}>이메일</Text>
          <TextInput 
            style={styles.input}
            placeholder="이메일을 입력해주세요" 
          />
        </View>

        <View>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요" 
          />
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.signInScreenButton}
            // onPress={() => navigation.navigate('SignIn')}
            >
            <Text style={styles.signInText}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  inputMargin: {
    marginBottom: 50,
  },

  input: {
    width: 300,
    height: 48,
    padding: 10,
    borderWidth: 1,
    borderRadius:10,
    borderColor: '#C4C4C4',
  },

  label: {
    marginBottom: 7.5,
  },

  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent :'center',
  },

  signInScreenButton:{
    position: 'absolute',
    bottom: 60,
    width: 300,
    height: 52,
    marginBottom: 15.5,
    backgroundColor:'#065E85',
    borderRadius:10,
  },

  signInText:{
    color:'#fff',
    textAlign:'center',
    lineHeight: 52,
    fontSize: 18,
    fontWeight: '400',
  },
})

export default SignIn;
