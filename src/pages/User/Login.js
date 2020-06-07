import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Checkbox, Alert, Modal, Row, Col } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  forgotPassword = () => {
    Modal.info({
      title: (
        <p>
          忘记密码？联系管理员<a href="tel:15958110140">张文博</a>重置！
        </p>
      ),
      content: (
        <div>
          <Row>
            <Col span={6}>电话：</Col>
            <Col span={18}>
              <a href="tel:15958111234">159 5811 1234</a>
            </Col>
          </Row>
          <Row>
            <Col span={6}>微信：</Col>
            <Col span={18}>zwbchat</Col>
          </Row>
          <Row>
            <Col span={6}>电子邮件：</Col>
            <Col span={18}>
              <a href="mailto:zwb@glg.com">zwb@glg.com</a>
            </Col>
          </Row>
        </div>
      ),
      onOk() {},
    });
  };

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {login.status === 'error' &&
            login.type === 'account' &&
            !submitting &&
            this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
          <UserName
            name="loginname"
            placeholder={`登录名`}
            rules={[
              {
                required: true,
                message: '请输入登录名',
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`请输入密码`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.password.required' }),
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();
              this.loginForm.validateFields(this.handleSubmit);
            }}
          />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="javascript: void 0;" onClick={this.forgotPassword}>
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
