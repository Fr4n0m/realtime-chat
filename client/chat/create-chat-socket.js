import { io } from "socket.io-client";

export const createChatSocket = ({ socketUrl, username }) => {
  const socketOptions = {
    withCredentials: true,
    auth: {
      username,
    },
  };

  return socketUrl ? io(socketUrl, socketOptions) : io(socketOptions);
};
