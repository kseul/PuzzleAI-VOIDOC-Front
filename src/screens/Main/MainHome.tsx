import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/asy nc-storage';
import useFetch from 'components/useFetch';
import API from 'config';

const MainHome = () => {
  const url = `${API.departmentList}`;
  const data = useFetch(url);
  console.log(data);

  return (
    <View>
      <Text>MainHome</Text>
    </View>
  );
};

export default MainHome;
