import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Space, Button, InputNumber, Form, Popconfirm, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link, useNavigate } from 'react-router-dom';

import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

import Axios from 'axios'

const { Option } = Select;

function DisplayFlights() {
  const [flights, setFlights] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [dateQuery, setDateQuery] = useState('after');


  const getFlightsFromBE = () => {
    Axios.get('http://localhost:8000/admin/flights').then((response) => {
      console.log(response.data);
      setFlights(response.data);
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    getFlightsFromBE();
  }, []);

  const getColumnSearchProps = (dataIndex, columnName) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
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

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  // const [dateQuery, setDateQuery] = useState('after');
  // var dateQuery = 'after';
  const getDateColumnsProps = (dataIndex, columnName) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return <div style={{ padding: 8 }}>


        <Select onChange={(value) => {console.log(value); setDateQuery(value); }} defaultValue="after">
          <Option key='before' value="before" >Before:</Option>
          <Option key='after' value="after">After:</Option>
        </Select>


        <Input
          type='datetime-local'
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
            icon={<FilterOutlined />}
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


              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);

            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    },
    filterIcon: filtered => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      
      console.log(dateQuery)
      console.log(Date.parse(record[dataIndex]));
      console.log(Date.parse(value));
      return  record[dataIndex]
        ? dateQuery == 'before' ? Date.parse(record[dataIndex]) < Date.parse(value) : Date.parse(record[dataIndex]) >= Date.parse(value)
        : ''
    },

  });

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
      ...getDateColumnsProps('arrivalDate', 'Arrival Date')
    },
    {
      title: 'Departure Date',
      dataIndex: 'departureDate',
      key: 'departure',
      ...getDateColumnsProps('departureDate', 'Departure Date')
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
    {
      // title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <div>
            <Link style={{ marginRight: 10, textDecoration: 'none' }}
              to="/flight/edit" state={record}>Edit</Link>


            <Popconfirm title="Sure to delete?" onConfirm={() => deleteFlight(record._id)}>
              <a style={{ color: 'red' }}>Delete</a>
            </Popconfirm>

          </div>

        );
      },
    },
  ];

  const deleteFlight = (id) => {
    Axios.get(`http://localhost:8000/admin/flight/delete/${id}`).then((response) => {
      console.log(response);
      getFlightsFromBE();
    }).catch((e) => {
      console.log(e)
    })
  }


  return (
    <div>

      <br />
      <Link to="/flights/create">Add new flight</Link>
      <br />
      <br />
      <Table style={{ padding: 20 }} bordered={true} title={() => 'Flights'} pagination={false} dataSource={flights} columns={columns} />
    </div>

  );
}

export default DisplayFlights;