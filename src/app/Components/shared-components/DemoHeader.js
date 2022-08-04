import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import UserMenu from "./UserMenu";

function DemoHeader(props) {
  const { leftSidebarToggle, title } = props;
  const auth = localStorage.getItem("user");
  function handleClick() {}

  return (
    <div className="flex flex-col  p-24 w-full sm:py-32 sm:px-40">
      <div>
        {/* <Breadcrumbs
          separator={<FuseSvgIcon size={20}>heroicons-solid:chevron-right</FuseSvgIcon>}
          aria-label="breadcrumb"
        >
          <Link
            className="font-medium"
            underline="hover"
            key="1"
            color="inherit"
            to="/"
            onClick={handleClick}
          >
            Projects
          </Link>
          <Link
            className="font-medium"
            underline="hover"
            key="2"
            color="inherit"
            to="/getting-started/installation/"
            onClick={handleClick}
          >
            Weekend Project
          </Link>
          <Typography className="font-medium" key="3" color="text.primary">
            Overview
          </Typography>
        </Breadcrumbs> */}

        <div className="flex sm:hidden" />
      </div>
      <div className="flex items-center w-full mt-8 -mx-10">
        {leftSidebarToggle && (
          <div className="flex lg:invisible shrink-0 items-center">
            <IconButton onClick={leftSidebarToggle} aria-label="toggle sidebar">
              <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
            </IconButton>
          </div>
        )}
        <Typography
          component="h2"
          className="flex-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10  mx-10"
        >
          {title}
        </Typography>
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
