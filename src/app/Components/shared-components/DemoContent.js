import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "src/app/common/baseURL";

function DemoContent() {
  const token = localStorage.getItem("token");
  const auth = localStorage.getItem("user");
  const [data, setData] = useState("");
  const [ unengeged , setUnengaged] = useState("")
  const [campaignTesting , setcampaignTesting] = useState("")
  const [newSub , setnewSub] = useState("")
  const [emailBalance, setemailBalance] = useState("0");
  const [campaignBalance, setcampaignBalance] = useState("0");
  useEffect(() => {
    getBounce();
    getcampaignTest();
    getUnengaged();
    getnewSubscribers();
  }, []);

  const getBounce = async () => {
    //console.log(JSON.parse(token))
    await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`, {
        headers: { "authorization": JSON.parse(token) }
      })
      .then((response) => {
        console.log(response.data[0]);
        setData(response.data[0]);
        setemailBalance(response.data[0].credits.emailValidationCredit);
        setcampaignBalance(response.data[0].credits.testingCredit);
      })
      .catch((err) => console.error(err));
  };

  const getnewSubscribers = async () => {
    console.log(JSON.parse(token))
    await axios
      .get(`${baseURL}/newSubscriber30/${JSON.parse(auth)._id}`, {
        headers: { "authorization": JSON.parse(token) }
      })
      .then((response) => {
    
        const array = response.data.Json
        console.log("Hi",array);
        setnewSub(array)
      })
      .catch((err) => console.error(err));
  };

  const getcampaignTest = async () => {
    console.log(JSON.parse(token))
    await axios
      .get(`${baseURL}/campaignTesting30/${JSON.parse(auth)._id}`, {
        headers: { "authorization": JSON.parse(token) }
      })
      .then((response) => {
        const array = response.data.Length
        console.log("Hi",array.length);
        setcampaignTesting(array.length)
      })
      .catch((err) => console.error(err));
  };
  
  const getUnengaged = async () => {
    console.log(JSON.parse(token))
    await axios
      .get(`${baseURL}/unengaged30/${JSON.parse(auth)._id}`, {
        headers: { "authorization": JSON.parse(token) }
      })
      .then((response) => {
        const array = response.data
        console.log("Hi",array);
        let sum = 0
        array.map((value)=>{
          sum = sum + value.creditUsed
        })
        setUnengaged(sum)
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-24 w-full min-w-0 p-24">
      <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-12"></div>
        <div className="text-center mt-8 p-28">
          <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-green-500">
            Email Validation
          </Typography>

          <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-green-500">
            {newSub}
          </Typography>
          <Typography className="text-lg font-medium text-green-600">
            Emails Checked
          </Typography>
        </div>
        <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
          <Typography
            className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
            color="text.secondary"
          >
            Last 30 Days
          </Typography>
          <Typography
            className="px-16 text-xl font-medium tracking-tight underline leading-6 truncate"
            color="text.secondary"
          >
            <Link to="/email-validation">View Details</Link>
          </Typography>
        </div>
      </Paper>

      {/* <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-12"></div>
        <div className="text-center mt-8 p-28">
          <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-amber-500">
            Campaigns Testing
          </Typography>

          <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-amber-500">
            {campaignTesting}
          </Typography>
          <Typography className="text-lg font-medium text-amber-600">
            Tests Done
          </Typography>
        </div>
        <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
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
            <Link to="/campaign-test">View Details</Link>
          </Typography>
        </div>
      </Paper> */}

      <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-12"></div>
        <div className="text-center mt-8 p-28">
          <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-blue-500">
            List Cleaning
          </Typography>

          <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-blue-500">
            {unengeged}
          </Typography>
          <Typography className="text-lg font-medium text-blue-600">
            Unengaged Subscribers Cleaned
          </Typography>
        </div>
        <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
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
            <Link to="/list-cleaning">View Details</Link>
          </Typography>
        </div>
      </Paper>

      <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-12"></div>
        <div className="text-center mt-8 p-28">
          <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-red-500">
            Remaining Credits
          </Typography>
          <div className="grid lg:flex ">
            <div className="flex-col flex-1">
              <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-red-500">
                {emailBalance}
              </Typography>
              <Typography className="text-lg font-medium text-red-600">
                Email Validation Credits
              </Typography>
            </div>
            {/* <div className="flex-col flex-1">
              <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-red-500">
                {campaignBalance}
              </Typography>
              <Typography className="text-lg font-medium text-red-600">
                Camapign Testing Credits
              </Typography>
            </div> */}
          </div>
        </div>
        <div className="flex items-center justify-evenly px-8 pt-12 pb-20">
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
            <Link to="/buy-credits">View Details</Link>
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default DemoContent;
