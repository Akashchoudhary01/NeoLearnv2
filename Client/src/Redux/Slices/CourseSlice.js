import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../Helpers/AxiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  courseData: [],
  error: null,
};

//get All Course
export const getAllCourse = createAsyncThunk(
  "/course/get",
  async (_, { rejectWithValue }) => {
    try {
      const responsePromise = AxiosInstance.get("/courses");

      toast.promise(responsePromise, {
        loading: "Loading Course Data...",
        success: "Courses Loaded Successfully",
        error: "Failed to load Course Data",
      });

      const response = await responsePromise;

      return response.data.courses;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err?.response?.data);
    }
  },
);

// Create New Course 
export const createNewCourse = createAsyncThunk("course/create" , async (data)=>{
  try{
    let formData = new FormData();

    formData.append("title" , data.title);
    formData.append("description" , data.description);
    formData.append("category" , data.category);
    formData.append("createdBy" , data.createdBy);
    formData.append("thumbnail" , data.thumbnail);



    const response = AxiosInstance.post("/courses" , formData);
    toast.promise(response , {
      success : "Course Created Successfully",
      loading : "Creating new Course....",
      error : "Failed to create new course"
    })

    return (await response).data;
  }catch(error){
    toast.error(error?.response?.data?.message)
  }
})

export const deleteCourse = createAsyncThunk("/course/get" , async(id)=>{
  try {
    const response = AxiosInstance.delete(`courses/${id}`);
    toast.promise(response , {
      loading : "Deleting Course",
      success : "Course Deleted Successfully",
      error : "Failed To delete Course"
    })

    return(await response).data.courses;
    
  } catch (error) {
    toast.error(error?.response?.data?.message)
    
  }
})
const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourse.fulfilled, (state, action) => {
        if (action.payload) {
          // console.log(action.payload);
          // console.log("Hello ");

          state.courseData = [...action.payload];
        }
      })
      .addCase(getAllCourse.rejected, (state, action) => {
        state.error = action?.payload?.error;
      });
  },
});
export default CourseSlice.reducer;
