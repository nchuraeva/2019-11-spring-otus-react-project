import React, { useEffect } from 'react'

import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

export default function NewSubscription(props) {
  const { history } = props

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = values => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price: values.price,
        service: {
          name: values.name,
          link: values.link,
          category: {
            name: values.category
          }
        }
      })
    };
    fetch('/api/subscriptions', requestOptions)
      .then(() => history.push("/subscriptions/all"));
  };

  const onFinishFailed = errorInfo => {
    history.push("/subscriptions/all")
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Service name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Link"
        name="link"
        rules={[
          {
            required: true,
            message: 'Please input your Service link!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: 'Please input your Category!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input your Price!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}