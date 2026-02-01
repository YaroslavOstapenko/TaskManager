import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function useCompany() {
  const [company, setCompany] = useState(null);
  const fetch = async () => {
    try {
      const { data } = await axios.get('/users/company');
      setCompany(data);
    } catch (e) {
      setCompany(null);
    }
  };
  useEffect(() => { fetch(); }, []);
  const has = Boolean(company);
  return { company, hasCompany: has, refetch: fetch };
}