import { getMessage, addChatRoom,moreMessage, setLoading, setMeta } from "../slices/chatUser";

import { axiosInstance } from "../../index";
const url = 'http://localhost:8000/';

export const getChatMessage = (username) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`${url}chats/create/${username}/`);

    dispatch(getMessage(res.data.data));
    dispatch(setMeta(res.data.meta))
  } catch (err) {
    
  }
};

export const getRooms = (other_user) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    if (other_user) {
      const res = await axiosInstance.post(`${url}chats/get_rooms/`, {
        other_user: other_user,
      });

      dispatch(addChatRoom(res.data));
    } else {
      const res = await axiosInstance.get(`${url}chats/get_rooms/`);
      console.log(res.data)
      dispatch(addChatRoom(res.data));
    }


    // dispatch(setLoading(false))
  } catch (err) {
  
    dispatch(setLoading(false));
  }
};

export const loadMoreMessage= (nextPage) => async (dispatch) => {
 
  try {
    const res = await axiosInstance.get(nextPage);
   dispatch(moreMessage(res.data.data))
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    
  }
};