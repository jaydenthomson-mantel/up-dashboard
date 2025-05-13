import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { validateAndSignIn, selectSignInError } from '~/features/sign-in/signInSlice';

export function meta() {
  return [
    { title: "Up - Sign In" },
  ];
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  navigate: ReturnType<typeof useNavigate>,
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const accessToken = data.get('accessToken') as string;
  const resultAction = await dispatch(validateAndSignIn(accessToken));
  
  if (validateAndSignIn.fulfilled.match(resultAction)) {
    navigate('/');
  }
};

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(selectSignInError);
  const error = Boolean(errorMessage);

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e, navigate, dispatch)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="accessToken">API Key</FormLabel>
            <TextField
              error={error}
              helperText={errorMessage ?? ''}
              name="accessToken"
              placeholder="••••••••••••••••••••••••••••••••••••"
              type="accessToken"
              id="accessToken"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={error ? 'error' : 'primary'}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
