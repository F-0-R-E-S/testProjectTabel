import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from './layout/layout';
import { TrainingLayout } from './layout/trainingLayout';
import Main from './pages/main/mainPage';

const RoutesSPA = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<TrainingLayout />}>
            <Route index element={<Main />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default RoutesSPA
