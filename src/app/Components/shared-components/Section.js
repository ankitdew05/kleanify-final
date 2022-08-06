import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function Section(props) {
  const { title } = props;
  const auth = localStorage.getItem('user');
  function handleClick() {}

  return (
    <div className="flex flex-col bg-green-300 p-24 w-full sm:py-32 sm:px-40">
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
   
        <div className="flex-col">

        <Typography className="username text-14 whitespace-nowrap font-medium">
          {title}
        </Typography>
    
        </div>
        
      </div>
    </div>
  );
}

export default Section;
