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
import { useEffect } from "react";

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




function HomePage() {
  const navigate = useNavigate();
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue("email", "admin@fusetheme.com", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("password", "admin", { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  const logOut=()=>{   
    navigate('/signout')
}

 async function onSubmit({ email, password }) {
    console.warn("email,password",email,password);
        let result = await fetch('https://klaviyo-backend.herokuapp.com/login', {
            method: "post",
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            },

        });

        result = await result.json()
        console.warn(result);
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/home")
        
        }else{
            alert("Email Does not exist")
        }
  }


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
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-black">
            Fuse helps developers to build organized and well coded dashboards
            full of beautiful and rich modules. Join us and start building your
            application today.
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
              onClick={logOut}
            >
              LogOut
            </Button>
        </div>
        
      </Box>

      
    </div>
  );
}

export default HomePage;
