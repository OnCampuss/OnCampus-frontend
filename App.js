import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes/Routes';

export default function App() {
  return (  
    <>
      <Routes />
      <StatusBar style="light" backgroundColor="#171717" /> 
    </>
  );
}
