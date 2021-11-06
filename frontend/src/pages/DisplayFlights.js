import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Input } from 'antd';
import Axios from 'axios'

function DisplayFlights() {
  const [flights, setFlights] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:8000/admin/flights').then((response) => {
      console.log(response.data);
      setFlights(response.data);
    }).catch((e) => {
      console.log(e)
    })
  }, []);

  // const dataSource = [
  //   {
  //     key: '1',
  //     name: 'Mike',
  //     age: 32,
  //     address: '10 Downing Street',
  //   },
  //   {
  //     key: '2',
  //     name: 'John',
  //     age: 42,
  //     address: '10 Downing Street',
  //   },
  // ];

  const columns = [
    {
      title: 'flightNo',
      dataIndex: 'flightNo',
      key: 'flightNo',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Table dataSource={flights} columns={columns} />
  );
}

export default DisplayFlights;