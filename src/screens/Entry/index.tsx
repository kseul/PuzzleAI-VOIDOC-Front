import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import SignInHeader from '@components/SignInHeader'
import { EntryScreenProps } from '~/src/types/type';
import { theme } from '~/src/styles/theme'
import { commonStyle } from "~/src/styles/commonStyle";


const Entry = ({navigation}: EntryScreenProps) => {
  return (
    <View style={commonStyle.fullscreen}>
      <SignInHeader />
      <View>
        <Pressable
            style={[commonStyle.ativeBtn, styles.margin]}
            onPress={() => navigation.navigate('SignIn')}
            >
            <Text style={commonStyle.btnText}>로그인</Text>
        </Pressable>
        <Pressable
            style={[commonStyle.ativeBtn, commonStyle.emptyBtn]}
            onPress={() => navigation.navigate('SignUp')}
            >
            <Text style={[commonStyle.btnText, styles.signUpText]}>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  margin:{
    marginBottom: 15.5,
  },

  signUpText:{
    color: theme.colors.puzzleGreen,
  }
})

export default Entry;
