import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const Splash = () => (
  <View style={styles.container}>
    <Image
        source={require('@assets/images/logo_white.png')}
      />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent :'center',
    backgroundColor: '#065E85',
  },
})

export default Splash;