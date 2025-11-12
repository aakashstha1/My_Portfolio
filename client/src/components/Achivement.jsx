import { Carousel } from "antd";
import SectionTitle from "./SectionTitle";
import Lottie from "lottie-react";
import certificate from "../assets/lottie/certificate.json";
import axios from "axios";
import { useEffect, useState } from "react";

function Achievement() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await axios.get(`${API_URL}/achievement/get`);
        if (res.data.success) {
          setAchievements(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div id="achievement">
      <SectionTitle title="Achievements" />
      <div className="flex w-full items-center sm:flex-col">
        {/* Carousel */}
        <div className="flex flex-col gap-5 w-2/3 text-white p-5 sm:w-full sm:items-center">
          {achievements.length > 0 ? (
            <Carousel
              arrows
              autoplay
              dots={false}
              autoplaySpeed={3000}
              className=" h-100"
            >
              {achievements.map((achievement, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    src={achievement.imgURL || achievement.imageURL}
                    alt={achievement.title}
                    className="px-10 w-full h-full rounded-lg mx-auto"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="text-center text-white text-lg font-medium py-12">
              No achievements yet.
            </div>
          )}
        </div>

        {/* Lottie animation */}
        <div className="h-[50vh] w-1/3 flex sm:w-full sm:h-[30vh] justify-end sm:hidden">
          <Lottie animationData={certificate} loop={true} />
        </div>
      </div>
    </div>
  );
}

export default Achievement;
