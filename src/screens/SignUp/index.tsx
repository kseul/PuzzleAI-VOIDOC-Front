import React, {useState, useMemo, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {commonStyle} from '~/src/styles/commonStyle';
import {SignUpScreenProps} from '~/src/types/type';
import API from '~/src/config';
import {theme} from '~/src/styles/theme';
import eyeOff from '@assets/images/Icon_feather_eye_off.png';
import eyeOn from '@assets/images/Icon_feather_eye_on.png';

const SignUp = ({navigation}: SignUpScreenProps) => {
  const [hiddenPw, setHiddenPw] = useState(true);
  const [hiddenPwCheck, setHiddenPwCheck] = useState(true);
  const [inputValue, setInputValue] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [uniqueEmailCheck, setUniqueEmailCheck] = useState(true);

  const {lastName, firstName, email, password, passwordCheck} = inputValue;

  const handleInputValue = (name: string, text: string) => {
    setInputValue({...inputValue, [name]: text});
  };

  const hiddenPwHandler = (isHidden: boolean) => {
    return isHidden ? eyeOff : eyeOn;
  };

  const validEmail = useMemo(() => {
    const emailRegex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    return emailRegex.test(email);
  }, [email]);

  useEffect(() => {
    if (!!validEmail) {
      const validUniqueEmail = () => {
        fetch(`${API.emailCheck}`, {
          method: 'POST',
          body: JSON.stringify({
            email,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'EMAIL_IS_ALREADY_REGISTERED') {
              setUniqueEmailCheck(false);
            } else {
              setUniqueEmailCheck(true);
            }
          });
      };

      const timer = setTimeout(() => {
        validUniqueEmail();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [email, validEmail]);

  const validPassword = useMemo(() => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
    return passwordRegex.test(password);
  }, [password]);

  const validPasswordCheck = useMemo(() => {
    return password === passwordCheck;
  }, [password, passwordCheck]);

  const allValidCheck = useMemo(() => {
    return (
      validEmail && uniqueEmailCheck && validPassword && validPasswordCheck
    );
  }, [validEmail, uniqueEmailCheck, validPassword, validPasswordCheck]);

  const onSubmit = () => {
    fetch(`${API.signUp}`, {
      method: 'POST',
      body: JSON.stringify({
        name: lastName + firstName,
        email,
        password,
        is_doctor: 'False',
      }),
    })
      .then(res => res.json())
      .then(
        data =>
          data.message === 'SUCCESS' &&
          (Alert.alert('회원가입 되었습니다.'), navigation.navigate('SignIn')),
      );
  };

  return (
    <KeyboardAvoidingView
      style={commonStyle.fullscreen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.innerFlex}>
        <ScrollView>
          <View style={styles.nameWrapper}>
            <View style={[styles.name, styles.lastName, styles.inputBox]}>
              <Text style={styles.inputText}>성</Text>
              <TextInput
                style={styles.input}
                placeholder="성을 입력해주세요"
                onChangeText={text => handleInputValue('lastName', text)}
              />
            </View>
            <View style={[styles.name, styles.firstName]}>
              <Text style={styles.inputText}>이름</Text>
              <TextInput
                style={styles.input}
                placeholder="이름을 입력해주세요"
                onChangeText={text => handleInputValue('firstName', text)}
              />
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputText}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력해주세요"
              value={inputValue.email}
              autoCapitalize="none"
              onChangeText={text => handleInputValue('email', text)}
            />
            {!uniqueEmailCheck && (
              <Text style={[styles.inputText, styles.textAlert]}>
                존재하는 이메일 주소입니다.
              </Text>
            )}
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputText}>비밀번호</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="비밀번호를 입력해주세요"
                secureTextEntry={hiddenPw}
                textContentType="oneTimeCode"
                value={inputValue.password}
                onChangeText={text => handleInputValue('password', text)}
              />
              <Pressable onPress={() => setHiddenPw(!hiddenPw)}>
                <Image
                  style={styles.iconEye}
                  source={hiddenPwHandler(hiddenPw)}
                />
              </Pressable>
            </View>
            {!!password && !validPassword && (
              <Text style={[styles.inputText, styles.textAlert]}>
                숫자와 영문자 조합 8자를 입력해주세요.
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.inputText}>비밀번호 확인</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="비밀번호를 다시 입력해주세요"
                secureTextEntry={hiddenPwCheck}
                textContentType="oneTimeCode"
                value={inputValue.passwordCheck}
                onChangeText={text => handleInputValue('passwordCheck', text)}
              />
              <Pressable onPress={() => setHiddenPwCheck(!hiddenPwCheck)}>
                <Image
                  style={styles.iconEye}
                  source={hiddenPwHandler(hiddenPwCheck)}
                />
              </Pressable>
            </View>
            {!validPasswordCheck && (
              <Text style={[styles.inputText, styles.textAlert]}>
                비밀번호가 일치하지 않습니다.
              </Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.innerFlex}>
          <Pressable
            style={allValidCheck ? commonStyle.ativeBtn : commonStyle.btn}
            onPress={onSubmit}
            disabled={!allValidCheck}>
            <Text style={commonStyle.btnText}>가입완료</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  innerFlex: {flex: 1},

  nameWrapper: {
    flexDirection: 'row',
    width: '100%',
  },

  name: {
    width: '50%',
  },

  firstName: {
    paddingLeft: 5,
  },

  lastName: {
    paddingRight: 5,
  },

  inputBox: {marginBottom: 29},

  input: {
    height: 48,
    padding: 15,
    marginBottom: 9,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.userGray,
    fontSize: theme.fontSizes.fontSmall,
  },

  inputText: {
    marginBottom: 7.5,
    fontSize: theme.fontSizes.fontSmall,
  },

  textAlert: {
    marginLeft: 15,
    color: theme.colors.userRed,
  },

  iconEye: {
    position: 'absolute',
    right: 10,
    bottom: 26,
  },
});

export default SignUp;
