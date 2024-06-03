import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Accordion, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SearchCompany } from '../components/SearchCompany';

export const CompanyProfilesSearch = () => {
  return (
    <>
      <SearchCompany />
    </>
  );
};
