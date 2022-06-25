import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

const Splash = () => (
  <View style={styles.container}>
    <Image
        // style={styles.tinyLogo}
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