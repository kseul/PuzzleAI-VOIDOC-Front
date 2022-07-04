import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from 'components/useFetch';
import API from 'config';

const MainHome = () => {
  const url = `${API.departmentList}`;
  useFetch(url, 'GET');
  // useEffect(() => {
  //   AsyncStorage.getItem('access_token', (err, result) => {
  //     console.log(result);
  //   });
  // }, []);

  return (
    <View>
      <Text>MainHome</Text>
    </View>
  );
};

export default MainHome;
