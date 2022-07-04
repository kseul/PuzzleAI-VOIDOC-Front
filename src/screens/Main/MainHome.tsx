import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainHome = () => {
  useEffect(() => {
    AsyncStorage.getItem('accessd_token', (err, result) => {
      console.log(result);
    });
  }, []);

  return (
    <View>
      <Text>MainHome</Text>
    </View>
  );
};

export default MainHome;
