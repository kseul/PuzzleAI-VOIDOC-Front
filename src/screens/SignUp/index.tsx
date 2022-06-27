import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {commonStyle} from '~/src/styles/commonStyle';
import {SignUpScreenProps} from '~/src/types/type';
import {theme} from '~/src/styles/theme';
import eyeOff from 'assets/images/Icon_feather_eye_off.png';
import eyeOn from 'assets/images/Icon_feather_eye_on.png';

const SignUp = ({navigation}: SignUpScreenProps) => {
  const [hiddenPw, setHiddenPw] = useState(true);
  const [hiddenPwCheck, setHiddenPwCheck] = useState(true);

  const hiddenPwHandler = isHidden => {
    return isHidden ? eyeOff : eyeOn;
  };

  return (
    <KeyboardAvoidingView
      style={commonStyle.fullscreen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.innerFlex}>
        <ScrollView>
          <View style={styles.nameWrapper}>
            <View style={[styles.name, styles.lastName]}>
              <Text style={styles.inputText}>성</Text>
              <TextInput style={styles.input} placeholder="성을 입력해주세요" />
            </View>
            <View style={[styles.name, styles.firstName]}>
              <Text style={styles.inputText}>이름</Text>
              <TextInput
                style={styles.input}
                placeholder="이름을 입력해주세요"
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputText}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력해주세요"
            />
          </View>
          <View>
            <Text style={styles.inputText}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry={hiddenPw}
              textContentType="oneTimeCode"
            />
            <Pressable onPress={() => setHiddenPw(!hiddenPw)}>
              <Image
                style={styles.iconEye}
                source={hiddenPwHandler(hiddenPw)}
              />
            </Pressable>
          </View>
          <View>
            <Text style={styles.inputText}>비밀번호 확인</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 다시 입력해주세요"
              secureTextEntry={hiddenPwCheck}
              textContentType="oneTimeCode"
            />
            <Pressable onPress={() => setHiddenPwCheck(!hiddenPwCheck)}>
              <Image
                style={styles.iconEye}
                source={hiddenPwHandler(hiddenPwCheck)}
              />
            </Pressable>
          </View>
        </ScrollView>
        <View style={styles.innerFlex}>
          <Pressable
            style={commonStyle.btn}
            onPress={() => navigation.navigate('SignIn')}>
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

  input: {
    height: 48,
    padding: 10,
    marginBottom: 27.5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.userGray,
    fontSize: theme.fontSizes.fontSmall,
  },

  inputText: {
    marginBottom: 7.5,
    fontSize: theme.fontSizes.fontSmall,
  },

  iconEye: {
    position: 'absolute',
    right: 10,
    bottom: 43,
  },
});

export default SignUp;
