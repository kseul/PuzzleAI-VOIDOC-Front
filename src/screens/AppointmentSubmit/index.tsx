import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {SelectContext} from 'AppointmentContext';
const AppointmentSubmit = () => {
  const {selectDate} = useContext(SelectContext);

  return (
    <View>
      <Text>{selectDate.year}</Text>
      <Text>{selectDate.month}</Text>
      <Text>{selectDate.selectedDay}</Text>
      <Text>{selectDate.selectTime}</Text>
    </View>
  );
};

export default AppointmentSubmit;
