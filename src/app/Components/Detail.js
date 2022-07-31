import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
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
import axios from "axios";
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  apiKey: yup.string().required("You must enter Api Key"),
  url: yup.string().required("You must enter a URL"),
});

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

function Detail() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    document.title = "Onboarding to Kleanify";
    const data = getData()
      .then((res) => {
        console.log(res);
        if (res[0].apiKey) {
          navigate(`/`);
        }
      })
      .catch((err) => console.log(err));
    console.log("data", data);
  }, []);

  const navigate = useNavigate();
  const params = useParams();
  const auth = localStorage.getItem('user');

  const { isValid, dirtyFields, errors, setError } = formState;

  async function getData() {
    const data = await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
    return data;
  }

  async function onSubmit({ apiKey, url }) {
    console.warn(apiKey, url);
    let result = await fetch(`${baseURL}/paiduser/${JSON.parse(auth)._id}`, {
      method: "put",
      body: JSON.stringify({ apiKey, url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate(`/onboarding1`);
  }

  return (
    <div className="relative bg-[#FFF6CF] opacity-90  flex flex-col flex-auto min-w-0 overflow-hidden">
      <div className="relative pt-32 pb-48 sm:pt-80 sm:pb-96 px-24 sm:px-64 overflow-hidden">
      <svg
        className="-z-1 absolute inset-0 pointer-events-none"
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Box
          component="g"
          sx={{ color: "#e8d78a" }}
          className="opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="100"
        >
          <circle r="234" cx="196" cy="23" />
          <circle r="234" cx="790" cy="491" />
        </Box>
      </svg>
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.05 } }}
        >
          <h2 className="text-xl font-semibold">Feature 1</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
        >
          <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
            Lets Get Started
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.15 } }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="flex justify-center mt-40 sm:mt-80"
        >
          <Paper className="flex flex-col lg:flex-row max-w-sm lg:max-w-xl overflow-hidden">
            <div className="p-24 sm:p-32 lg:p-40">
              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full mt-32"
                onSubmit={handleSubmit(onSubmit)}
              >
              
                <Controller
                  name="apiKey"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="API Key"
                      autoFocus
                      type="name"
                      error={!!errors.apiKey}
                      helperText={errors?.apiKey?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
             
                <Controller
                  name="url"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Website Url"
                      type="name"
                      error={!!errors.url}
                      helperText={errors?.url?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Typography className="ml-2 leading-5">
                  Go to Klaviyo Account -- Settings -- API Keys to get your
                  Klaviyo Private API Key.
                </Typography>

                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    backgroundColor: "#FCB900",
                  }}
                  className="w-full mt-24"
                  aria-label="Register"
                  type="submit"
                  size="large"
                >
                  Submit
                </Button>
              </form>
              <div className="felx text-right  mt-24 ">
                <Typography className="text-3xl font-bold justify-center underline">
                  <Link to="/onboarding1">Next</Link>
                </Typography>
              </div>
            </div>
          </Paper>
        </motion.div>
      </div>
    </div>
  </div>
  );
}

export default Detail;

// import { useState } from "react";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Divider from "@mui/material/Divider";
// import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import TextField from "@mui/material/TextField";
// import { Controller, useForm } from "react-hook-form";
// import { useParams, useNavigate } from "react-router-dom";
// import baseURL from "../common/baseURL";
// import axios from "axios";

// const schema = yup.object().shape({
//   apiKey: yup.string().required("You must enter Api Key"),
//   url: yup.string().required("You must enter a URL"),
// });

// const defaultValues = {
//   displayName: "",
//   email: "",
//   password: "",
//   passwordConfirm: "",
//   acceptTermsConditions: false,
// };

// function Detail() {
//    const { control, formState, handleSubmit, reset } = useForm({
//     mode: "onChange",
//     defaultValues,
//     resolver: yupResolver(schema),
//   });
//   useEffect(() => {
//     const data = getData()
//       .then((res) => {
//         console.log(res);
//         if (res[0].apiKey) {
//           navigate(`/`);
//         }
//       })
//       .catch((err) => console.log(err));
//     console.log("data", data);
//   }, []);

//   const navigate = useNavigate();
//   const params = useParams();
//   const id = params.id;
//   console.log("User ID", id);
//   const { isValid, dirtyFields, errors, setError } = formState;

//   async function getData() {
//     const data = await axios
//       .get(`${baseURL}/paiduser/${id}`)
//       .then((response) => {
//         return response.data;
//       })
//       .catch((err) => console.error(err));
//     return data;
//   }

//   async function onSubmit({ apiKey, url }) {
//     console.warn(apiKey, url);
//     let result = await fetch(`${baseURL}/paiduser/${id}`, {
//       method: "put",
//       body: JSON.stringify({ apiKey, url }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     result = await result.json();
//     console.warn(result);
//     navigate(`/feature1/${id}`);
//   }
//   return (
//     <div className="relative bg-[#FFF6CF] opacity-90  flex flex-col flex-auto min-w-0 overflow-hidden">
//       <div className="relative pt-32 pb-48 sm:pt-80 sm:pb-96 px-24 sm:px-64 overflow-hidden">
//         <svg
//           className="-z-1 absolute inset-0 pointer-events-none"
//           viewBox="0 0 960 540"
//           width="100%"
//           height="100%"
//           preserveAspectRatio="xMidYMax slice"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <Box
//             component="g"
//             sx={{ color: "#e8d78a" }}
//             className="opacity-100"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="100"
//           >
//             <circle r="234" cx="196" cy="23" />
//             <circle r="234" cx="790" cy="491" />
//           </Box>
//         </svg>
//         <div className="flex flex-col items-center">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1, transition: { delay: 0.05 } }}
//           >
//             <h2 className="text-xl font-semibold">Feature 1</h2>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
//           >
//             <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
//               Lets Get Started
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1, transition: { delay: 0.15 } }}
//           ></motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
//             className="flex justify-center mt-40 sm:mt-80"
//           >
//             <Paper className="flex flex-col lg:flex-row max-w-sm lg:max-w-xl overflow-hidden">
//               <div className="p-24 sm:p-32 lg:p-40">
//                 <form
//                   name="registerForm"
//                   noValidate
//                   className="flex flex-col justify-center w-full mt-32"
//                   onSubmit={handleSubmit(onSubmit)}
//                 >
                
//                   <Controller
//                     name="apiKey"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         className="mb-24"
//                         label="API Key"
//                         autoFocus
//                         type="name"
//                         error={!!errors.apiKey}
//                         helperText={errors?.apiKey?.message}
//                         variant="outlined"
//                         required
//                         fullWidth
//                       />
//                     )}
//                   />
               
//                   <Controller
//                     name="url"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         className="mb-24"
//                         label="Website Url"
//                         type="name"
//                         error={!!errors.url}
//                         helperText={errors?.url?.message}
//                         variant="outlined"
//                         required
//                         fullWidth
//                       />
//                     )}
//                   />

//                   <Typography className="ml-2 leading-5">
//                     Go to Klaviyo Account -- Settings -- API Keys to get your
//                     Klaviyo Private API Key.
//                   </Typography>

//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     style={{
//                       backgroundColor: "#FCB900",
//                     }}
//                     className="w-full mt-24"
//                     aria-label="Register"
//                     type="submit"
//                     size="large"
//                   >
//                     Submit
//                   </Button>
//                 </form>
//                 <div className="felx text-right  mt-24 ">
//                   <Typography className="text-3xl font-bold justify-center underline">
//                     <Link to="/">Do it Later</Link>
//                   </Typography>
//                 </div>
//               </div>
//             </Paper>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Detail;
