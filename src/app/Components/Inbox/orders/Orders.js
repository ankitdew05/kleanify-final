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
import FuseLoading from "@fuse/core/FuseLoading";

function Orders() {
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [status, setstatus] = useState(false);
  useEffect( ()=>{
    getData().then((res)=>{
      if( res === "true" ){
        setstatus(!status);
        setLoading(false)
      }else{
        setstatus(status)
        setLoading(false)
      }
    })
  },[])
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('md'));
  async function getData() {
    const data = await  axios
    .get(`${baseURL}/senderSignature/${JSON.parse(auth)._id}`,
    {
      headers: { "authorization": JSON.parse(token) }})
    .then((response) => {
      return response.data.Status
    })
    .catch((err) => console.error(err));
    return data;
  }
  
  if (loading) {
    return (
      <div className="flex w-full items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
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
