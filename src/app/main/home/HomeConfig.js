
import authRoles from '../../auth/authRoles';
import { HomePage } from './HomePage';

const HomeConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },

  auth: authRoles.user,
  routes: [
    {
      path: 'home',
      element: <HomePage />,
    },
  ],
};

export default HomeConfig;
