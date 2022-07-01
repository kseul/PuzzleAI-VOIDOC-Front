import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyle } from "styles/commonStyle";

const AppointmentCalendar = () => {
  return (
      <SafeAreaView edges={['bottom', 'left', 'right']} style={[commonStyle.fullscreen]} >
        <View>
          <Text style={styles.border}>AppointmentCalendar</Text>
          <View>
            <Text style={styles.border}>profile image</Text>
            <View style={styles.border}>
              <Text>홍정의 선생님</Text>
              <Text>피부과 전문의</Text>
              <Text>퍼즐AI병원</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    justifyContent: 'space-between',
  },
  border: {
    borderWidth: 1,
    borderColor: 'red',
  }
})

export default AppointmentCalendar;

