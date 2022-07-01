import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { EntryScreenProps } from 'types/type';
import { theme } from 'styles/theme'
import { commonStyle } from "styles/commonStyle";
import { SafeAreaView } from 'react-native-safe-area-context';
import logoColor from 'assets/images/logo_color.png';

const Entry = ({navigation}: EntryScreenProps) => {
  return (
    <SafeAreaView style={commonStyle.fullscreen}>
        <View style={styles.container}>
          <Image source={logoColor} />
        </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 76,
  },

  marginBottom:{
    marginBottom: 15.5,
  },

  signUpText:{
    color: theme.colors.puzzleGreen,
  }
})

export default Entry;
