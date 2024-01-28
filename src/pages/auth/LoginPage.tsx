import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { defaultLoginSuccess, loginUser, signInUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


interface FormFields {
  username: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const dispatch = useAppDispatch();
  const { loginSuccess } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const authUser = await loginUser(data);
    if (authUser) {
      dispatch(signInUser(authUser))
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      toast.success("Login successfully.")
      dispatch(defaultLoginSuccess());
      navigate("/")
    }
  }, [loginSuccess])


  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#120c41' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              placeholder="Enter username"
              helperText={errors?.username?.message}
              {...register("username", {
                required: {
                  value: true,
                  message: "Username or phone number is required.",
                },
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              autoComplete="current-password"
              label="Password"
              placeholder="Enter password"
              helperText={errors?.password?.message}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required.",
                },
              })}
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#120c41" }}
            >
              Sign In
            </Button>
            <Grid container>
            
              <Grid item>
                <Link to={"/sign-up"}>
                  <MuiLink variant="body2">
                    {"Don't have an account? Sign Up"}
                  </MuiLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;