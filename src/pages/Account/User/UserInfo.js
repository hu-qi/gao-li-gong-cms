import { Form, Input, Upload, Icon } from 'antd';
import React, { PureComponent, Fragment } from 'react';

@Form.create()
class UserInfo extends React.Component {

  state = {
    confirmDirty: false,
  };

  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  compareToFirstPassword (rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }

  render() {
    const { form } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form {...formItemLayout}>
        <Form.Item label="用户名">
          { form.getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入 5 ~ 30 位不以数字开头的字符！', min: 5, max: 30, whitespace: true, pattern: /^[^\d]+.{4,}/
            }],
          })(<Input placeholder="请输入用户名" allowClear />) }
        </Form.Item>
        <Form.Item label="手机号码">
          { form.getFieldDecorator('phone', {
            rules: [{
              required: true, message: '请输入 11 位手机号码！', len: 11, pattern: /^\s*1\d{10}\s*$/
            }],
          })(<Input placeholder="请输入 11 位手机号码" allowClear />) }
        </Form.Item>
        <Form.Item label="E-mail">
          { form.getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '邮箱格式不合法!'
            }, {
              required: true, message: '请输入你的邮箱地址！'
            }],
          })(<Input placeholder="请输入你的邮箱地址" allowClear />) }
        </Form.Item>
        <Form.Item label="微信">
          { form.getFieldDecorator('wechat', {
            rules: [{
              required: true, message: '请输入微信 ID！', min: 1
            }],
          })(<Input placeholder="请输入微信 ID" />) }
        </Form.Item>
        <Form.Item label="登录密码">
          { form.getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入你的登录密码!',
            }, {
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/, message: '密码必须包含至少一个数字和字母，长度在 6 ~ 16 位之间!',
            },{
              // validator: this.validateToNextPassword
            }],
          })(<Input.Password type="password" placeholder="请输入你的登录密码" allowClear />) }
        </Form.Item>
        <Form.Item label="确认密码">
          { form.getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请输入确认密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(<Input.Password type="password" placeholder="请再次输入密码" onBlur={this.compareToFirstPassword} />) }
        </Form.Item>
        <Form.Item label="用户描述">
          { form.getFieldDecorator('desc', { autosize: true })(<Input.TextArea placeholder="请简要描述创建账户的职责" />) }
        </Form.Item>
        <Form.Item label="头像">
          <div className="dropbox">
            {form.getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            )}
          </div>
        </Form.Item>
      </Form>
    );
  }
}

export default UserInfo;
