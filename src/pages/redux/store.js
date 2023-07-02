// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import userReducer from './slice/userSlice';
// import commentReducer from './slice/commentSlice';
// import communityReducer from './slice/communitySlice';

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import userReducer from './slice/userSlice';
import commentReducer from './slice/commentSlice'
import communityReducer from './slice/communitySlice'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    comment: commentReducer,
    community: communityReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false, // 비직렬화 가능성 체크 비활성화
  }),
});

const persistor = persistStore(store);

export { store, persistor };