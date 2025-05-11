import { List, ListItem, ListItemButton, Box, Typography } from '@mui/material';
import type { Account } from './account';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount, selectSelectedAccountId } from './accountSlice';

interface AccountListProps {
  accounts: Account[];
  sidebarWidth?: number; // Optional prop to control sidebar width
}

export default function AccountsSidebarComponent({ 
  accounts, 
  sidebarWidth = 300, // Default width of 300px 
}: Readonly<AccountListProps>) {
  const dispatch = useDispatch();
  const selectedAccountId = useSelector(selectSelectedAccountId);

  return (
    <List sx={{ width: `${sidebarWidth}px` }}>
      {accounts.map((account) => (
        <ListItem 
          key={account.id} 
          component="div"
        >
          <ListItemButton 
            onClick={() => dispatch(selectAccount(account.id))}
            selected={selectedAccountId === account.id}
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