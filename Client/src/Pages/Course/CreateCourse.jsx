import React, { useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    createdBy: "",
    category: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];

    if (!uploadedImage) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setCourseData((prev) => ({
        ...prev,
        previewImage: fileReader.result,
        thumbnail: uploadedImage,
      }));
    };

    fileReader.readAsDataURL(uploadedImage);
  }

  function handleUserInput(e) {
    const { name, value } = e.target;

    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetForm() {
    setCourseData({
      title: "",
      description: "",
      createdBy: "",
      category: "",
      thumbnail: null,
      previewImage: "",
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    const {
      title,
      description,
      createdBy,
      category,
      thumbnail,
    } = courseData;

    if (
      !title ||
      !description ||
      !createdBy ||
      !category ||
      !thumbnail
    ) {
      toast.error("All fields are mandatory");
      return;
    }

  
    try {
      console.log(courseData);
      const response = await dispatch(createNewCourse(courseData));

      if (response?.payload?.success) {
        toast.success("Course created successfully");

        resetForm();

        setTimeout(() => {
          navigate("/courses");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create course");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-10 text-white">
        <div className="w-full max-w-5xl bg-gray-900 rounded-2xl p-8 shadow-[0_0_25px_rgba(59,130,246,0.4)]">
          <h1 className="text-3xl font-bold text-center mb-8">
            Create Course
          </h1>

          <form onSubmit={onFormSubmit} noValidate>
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left Section */}
              <div>
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center h-72 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 transition-all"
                >
                  {courseData.previewImage ? (
                    <img
                      src={courseData.previewImage}
                      alt="Course Thumbnail"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <FaFileUpload className="w-16 h-16 text-gray-400" />
                      <p className="mt-4 text-gray-400">
                        Click to upload thumbnail
                      </p>
                    </>
                  )}
                </label>

                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />

                <div className="mt-6">
                  <label className="block mb-2 font-medium">
                    Instructor Name
                  </label>

                  <input
                    type="text"
                    name="createdBy"
                    value={courseData.createdBy}
                    onChange={handleUserInput}
                    placeholder="Enter instructor name"
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium">
                    Course Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={courseData.title}
                    onChange={handleUserInput}
                    placeholder="Enter course title"
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={courseData.category}
                    onChange={handleUserInput}
                    placeholder="Enter category"
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleUserInput}
                    placeholder="Enter course description"
                    rows="6"
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-all active:scale-95"
                >
                  Create Course
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;