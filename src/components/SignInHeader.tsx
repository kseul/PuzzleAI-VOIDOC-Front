import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const SignInHeader = () => {
  return (
    <View style={styles.container}>
        <Image
          style={styles.header}
          source={require('@assets/images/logo_color.png')}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent :'center',
  },
  header: {
    position: 'absolute',
    top: 100,
  },
})

export default SignInHeader;