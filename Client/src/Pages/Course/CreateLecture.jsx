import React, {useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import { AddLecture } from "../../Redux/Slices/LectureSlice";

const CreateLecture = () => {
  const courseDetails = useLocation()?.state;
  console.log("courseDetails" ,  courseDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lectureData, setLectureData] = useState({
    id: courseDetails?._id,
    title: "",
    description: "",
    lecture: undefined,
    videosrc: "",
  });

  //Handle Video Uploade
  function handelLectureUploade(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    console.log("source" , source);

    setLectureData((prev) => ({
      ...prev,
      lecture: video,
      videosrc: source,
    }));
  }

  //   handleUserinput

  function handelUserInput(e) {
    const { name, value } = e.target;
    setLectureData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    const { title, description, lecture } = lectureData;
    if (!title || !description || !lecture) {
      toast.error("Every Filed is Mandetory");
      return;
    }
    try {
    //   console.log("lectureData" , lectureData);
      const response = await dispatch(AddLecture(lectureData));
      if (response?.payload?.success) {
        toast.success("Lecture Created Success !");

        setLectureData({
          id: courseDetails?._id,
          title: "",
          description: "",
          lecture: undefined,
          videosrc: "",
        });

      setTimeout(() => {
  navigate("/courses/lecture", {
    state: courseDetails,
  });
}, 1000);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed To create Lecture !");
    }
  }


  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-10 text-white">
        <div className="w-full max-w-5xl bg-gray-900 rounded-2xl p-8 shadow-[0_0_25px_rgba(59,130,246,0.4)]">
          <h1 className="text-3xl font-bold text-center mb-8">Create Lecture</h1>

          <form onSubmit={handleFormSubmit} noValidate>
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left Section */}
              <div>
                <label
                  htmlFor="lecture"
                  className="flex flex-col items-center justify-center h-72 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 transition-all"
                >
                  <FaFileUpload className="w-16 h-16 text-gray-400" />
                  <p className="mt-4 text-gray-400">Click to upload Lecture</p>
                </label>

                <input
                  type="file"
                  id="lecture"
                  accept="video/*"
                  hidden
                  onChange={handelLectureUploade}
                />
              </div>

              {/* Right Section */}
              <div className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium">Lecture Title</label>

                  <input
                    type="text"
                    name="title"
                    value={lectureData.title}
                    onChange={handelUserInput}
                    placeholder="Enter course title"
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Description</label>

                  <textarea
                    name="description"
                    value={lectureData.description}
                    onChange={handelUserInput}
                    placeholder="Enter course description"
                    rows="6"
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-all active:scale-95"
                >
                  Create Lecture
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CreateLecture;
