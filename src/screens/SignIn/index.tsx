import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  Image,
  Text, 
  View, 
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SignInScreenProps } from '~/src/types/type';
import API from '~/src/config'
import { theme } from '~/src/styles/theme'
import { commonStyle } from "~/src/styles/commonStyle";
import logoColor from 'assets/images/logo_color.png';
import eyeOff from 'assets/images/Icon_feather_eye_off.png';
import eyeOn from 'assets/images/Icon_feather_eye_on.png';


const SignIn = ({navigation}:SignInScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPw, setHiddenPw] = useState(true);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  
  const RegularExpression = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const onSubmit = useCallback( () => {
    if(!email){
      return Alert.alert('알림', '이메일을 입력해주세요.')
    }

    if(!password){
      return Alert.alert('알림', '비밀번호를 입력해주세요.')
    }

    if(!RegularExpression.test(email)){
      return Alert.alert('알림', '이메일 형식에 맞게 입력해주세요.')
    }

    fetch(`${API.signIn}`, {
      method: 'POST',
      headers: {
        "Type-Of-Application": "app",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => response.json()).then((data) => 
      { 
        if(data.message === 'SUCCESS_PATIENT_LOGIN'){
          navigation.navigate('MainHome')
        } else if(data.message === 'WRONG_EMAIL_OR_PASSWORD'){
          return Alert.alert('알림', '잘못된 이메일 또는 비밀번호 입니다!')
        } else if(data.message === 'DOCTOR_CAN_NOT_LOGIN_ON_APP') {
          return Alert.alert('알림', '의사는 로그인할 수 없습니다.')
        }
      }
    );
  }, [email, password])

  const onChangeEmail = useCallback((text)=>{
    setEmail(text.trim())
  },[])

  const onChangePassword = useCallback((text)=>{
    setPassword(text.trim())
  },[])

  const hiddenPwIconClick = () => {
    setHiddenPw(!hiddenPw);
  }

  const canGoMainPage = !email || !password
  
  return (
    <View style={[commonStyle.fullscreen, styles.container]}>
      <View style={styles.logo}> 
        <Image
            source={logoColor}
          />
      </View>

      <ScrollView>
        <Text style={[styles.inputContainer, styles.label]}>이메일</Text>
        <TextInput
          style={[styles.input, styles.inputMargin]}
          placeholder="이메일을 입력해주세요" 
          keyboardType='email-address'
          value={email}
          onChangeText={onChangeEmail}
          autoCapitalize='none'
          returnKeyType='next'
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
          ref={emailRef}
          clearButtonMode='while-editing'
        />
        
        <Text style={styles.label}>비밀번호</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요" 
            value={password}
            secureTextEntry={hiddenPw && true}
            onChangeText={onChangePassword}
            onSubmitEditing={onSubmit}
            ref={passwordRef}
          />
          <Pressable 
            style={styles.eyeIcon}
            onPress={hiddenPwIconClick}
          >
            <Image source={hiddenPw ? eyeOff : eyeOn} />
          </Pressable>
        </View>
      </ScrollView>

      <Pressable 
          style={commonStyle.ativeBtn} 
          onPress={onSubmit}
      >
        <Text style={commonStyle.btnText}>로그인</Text>
      </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  logo: {
    marginTop: 15,
    alignItems: 'center',
  },
  
  inputContainer: {
    marginTop: 88,
  },

  label: {
    marginBottom: 7.5,
  },

  input: {
    position: 'relative',
    height: 48,
    padding: 10,
    borderWidth: 1,
    borderRadius:8,
    borderColor: theme.colors.userGray,
  },

  inputMargin: {
    marginBottom: 27.5,
  },

  eyeIcon: {
    position: 'absolute',
    top: 16,
    right: 15,
  }
})

export default SignIn;
