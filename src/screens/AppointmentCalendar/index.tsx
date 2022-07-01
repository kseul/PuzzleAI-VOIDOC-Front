import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyle } from 'styles/commonStyle';
import { theme } from 'styles/theme'

const AppointmentCalendar = () => {
  return (
      <SafeAreaView 
        edges={['bottom', 'left', 'right']} 
        style={[commonStyle.fullscreen]} >
        <View style={[
          styles.flexDirectionRow, 
          styles.border, 
          styles.marginTop]}>
          {/* <Image source={} /> */}
          <Text style={[
            styles.image, styles.marginRight
            ]}>profile image</Text>
          <View style={styles.marginBottom}>
            <Text style={[
              styles.profileTitleFontSize, 
              styles.profileDocColor,
              styles.marginBottomSamll
              ]}>홍정의 선생님</Text>
            <View style={styles.flexDirectionRow}>
              <Text style={[
                styles.profileDescFontSize, 
                styles.profileDocColor,
                styles.marginRightSmall
                ]}>피부과 전문의</Text>
              <Text style={[
                styles.profileDescFontSize,
                styles.profileHospGrayColor
                ]}>퍼즐AI병원</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
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
    backgroundColor: 'yellow'
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

  marginBottom: {
    marginBottom: 26,
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
    color: theme.colors.docGray
  },

  profileHospGrayColor: {
    color: theme.colors.docHospGray
  }
})

export default AppointmentCalendar;