import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useNavigate } from "react-router-dom";
import baseURL from "../common/baseURL";
import { useEffect } from "react";
const defaultValues = { subject: "", message: "" };
const schema = yup.object().shape({
  // name: yup.string().required('You must enter a name'),
  subject: yup.string().required("You must enter a subject"),
  message: yup.string().required("You must enter a message"),
  // email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function Contact() {
  const auth = localStorage.getItem("user");
  useEffect(() => {
    document.title = "Contact to Kleanify";
  });
  const navigate = useNavigate();
  const { control, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  async function onSubmit({ message, subject }) {
    const name = JSON.parse(auth).displayName;
    const email = JSON.parse(auth).email;
    const userId = JSON.parse(auth)._id;
    console.warn("name,email,message,subject", name, email, message, subject , userId);
    let result = await fetch(`${baseURL}/contactSend`, {
      method: "post",
      body: JSON.stringify({ name, email, message, subject, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if(result.Message === "OK"){
      alert("Support Successfuly Raised")
      navigate('/')
    } else{
      alert("OOPs! Try Again")
      
    }
    
  }

  if (_.isEmpty(form)) {
    return null;
  }

  return (
    <div className="flex  flex-col  items-center p-24 sm:p-40 w-full">
      <div className="flex flex-col  w-full max-w-4xl">
        <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
            <div className="mb-24">
              <Typography className="text-2xl font-bold tracking-tight">
                Submit your request
              </Typography>
              <Typography color="text.secondary">
                Please fill out the form below to request support. We typically
                reply within 24 hours through email.
              </Typography>
            </div>
            <div className="space-y-32">
              {/* <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Name"
                    placeholder="Name"
                    id="name"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Email"
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    required
                  />
                )}
              /> */}

              <Controller
                control={control}
                name="subject"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Subject"
                    placeholder="Subject"
                    variant="outlined"
                    fullWidth
                    error={!!errors.subject}
                    helperText={errors?.subject?.message}
                    required
                  />
                )}
              />

              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Message"
                    className="mt-16 w-full"
                    margin="normal"
                    multiline
                    minRows={4}
                    variant="outlined"
                    error={!!errors.message}
                    helperText={errors?.message?.message}
                    required
                  />
                )}
              />
            </div>
          </form>
          <div className="flex items-center justify-end mt-32">
            <Button className="mx-8">Cancel</Button>
            <Button
              className="mx-8"
              variant="contained"
              color="secondary"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleSubmit(onSubmit)}
            >
              Send
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Contact;
