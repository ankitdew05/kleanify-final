import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import {useParams , useNavigate} from 'react-router-dom'
import baseURL from "../common/baseURL";

function Feature2() {
  const auth = localStorage.getItem('user');
useEffect(()=>{
  document.title = "Onboarding to Kleanify";
})
  const [period, setPeriod] = useState("month");
  const params = useParams()
  const UserId = params.id
  const navigate = useNavigate();
  async function onSubmit({segmentId}) {
    let result = await fetch(`${baseURL}/segment/${JSON.parse(auth)._id}`, {
      method: "put",
      body: JSON.stringify({ segmentId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/list-cleaning");
  }

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
  });

  const { isValid, dirtyFields, errors } = formState;

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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          >
            <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
              Automated Email Validation
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
          >
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="flex justify-center mt-40 sm:mt-80"
          >
            <Paper className="flex flex-col lg:flex-row max-w-sm lg:max-w-xl overflow-hidden">
              <div className="p-24 sm:p-32 lg:p-40">
                <Typography
                  className="mt-8 text-xl leading-relaxed"
                  color="text.secondary"
                >
                  Kleanify cleans your unengaged subscribers from Klaviyo
                  account automatically every week.
                  <p className="mt-7">
                    To start cleaning, please set-up a dynamic segment in
                    Klaviyo by following{" "}
                    <spam className="underline">this guide</spam>. This takes
                    less than 5 mins and is a one-time process. Copy the segment
                    id and paste it below.
                  </p>
                </Typography>
                <form
                  name="loginForm"
                  noValidate
                  className="flex flex-col justify-center w-1/3 mt-32"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="segmentId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-24"
                        label="Segment Id"
                        autoFocus
                        type="name"
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />

                  <Button
                    style={{
                      backgroundColor: "#FCB900",
                    }}
                    variant="contained"
                    color="secondary"
                    className=" w-full mt-16"
                    aria-label="Sign in"
                    type="submit"
                    size="large"
                  >
                    Finish
                  </Button>
                </form>
                <div className="felx text-right  mt-24 ">
                  <Typography className="text-3xl font-bold justify-center underline">
                    <Link to="/">Do it Later</Link>
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

export default Feature2;
