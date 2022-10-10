import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { motion } from "framer-motion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import baseURL from "src/app/common/baseURL";
import "react-toastify/dist/ReactToastify.css";

function DemoContent2() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [emailCredit, setemailCredit] = useState("1");
  const [campaignCredit, setCampaignCredit] = useState("1");
  let [total, setTotal] = useState("0");
  let [userData, setUserData] = useState({});
  const [emailBalance, setemailBalance] = useState("");
  const [campaignBalance, setcampaignBalance] = useState("");
  const [customerId, setcustomerId] = useState("");
  let [data, setData] = useState({});
  const userId = userData._id;
  const planId = userData.planId;
  useEffect(() => {
    setUserData(JSON.parse(auth));
    setTotal(parseFloat(emailCredit) + parseFloat(campaignCredit));
    getBounce();
  }, [emailCredit, campaignCredit]);

  function handleEmailCredit(value) {
    if (value < 1 || null) {
      setemailCredit(1);
    } else {
      setemailCredit(value);
    }
  }

  function handleCampaignCredit(value) {
    if (value < 1 || null) {
      setCampaignCredit(1);
    } else {
      setCampaignCredit(value);
    }
  }
  const handleCheckout = () => {
    console.log({customerId,
      userId,
      emailCredit,
      campaignCredit,})
    axios
      .post(`${baseURL}/create-checkout-session`, {
        customerId,
        userId,
        emailCredit,
        campaignCredit,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          "authorization": JSON.parse(token)
        },
      },)
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  // async function handleToken(token, addresses) {
  //   const response = await axios.post(`${baseURL}/checkout`, {
  //     token,
  //     total,
  //     userId,
  //     planId,
  //     emailCredit,
  //     campaignCredit,
  //   });
  //   console.log(response);
  //   console.log(response.status, response.id);
  //   let clientSecret = await response.data.id;
  //   console.log(clientSecret);

  //   if (response.status === 200) {
  //     navigate("/");
  //     alert("Succesful Payment");
  //   } else {
  //     alert("Payment Failed");
  //   }
  // }

  // Confirm Card Payment.

  const getBounce = async () => {
    axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`,{
        headers: { "authorization": JSON.parse(token) }
      })
      .then((response) => {
        setemailBalance(response.data[0].credits.emailValidationCredit);
        setcampaignBalance(response.data[0].credits.testingCredit);
        setcustomerId(response.data[0].customerId);
      })
      .catch((err) => console.error(err));
  };
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
      initial="hidden"
      animate="show"
    >
      <div className="sm:col-span-6 lg:col-span-6 grid grid-cols-1 md:grid-cols-4 md:gap-x-24 gap-y-24 ">
        <motion.div className="sm:col-span-1">
          <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
            <div className="flex items-center justify-between px-8 pt-12"></div>
            <div className="text-center mt-8 p-12">
              <Typography className="text-3xl sm:text-3xl mb-8 font-bold tracking-tight leading-none text-green-500">
                Email Validation
              </Typography>

              <Typography className="text-3xl  sm:text-5xl mt-36 font-bold tracking-tight leading-none text-green-500">
                {emailBalance}
              </Typography>
              <Typography className="text-lg font-medium text-green-600">
                Credit Balance
              </Typography>
            </div>
            {/* <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
              <Typography
                className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                color="text.secondary"
              >
                Last 30 Days
              </Typography>
              <Typography
                className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                color="text.secondary"
              >
                View Details
              </Typography>
            </div> */}
          </Paper>
        </motion.div>
        <motion.div className="sm:col-span-1">
          <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
            <div className="flex items-center justify-between px-8 pt-12"></div>
            <div className="text-center mt-8 p-12">
              <Typography className="text-3xl sm:text-3xl mb-8 font-bold tracking-tight leading-none text-amber-500">
                Campaign Test
              </Typography>

              <Typography className="text-3xl  sm:text-5xl mt-36 font-bold tracking-tight leading-none text-amber-500">
                {campaignBalance}
              </Typography>
              <Typography className="text-lg font-medium text-amber-600">
                Credit Balance
              </Typography>
            </div>
            {/* <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
              <Typography
                className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                color="text.secondary"
              >
                Last 30 Days
              </Typography>
              <Typography
                className="px-16 text-xl font-medium tracking-tight leading-6 truncate underline"
                color="text.secondary"
              >
                View Details
              </Typography>
            </div> */}
          </Paper>
        </motion.div>
      </div>

      <motion.div className="sm:col-span-6 md:col-span-5">
        <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
          <div className="text-center mt-8 px-28 py-9 grid grid-cols-3">
            <Typography className="text-lg sm:text-3xl mb-4 font-bold tracking-tight leading-none text-green-500"></Typography>
            <Typography className="text-md sm:text-2xl mb-4 font-bold tracking-tight leading-none text-gray-700">
              Credits
            </Typography>
            <Typography className="text-md sm:text-2xl mb-4 font-bold tracking-tight leading-none text-gray-700">
              Amount
            </Typography>
          </div>
          <div className="text-left mt-8 px-28 py-5 grid grid-cols-3 justify-items-center">
            <Typography className="text-lg sm:text-3xl mb-4 font-bold tracking-tight leading-none text-gray-700">
              <p className="mt-10 pt-10">Buy Email Validation Credit </p>
              <p className=" text-[10px] invisible sm:visible sm:text-lg text-green-500 font-light">
                You are buying in{" "}
                <b className="font-bold text-[10px] sm:text-lg">Lots</b> which
                contain{" "}
                <b className="font-bold text-[10px] sm:text-lg">1000 credits</b>{" "}
              </p>
              <p className="text-[10px] invisible md:visible sm:text-lg text-green-500 font-light">
                {" "}
                <b className="font-bold">1 Credit = .001 $</b>
              </p>
            </Typography>
            <TextField
              className=" mb-4 w-1/2 "
              label=" Lot Qauntity(1 Lot = 1000 credits)"
              id="priceTaxExcl"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              onChange={(e) => {
                handleEmailCredit(e.target.value);
              }}
              value={emailCredit}
              type="number"
              variant="outlined"
            />
            <Typography className="text-md sm:text-2xl mb-4 font-bold tracking-tight leading-none text-gray-700">
              ${emailCredit}
            </Typography>
          </div>
          <div className="text-left mt-8 px-28 py-9 grid grid-cols-3 justify-items-center">
            <Typography className="text-lg sm:text-3xl mb-4 font-bold tracking-tight leading-none text-gray-700">
              Buy Campaign Testing Credit
            </Typography>
            <TextField
              className="  mt-10 w-1/2 "
              label="Qauntity"
              id="priceTaxExcl"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              onChange={(e) => handleCampaignCredit(e.target.value)}
              value={campaignCredit}
              type="number"
              variant="outlined"
            />
            <Typography className="text-md sm:text-2xl mb-4 font-bold tracking-tight leading-none text-gray-700">
              ${campaignCredit}
            </Typography>
          </div>
          <div className="text-center mt-8 px-28 py-9 grid grid-cols-3">
            <Typography className="text-md sm:text-3xl mb-4 font-bold tracking-tight leading-none text-gray-700">
              Total
            </Typography>
            <Typography className="text-md sm:text-2xl mb-4 font-bold tracking-tight leading-none text-green-500"></Typography>
            <Typography className="text-md sm:text-2xl mb-4 font-bold tracking-tight leading-none text-gray-700">
              ${total}
            </Typography>
          </div>
          <div className="text-center mt-8 px-28 py-9 grid grid-cols-3">
            <Typography className="text-md sm:text-3xl mb-4 font-bold tracking-tight leading-none text-green-500"></Typography>
            <Typography className="text-md sm:text-2xl mb-4 font-bold tracking-tight leading-none text-green-500"></Typography>
            <Typography className="text-md  sm:text-xl mb-4 font-bold tracking-tight leading-none text-green-500">
              <button
                className="bg-green p-12 text-white rounded-12"
                onClick={() => handleCheckout()}
              >
                Buy Credits
              </button>
            </Typography>
          </div>
          {/* <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
              <Typography
                className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                color="text.secondary"
              >
                Last 30 Days
              </Typography>
              <Typography
                className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
                color="text.secondary"
              >
                View Details
              </Typography>
            </div> */}
        </Paper>
      </motion.div>

      {/*   <motion.div variants={item} className="widget flex w-full sm:w-1/2 p-12">
        <Widget8 widget={widgets.widget8} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 p-12">
        <Widget9 widget={widgets.widget9} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full p-12">
        <Widget10 widget={widgets.widget10} />
      </motion.div> */}
    </motion.div>
  );
}

export default DemoContent2;
