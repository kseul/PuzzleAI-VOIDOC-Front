import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {theme} from 'styles/theme';

const DateView = () => {
  // ToDo : useContext 로 데이터 가져오기
  const dateData = '2020-07-24(금) 오후 3:00';

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
