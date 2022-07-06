import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';

import nextBtnM from 'assets/images/cal_next_m.png';
import nextBtnY from 'assets/images/cal_next_y.png';
import prevBtnM from 'assets/images/cal_prev_m.png';
import prevBtnY from 'assets/images/cal_prev_y.png';

const AppointmentCalendar = () => {
  const now = dayjs();
  const year = now.get('y');
  const month = now.get('M') + 1;

  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);
  const [selectedDayActive, setSelectedDayActive] = useState(false);

  const prevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  useEffect(() => {
    dayjs.locale('ko');
  }, [prevMonth, nextMonth]);

  const prevMonthLast = new Date(selectedYear, selectedMonth - 1, 0);
  const prevMonthLastDay = prevMonthLast.getDay();
  const prevMonthLastDate = prevMonthLast.getDate();

  const thisMonthLastDay = new Date(selectedYear, selectedMonth, 0).getDay();
  const thisMonthLastDate = new Date(selectedYear, selectedMonth, 0).getDate();

  const thisMonthDates = [...Array(thisMonthLastDate + 1).keys()].slice(1);
  const prevMonthDates = [];
  const nextMonthDates = [];

  if (prevMonthLastDay !== 6) {
    for (let i = 0; i < prevMonthLastDay + 1; i++) {
      prevMonthDates.unshift(prevMonthLastDate - i);
    }
  }

  for (let i = 1; i < 7 - thisMonthLastDay; i++) {
    nextMonthDates.push(i);
  }

  const dates = prevMonthDates.concat(thisMonthDates, nextMonthDates);
  const thisMonthFirstDateIndex = dates.indexOf(1);
  const thisMonthlastDateIndex = dates.lastIndexOf(thisMonthLastDate);

  const renderDate = ({item, index}: any) => {
    const disabled =
      index < thisMonthFirstDateIndex || index > thisMonthlastDateIndex;
    const isToday =
      now.isSame(`${year}-${selectedMonth}-${item}`, 'day') && !disabled;

    const buttonActive = () => {
      setSelectedDayNumber(item);
      setSelectedDayActive(true);
    };

    const selectedDay =
      selectedDayActive &&
      selectedDayNumber === item &&
      selectedMonth === month &&
      !disabled;

    return (
      <Pressable
        style={[styles.flexBetween]}
        onPress={() => buttonActive()}
        disabled={disabled && true}>
        <Text
          style={
            disabled
              ? [styles.dateItem, styles.opacity]
              : isToday
              ? [styles.dateItem, styles.positionRel]
              : [styles.dateItem]
          }>
          {item}
        </Text>
        <View style={isToday && styles.today}></View>
        <View style={selectedDay && styles.selectDay}></View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[commonStyle.fullscreen]}>
      <View style={[styles.flexDirectionRow, styles.border, styles.marginTop]}>
        {/* TODO : 데이터 통신 후 <Image> 로 바꿀 예정 */}
        {/* <Image source={} /> */}
        <Text style={[styles.image, styles.marginRight]}>테스트 이미지</Text>
        <View>
          <Text
            style={[
              styles.profileTitleFontSize,
              styles.profileDocColor,
              styles.marginBottomSamll,
            ]}>
            테스트 선생님
          </Text>
          <View style={styles.flexDirectionRow}>
            <Text
              style={[
                styles.profileDescFontSize,
                styles.profileDocColor,
                styles.marginRightSmall,
              ]}>
              피부과 전문의
            </Text>
            <Text
              style={[styles.profileDescFontSize, styles.profileHospGrayColor]}>
              퍼즐AI병원
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.flexWarp, styles.flexCenter, styles.marginTop]}>
        <Pressable style={styles.marginTopSmall}>
          <Image source={prevBtnY} />
        </Pressable>
        <Pressable
          style={[styles.btnPrevPadding, styles.marginTopSmall]}
          onPress={() => prevMonth()}>
          <Image source={prevBtnM} />
        </Pressable>

        <Text style={styles.calendarFontSize}>
          {selectedYear}년 {selectedMonth}월
        </Text>

        <Pressable
          style={[styles.btnNextPadding, styles.marginTopSmall]}
          onPress={() => nextMonth()}>
          <Image source={nextBtnM} />
        </Pressable>
        <Pressable style={styles.marginTopSmall}>
          <Image source={nextBtnY} />
        </Pressable>
      </View>
      <View style={[styles.flexWarp, styles.flexCenter, styles.marginTopLarge]}>
        {WEEK.map((item, index) => (
          <Text key={index} style={[styles.flexBetween, styles.calendarDate]}>
            {item}
          </Text>
        ))}
      </View>

      <View style={styles.marginTopMibble}>
        <FlatList
          data={dates}
          numColumns={7}
          renderItem={renderDate}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  positionRel: {
    position: 'relative',
    flex: 1,
  },

  today: {
    position: 'absolute',
    top: -1,
    left: 6,
    width: 36,
    height: 36,
    borderColor: theme.colors.CalendarCurGreen,
    borderStyle: 'dashed',
    borderRadius: 18,
    borderWidth: 1,
  },

  selectDay: {
    position: 'absolute',
    top: -1,
    left: 6,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4F3F7',
    zIndex: -1,
  },

  opacity: {
    display: 'none',
  },

  dateItem: {
    marginVertical: 8,
    textAlign: 'center',
    marginBottom: 24,
  },

  flexWarp: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  flexDirectionRow: {
    flexDirection: 'row',
  },

  flexCenter: {
    justifyContent: 'center',
  },

  flexBetween: {
    flex: 1,
    justifyContent: 'space-between',
    textAlign: 'center',
  },

  border: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },

  image: {
    width: 50,
    height: 50,
    backgroundColor: 'gold',
    marginBottom: 26,
  },

  marginTopLarge: {
    marginTop: 38,
  },

  marginTop: {
    marginTop: 32,
  },

  marginTopMibble: {
    marginTop: 25,
  },

  marginTopSmall: {
    marginTop: 5,
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
    color: theme.colors.docGray,
  },

  profileHospGrayColor: {
    color: theme.colors.docHospGray,
  },

  calendarFontSize: {
    fontSize: 19,
    fontWeight: '400',
    paddingLeft: 30,
    paddingRight: 30,
    color: theme.colors.CalendarTextGray,
  },

  btnPrevPadding: {
    paddingLeft: 18,
  },

  btnNextPadding: {
    paddingRight: 18,
  },

  calendarDate: {
    color: '#6BC7D3',
  },

  calendarDisabledDate: {
    color: theme.colors.CalendarTextLightGray,
  },

  calendarInnerNumber: {
    fontSize: theme.fontSizes.fontRegular,
    fontWeight: '400',
    color: theme.colors.CalendarTextGray,
  },

  todayActive: {
    backgroundColor: 'blue',
  },
});

// let generateRandomNum = () => Math.floor(Math.random() * 1001);

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

export default AppointmentCalendar;
