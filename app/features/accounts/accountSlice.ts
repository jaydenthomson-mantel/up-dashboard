import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Account } from './account';

interface AccountState {
  selectedAccountId: string | null;
  accounts: Account[];
}

const initialState: AccountState = {
  selectedAccountId: null,
  accounts: [],
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
      // Set first account as selected by default if there's no selection yet
      if (!state.selectedAccountId && action.payload.length > 0) {
        state.selectedAccountId = action.payload[0].id;
      }
    },
    selectAccount: (state, action: PayloadAction<string>) => {
      state.selectedAccountId = action.payload;
    },
  },
});

export const { setAccounts, selectAccount } = accountSlice.actions;

// Selectors
export const selectAccounts = (state: RootState) => state.account.accounts;
export const selectSelectedAccountId = (state: RootState) => state.account.selectedAccountId;

export default accountSlice.reducer;