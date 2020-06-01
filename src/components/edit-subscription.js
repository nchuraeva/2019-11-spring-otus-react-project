import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd';


function EditSubscription(props) {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const { history } = props

  useEffect(() => {
    const requestOptions = { method: 'GET' };
    fetch('/api/subscriptions/' + props.match.params.id, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setItem(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
    <div>
      <div>{getForm({ error, isLoaded, item, history })}</div>
    </div>

  )
}

function getForm({ error, isLoaded, item, history }) {
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
      method: 'PUT',
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

    fetch('/api/subscriptions/' + item.id, requestOptions)
      .then(() => history.push("/subscriptions/all"));

  };

  const onFinishFailed = errorInfo => {
    history.push("/subscriptions/all")
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ name: item.service.name, link: item.service.link, category: item.service.category.name, price: item.price }}
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
          <Input/>
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
          <Input/>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input your Price!',
            },
          ]}>
          <Input/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default EditSubscription