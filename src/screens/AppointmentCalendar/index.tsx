import React, {useState, useEffect, ReactElement, useContext} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {commonStyle} from 'styles/commonStyle';
import {theme} from 'styles/theme';
import API from 'config';
import {AppointmentCalendarScreenProps} from 'types/type';
import {SelectContext} from 'AppointmentContext';
import {getToken} from 'AuthContext';
import nextBtnM from 'assets/images/cal_next_m.png';
import nextBtnY from 'assets/images/cal_next_y.png';
import prevBtnM from 'assets/images/cal_prev_m.png';
import prevBtnY from 'assets/images/cal_prev_y.png';
import TimeTable from './TimeTable';
import CalendarDoctorData from './CalendarDoctorData';

const WEEK: string[] = ['일', '월', '화', '수', '목', '금', '토'];
const TODAY_DATE = dayjs();

const AppointmentCalendar = ({
  route,
  navigation,
}: AppointmentCalendarScreenProps) => {
  const [getDate, setGetDate] = useState({
    year: TODAY_DATE.get('y'),
    month: TODAY_DATE.get('M') + 1,
    date: TODAY_DATE.get('D'),
    day: TODAY_DATE.get('d'),
  });
  const [calendarDate, setCalendarDate] = useState<number[]>([]);
  const [thisMonthDateIndex, setThisMonthDateIndex] = useState({
    thisMonthFirstDateIndex: 0,
    thisMonthlastDateIndex: 0,
  });
  const [selectedDayNumber, setSelectedDayNumber] = useState(0);
  const [userSelectedDate, setUserSelectedDate] = useState(0);
  const [selectedDayActive, setSelectedDayActive] = useState(false);
  const [docWorkingDatas, setDocWorkingDatas] = useState({
    docWorkingDay: [],
    docWorkingTime: [],
    docAlreadyReservedTime: [],
  });
  const [loaded, setLoaded] = useState(true);

  const {selectDate, setSelectDate} = useContext(SelectContext);

  const {year, month} = getDate;
  const {thisMonthFirstDateIndex, thisMonthlastDateIndex} = thisMonthDateIndex;
  const {docWorkingDay, docWorkingTime, docAlreadyReservedTime} =
    docWorkingDatas;

  const {id, doctor_name} = route.params;

  useEffect(() => {
    navigation.setOptions({title: `${doctor_name} 선생님`});
  }, []);

  const doctorWorkingDayFatchData = async () => {
    const token = await getToken();
    const getData = await fetch(
      `${API.WorkingDayView}/${id}/workingday?year=${year}&month=${month}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    );
    const res = await getData.json();
    const data = res.result;
    if (!data) {
      setLoaded(false);
      return;
    }
    setDocWorkingDatas({
      ...docWorkingDatas,
      docWorkingDay: data,
      docWorkingTime: [],
    });
  };

  const doctorWorkingTimeFatchData = async () => {
    const token = await getToken();
    const getData = await fetch(
      `${API.WorkingTimeView}/${id}/workingtime?year=${year}&month=${month}&day=${userSelectedDate}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    );
    if (getData.status === 200) {
      const res = await getData.json();
      const data = res.working_time;
      const alreadyData = res.appointmented_time;
      if (!data) {
        setLoaded(false);
        return;
      }
      setDocWorkingDatas({
        ...docWorkingDatas,
        docWorkingTime: data,
        docAlreadyReservedTime: alreadyData,
      });
    }
  };

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
    setCalendarDate(dates);

    const thisMonthFirstDateIndex = dates.indexOf(1);

    const thisMonthlastDateIndex = dates.lastIndexOf(thisMonthLastDate);

    setThisMonthDateIndex({
      ...thisMonthDateIndex,
      thisMonthFirstDateIndex,
      thisMonthlastDateIndex,
    });

    setDocWorkingDatas({
      ...docWorkingDatas,
      docWorkingDay: [],
    });

    doctorWorkingDayFatchData();
  }, [month]);

  const showTimeTable = () => {
    doctorWorkingTimeFatchData();
  };

  useEffect(() => {
    if (userSelectedDate) showTimeTable();
  }, [selectedDayNumber]);

  const renderDate = ({item, index}: any): ReactElement => {
    const disabled =
      index < thisMonthFirstDateIndex || index > thisMonthlastDateIndex;

    const isToday =
      TODAY_DATE.isSame(`${year}-${month}-${item}`, 'day') && !disabled;

    const selectedDay =
      selectedDayActive && selectedDayNumber === item && !disabled;

    const docWorkingDays =
      docWorkingDay.includes(item) &&
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
        disabled={disabled && !docWorkingDays ? true : false}>
        <Text
          onPress={event => {
            showTimeTable();
            buttonActive();
            onClickDateValue(event._dispatchInstances.memoizedProps.children);
          }}
          style={
            disabled
              ? [styles.dateItem, styles.opacity]
              : !docWorkingDays
              ? [styles.dateItem, styles.calendarDisabledDate]
              : selectedDay
              ? [styles.dateItem, styles.selectDayColor]
              : [styles.dateItem]
          }>
          {item}
        </Text>
        <View style={selectedDay && docWorkingDays && styles.selectDay}></View>
        <View style={isToday && styles.today}></View>
      </Pressable>
    );
  };

  const goAppointmentSubmit = (time: any) => {
    const dayIndexDeduplication = Math.ceil(
      (calendarDate.indexOf(selectedDayNumber) + 30) % 7,
    );
    const dayIndex = Math.ceil(calendarDate.indexOf(selectedDayNumber) % 7);

    const amPmDivision = Number(time.substr(0, 2));
    const pmTime = `오후 ${Math.abs(12 - amPmDivision)}:00`;
    const amTime = `오전 ${time}`;

    setSelectDate({
      ...selectDate,
      year,
      month,
      selectedDate: selectedDayNumber,
      selectedDay:
        selectedDayNumber > 25 ? WEEK[dayIndexDeduplication] : WEEK[dayIndex],
      selectTime: amPmDivision > 12 ? pmTime : amTime,
      selectedPostTime: amPmDivision,
    });

    if (time === `${docAlreadyReservedTime}`) {
      return;
    }
    navigation.navigate('AppointmentSubmit');
  };

  return (
    <>
      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        style={[commonStyle.fullscreen]}>
        <CalendarDoctorData />
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
              keyExtractor={index => index.toString()}
            />
          )}
        </View>
      </SafeAreaView>
      {docWorkingTime.length > 0 && (
        <TimeTable
          docWorkingTime={docWorkingTime}
          docAlreadyReservedTime={docAlreadyReservedTime}
          goAppointmentSubmit={goAppointmentSubmit}
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
    zIndex: -10,
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
