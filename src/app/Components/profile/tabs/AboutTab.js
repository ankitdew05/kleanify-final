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
import Fab from "@mui/material/Fab";
import Snackbar from '@mui/material/Snackbar';
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  //apiKey: yup.string().required("You must enter Api Key"),
  url: yup.string().required("You must Upload a Image"),
});

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

function AboutTab() {
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
  console.log("About", params)
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const { isValid, dirtyFields, errors, setError } = formState;
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("")
  const [name, setname] = useState("")
  const [file, setfile] = useState('')
  const onSubmit = async () => {
    try {
      setSpinner(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`${baseURL}/shorten-url/step3/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSpinner(false)
      //console.log(response.data);
      if (response.data.Status == "Failed") {
        setOpen(true)
        setmessage(response.data.Message)
      } else {
        window.location.replace(`http://app.kleanify.co/sms-preview-link/2/${params.id}`);
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

  const handleUploadClick = event => {

    var file = event.target.files[0];
    console.log(file);
    setfile(file)
    setname(file.name)
    set
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      var url = reader.readAsDataURL(file);
      console.log(url);
      setUrl(url)
    }

  };


  return (
    <div className="relative bg-[#F1F5F9]  opacity-90  flex flex-col flex-auto min-w-0 overflow-hidden">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="flex justify-center"
        >
          <Paper className="flex flex-col lg:flex-row max-w-sm lg:max-w-xl overflow-hidden">
            <div className="p-24 sm:p-32 lg:p-40">

              <div className="flex p-10 mb-28 grid-cols-3 justify-around">
                <Typography className="pt-8 md:text-xl leading-5 flex-1">
                  Upload Preview Image
                </Typography>
                <div className="flex flex-1">
                  <Controller
                    name="url"
                    control={control}
                    render={({ field }) => (
                      <>
                        {/* <FuseSvgIcon className="icon-size-24">material-outline:add_photo_alternate
                          </FuseSvgIcon> */}
                        <TextField
                          {...field}
                          className="h-10 rounded-0"
                          label="Preview Image"
                          type="text"
                          value={name}
                          error={!!errors.url}
                          helperText={errors?.url?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />

                        <input
                          accept="image/jpeg, image/png, image/gif"
                          id="contained-button-file"
                          type="file"
                          style={{
                            display: "none"
                          }}
                          onChange={handleUploadClick}
                        />
                        <label htmlFor="contained-button-file" className="flex">

                          <Typography className="text-lg bg-[#FCB900] p-7 rounded-5">Upload</Typography>

                          {/* <Button
                            htmlFor="contained-button-file"
                            variant="contained"
                            color="secondary"
                            style={{
                              backgroundColor: "#FCB900",

                            }}
                            //disabled={_.isEmpty(dirtyFields) || !isValid}
                            className="w-1/4 items-center rounded-0 "
                            aria-label="Register"
                            type="submit"
                            size="large"
                          > Upload
                          </Button> */}
                        </label>


                      </>
                    )}
                  />
                </div>
              </div>
              <Typography className="ml-2 md:text-lg leading-5 px-16">
                <li>Ideal image size is 600x600px</li>
                <li>Compress & optimize the image before uploading for best performance</li>
                <li>Supported Formats: jpg , png , gif</li>
              </Typography>
              <div className="flex mt-52 justify-center ">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    backgroundColor: "#FCB900",
                  }}
                  //disabled={_.isEmpty(dirtyFields) || !isValid}
                  className="w-1/4 items-center mt-24"
                  aria-label="Register"
                  size="large"
                  onClick={onSubmit}
                >
                  Next
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={() => setOpen(false)}
                  message={message}
                ></Snackbar>

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

            </div>
          </Paper>
        </motion.div>
      </div>
    </div>
  );
}
export default AboutTab;
