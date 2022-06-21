const flex = {
  flexBox: (direction = 'row', align = 'center', justify = 'center') => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
};

const fontSizes = {
  fontLarge: '22px',
  fontMedium: '18px',
  fontRegular: '15px',
  fontSmall: '12px',

  weightBold: 700,
  weightRegular: 400,
};

const colors = {
  // Global
  puzzleGreen: '#065E85',

  // User (SignIn, SignUp)
  userGray: '#C4C4C4',
  userRed: '#E01E1E',

  // Main
  mainBorderGray: '#EBEBEB',
  mainTextGray: '#616161',
  mainIconGray: '#BCBCBC',
  mainCalendarGray: '#777777',

  // DocList
  docGray: '#717171',
  docHospGray: ' #ACACAC',

  // Calendar
  CalendarTextGray: '#616161',
  CalendarTextLightGray: '#BDBDBD',
  CalendarGreen: '#6BC7D3',
  CalendarCurGreen: '#43A8B5',
  CalendarActiveGreen: '#43A8B5',
  CalendarTimeTableBg: '#F4F4F4',
  CalendarTimeTextGray: '#777777',
  CalendarTimeDsblGray: '#EBEBEB',
  CalendarTimeDsblTextGray: '#A3A3A3',
  CalendarTimeDsblBorderGray: '#D1D1D1',

  // Reservation
  RsrvtTimeBgGray: '#E6E6E6',
  RsrvtTimeTextGray: '#989898',
  RsrvtInputBgGray: '#F4F4F4',
  RsrvtInputTextGray: '#777777',
  RsrvtGreen: '#065E85',
  RstvtDsblBtn: '#A3A3A3',
  RstvtInnerTitle: '#616161',
  RstvtInnerLightGray: '#A3A3A3',
  RstvtdottBorder: '#CECECE',
  RstvtInnerDesc: '#BDBDBD',
  RstvtDetailGray: '#777777',
};

const theme = {
  flex,
  fontSizes,
  colors,
};

export default theme;
