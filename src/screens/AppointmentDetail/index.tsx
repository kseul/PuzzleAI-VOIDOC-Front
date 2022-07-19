import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import DoctorDataCard from 'components/DoctorDataCard';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';

const AppointmentDetail = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={commonStyle.fullscreen}>
        <DoctorDataCard item={dataTest} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  stateBox: {
    width: 74,
    height: 20,
    textAlign: 'center',
    lineHeight: 19,
  },
});

export default AppointmentDetail;

const dataTest = {
  appointment_id: 1,
  doctor_name: '홍정의',
  doctor_hospital: '퍼즐AI병원',
  doctor_department: 'COVID-19',
  doctor_profile_img: 'https://reactjs.org/logo-og.png',
};
