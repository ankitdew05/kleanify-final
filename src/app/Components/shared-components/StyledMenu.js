import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MarkEmailReadTwoToneIcon from '@mui/icons-material/MarkEmailReadTwoTone';
import PlaylistAddCheckTwoToneIcon from '@mui/icons-material/PlaylistAddCheckTwoTone';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import EqualizerTwoToneIcon from '@mui/icons-material/EqualizerTwoTone';
import CancelScheduleSendTwoToneIcon from '@mui/icons-material/CancelScheduleSendTwoTone';
import { Link } from 'react-router-dom';
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 10,
    marginTop: theme.spacing(2),
    minWidth: 350,
    minHeight: 300,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '2px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 38,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        style={{
              backgroundColor: "#FFFFFF",
              color: '#000000',
              fontSize: '15px'
            }}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Products 
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <MarkEmailReadTwoToneIcon />
          <Link to='/email-validation'>Automated Email Validation</Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem  disableRipple>
          <PlaylistAddCheckTwoToneIcon />
          <Link to='/list-cleaning'>Automated List Cleaning</Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem  disableRipple>
          <ForwardToInboxTwoToneIcon />
          <Link to='/inbox-testing'>Inbox Placement Testing </Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem disableRipple>
          <EqualizerTwoToneIcon />
          <Link to='/content-spam-check'>Content Spam Score</Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem disableRipple>
          <VerifiedUserTwoToneIcon />
          <Link to='/klaviyo-audit'>Klaviyo Account Audit</Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem disableRipple>
          <CancelScheduleSendTwoToneIcon />
          <Link to='/bounce-checker'>Free Bounce Checker</Link>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}


