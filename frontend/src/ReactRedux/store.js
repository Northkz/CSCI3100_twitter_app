import { configureStore } from '@reduxjs/toolkit'
import  changeClass  from './slices/stateSlice'

import userRegister from './slices/userSlice'
import tweetReducer from './slices/tweetSlice'
import commentReducer  from './slices/CommentUser'
import notificationReducer  from './slices/NotificationUser'
import chatReducer  from './slices/chatUser'

const store = configureStore({
  reducer: {
      changeClass:changeClass,
      userReducer:userRegister,
      tweetReducer:tweetReducer,
      commentReducer:commentReducer,
      notificationReducer:notificationReducer,
      chatReducer:chatReducer
  },
})

export default store