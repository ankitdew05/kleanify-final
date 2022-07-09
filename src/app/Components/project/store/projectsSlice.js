import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../common/baseURL'

export const getProjects = createAsyncThunk(
  'projectDashboardApp/projects/getProjects',
  async () => {
    const response = await axios.get(`${baseURL}/project_dashboard_projects`);
    console.log("ps-data", response.data)
    return response.data[0].value;
    
  }
);

const projectsAdapter = createEntityAdapter({});

export const {
  selectAll: selectProjects,
  selectEntities: selectProjectsEntities,
  selectById: selectProjectById,
} = projectsAdapter.getSelectors((state) => state.projectDashboardApp.projects);

const projectsSlice = createSlice({
  name: 'projectDashboardApp/projects',
  initialState: projectsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getProjects.fulfilled]: projectsAdapter.setAll,
  },
});

export default projectsSlice.reducer;
