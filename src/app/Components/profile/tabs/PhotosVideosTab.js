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
import baseURL from "src/app/common/baseURL";
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().required("You must enter Email Correctly"),

});

const defaultValues = {
  email: ""
};

function PhotosVideosTab() {
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("")
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    document.title = "SMS Preview Link Kleanify";
  }, []);

  const navigate = useNavigate();
  const params = useParams();
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const { isValid, dirtyFields, errors, setError } = formState;

  async function onSubmit({ email }) {
    console.warn(email);
    try {
      setSpinner(true);
      const response = await axios.post(`${baseURL}/shorten-url/step2/${params.id}`, { email });
      setSpinner(false)
      console.log(response.data);
      if (response.data.Status == "Failed") {
        setOpen(true)
        setmessage(response.data.Message)
      } else {
        setOpen(true)
        setmessage("Check Your Email, Link is Successfully Send..")
        setTimeout(() => {
          window.location.replace(`https://app.kleanify.co/sms-preview-link/`);
        }, 3000);
      }

      // do something with the response from the backend
    } catch (error) {
      console.error(error);
      // handle any errors that occur during the request
    }

  }
  if (loading) {
    return (
      <div className="flex items-center bg-[#FFF6CF] justify-center h-[1000px] w-full">
        <FuseLoading />
      </div>
    );
  }

  return (
    <div className="relative  bg-[#F1F5F9]  opacity-90  flex flex-col flex-auto min-w-0 overflow-hidden">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="flex justify-center"
        >
          <Paper className="flex flex-col lg:flex-row max-w-sm lg:max-w-xl overflow-hidden">
            <div className="p-24 sm:p-32 lg:p-40">
              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full mt-32"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-6 mb-24  ">
                  <Typography className="pt-8 md:text-xl leading-5 flex-5 px-24 ">
                    Your Email ID
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (

                      <TextField
                        {...field}
                        className="h-10 rounded-0 flex-1 "
                        label="Email ID"
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
                <div className="px-16 max-w-640 mt-16">
                  <Typography className="md:text-lg leading-5 ">

                    <li><a>The preview link will be sent to this Email Id immediately so it can be saved  </a>
                      <a className="pl-[27px]">in your mailbox</a>
                    </li>
                    <li>The link will be active always</li>
                    <li>If you want to change the link, you can create another link</li>

                  </Typography>
                </div>
                <div className="flex mt-52 justify-center ">
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      backgroundColor: "#FCB900",
                    }}
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    className="w-1/4 items-center mt-24"
                    aria-label="Register"
                    type="submit"
                    size="large"
                  >
                    Next
                  </Button>
                  <Backdrop
                    sx={{
                      opacity: 0,
                      color: "#00000",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={spinner}
                  >
                    <CircularProgress color="success" />
                  </Backdrop>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={() => setOpen(false)}
                    message={message}
                  ></Snackbar>
                </div>
              </form>
            </div>
          </Paper>
        </motion.div>
      </div>
    </div>
  );
}
export default PhotosVideosTab;
