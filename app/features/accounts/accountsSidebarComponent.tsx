import { List, ListItem, ListItemButton, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount, selectAccountState, setAccountsWithPaging } from './accountSlice';
import { useEffect } from 'react';
import { getAccounts } from './accountsApi';
import { useAppSelector } from '~/hooks';
import { selectSignInState } from '~/features/sign-in/signInSlice';

interface AccountListProps {
  sidebarWidth?: number; // Optional prop to control sidebar width
}

export default function AccountsSidebarComponent({ 
  sidebarWidth = 300, // Default width of 300px 
}: Readonly<AccountListProps>) {
  const dispatch = useDispatch();
  const accountState = useSelector(selectAccountState);
  const signInState = useAppSelector(selectSignInState);

  useEffect(() => {
    // Check if accounts list is empty and user is signed in
    const fetchAccountsIfNeeded = async () => {
      if (accountState.accounts.length === 0 && signInState.signedIn) {
        // Fetch first page of accounts
        const result = await getAccounts(signInState.accessToken);
        if (result.data && !result.error) {
          dispatch(setAccountsWithPaging(result.data));
        }
      }
    };

    fetchAccountsIfNeeded();
  }, [accountState.accounts.length, dispatch, signInState]);

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