import {createContext} from 'react';
import {DocListProp} from 'types/type';

type doctorInfoProp = {
  doctorInfo: DocListProp;
  setDoctorInfo: React.Dispatch<DocListProp>;
};

export const DoctorInfoContext = createContext<doctorInfoProp>({
  doctorInfo: {
    id: 0,
    doctor_department: '',
    doctor_hospital: '',
    doctor_name: '',
    doctor_profile_img: '',
  },
  setDoctorInfo: () => {},
});

export const SymtomInputValueContext = createContext({
  symtomInputValue: '',
  setSymtomInputValue: () => {},
});
