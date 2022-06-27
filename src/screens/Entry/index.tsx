import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { EntryScreenProps } from '~/src/types/type';
import { theme } from '~/src/styles/theme'
import { commonStyle } from "~/src/styles/commonStyle";

const Entry = ({navigation}: EntryScreenProps) => {
  return (
    <View style={commonStyle.fullscreen}>
      <View style={styles.container}>
        <Image
            source={require('@assets/images/logo_color.png')}
          />
      </View>
      <View>
        <Pressable
            style={[commonStyle.ativeBtn, styles.marginBottom]}
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
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 110,
  },

  marginBottom:{
    marginBottom: 15.5,
  },

  signUpText:{
    color: theme.colors.puzzleGreen,
  }
})

export default Entry;
