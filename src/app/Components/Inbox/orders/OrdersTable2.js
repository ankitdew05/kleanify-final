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
import { useParams, useNavigate } from "react-router-dom";
import baseURL from "src/app/common/baseURL";
function OrdersTable2() {
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Onboarding to Kleanify";
  },[]);
  const name =  JSON.parse(auth).name
  const [period, setPeriod] = useState("month");
  const params = useParams();
  const UserId = params.id;
  const navigate = useNavigate();
  async function onSubmit({ email }) {
    let result = await fetch(`${baseURL}/createSenderSignature/${JSON.parse(auth)._id}`, {
      method: "POST",
      body: JSON.stringify({ email, name }),
      headers: {
        "Content-Type": "application/json",
        "authorization": JSON.parse(token),
      },
    });
    result = await result.json();
    console.warn(result.Status);
    if(result.Status){
      alert("Check your Email")
    } else{
      alert("Error in Sending Email, Try again....")
    }
  }

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
  });

  const { isValid, dirtyFields, errors } = formState;

  return (
    <div className="relative bg-[#FFF6CF] h-full opacity-90  flex flex-col flex-auto min-w-0 overflow-hidden">
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
          ></motion.div>



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
                  <div className="grid mb-44 grid-cols-1">
                    <Typography className="pt-5 md:text-2xl font leading-5 flex justify-center ">
                    Kleanify needs to verify your sender email to perform campaign testing
                    </Typography>
                  </div>
                  <div className="grid mb-24 grid-cols-4 justify-center">
                    <Typography className="pt-5 md:text-xl leading-5 col-span-1 col-start-2  ">
                      Email
                    </Typography>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className=" col-span-1"
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
                  </div>

                  <div className="flex mt-12 justify-center ">
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        backgroundColor: "#FCB900",
                      }}
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      className="w-2/6 items-center mt-24"
                      aria-label="Register"
                      type="submit"
                      size="large"
                    >
                      Send Verification Email
                    </Button>
                  </div>
                </form>
              </div>
            </Paper>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default OrdersTable2;
