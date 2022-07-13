import React, {useContext} from 'react';
import {DoctorInfoContext} from 'AppointmentContext';
import {Text, View, StyleSheet, Image} from 'react-native';
import {theme} from 'styles/theme';

const CalendarDoctorData = () => {
  const {doctorInfo} = useContext(DoctorInfoContext);

  return (
    <View style={[styles.flexDirectionRow, styles.border, styles.marginTop]}>
      <Image
        style={[styles.image, styles.marginRight]}
        source={{url: `${doctorInfo.doctor_profile_img}`}}
      />
      <View>
        <Text
          style={[
            styles.profileTitleFontSize,
            styles.profileDocColor,
            styles.marginBottomSamll,
          ]}>
          {doctorInfo.doctor_name} 선생님
        </Text>
        <View style={styles.flexDirectionRow}>
          <Text
            style={[
              styles.profileDescFontSize,
              styles.profileDocColor,
              styles.marginRightSmall,
            ]}>
            {doctorInfo.doctor_department} 전문의
          </Text>
          <Text
            style={[styles.profileDescFontSize, styles.profileHospGrayColor]}>
            {doctorInfo.doctor_hospital}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: 'row',
  },

  border: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },

  image: {
    width: 50,
    height: 50,
    marginBottom: 26,
  },

  marginTop: {
    marginTop: 32,
  },

  marginRight: {
    marginRight: 20,
  },

  marginRightSmall: {
    marginRight: 8,
  },

  marginBottomSamll: {
    marginBottom: 5,
  },

  profileTitleFontSize: {
    fontSize: theme.fontSizes.fontRegular,
  },

  profileDescFontSize: {
    fontSize: 13,
  },

  profileDocColor: {
    color: theme.colors.docGray,
  },

  profileHospGrayColor: {
    color: theme.colors.docHospGray,
  },
});

export default CalendarDoctorData;
