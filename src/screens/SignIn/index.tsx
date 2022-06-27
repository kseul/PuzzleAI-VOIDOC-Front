import React from 'react';
import { StyleSheet, Pressable, TextInput ,Image ,Text, View, KeyboardAvoidingView, KeyboardAvoidingViewBase} from 'react-native';
import { theme } from '~/src/styles/theme'
import { commonStyle } from "~/src/styles/commonStyle";

const SignIn = () => {
  return (
      <KeyboardAvoidingView style={commonStyle.fullscreen}>
        <View style={styles.container}>
          <Image
              source={require('@assets/images/logo_color.png')}
            />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputMargin}>
            <Text style={styles.label}>이메일</Text>
            <TextInput 
              style={styles.input}
              keyboardType='email-address'
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
        </View>

        <View>
          <Pressable
            style={commonStyle.ativeBtn}
            >
            <Text style={commonStyle.btnText}>로그인</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },

  inputContainer: {
    flex: 3,
  },

  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent :'center',
  },
  label: {
    marginBottom: 7.5,
  },

  input: {
    height: 48,
    padding: 10,
    borderWidth: 1,
    borderRadius:8,
    borderColor: theme.colors.userGray,
  },

  inputMargin: {
    marginBottom: 50,
  },
})

export default SignIn;
