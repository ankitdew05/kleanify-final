import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { memo } from "react";
import Logo from "./shared-components/Logo";
import Navigation from "./shared-components/Navigation";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import HeaderFullScreenToggle from "./shared-components/FullScreenToggle";
import NavbarToggleFab from "app/theme-layouts/shared-components/NavbarToggleFab";
import NavigationShortcuts from "app/theme-layouts/shared-components/NavigationShortcuts";
import SettingsPanel from "app/theme-layouts/shared-components/SettingsPanel";
import NavbarToggleButton from "app/theme-layouts/shared-components/NavbarToggleButton";
import DropDown from "./shared-components/DropDown";
import UserMenu from "./shared-components/UserMenu";
import FuseSettingsViewerDialog from "app/theme-layouts/shared-components/FuseSettingsViewerDialog";
import UserNavbarHeader from "app/theme-layouts/shared-components/UserNavbarHeader";
import CustomizedMenus from "./shared-components/StyledMenu";
import SmallMenu from "./shared-components/SmallMenu";
import { fontSize } from "@mui/system";
import IconButton from '@mui/material/IconButton';



const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

function Navbar(props) {
  return (
    <Root
      className={clsx(
        "w-full h-64 min-h-64 max-h-64 shadow-md bg-[#FFFFFF]",
        props.className
      )}
    >
      <div className="flex flex-auto justify-around items-center w-full h-full container p-0 lg:px-24 z-20">
        <div className="flex md:flex-1 md:shrink-0 ml-11  justify-center">
          <Logo />
        </div>
        <div className="md:hidden flex">
        <SmallMenu />
        </div>
        <div className="md:flex sm:invisible md:visible hidden  md:flex-1  md:justify-evenly md:items-center ">
          
        <CustomizedMenus />
          <Button
            component="a"
            href="/pricing"
            target="_blank"
            rel="noreferrer noopener"
            role="button"
            className={clsx("", props.className)}
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "#FFFFFF",
              color: '#000000',
              fontSize: '15px'
            }}
            startIcon={
              <FuseSvgIcon size={16}>
                heroicons-outline:currency-dollar
              </FuseSvgIcon>
            }
          >
            Pricing
          </Button>
          <Button
            component="a"
            href="/contact"
            target="_blank"
            rel="noreferrer noopener"
            role="button"
            className={clsx("", props.className)}
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "#FFFFFF",
              color: '#000000',
              fontSize: '15px'
            }}
            startIcon={
              <FuseSvgIcon size={16}>
                heroicons-outline:chat-alt
              </FuseSvgIcon>
            }
          >
            Contact
          </Button>

          <Button
            component="a"
            href="/signin"
            target="_blank"
            rel="noreferrer noopener"
            role="button"
            className={clsx("", props.className)}
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "#FFFFFF",
              color: '#000000',
              fontSize: '15px'
            }}
            startIcon={
              <FuseSvgIcon size={16}>
                heroicons-outline:login
              </FuseSvgIcon>
            }
          >
            Login
          </Button>
         
          <Button
            component="a"
            href="/pricing"
            target="_blank"
            rel="noreferrer noopener"
            role="button"
            className={clsx("", props.className)}
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "#FCB900",

            }}
            startIcon={
              <FuseSvgIcon size={16}>
                heroicons-outline:trending-up
              </FuseSvgIcon>
            }
          >
            Get Started
          </Button>
         
          
        </div>
      </div>
    </Root>
  );
}

export default memo(Navbar);
