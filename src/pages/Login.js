import React from 'react';
import { Form, Input, Button, Typography, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      const { username, password } = values;

      if (username === 'admin' && password === 'password') {
        navigate('/dashboard');
        message.success("Logged in successfully") ;
      } else {
        message.error('Invalid username or password');
      }
    },
  });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <h1 className='text-2xl font-bold mb-4'>MyAirDeal</h1>
          <Title level={3} style={styles.title}>
            Admin Panel Login
          </Title>
        </Space>
        <Form layout="vertical" onFinish={formik.handleSubmit}>
 <Form.Item
            label="Username"
            validateStatus={formik.touched.username && formik.errors.username ? 'error' : ''}
            help={formik.touched.username && formik.errors.username}
          >
            <Input
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Enter your username"
            />
          </Form.Item>         
          <Form.Item
            label="Password"
            validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
            help={formik.touched.password && formik.errors.password}
          >
            <Input.Password
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block style={styles.button}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: "url('/path/to/background.jpg') no-repeat center center fixed",
    backgroundSize: 'cover',
  },
  card: {
    width: '400px',
    padding: '30px',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#001529',
    borderColor: '#001529',
  },
};

export default Login;
