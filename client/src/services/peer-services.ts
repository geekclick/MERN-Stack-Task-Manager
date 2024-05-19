import axios from "axios";
import { FormEvent } from "react";
import { clearNotification } from "./notification-services";

export const peerRequest = async (
  recieverId: string,
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  try {
    const senderId = localStorage.getItem("userId");
    const response = await axios.post("/api/peer-request", {
      senderId,
      recieverId,
    });
    if (response) {
      console.log("Request sent succesfullys", response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addPeer = async (recieverId: string) => {
  try {
    const senderId = localStorage.getItem("userId");
    const response = await axios.post("/api/add-peer", {
      senderId,
      recieverId,
    });
    if (response) {
      console.log("Peer added successfully", response);
      clearNotification();
    }
  } catch (error) {
    console.log(error);
  }
};
