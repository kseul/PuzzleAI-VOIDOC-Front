import React, {useContext} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {theme} from 'styles/theme';
import {SelectContext} from 'AppointmentContext';

const DateView = () => {
  const {selectDate} = useContext(SelectContext);
  const dateData = `${selectDate.year}-${selectDate.month}-${selectDate.selectedDate}(${selectDate.selectedDay}) ${selectDate.selectTime}`;

  return (
    <View style={styles.submitContainer}>
      <Text style={[styles.title, styles.inputText]}>예약시간</Text>
      <TextInput style={[styles.input, styles.inputText]} value={dateData} />
    </View>
  );
};

const styles = StyleSheet.create({
  submitContainer: {
    marginBottom: 24,
  },

  title: {
    paddingBottom: 6,
    color: theme.colors.AppointmentGreen,
    fontWeight: '600',
  },

  input: {
    height: 48,
    padding: 15,
    color: theme.colors.AppointmentTimeTextGray,
    borderColor: theme.colors.userGray,
    backgroundColor: theme.colors.AppointmentTimeBgGray,
  },

  inputText: {
    fontSize: theme.fontSizes.fontRegular,
  },
});

export default DateView;
