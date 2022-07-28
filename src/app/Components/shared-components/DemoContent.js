import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function DemoContent() {
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
             458
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
              className="px-16 text-xl font-medium tracking-tight leading-6 truncate"
              color="text.secondary"
            >
              View Details
            </Typography>
          </div>
        
        </Paper>

        <Paper className="flex flex-col flex-auto shadow rounded-2xl w-full h-full overflow-hidden">
          <div className="flex items-center justify-between px-8 pt-12">
           
          </div>
          <div className="text-center mt-8 p-28">
          <Typography className="text-3xl sm:text-4xl mb-8 font-bold tracking-tight leading-none text-amber-500">
             Campaign Testing
            </Typography>
          
            <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-amber-500">
             12
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
              View Details
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
             12351
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
              View Details
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
             12351
            </Typography>
            <Typography className="text-lg font-medium text-red-600">
              Email Validation Credit
            </Typography>
          </div>
          <div className="flex-col flex-1">
          <Typography className="text-7xl  sm:text-8xl mt-36 font-bold tracking-tight leading-none text-red-500">
             18
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
              View Details
            </Typography>
          </div>
        
        </Paper>
        

      </div>
  );
}

export default DemoContent;
