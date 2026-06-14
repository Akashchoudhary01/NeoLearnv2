import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../Helpers/AxiosInstance";
import toast from "react-hot-toast";

const initialState = {
  lectures: [],
};

export const getLectureById = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    try {
      const response = AxiosInstance.get(`/courses/${cid}`);
      toast.promise(response, {
        loading: "Fetching Course Data",
        success: "Lecture Fetched Successfully",
        error: "Failed To Fetch Lecture !",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  },
);

export const AddLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const response = AxiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(response, {
        loading: "Adding Lecture to Course ",
        success: "Lecture Added Successfully",
        error: "Failed To Add Lecture !",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },
);
// Remove lecture

export const RemoveLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
      console.log("Thunk payload:", data);
    try {
      const response = AxiosInstance.delete(
        `/courses/${data.courseId}/lecture/${data.lectureId}`,
      );
      toast.promise(response, {
        loading: "deleting Lecture from Course ",
        success: "Lecture deleted Successfully",
        error: "Failed To delete Lecture !",
      });
      return (await response).data;
    } catch (error) {
      // toast.error(error);
      console.log(error);
      
    }
  },
);

const LectureSlice = createSlice({
  name: "lecture",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLectureById.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lecture;
      })
      .addCase(AddLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default LectureSlice.reducer;
