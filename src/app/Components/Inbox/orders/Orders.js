import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import OrdersHeader from './OrdersHeader';
import OrdersTable from './OrdersTable';
import axios from 'axios';
import { useEffect, useState } from 'react';
import baseURL from "src/app/common/baseURL";
import OrdersTable2 from './OrdersTable2';
function Orders() {
  const auth = localStorage.getItem("user");
  const [status, setstatus] = useState(false);
  useEffect( ()=>{
    getData().then((res)=>{
      if( res === "true" ){
        setstatus(!status);
      }else{
        setstatus(status)
      }
    })
  },[])
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('md'));
  async function getData() {
    const data = await  axios
    .get(`${baseURL}/senderSignature/${JSON.parse(auth)._id}`)
    .then((response) => {
      return response.data.Status
    })
    .catch((err) => console.error(err));
    return data;
  }
  
if(status){
  return (
    <FusePageCarded
      header={<OrdersHeader />}
      content={<OrdersTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
} else{
  return (
    <FusePageCarded
      content={<OrdersTable2 />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}
 
}

export default withReducer('eCommerceApp', reducer)(Orders);
