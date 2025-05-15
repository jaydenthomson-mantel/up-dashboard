import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Account } from './account';
import type { PagedData } from '~/utils/pagedData';

interface AccountState {
  selectedAccountId: string | null;
  accounts: Account[];
  nextPageUrl: string | null;
}

const initialState: AccountState = {
  selectedAccountId: null,
  accounts: [],
  nextPageUrl: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountsWithPaging: (state, action: PayloadAction<PagedData<Account>>) => {
      state.accounts = action.payload.data;
      state.nextPageUrl = action.payload.links.next || null;
      // Set first account as selected by default if there's no selection yet
      if (!state.selectedAccountId && action.payload.data.length > 0) {
        state.selectedAccountId = action.payload.data[0].id;
      }
    },
    appendNextPage: (state, action: PayloadAction<PagedData<Account>>) => {
      state.accounts = [...state.accounts, ...action.payload.data];
      state.nextPageUrl = action.payload.links.next || null;
      // Set first account as selected by default if there's no selection yet
      if (!state.selectedAccountId && action.payload.data.length > 0) {
        state.selectedAccountId = action.payload.data[0].id;
      }
    },
    selectAccount: (state, action: PayloadAction<string>) => {
      state.selectedAccountId = action.payload;
    },
  },
});

export const { setAccountsWithPaging, appendNextPage, selectAccount } = accountSlice.actions;

// Selectors
export const selectAccountState = (state: RootState) => state.account

export default accountSlice.reducer;