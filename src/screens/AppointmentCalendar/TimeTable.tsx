import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {theme} from 'styles/theme';
import {TimeTableProp} from 'types/type';

const TimeTable = ({
  docWorkingTime,
  docAlreadyReservedTime,
  goAppointmentSubmit,
}: TimeTableProp) => {
  const renderItem = ({item}: any) => {
    return (
      <View style={[styles.timeTableflexCenter]}>
        <Text
          onPress={event => {
            goAppointmentSubmit(
              event._dispatchInstances.memoizedProps.children,
            );
          }}
          style={
            `${docAlreadyReservedTime}` === item
              ? [styles.timeTableBtn, styles.textCenter, styles.disabledBtn]
              : [styles.timeTableBtn, styles.textCenter]
          }>
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.timeTableBg, styles.paddingTopMibble]}>
      <FlatList
        data={docWorkingTime}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={index => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },

  paddingTopMibble: {
    paddingTop: 25,
    paddingHorizontal: 20,
  },

  timeTableflexCenter: {
    width: '33.3%',
    alignItems: 'center',
    textAlign: 'center',
  },

  timeTableBg: {
    position: 'absolute',
    left: 0,
    bottom: '-5.26%',
    flex: 1,
    width: '100%',
    height: 253,
    backgroundColor: theme.colors.CalendarTimeTableBg,
  },

  timeTableBtn: {
    marginBottom: 8,
    width: 100,
    height: 31,
    lineHeight: 31,
    fontSize: theme.fontSizes.fontRegular,
    color: theme.colors.CalendarTimeTextGray,
    borderColor: theme.colors.CalendarTimeDsblBorderGray,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },

  disabledBtn: {
    borderColor: theme.colors.CalendarTextLightGray,
    color: theme.colors.CalendarTimeDsblTextGray,
    backgroundColor: theme.colors.CalendarTimeDsblGray,
  },
});

export default TimeTable;
