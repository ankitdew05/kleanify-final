import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import AboutTab from './tabs/AboutTab';
import PhotosVideosTab from './tabs/PhotosVideosTab';
import TimelineTab from './tabs/TimelineTab';
import { useThemeMediaQuery } from '@fuse/hooks';
import { useParams } from 'react-router-dom';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
}));

function ProfileApp(props) {
  const params = useParams()
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  console.log("props",props)
  useEffect(() => {
    if (params.step) {
      console.log("Called")
      setSelectedTab(parseInt(params.step));
    }
  }, [])
  console.log("Params", params)
  function handleTabChange(event, value) {
    setSelectedTab(value);
  }
  return (
    <div className='w-full bg-[#F1F5F9]'>
      <div className="flex flex-col justify-center max-w-full space-y-10">
        <div className="flex items-center mx-auto mt-20 mb-20 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
          <a href="https://app.kleanify.co" className='flex text-center'>
            <img
              className="w-136 h-36"
              src="https://kleanify.co/wp-content/uploads/2022/05/Kleanify-Full-Logo.png"
              alt="Kleanify-Logo"
            />
          </a>
        </div>
        <div className="mt-4 text-4xl sm:text-7xl font-semibold tracking-tight leading-tight text-center">
        SMS Preview Link Generator
        </div>
        <div className="flex flex-col flex-0 lg:flex-row items-center w-full mx-auto px-32 lg:h-72">
          <div className="flex flex-1 justify-center lg:my-0">
            <Tabs
              value={selectedTab}
              //onChange={handleTabChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons={false}
              className="-mx-4 min-h-40"
              classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
              TabIndicatorProps={{
                children: (
                  <Box
                    sx={{ bgcolor: 'text.disabled' }}
                    className="w-full h-full rounded-full opacity-20"
                  />
                ),
              }}
            >
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                disableRipple
                label="Step 1"
              />
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                disableRipple
                label="Step 2"
              />
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                disableRipple
                label="Step 3"
              />
            </Tabs>
          </div>
        </div>
        <div className="flex flex-auto justify-center w-full max-w-full mx-auto p-24 sm:p-32">
          {selectedTab === 0 && <TimelineTab />}
          {selectedTab === 1 && <AboutTab />}
          {selectedTab === 2 && <PhotosVideosTab />}
        </div>
      </div>
    </div>

  );
}

export default ProfileApp;



// <Root
    //   header={
    //     <div className="flex flex-col  justify-center shadow  bg-black max-w-full h-full">
    //       <div className="flex items-center mx-auto mt-20 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
    //         <a href="https://app.kleanify.co" className='flex text-center'>
    //           <img
    //             className="w-164 h-64"
    //             src="https://kleanify.co/wp-content/uploads/2022/05/Kleanify-Full-Logo.png"
    //             alt="Kleanify-Logo"
    //           />
    //         </a>
    //       </div>
    //       <div className="mt-4 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight text-center">
    //         SMS Preview Link Generator
    //       </div>
    //       <div className="flex flex-col flex-0  lg:flex-row items-center w-full mx-auto px-32 lg:h-72">
    //         <div className="flex flex-1 justify-center my-16 lg:my-0">
    //           <Tabs
    //             value={selectedTab}
    //             onChange={handleTabChange}
    //             indicatorColor="primary"
    //             textColor="inherit"
    //             variant="scrollable"
    //             scrollButtons={false}
    //             className="-mx-4 min-h-40"
    //             classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
    //             TabIndicatorProps={{
    //               children: (
    //                 <Box
    //                   sx={{ bgcolor: 'text.disabled' }}
    //                   className="w-full h-full rounded-full opacity-20"
    //                 />
    //               ),
    //             }}
    //           >
    //             <Tab
    //               className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
    //               disableRipple
    //               label="Step 1"
    //             />
    //             <Tab
    //               className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
    //               disableRipple
    //               label="Step 2"
    //             />
    //             <Tab
    //               className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
    //               disableRipple
    //               label="Step 3"
    //             />
    //           </Tabs>
    //         </div>
    //       </div>
    //     </div>
    //   }
    //   content={
    //
    //   }
    //   scroll={isMobile ? 'normal' : 'page'}
    // />