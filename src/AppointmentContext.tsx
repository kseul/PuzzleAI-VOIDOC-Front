import React, {createContext} from 'react';
import {DocListProp} from 'types/type';

type doctorInfoProp = {
  doctorInfo: DocListProp;
  setDoctorInfo: React.Dispatch<DocListProp>;
};

export const doctorInfoContext = createContext<doctorInfoProp>({
  doctorInfo: {
    id: 0,
    doctor_department: '',
    doctor_hospital: '',
    doctor_name: '',
    doctor_profile_img: '',
  },
  setDoctorInfo: () => {},
});

type SelectProps = {
  selectDate: any | null;
  setSelectDate: React.Dispatch<React.SetStateAction<null>>;
};

export const SelectContext = createContext<SelectProps>({
  selectDate: '',

  setSelectDate: () => {},
});
