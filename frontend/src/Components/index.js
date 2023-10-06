import React, { useState, useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import View from './View';
const url = 'http://localhost:5000';

const Index = () => {
  
  return (
   <>
   <div>Index</div>
   <View/>
   </>
  )
}

export default Index