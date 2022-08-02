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
  const auth = localStorage.getItem("user");
  const [data , setData] = useState('')
  const [emailBalance, setemailBalance] = useState("0");
  const [campaignBalance, setcampaignBalance] = useState("0");
  useEffect(() => {
    getBounce();
  },[]);

  const getBounce = async () => {
    await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`)
      .then((response) => {
        console.log(response.data[0])
        setData(response.data[0])
        setemailBalance(response.data[0].credits.emailValidationCredit)
        setcampaignBalance(response.data[0].credits.testingCredit)
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-24 w-full min-w-0 p-24">

        <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
          <div className="flex items-center justify-between px-8 pt-12">
           
          </div>
          <div className="text-center mt-8 p-28">
          <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-green-500">
              Email Validation
            </Typography>
          
            <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-green-500">
             {data.emailValidation}
            </Typography>
            <Typography className="text-lg font-medium text-green-600">
              Invalid Email Supressed
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
            ><Link to='/email-validation'>View Details</Link>
            </Typography>
          </div>
        
        </Paper>

        <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
          <div className="flex items-center justify-between px-8 pt-12">
           
          </div>
          <div className="text-center mt-8 p-28">
          <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-amber-500">
             Campaigns Testing
            </Typography>
          
            <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-amber-500">
            {data.campaignTesting}
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
              <Link to='/campaign-test'>View Details</Link>
            </Typography>
          </div>
        
        </Paper>

        <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
          <div className="flex items-center justify-between px-8 pt-12">
           
          </div>
          <div className="text-center mt-8 p-28">
          <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-blue-500">
              List Cleaning
            </Typography>
          
            <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-blue-500">
            {data.listCleaning}
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
              <Link to='/list-cleaning'>View Details</Link>
            </Typography>
          </div>
        
        </Paper>

        <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
          <div className="flex items-center justify-between px-8 pt-12">
           
          </div>
          <div className="text-center mt-8 p-28">
          <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-red-500">
              Remaining Credits
            </Typography>
            <div className="flex">
          <div className="flex-col flex-1">
          <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-red-500">
            {emailBalance}
            </Typography>
            <Typography className="text-lg font-medium text-red-600">
              Email Validation Credit
            </Typography>
          </div>
          <div className="flex-col flex-1">
          <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-red-500">
            {campaignBalance}
            </Typography>
            <Typography className="text-lg font-medium text-red-600">
              Camapign Testing Credit
            </Typography>
          </div>
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
              <Link to='/buy-credits'>View Details</Link>
            </Typography>
          </div>
        
        </Paper>
        

      </div>
  );
}

export default DemoContent;
