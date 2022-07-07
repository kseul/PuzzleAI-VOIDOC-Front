import React, {useContext, useRef, useState} from 'react';
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
import {theme} from 'styles/theme';
import {commonStyle} from 'styles/commonStyle';
import logoColor from 'assets/images/logo_color.png';
import {AuthContext} from 'AuthContext';

const SignIn = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });
  const {signIn} = useContext(AuthContext);
  const {email, password} = userInput;

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const hadleUserInput = (text: string, key: string) => {
    setUserInput({...userInput, [key]: text.trim()});
  };

  const onSubmit = async () => {
    if (!email) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }

    const regEx = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!password) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }

    if (!regEx.test(email)) {
      return Alert.alert('알림', '이메일 형식에 맞게 입력해주세요.');
    }
    try {
      signIn(email, password);
    } catch (error) {
      throw new Error('API fetch error');
    }
  };

  return (
    <View style={[commonStyle.fullscreen, styles.container]}>
      <View style={styles.logo}>
        <Image source={logoColor} />
      </View>

      <ScrollView>
        <Text style={[styles.inputContainer, styles.label]}>이메일</Text>
        <TextInput
          style={[styles.input, styles.inputMargin]}
          placeholder="이메일을 입력해주세요"
          keyboardType="email-address"
          value={userInput.email}
          onChangeText={(text: string) => hadleUserInput(text, 'email')}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
          ref={emailRef}
          clearButtonMode="while-editing"
        />

        <Text style={styles.label}>비밀번호</Text>

        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력해주세요"
          value={userInput.password}
          secureTextEntry
          onChangeText={(text: string) => hadleUserInput(text, 'password')}
          onSubmitEditing={onSubmit}
          ref={passwordRef}
        />
      </ScrollView>

      <Pressable style={commonStyle.ativeBtn} onPress={onSubmit}>
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
    borderRadius: 8,
    borderColor: theme.colors.userGray,
  },

  inputMargin: {
    marginBottom: 27.5,
  },
});

export default SignIn;
