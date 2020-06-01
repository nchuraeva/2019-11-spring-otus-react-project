import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom"
import { Table, Button, Space, Popconfirm } from 'antd';

function SubscriptionList(props) {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const { history } = props

  useEffect(() => {
    fetch("/api/subscriptions")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
    <div>
      <h2 style={{ float: "left" }}>subscriptions</h2>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/subscriptions/new"><Button type="primary">Add new</Button></Link>
      </div>
      <div>{getTable({ error, isLoaded, items, history, setItems })}</div>
    </div>

  )
}

function getTable({ error, isLoaded, items, history, setItems }) {

  const handleClick = (record, history) => {
    history.push(`/subscriptions/edit/${record.id}`)
  }

  const columns = [
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Service',
      render: (record) => record.service.name
    },
    {
      title: 'Category',
      render: (record) => record.service.category.name
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id, items, history, setItems)}>
            <a>Delete</a>
          </Popconfirm>
          <a onClick={() => handleClick(record, history)}>
            Edit
        </a>
        </Space>
      )
    }
  ];

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <Table
        columns={columns}
        rowKey={item => item.id}
        dataSource={items}
      />
    );
  }
}

function handleDelete(id, items, history, setItems) {
  const requestOptions = {
    method: 'DELETE'
  };

  fetch('/api/subscriptions/' + id, requestOptions)
    .then(() => {
      setItems(items.filter(item => item.id != id))
      history.push("/subscriptions/all")
    });
}

export default SubscriptionList