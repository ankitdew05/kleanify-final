import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormHelperText from "@mui/material/FormHelperText";
import { useEffect, useState } from "react";
import baseURL from "../common/baseURL";
import { func } from "prop-types";
import axios from "axios";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  displayName: yup.string().required("You must enter display name"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  acceptTermsConditions: yup
    .boolean()
    .oneOf([true], "The terms and conditions must be accepted."),
});

function SignUpPage() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const UserId = params.id;
  //const [link , setLink] = useState('signin')
  useEffect(() => {
    document.title = "Sign-up to Kleanify";
    //const auth = localStorage.getItem('user');
    // if(planId){
    //   setLink( `signin/${planId}/${period}`)
    //   if (auth){
    //     if(JSON.parse(auth).paidStatus === false){
    //       createCheckout(auth)
    //     } else{
    //       navigate(`/dashboard/${JSON.parse(auth)._id}`)
    //     }
    //   }
    // }
    // if(auth){
    //   navigate(`/dashboard/${JSON.parse(auth)._id}`)
    // }
    const data = getData()
      .then((res) => {
        console.log(res);
        setEmail(res.email)
      })
      .catch((err) => console.log(err));
    //   console.log("email" ,email)
    // console.log("data", data);
  }, []);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      acceptTermsConditions: false,
    },
    resolver: yupResolver(schema),
  });

  console.log("User ID", UserId);
  const { isValid, dirtyFields, errors, setError } = formState;
  async function onSubmit({ displayName, password }) {
    let result = await fetch(`${baseURL}/register/${UserId}`, {
      method: "put",
      body: JSON.stringify({ displayName, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.result));
      console.log("localstorageset")
      localStorage.setItem("token", JSON.stringify(result.auth));
        navigate(`/onboarding`);
    } else {
      alert("Email Does not exist");
    }
  }



  async function getData() {
    const data = await axios
      .get(`${baseURL}/signupUser/${UserId}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
    return data;
  }
  //   } else {
  //     let result = await fetch(`${baseURL}/paidregister`, {
  //       method: "post",
  //       body: JSON.stringify({ displayName, email, password }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     result = await result.json();
  //     let id = await result.result._id;

  //     console.log("register Id", id);
  //     localStorage.setItem("user", JSON.stringify(result.result));
  //     localStorage.setItem("token", JSON.stringify(result.auth));

  //     let result2 = await fetch(`${baseURL}/create-checkout-session/${id}`, {
  //       method: "post",
  //       body: JSON.stringify({
  //         displayName,
  //         email,
  //         password,
  //         planId,
  //         period,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     result2 = await result2.json();
  //     localStorage.setItem("user.paidStatus", "true");
  //     console.warn(result2);
  //     window.open(`${result2.url}`);
  //   }
  // }

  // const createCheckout = async (auth) => {
  //   const id = await JSON.parse(auth)._id;
  //   console.warn(id);
  //   let result2 = await fetch(`${baseURL}/create-checkout-session/${id}`, {
  //     method: "post",
  //     body: JSON.stringify({
  //       planId,
  //       period,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   result2 = await result2.json();
  //   localStorage.setItem("user.paidStatus", "true");
  //   console.warn(result2);
  //   window.open(`${result2.url}`);
  // };

  return (
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
            checks content spam score & performs automated inbox placement tests
            with your Klaviyo account so you never land in the spam folder.
          </div>
        </div>
      </Box>

      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-start w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <a href="https://app.kleanify.co">
            <img
              className="w-128 h-36"
              src="https://kleanify.co/wp-content/uploads/2022/05/Kleanify-Full-Logo.png"
              alt="Kleanify-Logo"
            />
          </a>

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign up
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-4" to="/signin">
              Sign in
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Display name"
                  autoFocus
                  type="name"
                  error={!!errors.displayName}
                  helperText={errors?.displayName?.message}
                  variant="outlined"
                  input
                
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  contentEditab="false"
                  value = {email}
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

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password (Confirm)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl
                  className="items-center"
                  error={!!errors.acceptTermsConditions}
                >
                  <FormControlLabel
                    label="I agree to the Terms of Service and Privacy Policy"
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>
                    {errors?.acceptTermsConditions?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "#FCB900",
              }}
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Create your free account
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignUpPage;
