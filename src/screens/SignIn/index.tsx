import React from 'react';
import { StyleSheet, Pressable, TextInput ,Image ,Text, View, ScrollView} from 'react-native';
import { theme } from '~/src/styles/theme'
import { commonStyle } from "~/src/styles/commonStyle";

const SignIn = () => {
  return (
    <View style={[commonStyle.fullscreen, styles.container]}>
      <View style={styles.logo}> 
        <Image
            source={require('@assets/images/logo_color.png')}
          />
      </View>

      <ScrollView>
        <Text style={[styles.inputContainer, styles.label]}>이메일</Text>
        <TextInput 
          style={[styles.input, styles.inputMargin]}
          keyboardType='email-address'
          placeholder="이메일을 입력해주세요" 
        />

        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="비밀번호를 입력해주세요" 
        />
      </ScrollView>

      <Pressable style={commonStyle.ativeBtn}>
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
    height: 48,
    padding: 10,
    borderWidth: 1,
    borderRadius:8,
    borderColor: theme.colors.userGray,
  },

  inputMargin: {
    marginBottom: 27.5,
  },
})

export default SignIn;
