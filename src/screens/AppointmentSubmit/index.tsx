import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import DoctorDataCard from 'components/DoctorDataCard';
import {AppointmentSubmitScreenProps} from 'types/type';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import cameraLogo from 'assets/images/reservation-photo-icon.png';

const AppointmentSubmit = ({
  route,
  navigation,
}: AppointmentSubmitScreenProps) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = () => {};

  const handleInputValue = (input: string) => {
    setInputValue(input);
  };

  return (
    <KeyboardAvoidingView style={commonStyle.fullscreen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <DoctorDataCard item={dataTest} />
          <View style={styles.submitContainer}>
            <Text style={[styles.title, styles.inputText]}>예약시간</Text>
            <TextInput
              style={[styles.input, styles.inputText]}
              value={dateData}
            />
          </View>

          <View style={styles.submitContainer}>
            <Text style={styles.title}>증상입력</Text>
            <TextInput
              style={[
                styles.inputText,
                styles.textInputArea,
                styles.inputBackground,
              ]}
              placeholder="증상을 입력해주세요"
              placeholderTextColor={theme.colors.AppointmentInputTextGray}
              multiline
              onChangeText={text => handleInputValue(text)}
            />
          </View>

          <View style={styles.submitContainer}>
            <Text style={styles.title}>환부 사진 업로드 (선택)</Text>
            <ScrollView>
              <FlatList
                data={photoTest}
                horizontal
                renderItem={() => (
                  <Pressable
                    style={[styles.imageWrapper, styles.inputBackground]}>
                    <Image style={styles.cameraImage} source={cameraLogo} />
                  </Pressable>
                )}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View>
        <Pressable
          style={!!inputValue ? commonStyle.ativeBtn : styles.submitBtn}
          onPress={onSubmit}
          disabled={!inputValue}>
          <Text style={commonStyle.btnText}>진료예약</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},

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

  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 106,
    height: 106,
    marginRight: 6,
  },

  inputBackground: {
    backgroundColor: theme.colors.AppointmentInputBgGray,
  },

  inputText: {
    fontSize: theme.fontSizes.fontRegular,
  },

  cameraImage: {
    height: 25,
    width: 28,
  },

  submitBtn: {
    borderRadius: 8,
    backgroundColor: theme.colors.RstvtInnerLightGray,
  },
});

export default AppointmentSubmit;

const dateData = `2020-07-24(금) 오후 3:00`;
const dataTest = {
  appointment_id: 1,
  doctor_name: '홍정의',
  doctor_hospital: '퍼즐AI병원',
  doctor_department: 'COVID-19',
  doctor_profile_img: 'https://reactjs.org/logo-og.png',
};

const photoTest = [{photo_id: 1, photo_name: 'test1'}];
