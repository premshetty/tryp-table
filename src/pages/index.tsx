import { Inter } from 'next/font/google';
import DataTable from '../components/DataTable';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [bookingData, setBookingData] = useState([]);

  const fetchData = async () => {
    const response = await fetch('/api/bookingData');
    const data = await response.json();
    setBookingData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const headersObject = {
    'Timestamp': 'Timestamp',
    'Purchase Id': 'Purchase Id',
    'Mail': 'Mail',
    'Name': 'Name',
    'Source': 'Source',
    'Status': 'Status',
    'Select': 'Select',
  };


  return (
    <DataTable
      sorting
      searchbar
      pagination
      headers={headersObject}
      rows={bookingData}
      caption="Bookings"
      filter
    />
  );
}
