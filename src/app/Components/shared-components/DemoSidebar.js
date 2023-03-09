import FuseNavigation from '@fuse/core/FuseNavigation';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import clsx from "clsx";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Navigation from './Navigation'
const navigationData = [
  {
    id: '1',
    title: '',
    subtitle: '',
    type: 'group',
    children: [
      {
        id: '1.1',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'heroicons-outline:plus-circle',
      },
      {
        id: '1.2',
        title: 'Email Validation',
        type: 'item',
        url: '/email-validation',
        icon: 'heroicons-outline:badge-check',
      }, 
      {
        id: '1.3',
        title: 'Bulk Validation',
        type: 'item',
        url: '/bulk-email-validation',
        icon: 'heroicons-outline:beaker',
      },
      {
        id: '1.4',
        title: 'List Cleaning',
        type: 'item',
        url: '/list-cleaning',
        icon: 'heroicons-outline:user-add',
      },
      {
        id: '1.5',
        title: 'Buy Credits',
        type: 'item',
        url: '/buy-credits',
        icon: 'heroicons-outline:badge-check',
      },
      {
        id: '3.1',
        title: 'Settings',
        type: 'item',
        url: '/setting',
        icon: 'heroicons-outline:cog',
      },
      {
        id: '3.1',
        title: 'Support',
        type: 'item',
        url: '/support',
        icon: 'heroicons-outline:support',
      },
      {
        id: '3.1',
        title: 'Logout',
        type: 'item',
        url: '/signout',
        icon: 'heroicons-outline:logout',
      }
    ],
  },
  {
    id: '4',
    type: 'divider',
  },
];

function DemoSidebar() {
  return (
    <div className="px-[21px] py-24 fixed bg-[#FFF6CF] min-h-6xl h-max ">
      <div className="mx-12 text-3xl font-bold flex justify-between">
      <a href="https://app.kleanify.co">
            <img
              className="w-128 h-36"
              src="https://kleanify.co/wp-content/uploads/2022/05/Kleanify-Full-Logo.png"
              alt="Kleanify-Logo"
            />
          </a>
      </div>
      <FuseNavigation navigation={navigationData} className="px-0" />
      
    </div>
  );
}

export default DemoSidebar;