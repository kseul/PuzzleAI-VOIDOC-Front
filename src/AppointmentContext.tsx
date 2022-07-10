import React, {createContext, Dispatch, SetStateAction} from 'react';
import {DocListProp, AppointmentListProp} from 'types/type';

type SelectProps = {
  selectDate: any | null;
  setSelectDate: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SelectContext = createContext<SelectProps>({
  selectDate: '',

  setSelectDate: () => {},
});
