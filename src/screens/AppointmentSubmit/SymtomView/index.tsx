import React, {useContext} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {theme} from 'styles/theme';
import {SymtomInputValueContext} from 'AppointmentContext';

const SymtomView = () => {
  const {setSymtomInputValue} = useContext(SymtomInputValueContext);
  const handleInputValue = (text: string) => {
    setSymtomInputValue(text);
  };

  return (
    <View style={styles.submitContainer}>
      <Text style={styles.title}>증상입력</Text>
      <TextInput
        style={[styles.inputText, styles.textInputArea, styles.inputBackground]}
        placeholder="증상을 입력해주세요"
        placeholderTextColor={theme.colors.AppointmentInputTextGray}
        multiline
        onChangeText={text => handleInputValue(text)}
      />
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

  textInputArea: {
    height: 203,
    paddingHorizontal: 10,
    paddingTop: 13,
    textAlignVertical: 'top',
    color: theme.colors.AppointmentInputTextGray,
  },

  inputBackground: {
    backgroundColor: theme.colors.AppointmentInputBgGray,
  },

  inputText: {
    fontSize: theme.fontSizes.fontRegular,
  },
});

export default SymtomView;
