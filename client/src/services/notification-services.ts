import axios from "axios";

export const clearNotification = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.post("/api/clear-notification", {
      userId,
    });
    if (response) {
      console.log("Notification cleared", response);
    }
  } catch (error) {
    console.log(error);
  }
};
