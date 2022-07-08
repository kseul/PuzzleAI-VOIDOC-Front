import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {theme} from 'styles/theme';

const DoctorDataCard = ({item}) => {
  return (
    <View style={[styles.listContents, styles.flexStyle]}>
      <Image source={{uri: item.doctor_profile_img}} style={styles.doctorImg} />
      <View>
        <Text style={styles.doctorName}>{item.doctor_name} 선생님</Text>
        <View style={styles.flexStyle}>
          <Text style={styles.departments}>
            {item.doctor_department} 전문의
          </Text>
          <Text style={styles.hospital}>{item.doctor_hospital}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexStyle: {flexDirection: 'row', alignItems: 'center'},

  listContents: {
    marginVertical: 32,
  },

  doctorImg: {width: 50, height: 50, borderRadius: 50, marginRight: 20},

  doctorName: {
    color: theme.colors.docGray,
    marginBottom: 8,
    fontSize: theme.fontSizes.fontRegular,
    fontWeight: '500',
  },

  departments: {
    marginRight: 8,
    color: theme.colors.docGray,
    fontSize: theme.fontSizes.fontSmall,
  },

  hospital: {
    color: theme.colors.docHospGray,
    fontSize: theme.fontSizes.fontSmall,
  },
});

export default DoctorDataCard;
