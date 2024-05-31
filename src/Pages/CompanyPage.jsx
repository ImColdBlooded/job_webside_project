import React from 'react';
import { DisplayCompanyData } from '../components/DisplayCompanyData';
import { useLocation } from 'react-router-dom';

export const CompanyPage = () => {
  const location = useLocation();
  const { companyId } = location.state || {};
  return (
    <>
      <DisplayCompanyData data={companyId} />
    </>
  );
};
