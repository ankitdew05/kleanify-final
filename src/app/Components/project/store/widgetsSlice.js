import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('projectDashboardApp/widgets/getWidgets', async () => {
  const response = await axios.get('http://klaviyo-backend.herokuapp.com/project_dashboard_widgets');
  const data = await response.data[0].value;
console.log("ws-data", data)
  return data;
});

const widgetsSlice = createSlice({
  name: 'projectDashboardApp/widgets',
  initialState: null,
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ projectDashboardApp }) => projectDashboardApp.widgets;

export default widgetsSlice.reducer;
