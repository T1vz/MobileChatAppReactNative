/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import DeviceInfo from 'react-native-device-info'



import {
  Text,
} from 'react-native';

import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import AuthPage from './Pages/AuthPage';
import ChatPage from './Pages/ChatPage';



const App: () => React$Node = () => {

  const {token, login, logout, userId, username} = useAuth()
  const isAuthenticated = !!token
  
  let unqueId = DeviceInfo.getUniqueId()
  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated, username}}>
      {/* SideBar */}
      {/* Chat */}
      {isAuthenticated || <AuthPage></AuthPage>} 
      <Text>Your deviceId = {unqueId}</Text>
      <Text>Your username = {username}</Text>

      {isAuthenticated && <ChatPage></ChatPage>}
      
    </AuthContext.Provider>
  );
};

export default App;
