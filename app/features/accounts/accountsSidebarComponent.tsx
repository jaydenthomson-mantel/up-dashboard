import { List, ListItem, ListItemButton, Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { appendNextPage, selectAccount, selectAccountState, setAccountsWithPaging } from './accountSlice';
import { useEffect } from 'react';
import { getAccounts } from './accountsApi';
import { useAppDispatch } from '~/hooks';
import { validateAccessToken } from '~/features/sign-in/signInSlice';
import axios, { type AxiosResponse } from 'axios';
import { tryCatch } from "~/utils/tryCatch";
import type { PagedData } from "~/utils/pagedData";
import type { Account } from "./account";

interface AccountListProps {
  accessToken: string
  sidebarWidth?: number; // Optional prop to control sidebar width
}

async function fetchAccountsIfNeeded(
  accountListLength: number,
  accessToken: string,
  dispatch: ReturnType<typeof useAppDispatch>,
): Promise<void> {
  if (validateAccessToken(accessToken).error) { 
    return Promise.reject(new Error('Invalid access token')); 
  }
  if (accountListLength !== 0) { 
    return; 
  }

  const result = await getAccounts(accessToken);
  if (result.error != null) { 
    return Promise.reject(new Error('Error occurred during API call')); 
  }

  dispatch(setAccountsWithPaging(result.data));
}

async function fetchNextPage(
  nextPageUrl: string,
  accessToken: string,
  dispatch: ReturnType<typeof useAppDispatch>,
): Promise<void> {
  if (!nextPageUrl || validateAccessToken(accessToken).error) {
    return Promise.reject(new Error('Invalid next page URL or access token'));
  }

  const { data, error } = await tryCatch<AxiosResponse<PagedData<Account>>>(
    axios.get(nextPageUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );

  if (error != null) {
    return Promise.reject(new Error('Error occurred while fetching next page'));
  }

  dispatch(appendNextPage(data.data));
}

export default function AccountsSidebarComponent({
  accessToken,
  sidebarWidth = 300, // Default width of 300px 
}: Readonly<AccountListProps>) {
  const dispatch = useAppDispatch();
  const accountState = useSelector(selectAccountState);

  useEffect(() => {
    fetchAccountsIfNeeded(
      accountState.accounts.length,
      accessToken,
      dispatch
    );
  }, [accessToken]);

  return (
    <Box sx={{ width: `${sidebarWidth}px` }}>
      <List>
        {accountState.accounts.map((account) => (
          <ListItem 
            key={account.id} 
            component="div"
          >
            <ListItemButton 
              onClick={() => dispatch(selectAccount(account.id))}
              selected={accountState.selectedAccountId === account.id}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                width: '100%' 
              }}>
                <Typography variant="body1">
                  {account.attributes.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`$${account.attributes.balance.value}`}
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      {accountState.nextPageUrl && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => fetchNextPage(accountState.nextPageUrl!, accessToken, dispatch)}
            size="small"
          >
            Load More Accounts
          </Button>
        </Box>
      )}
    </Box>
  )
}