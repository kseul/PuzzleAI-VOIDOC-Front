import React, {useState, useCallback} from 'react';
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
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignUp = ({navigation}) => {
  const [hiddenPw, setHiddenPw] = useState(true);
  const [hiddenPwCheck, setHiddenPwCheck] = useState(true);

  const hiddenPwHandler = useCallback(isHidden => {
    return isHidden
      ? require('@assets/images/Icon_feather_eye_off.png')
      : require('@assets/images/Icon_feather_eye_on.png');
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.fullscreen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.inputWrapper}>
            <View style={styles.nameWrapper}>
              <View style={styles.lastName}>
                <Text style={styles.text}>성</Text>
                <TextInput
                  style={styles.input}
                  placeholder="성을 입력해주세요"
                />
              </View>
              <View style={styles.firstName}>
                <Text style={styles.text}>이름</Text>
                <TextInput
                  style={styles.input}
                  placeholder="이름을 입력해주세요"
                />
              </View>
            </View>
            <View>
              <Text style={styles.text}>이메일</Text>
              <TextInput
                style={styles.input}
                placeholder="이메일을 입력해주세요"
              />
            </View>
            <View>
              <Text style={styles.text}>비밀번호</Text>
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
              <Text style={styles.text}>비밀번호 확인</Text>
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
          </View>
        </ScrollView>
        <View style={styles.flex}>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.btnText}>가입완료</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    width: '100%',
    paddingTop: 40,
    paddingRight: 27,
    paddingBottom: 60,
    paddingLeft: 33,
    backgroundColor: 'white',
  },

  flex: {flex: 1},
  scroll: {flexGrow: 1},
  inputWrapper: {flex: 2},

  nameWrapper: {
    flexDirection: 'row',
    width: '100%',
  },

  lastName: {
    width: '50%',
    paddingRight: 5,
  },

  firstName: {
    width: '50%',
    paddingLeft: 5,
  },

  input: {
    height: 48,
    padding: 10,
    marginBottom: 27.5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C4C4C4',
    fontSize: 12,
  },

  text: {
    marginBottom: 7.5,
    fontSize: 12,
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
  },

  btnText: {
    color: 'white',
    fontSize: 18,
  },

  iconEye: {
    position: 'absolute',
    right: 10,
    bottom: 43,
  },
});

export default SignUp;
