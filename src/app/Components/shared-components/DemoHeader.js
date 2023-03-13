import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "src/app/common/baseURL";
import Snackbar from '@mui/material/Snackbar';
import Button from "@mui/material/Button";
function DemoHeader(props) {
  const { leftSidebarToggle, title } = props;
  const [status, setstatus] = useState(true);
  const [open, setOpen] = useState(false);
  const [liststatus, setliststatus] = useState(true);
  const [message, setmessage] = useState("! Opps..😥 [Your Account is Disabled]")
  useEffect(() => {
    getPaidUser();
  });
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  async function getPaidUser() {
    await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`,
        { headers: { "authorization": JSON.parse(token) } })
      .then((response) => {
        console.log("PaidUser", response.data[0]);
        if (response.data[0].listcleaningstatus === false) {
          setliststatus(false);
          setOpen(true)
          setmessage("I'm sorry to inform you that your list cleaning feature is currently disabled. To resume using this feature, you will need to upgrade your current plan. ")
        }
        if (response.data[0].paidStatus === false) {
          setstatus(false);
          setOpen(true)
          setmessage("Sorry, your account has been disabled. Please recharge with more credits to continue using our services.")
        } else {
          setstatus(true);
        }
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className="flex flex-col  p-24 w-full sm:py-32 sm:px-40">
      <div className="flex items-center w-full mt-8 -mx-10">
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}

          message={message}
          action={
            <Button color="warning" size="medium" onClick={() => {
              navigate('/buy-credits')
            }}>
              Buy
            </Button>
          }
        ></Snackbar>

        {leftSidebarToggle && (
          <div className="flex lg:invisible shrink-0 items-center">
            <IconButton onClick={leftSidebarToggle} aria-label="toggle sidebar">
              <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
            </IconButton>
          </div>
        )}
        {/* {title === "Clean Unengaged Subscribers" ? (
          <>
            {status === false || liststatus === false ? (
              <Typography
                component="h2"
                className="flex-1 text-3xl md:text-4xl font-extrabold  text-red-500 tracking-tight leading-7 sm:leading-10  mx-10"
              >
                {message}
              </Typography>
            ) : (

              <Typography
                component="h2"
                className="flex-1  text-3xl md:text-4xl font-bold  tracking-tight leading-7 sm:leading-10  mx-10"
              >
                {title}
              </Typography>
            )}
          </>
        ) : (
          <>
            {status === true ? (
              <Typography
                component="h2"
                className="flex-1 text-3xl text-black md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10  mx-10"
              >
                {title}
              </Typography>
            ) : (

              <Typography
                component="h2"
                className="flex-1 text-3xl md:text-4xl font-bold text-red-500  tracking-tight leading-7 sm:leading-10  mx-10"

              >
                ! Opps..😥 [Your List Cleaning is Disabled] Upgrade your Plan
              </Typography>
            )}
          </>

        )} */}
        <Typography
          component="h2"
          className="flex-1  text-3xl md:text-4xl font-bold  tracking-tight leading-7 sm:leading-10  mx-10"
        >
          {title}
        </Typography>

        { }

        <div className="flex">
          <div className="invisible md:visible flex-col">
            <Typography className="username text-14 whitespace-nowrap font-medium">
              {JSON.parse(auth).displayName}
            </Typography>
            <Typography
              className="email text-13 whitespace-nowrap font-medium"
              color="text.secondary"
            >
              {JSON.parse(auth).email}
            </Typography>
          </div>
          <div className="visible md:invisible">
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoHeader;
