import React, {useState, useEffect, ReactElement} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import API from 'config';
import useFetch from 'components/useFetch';
import nextBtnM from 'assets/images/cal_next_m.png';
import nextBtnY from 'assets/images/cal_next_y.png';
import prevBtnM from 'assets/images/cal_prev_m.png';
import prevBtnY from 'assets/images/cal_prev_y.png';
import TimeTable from './TimeTable';

const WEEK: string[] = ['일', '월', '화', '수', '목', '금', '토'];
const TODAY_DATE = dayjs();

const AppointmentCalendar = () => {
  const [getDate, setGetDate] = useState({
    year: TODAY_DATE.get('y'),
    month: TODAY_DATE.get('M') + 1,
    date: TODAY_DATE.get('D'),
    day: TODAY_DATE.get('d'),
  });
  const [calendarDate, setCalendarDate] = useState<Number[]>([]);
  const [thisMonthDateIndex, setThisMonthDateIndex] = useState({
    thisMonthFirstDateIndex: 0,
    thisMonthlastDateIndex: 0,
  });
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);
  const [selectedDayActive, setSelectedDayActive] = useState(false);
  const [docWorkingDatas, setDocWorkingDatas] = useState({
    docWorkingDay: [],
    docWorkingTime: [],
  });
  const [userSelectedDate, setUserSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);

  const {docWorkingDay, docWorkingTime} = docWorkingDatas;
  const {year, month, date, day} = getDate;
  const {thisMonthFirstDateIndex, thisMonthlastDateIndex} = thisMonthDateIndex;

  const prevMonth = () => {
    if (month === 1) {
      setGetDate({
        ...getDate,
        year: getDate.year - 1,
        month: 12,
      });
    } else {
      setGetDate({
        ...getDate,
        month: getDate.month - 1,
      });
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setGetDate({
        ...getDate,
        year: getDate.year + 1,
        month: 1,
      });
    } else {
      setGetDate({
        ...getDate,
        month: getDate.month + 1,
      });
    }
  };

  useEffect(() => {
    const prevMonthLast = dayjs(`${year}-${month}`);
    const prevMonthLastDay = prevMonthLast
      .subtract(1, 'month')
      .endOf('month')
      .day();
    const prevMonthLastDate = prevMonthLast
      .subtract(1, 'month')
      .endOf('month')
      .date();

    const thisMonthLastDay = TODAY_DATE.endOf('month').day();
    const thisMonthLastDate = TODAY_DATE.endOf('month').date();

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

    setThisMonthDateIndex({
      ...thisMonthDateIndex,
      thisMonthFirstDateIndex,
      thisMonthlastDateIndex,
    });

    setCalendarDate(dates);
  }, [month]);

  const docWorkingDayUrl = `${API.WorkingDayView}/1/workingday?year=${year}&month=${month}`;
  const docWorkingDayData = useFetch(docWorkingDayUrl).result;
  const docWorkingTimeUrl = `${API.WorkingTimeView}/1/workingtime?year=${year}&month=${month}&day=${userSelectedDate}`;
  const docWorkingTimeData = useFetch(docWorkingTimeUrl);

  useEffect(() => {
    setDocWorkingDatas({
      ...docWorkingDatas,
      docWorkingDay: docWorkingDayData,
      docWorkingTime: docWorkingTimeData.working_time,
    });
  }, [month, userSelectedDate]);

  useEffect(() => {
    setDocWorkingDatas({
      ...docWorkingDatas,
      docWorkingTime: [],
    });
  }, [month]);

  const renderDate = ({item, index}: any): ReactElement => {
    const disabled =
      index < thisMonthFirstDateIndex || index > thisMonthlastDateIndex;

    const isToday =
      TODAY_DATE.isSame(`${year}-${month}-${item}`, 'day') && !disabled;

    const selectedDay =
      selectedDayActive && selectedDayNumber === item && !disabled;

    const docWorkingDay =
      Array.isArray(docWorkingDayData) &&
      docWorkingDayData.includes(item) &&
      TODAY_DATE.isBefore(`${year}-${month}-${item}`);

    const buttonActive = () => {
      setSelectedDayNumber(item);
      setSelectedDayActive(true);
    };

    const onClickDateValue = (e: number) => {
      setUserSelectedDate(e);
    };

    return (
      <Pressable
        style={[styles.flexBetween]}
        disabled={disabled && !docWorkingDay ? true : false}>
        <Text
          onPress={event => {
            buttonActive();
            onClickDateValue(event._dispatchInstances.memoizedProps.children);
          }}
          style={
            disabled
              ? [styles.dateItem, styles.opacity]
              : !docWorkingDay
              ? [styles.dateItem, styles.calendarDisabledDate]
              : selectedDay
              ? [styles.dateItem, styles.selectDayColor]
              : [styles.dateItem]
          }>
          {item}
        </Text>
        <View style={isToday && [styles.today]}></View>
        <View style={selectedDay && docWorkingDay && styles.selectDay}></View>
      </Pressable>
    );
  };

  return (
    <>
      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        style={[commonStyle.fullscreen]}>
        <View
          style={[styles.flexDirectionRow, styles.border, styles.marginTop]}>
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
                style={[
                  styles.profileDescFontSize,
                  styles.profileHospGrayColor,
                ]}>
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
            {year}년 {month}월
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
        <View
          style={[styles.flexWarp, styles.flexCenter, styles.marginTopLarge]}>
          {WEEK.map((item, index) => (
            <Text key={index} style={[styles.flexBetween, styles.calendarDate]}>
              {item}
            </Text>
          ))}
        </View>

        <View style={styles.marginTopMibble}>
          {calendarDate.length > 0 && (
            <FlatList
              data={calendarDate}
              numColumns={7}
              renderItem={renderDate}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </SafeAreaView>
      {Array.isArray(docWorkingTime) && docWorkingTime.length > 0 && (
        <TimeTable
          setSelectedTime={setSelectedTime}
          docWorkingTime={docWorkingTime}
        />
      )}
    </>
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

  selectDayColor: {
    color: '#43A8B5',
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

export default AppointmentCalendar;
