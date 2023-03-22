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
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileApp from "../ProfileApp";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter Name"),
  url: yup.string().required("You must enter a URL"),
});

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

function TimelineTab() {
  const [spinner, setSpinner] = useState(false);
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

  async function onSubmit({ name, url }) {
    setSpinner(true);
    console.warn(name, url);
    try {
      const response = await axios.post(`${baseURL}/shorten-url/step1`, { name, url });
      const result = response.data;
      setSpinner(false);
      console.warn(result);
      if (result.Status === "Failed") {
        alert("Server Error, Please Try Again in Some Time");
      } else {
        const step = 1
        const id = result.url._id
        console.log(step , id)
        window.location.replace(`https://app.kleanify.co/sms-preview-link/1/${id}`);
        //navigate(<ProfileApp step={step} id={id} />);
        //window.reloa
      }
    } catch (error) {
      console.error(error);
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
    <div className="relative bg-[#F1F5F9]  opacity-90  flex flex-col flex-auto min-w-0 overflow-hidden">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="flex justify-center"
        >
          <Paper className="flex justify-center flex-col lg:flex-row max-w-sm lg:max-w-xl overflow-hidden">
            <div className="p-24 min-w-640  sm:p-32 lg:p-40">
              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full mt-32"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid mb-24 grid-cols-2">
                  <Typography className="pt-12  md:text-xl leading-5 col-span-1">
                    Your Campaign Name
                  </Typography>
                  <Controller
                    name="url"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className=" col-span-1"
                        label="Campaign Name"
                        type="name"
                        error={!!errors.url}
                        helperText={errors?.url?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
                <div className="grid mb-24 grid-cols-2">
                  <Typography className="pt-12 md:text-xl leading-5 col-span-1 ">
                    Your Landing Page URL
                  </Typography>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className=" col-span-1"
                        label="URL"
                        autoFocus
                        type="name"
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>


                <div className="flex mt-36 justify-center ">
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      backgroundColor: "#FCB900",
                    }}
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    className="w-1/4 items-center mt-16"
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
                </div>
              </form>
            </div>
          </Paper>
        </motion.div>
      </div>
    </div>
  );
}

export default TimelineTab;
