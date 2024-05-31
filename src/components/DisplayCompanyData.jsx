import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../ContextApi/userData';
import { Form, Button, Container, Row, Col, Accordion, Alert, Card, Table } from 'react-bootstrap';

export const DisplayCompanyData = ({ data }) => {
  return (
    <>
      <h1>{data}</h1>
    </>
  );
};
