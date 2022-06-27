import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const SignInHeader = () => {
  return (
    <View style={styles.container}>
        <Image
          source={require('@assets/images/logo_color.png')}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
})

export default SignInHeader;