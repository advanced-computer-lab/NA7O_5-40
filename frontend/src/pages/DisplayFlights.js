import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Space, Button } from 'antd';
import Highlighter from 'react-highlight-words';

import { SearchOutlined } from '@ant-design/icons';

import Axios from 'axios'

function DisplayFlights() {
  const [flights, setFlights] = useState([]);
  const [searchInput, setSearchInputs] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:8000/admin/flights').then((response) => {
      console.log(response.data);
      setFlights(response.data);
    }).catch((e) => {
      console.log(e)
    })
  }, []);

  const getColumnSearchProps = (dataIndex, columnName) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            // searchInput = node;
            setSearchInputs(node);
          }}
          placeholder={`Search ${columnName}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              // setState({
              //   searchText: selectedKeys[0],
              //   searchedColumn: dataIndex,
              // });

              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);

            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    // setState({ searchText: '' });
    setSearchText('');
  };


  const columns = [
    {
      title: 'Flight No',
      dataIndex: 'flightNo',
      key: 'flightNo',
      ...getColumnSearchProps('flightNo', 'Flight No'),
    },
    {
      title: 'Arrival Date',
      dataIndex: 'arrivalDate',
      key: 'arrival',
    },
    {
      title: 'Departure Date',
      dataIndex: 'departureDate',
      key: 'departure',
    },

    {
      title: 'Departure Airport',
      dataIndex: 'departureAirport',
      key: 'departureAirport',
      ...getColumnSearchProps('departureAirport', 'Departure Airport'),
    },
    {
      title: 'Arrival Airport',
      dataIndex: 'arrivalAirport',
      key: 'arrivalAirport',
      ...getColumnSearchProps('arrivalAirport', 'Arrival Airport'),
    },
    {
      title: 'Buisiness Seats',
      dataIndex: 'businessSeats',
      key: 'businessSeats',
    },
    {
      title: 'Economy Seats',
      dataIndex: 'economySeats',
      key: 'economySeats',
    },
  ];

  return (
    <Table dataSource={flights} columns={columns} />
  );
}

export default DisplayFlights;