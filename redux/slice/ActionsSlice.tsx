import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Contacts from 'expo-contacts';

// Define a type for the slice state
export interface actionState {
  isLoading: boolean;
  isError: boolean;
  error: any;
  isSuccess: boolean;
  contacts: any;
  phoneNumbers: string[];
}

// Define the initial state using that type
const initialState: actionState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  contacts: null,
  phoneNumbers: [],
};

export const actionSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setContacts(state, action: PayloadAction<any>) {
      state.contacts = action.payload;
    },
    setPhoneNumbers(state, action: PayloadAction<string[]>) {
      state.phoneNumbers = action.payload;
    },
  },
});

export const { setIsLoading, setIsError, setContacts, setPhoneNumbers } = actionSlice.actions;

 const cleanContacts = (contacts: string[]): string[] => {
  return contacts
    .map(number => number.replace(/\s+/g, '')) // Remove all spaces
    .filter(number => number.length >= 10 && number.length < 13) // Filter out numbers not in the range of 10 to 13 digits
    .map(number => {
      if (number.length === 11 && number.startsWith('0')) {
        number = number.substring(1); // Remove leading 0 for 11-digit numbers
      }
      return number.length === 10 ? `+91${number}` : number; // Add +91 to 10-digit numbers
    });
};

const getPhoneNumbers = (contacts: any): string[] => {
  if (!contacts) return [];
  
  // Extract phone numbers and clean them
  const phoneNumbers = contacts
    .map(contact => contact?.phoneNumbers?.map(phone => phone?.number))
    .flat()
    .filter(number => number); // Remove undefined numbers

  return cleanContacts(phoneNumbers);
};

export const getContacts = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        dispatch(setContacts(data));
        dispatch(setPhoneNumbers(getPhoneNumbers(data)));
        dispatch(setIsLoading(false));
        return getPhoneNumbers(data);
      }

    }
    
 
  } catch (error) {
    dispatch(setIsError(true));
    dispatch(setIsLoading(false));
    console.error(error);
  }
};

export default actionSlice.reducer;
