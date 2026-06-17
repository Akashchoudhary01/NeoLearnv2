import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getLectureById, RemoveLecture } from "../../Redux/Slices/LectureSlice";

export default function DisplayLectures() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state?.lecture);
  const { role } = useSelector((state) => state?.auth);
  const [currentVideo, setCurrentVideo] = useState(0);

  const handelLectureDeletion = async (courseId, lectureId) => {
    await dispatch(
      RemoveLecture({
        courseId,
        lectureId,
      }),
    );

    await dispatch(getLectureById(courseId));
  };

  useEffect(() => {
    console.log("Lecture page state:", state);

    if (!state?._id) {
      navigate("/courses");
      return;
    }

    dispatch(getLectureById(state._id));
  }, [dispatch, navigate, state]);

  return (
    <div>
      <HomeLayout>
      <div className="flex flex-col items-center min-h-[90vh] py-8 px-4 text-white">
  {/* Header */}
  <div className="text-center mb-8">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-500">
      {state?.title}
    </h1>

    <p className="text-gray-400 mt-2 text-sm sm:text-base">
      {lectures?.length || 0} Lecture
      {lectures?.length !== 1 ? "s" : ""}
    </p>
  </div>

  {lectures?.length > 0 ? (
    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Video Section */}
      <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-[0_0_15px_rgba(0,0,0,0.4)]">
        <video
          controls
          disablePictureInPicture
          controlsList="nodownload"
          className="w-full rounded-xl"
          src={lectures?.[currentVideo]?.video?.secure_url}
        />

        <div className="mt-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-400">
            {lectures?.[currentVideo]?.title}
          </h2>

          <p className="text-gray-300 mt-3 leading-relaxed text-sm sm:text-base">
            {lectures?.[currentVideo]?.description}
          </p>
        </div>
      </div>

      {/* Lecture List */}
      <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-[0_0_15px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Lecture List
          </h2>

          {role === "ADMIN" || role === "SUPER_ADMIN" &&(
            <button
              onClick={() =>
                navigate("/courses/lecture/add", {
                  state: { ...state },
                })
              }
              className="w-full sm:w-auto bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Add Lecture
            </button>
          )}
        </div>

        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
          {lectures.map((lecture, idx) => (
            <div
              key={lecture._id}
              className={`p-4 rounded-xl border transition-all ${
                currentVideo === idx
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-gray-500"
              }`}
            >
              <div
                onClick={() => setCurrentVideo(idx)}
                className="cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      Lecture {idx + 1}
                    </p>

                    <p className="text-gray-300 text-sm">
                      {lecture.title}
                    </p>
                  </div>

                  {currentVideo === idx && (
                    <span className="text-blue-400 text-xs sm:text-sm">
                      Playing
                    </span>
                  )}
                </div>
              </div>

              {role === "ADMIN" || role === "SUPER_ADMIN" && (
                <button
                  onClick={() =>
                    handelLectureDeletion(
                      state?._id,
                      lecture?._id
                    )
                  }
                  className="mt-3 w-full sm:w-auto bg-red-500 px-3 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete Lecture
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center mt-16 px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300">
        No Lectures Available
      </h1>

{role === "ADMIN" || role === "SUPER_ADMIN" && (
      <p className="text-gray-500 mt-3 text-sm sm:text-base">
        Start by adding your first lecture.
      </p>
)}

      {role === "ADMIN" || role === "SUPER_ADMIN" && (
        <button
          onClick={() =>
            navigate("/courses/lecture/add", {
              state,
            })
          }
          className="mt-6 bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Add First Lecture
        </button>
      )}
    </div>
  )}
</div>
      </HomeLayout>
    </div>
  );
}
