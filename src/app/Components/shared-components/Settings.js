import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useEffect, useState } from "react";
import baseURL from "src/app/common/baseURL";
import axios from "axios";
import Detail from "../Detail";
import React from "react";

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

function Settings() {
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [apiKey, setapiKey] = useState("");
  const [SSemail, setSSemail] = useState("");
  const [segmentId, setsegmentId] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [matricdata, setmatricdata] = useState("");
  const [matricId, setmatricId] = useState("");
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const params = useParams();

  const { isValid, dirtyFields, errors, setError } = formState;

  async function getData() {
    const data = await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`,
        { headers: { "authorization": JSON.parse(token) } })
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
        "authorization": JSON.parse(token)
      },
    });
    result = await result.json();
    console.warn(result.result);
    if (result.result == "Failed") {
      alert("Api Key Wrong , Please Check");
    } else {
      navigate(`/onboarding1`);
    }
  }

  useEffect(() => {
    document.title = "Sign-up to Kleanify";
    getmatricdata();
    getData()
      .then((res) => {
        console.log(res[0]);
        setData(res[0])
        setEmail(res[0].email);
        setapiKey(res[0].apiKey);
        setSSemail(res[0].SSemail);
        setsegmentId(res[0].segmentId);
        setmatricId(res[0].matricId);
        console.log("Email", email);
      })
      .catch((err) => console.log(err));
  }, []);

  async function getData() {
    const data = await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`, {
        headers: {
          "authorization": JSON.parse(token)
        }
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
    return data;
  }

  async function changeApiKey() {
    console.warn(apiKey);
    let result = await fetch(
      `${baseURL}/changeApikey/${JSON.parse(auth)._id}`,
      {
        method: "put",
        body: JSON.stringify({ apiKey }),
        headers: {
          "Content-Type": "application/json",
          "authorization": JSON.parse(token)
        },
      }
    );
    result = await result.json();
    console.warn(result.result);
    if (result.result == "Failed") {
      alert("Api Key Wrong , Please Check");
      setShowModal(false);
    } else {
      alert("Succesfully Changed Api Key");
      setShowModal(false);
    }
  }

  async function changeSegment() {
    console.warn(segmentId);
    let result = await fetch(
      `${baseURL}/changeSegment/${JSON.parse(auth)._id}`,
      {
        method: "put",
        body: JSON.stringify({ segmentId }),
        headers: {
          "Content-Type": "application/json",
          "authorization": JSON.parse(token)
        },
      }
    );
    result = await result.json();
    console.warn(result.result);
    if (result.result == "Failed") {
      alert("Error in Changing, Try again later");
      setShowModal(false);
    } else {
      alert("Succesfully Changed Segment Id");
      setShowModal(false);
    }
  }

  async function changeSSemail() {
    const name = JSON.parse(auth).name
    console.warn(SSemail);
    let result = await fetch(
      `${baseURL}/changeSSemail/${JSON.parse(auth)._id}`,
      {
        method: "put",
        body: JSON.stringify({ SSemail, name }),
        headers: {
          "Content-Type": "application/json",
          "authorization": JSON.parse(token)
        },
      }
    );
    result = await result.json();
    console.warn(result.result);
    if (result.result == "Failed") {
      alert("Error in Changing, Try again later");
      setShowModal1(false);
    } else {
      alert("Succesfully Changed Sender Email, Please Verify New Sender Email");
      setShowModal(false);
    }
  }


  async function getmatricdata() {
    const data = await axios
      .get(
        `${baseURL}/changeEmailValidation/${JSON.parse(auth)._id}/${JSON.parse(auth).apiKey
        }`,
        {
          headers: {
            "authorization": JSON.parse(token)
          }
        }
      )
      .then((response) => {
        //console.log(response.data);
        setmatricdata(response.data);
      })
      .catch((err) => console.error(err));
  }

  async function changeEmailValidation(matricId, name) {
    let result = await fetch(
      `${baseURL}/changeSSemails/${JSON.parse(auth)._id}`,
      {
        method: "put",
        body: JSON.stringify({ matricId, name }),
        headers: {
          "Content-Type": "application/json",
          "authorization": JSON.parse(token)
        },
      }
    );
    result = await result.json();
    console.warn(result.result);
    if (result.result == "Failed") {
      alert("Error in Changing, Try again later");
      setShowModal3(false);
    } else {
      alert("Succesfully Changed Matric Id");
      setShowModal3(false);
    }
  }
  const handleChange = async () => {
    await onchange(!data.campaignAutoTest);
    window.location.reload()
  };

  async function onchange(state) {
    const userId = JSON.parse(auth)._id
    let result = await fetch(`${baseURL}/changeCampaignAutoTest`, {
      method: "put",
      body: JSON.stringify({ userId, state }),
      headers: {
        "Content-Type": "application/json",
        "authorization": JSON.parse(token)
      },
    });
    console.warn(result);
  }

  return (
    <div className="flex flex-col sm:flex-col items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-full min-h-full">
      <Paper className="h-full w-full sm:h-auto md:flex md:items-start md:justify-start  sm:w-auto md:h-full md:w-full py-8 px-16 sm:p-48 md:p-64 md:py-10 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full   mx-auto sm:mx-0">
          <Typography className="mt-32 text-2xl font-extrabold tracking-tight leading-tight">
            Your Account
          </Typography>
          <hr class="my-4 mx-auto w-full h-1 bg-gray-500 rounded border-0 md:my-5 dark:bg-gray-700"></hr>
          <div className="flex text-xl items-baseline mt-10 font-medium">
            <Typography className="text-xl">Login Email : {email}</Typography>
          </div>
          <div className="flex text-xl items-baseline mt-10 font-medium">
            <Typography className="text-xl ">
              Klaviyo Api Key : {apiKey}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "#FCB900",
              }}
              className="w-1/8 ml-16 "
              aria-label="Register"
              type="submit"
              size="large"
              onClick={() => setShowModal(true)}
            >
              Edit Api Key
            </Button>
            {showModal ? (
              <>
                <div className="justify-center items-center flex w-full overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">Edit API Key</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="grid mb-24 grid-cols-2">
                          <Typography className="pt-5 md:text-xl leading-5 col-span-1">
                            Your New Api Key
                          </Typography>
                          <input
                            type="text"
                            id="apiKey"
                            name="apiKey"
                            onChange={(e) => {
                              setapiKey(e.target.value);
                            }}
                            value={apiKey}
                          />
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 mr-10 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>

                        <button
                          className="bg-emerald-500 text-[#FCB900] active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => changeApiKey()}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
      </Paper>
      <Paper className="h-full w-full sm:h-auto md:flex md:items-start md:justify-start md:py-5  sm:w-auto md:h-full md:w-full py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full  mx-auto sm:mx-0">
          <Typography className="mt-32 text-2xl font-extrabold tracking-tight leading-tight">
            Email Validation
          </Typography>
          <hr class="my-4 mx-auto w-full h-1 bg-gray-500 rounded border-0 md:my-10 dark:bg-gray-700"></hr>
          <div className="flex text-xl items-baseline mt-10  font-medium">
            <Typography className="text-xl">
              Automatically validating : {matricId.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "#FCB900",
              }}
              className="w-1/8 ml-16 "
              aria-label="Register"
              type="submit"
              size="large"
              onClick={() => setShowModal3(true)}
            >
              Change List
            </Button>
            {showModal3 ? (
              <>
                <div className="justify-center mt-32 items-center flex w-full  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Change Automatic Validation Matric
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal3(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="grid mb-24 grid-cols-2">
                          <Typography className="pt-5 md:text-xl leading-5 col-span-1">
                            Your New Sender Email
                          </Typography>
                          <input
                            type="text"
                            id="SSemail"
                            name="SSemail"
                            onChange={(e) => {
                              setSSemail(e.target.value);
                            }}
                            value={SSemail}
                          />
                        </div>
                      </div>
                      {matricdata.map((value) => (
                        <div className="relative p-6 flex-auto">
                          <div className="grid mb-24 grid-cols-3">
                            <Typography className="pt-5 md:text-xl leading-5 col-span-1">
                              {value.name}
                            </Typography>
                            <Typography className="pt-5 md:text-xl leading-5 col-span-1">
                              {value.id}
                            </Typography>
                            <button
                              className="bg-emerald-500 col-span-1 text-[#FCB900] active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() =>
                                changeEmailValidation(value.id, value.name)
                              }
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      ))}

                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 mr-10 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal3(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
          <div className="flex text-2xl items-baseline mt-10  font-medium">
            <Typography className="text-xl">Id : {matricId.id}</Typography>
          </div>
        </div>
      </Paper>

      <Paper className="h-full w-full sm:h-auto md:flex md:py-10 md:items-start md:justify-start  sm:w-auto md:h-full md:w-full py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full mx-auto sm:mx-0">
          <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight">
            List Cleaning
          </Typography>
          <hr class="my-4 mx-auto w-full h-1 bg-gray-500 rounded border-0 md:my-5 dark:bg-gray-700"></hr>
          <div className="flex text-xl items-baseline mt-10 font-medium">
            <Typography className="text-xl">
              Cleaning Segment ID : {segmentId}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "#FCB900",
              }}
              className="w-1/8 ml-16 "
              aria-label="Register"
              type="submit"
              size="large"
              onClick={() => setShowModal2(true)}
            >
              Update Segment
            </Button>
            {showModal2 ? (
              <>
                <div className="justify-center items-center flex w-full overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Edit Segment Id
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="grid mb-24 grid-cols-2">
                          <Typography className="pt-5 md:text-xl leading-5 col-span-1">
                            Your New Segment Id
                          </Typography>
                          <input
                            type="text"
                            id="segmentId"
                            name="segmentId"
                            onChange={(e) => {
                              setsegmentId(e.target.value);
                            }}
                            value={segmentId}
                          />
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 mr-10 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal2(false)}
                        >
                          Close
                        </button>

                        <button
                          className="bg-emerald-500 text-[#FCB900] active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => changeSegment()}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
          <div className="flex text-xl items-baseline mt-10 font-medium">
            <Typography className="text-xl">
              Cleaning Segment Name : Kleanify 180 Days Unengaged
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Settings;

//<Paper className="h-full w-full sm:h-auto md:flex md:py-5 md:items-start md:justify-start  sm:w-auto md:h-full md:w-full py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
// {/* <div className="w-full mx-auto sm:mx-0">
//   <Typography className="mt-32 text-2xl font-extrabold tracking-tight leading-tight">
//     Campaign Testing
//   </Typography>
//   <hr class="my-4 mx-auto w-full h-1 bg-gray-500 rounded border-0 md:my-10 dark:bg-gray-700"></hr>
//   <div className="flex text-xl items-baseline mt-10 font-medium">
//     <Typography className="text-xl">
//       Sender Email Verified : {SSemail}
//     </Typography>
//     <Button
//       variant="contained"
//       color="secondary"
//       style={{
//         backgroundColor: "#FCB900",
//       }}
//       className="w-1/8 ml-16 "
//       aria-label="Register"
//       type="submit"
//       size="large"
//       onClick={() => setShowModal1(true)}
//     >
//       Update Email
//     </Button>
//     {showModal1 ? (
//       <>
//         <div className="justify-center items-center flex w-full overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//           <div className="relative w-auto my-6 mx-auto max-w-">
//             {/*content*/}
//             <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//               {/*header*/}
//               <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                 <h3 className="text-3xl font-semibold">
//                   Edit Sender Email
//                 </h3>
//                 <button
//                   className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                   onClick={() => setShowModal1(false)}
//                 >
//                   <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                     ×
//                   </span>
//                 </button>
//               </div>
//               {/*body*/}
//               <div className="relative p-6 flex-auto">
//                 <div className="grid mb-24 grid-cols-2">
//                   <Typography className="pt-5 md:text-xl leading-5 col-span-1">
//                     Your New Sender Email
//                   </Typography>
//                   <input
//                     type="text"
//                     id="SSemail"
//                     name="SSemail"
//                     onChange={(e) => {
//                       setSSemail(e.target.value);
//                     }}
//                     value={SSemail}
//                   />
//                 </div>
//               </div>
//               {/*footer*/}
//               <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//                 <button
//                   className="text-red-500 mr-10 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                   type="button"
//                   onClick={() => setShowModal1(false)}
//                 >
//                   Close
//                 </button>

//                 <button
//                   className="bg-emerald-500 text-[#FCB900] active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                   type="button"
//                   onClick={() => changeSSemail()}
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//       </>
//     ) : null}
//   </div>
//   <div className="flex text-xl items-baseline mt-10 font-medium">
//     <Typography className="text-xl">
//       Test Queued Campaigns Automatically (only if not tested already)
//     </Typography>
//     <div class="flex justify-center ml-10">
//       <FormGroup>
//         <FormControlLabel
//           control={
//             <Switch
//               checked={data.campaignAutoTest}
//               onChange={handleChange}
//             />
//           }
//           inputProps={{ "aria-label": "controlled" }}
//         />
//       </FormGroup>
//     </div>
//   </div>
// </div>
//       </Paper > */}