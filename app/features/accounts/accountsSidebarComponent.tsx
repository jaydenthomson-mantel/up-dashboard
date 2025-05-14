import { List, ListItem, ListItemButton, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAccount, selectAccountState, setAccountsWithPaging } from './accountSlice';
import { useEffect } from 'react';
import { getAccounts } from './accountsApi';
import { useAppDispatch } from '~/hooks';
import { validateAccessToken } from '~/utils/accessToken';

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
    <List sx={{ width: `${sidebarWidth}px` }}>
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
  )
}