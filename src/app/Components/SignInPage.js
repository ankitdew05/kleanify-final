import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import baseURL from "../common/baseURL";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function SignInPage() {
  const [id , setid] = useState('')
  const navigate = useNavigate();
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(()=>{
    document.title = 'Sign-in to Kleanify';
    const auth = localStorage.getItem('user');
    if(planId){
      if (auth){
        createCheckout(auth)
      }
    } 
    if(auth ){
      if(JSON.parse(auth).paidStatus === true){
        navigate(`/dashboard/${JSON.parse(auth)._id}`)
      }else{
        navigate(`/pricing`)
      }  
    } 
  },[])

  const { isValid, dirtyFields, errors } = formState;
  const params = useParams();
  const planId = params.id;
  const period = params.period;

  async function onSubmit({ email, password }) {
    if (!planId) {
      console.warn("email,password", email, password);
      let result = await fetch(`${baseURL}/login`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result.user);
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        if (!result.user.paidStatus) {
          navigate("/pricing");
        } else {
          navigate(`/dashboard/${result.user._id}`);
        }
      } else {
        alert("Email Does not exist");
      }
    }else{
      console.warn("email,password", email, password);
      let result = await fetch(`${baseURL}/login`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.auth) {
        setid(result.user._id)
        console.warn(id);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        let result2 = await fetch(`${baseURL}/create-checkout-session/${id}`, {
          method: "post",
          body: JSON.stringify({
            planId,
            period,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result2 = await result2.json();
        localStorage.setItem("user.paidStatus", "true");
        console.warn(result2);
        window.open(`${result2.url}`);
      } else {
        alert("Email Does not exist");
      }

      
    }
  }

  let theme = createTheme({
    palette: {
      primary: {
        main: "#0052cc",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
  });
  theme = responsiveFontSizes(theme);

  const createCheckout=async (auth)=>{
    const id = await JSON.parse(auth)._id
    console.warn(id);
    let result2 = await fetch(`${baseURL}/create-checkout-session/${id}`, {
      method: "post",
      body: JSON.stringify({
        planId,
        period,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result2 = await result2.json();
    console.warn(result2);
    window.open(`${result2.url}`);
  }

  // const googleAuth=()=> {
  //   window.open(
  //     `${baseURL}/auth/google`,
  //     "_self"
  //   );
  // }

  // const facebookAuth=()=> {
  //   window.open(
  //     `${baseURL}/auth/facebook`,
  //     "_self"
  //   );
  // }
  // const facebook = async ()=>{
  //    await fetch(`${baseURL}/auth/facebook`, {
  //         method: "GET",
  //         mdoe: "no-cors",
  //         headers:{
  //             'Content-Type': 'application/json',
  //             "Access-Control-Allow-Origin": "https://localhost:3000",
  //         },

  //     });

  // }

  return (
    <ThemeProvider>
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
        <Box className="bg-[#FFF6CF] relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden">
          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Box
              component="g"
              sx={{ color: "#FCB900" }}
              className="opacity-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </Box>
          </svg>
          <Box
            component="svg"
            className="absolute -top-64 -right-64 opacity-20"
            sx={{ color: "#FCB900" }}
            viewBox="0 0 220 192"
            width="220px"
            height="192px"
            fill="none"
          >
            <defs>
              <pattern
                id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width="220"
              height="192"
              fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
            />
          </Box>

          <div className="z-10 relative w-full max-w-2xl">
            <div className="text-7xl font-bold leading-none text-black">
              <div>The #1 Klaviyo </div>
              <div>Deliverability Solution</div>
            </div>
            <div className="mt-24 text-lg tracking-tight leading-6 text-black">
              Kleanify automatically validates emails, cleans subscriber lists,
              checks content spam score & performs automated inbox placement
              tests with your Klaviyo account so you never land in the spam
              folder.
            </div>
          </div>
        </Box>

        <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-start w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
          <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
            <a href="https://kleanify.co">
              <img
                className="w-128 h-36"
                src="https://kleanify.co/wp-content/uploads/2022/05/Kleanify-Full-Logo.png"
                alt="Kleanify-Logo"
              />
            </a>

            <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
              Sign in
            </Typography>
            <div className="flex items-baseline mt-2 font-medium">
              <Typography>Don't have an account?</Typography>
              <Link className="ml-4" to="/pricing">
                Get Started
              </Link>
            </div>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Email"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel
                        label="Remember me"
                        control={<Checkbox size="small" {...field} />}
                      />
                    </FormControl>
                  )}
                />

                <Link className="text-md font-medium" to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <Button
                style={{
                  backgroundColor: "#FCB900",
                }}
                variant="contained"
                color="secondary"
                className=" w-full mt-16"
                aria-label="Sign in"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Sign in
              </Button>
            </form>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default SignInPage;
