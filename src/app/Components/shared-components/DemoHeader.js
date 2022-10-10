import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "src/app/common/baseURL";
function DemoHeader(props) {
  const { leftSidebarToggle, title } = props;
  const [status, setstatus] = useState(true);
  useEffect(() => {
    getPaidUser();
  });
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  async function getPaidUser() {
    await axios
      .get(`${baseURL}/paiduser/${JSON.parse(auth)._id}`,
      {headers: { "authorization": JSON.parse(token) }})
      .then((response) => {
        console.log("PaidUser", response.data[0]);
        if (response.data[0].paidStatus === false) {
          setstatus(false);
        } else {
          setstatus(true);
        }
      })
      .catch((err) => console.error(err));
  }
  function handleClick() {}

  return (
    <div className="flex flex-col  p-24 w-full sm:py-32 sm:px-40">
      <div className="flex items-center w-full mt-8 -mx-10">
        {leftSidebarToggle && (
          <div className="flex lg:invisible shrink-0 items-center">
            <IconButton onClick={leftSidebarToggle} aria-label="toggle sidebar">
              <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
            </IconButton>
          </div>
        )}
        {status === true ? (
          <Typography
            component="h2"
            className="flex-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10  mx-10"
          >
            {title}
          </Typography>
        ) : (
         
          <Typography
            component="h2"
            className="flex-1 text-3xl md:text-4xl font-bold text-red-500  tracking-tight leading-7 sm:leading-10  mx-10"

          >
          ! Opps..😥 [Your Account is Disabled]
          </Typography>
          
          
          
        )}

        {}

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
