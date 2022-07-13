import React, {useContext} from 'react';
import {
  View,
  Pressable,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import DoctorDataCard from 'components/DoctorDataCard';
import DateView from './DateView';
import SymtomView from './SymtomView';
import {AppointmentSubmitScreenProps} from 'types/type';
import ImgUploadView from './ImgUproadView';
import {SymtomInputValueContext} from 'AppointmentContext';

const AppointmentSubmit = ({navigation}: AppointmentSubmitScreenProps) => {
  const {symtomInputValue} = useContext(SymtomInputValueContext);

  const onSubmit = () => {
    navigation.navigate('AppointmentDetail'); // 수정
  };

  return (
    // TODO : 캘린더 구현 후 doctorInfo, date를 useContext로 받아와서 렌더링 & 컴포넌트 분리
    <KeyboardAvoidingView style={commonStyle.fullscreen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <DoctorDataCard item={dataTest} />
          <DateView />
          <SymtomView />
          <ImgUploadView />
        </ScrollView>
      </SafeAreaView>

      <View>
        <Pressable
          style={!!symtomInputValue ? commonStyle.ativeBtn : styles.submitBtn}
          onPress={onSubmit}
          disabled={!symtomInputValue}>
          <Text style={commonStyle.btnText}>진료예약</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
  },
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

  deleteBtnWrapper: {
    zIndex: 1,
  },

  deleteBtn: {
    position: 'absolute',
    right: 8,
    top: 2,
  },
});

export default AppointmentSubmit;

const dataTest = {
  appointment_id: 1,
  doctor_name: '홍정의',
  doctor_hospital: '퍼즐AI병원',
  doctor_department: 'COVID-19',
  doctor_profile_img: 'https://reactjs.org/logo-og.png',
};
