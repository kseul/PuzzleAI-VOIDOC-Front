import React, {createContext} from 'react';
import {DocListProp} from 'types/type';
import {AssetObj} from 'types/type';

type DoctorInfoProp = {
  doctorInfo: DocListProp;
  setDoctorInfo: React.Dispatch<DocListProp>;
};

export const DoctorInfoContext = createContext<DoctorInfoProp>({
  doctorInfo: {
    id: 0,
    doctor_department: '',
    doctor_hospital: '',
    doctor_name: '',
    doctor_profile_img: '',
  },
  setDoctorInfo: () => {},
});

type SymtomInputValueProp = {
  symtomInputValue: string;
  setSymtomInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SymtomInputValueContext = createContext<SymtomInputValueProp>({
  symtomInputValue: '',
  setSymtomInputValue: () => {},
});

type SelectImageProp = {
  selectImage: AssetObj[];
  setSelectImage: React.Dispatch<React.SetStateAction<AssetObj[]>>;
};

export const SelectImageContext = createContext<SelectImageProp>({
  selectImage: [],
  setSelectImage: () => {},
});

type SelectProps = {
  selectDate: any | null;
  setSelectDate: React.Dispatch<React.SetStateAction<null>>;
};

export const SelectContext = createContext<SelectProps>({
  selectDate: {
    year: 0,
    month: 0,
    selectedDay: 0,
    selectedDate: '',
    selectedTime: '',
  },

  setSelectDate: () => {},
});
