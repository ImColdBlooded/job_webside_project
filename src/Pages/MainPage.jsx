import React from 'react';
import { DisplayNotoficationByCategory } from '../components/DisplayNotoficationByCategory';

export const MainPage = () => {
  const category = 'programowanie';
  return (
    <>
      <h1>Main Page</h1>
      <DisplayNotoficationByCategory category={category} />
    </>
  );
};
