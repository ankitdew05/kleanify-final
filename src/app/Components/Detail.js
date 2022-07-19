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
    const data = getData()
      .then((res) => {
        console.log(res);
        if (res[0].apiKey) {
          navigate(`/feature1/${id}`);
        } 
      })
      .catch((err) => console.log(err));
    console.log("data", data);
  }, []);

  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  console.log("User ID", id);
  const { isValid, dirtyFields, errors, setError } = formState;

  async function getData() {
    const data = await axios
      .get(`${baseURL}/paiduser/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
    return data;
  }

  async function onSubmit({ apiKey, url }) {
    console.warn(apiKey, url);
    let result = await fetch(`${baseURL}/paiduser/${id}`, {
      method: "put",
      body: JSON.stringify({ apiKey, url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate(`/feature1/${id}`);
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
          <img
            className="w-128 h-36"
            src="https://s3-alpha-sig.figma.com/img/80e7/da20/f779c92506c5caf4dd738864fe537b92?Expires=1657497600&Signature=IP8nPB58GA0UvOf1t2wByfRO9AvcaLyrGU22Nr6YJzQroSFtzSN~CUOKjU3IUhOu64tCSeZnbhNeY2HSo5p0JxiIWcMB5uJPbDsqVOH16T1iqJtRsAmFL6EDFTFVm-FODd9Bi-BgZVN67KqrnTuN1bdc53g2y5PlTMXC3L~oELcQ6vBmwR-HH3I9b9GIXXVksW3mJVtymOE2GyQxwzH~Gj-LqJ3jdTehFOw5Sq0XSDRmRm2SpxAIm55ZVRFExplc0Bx6zkldIxDwbF88Mu-3JLxZn92xj0IQtxKgunZsnz75wfrSm1ao4ZEY87GA-M~~jZYwe~uLu-XCR3eNEFw~2g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt="logo"
          />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Information
          </Typography>

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
             Go to Klaviyo Account -- Settings -- API Keys to get your Klaviyo Private API Key.
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
        </div>
      </Paper>
    </div>
  );
}

export default Detail;
