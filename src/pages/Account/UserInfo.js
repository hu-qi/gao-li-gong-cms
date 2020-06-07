import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

import ImgUPload from '@/components/ImgUpload'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const modeType = {
  NEW: 'new',
  EDIT: 'edit',
};

@Form.create()
@connect(models => {
  const { account, loading } = models;

  return ({
    account,
    loading: loading.models.account,
  });
})
class UserInfo extends React.Component {
  state = {
    avatar: '',
  };

  constructor(props) {
    super(props);

    const {
      match: {
        params: { id },
      },
    } = props;

    this.state = {
      mode: !+id ? modeType.NEW : modeType.EDIT,
      id,
      avatar: null,
    };
  }

  componentDidMount() {
    const {
      form,
      dispatch,
    } = this.props;
    const {
      mode,
      id,
    } = this.state;

    if (mode === modeType.NEW) { return; }
    const handleUploadChange = this.handleUploadChange;

    dispatch({
      type: 'account/fetchById',
      payload: { id },
      callback(_account) {
        const {
          name,
          loginname,
          nickname,
          phone,
          mail,
          wechatId,
          avatar,
        } = _account;

        form.setFieldsValue({
          name,
          loginname,
          nickname,
          phone,
          mail,
          wechatId,
          avatar,
        });

        if (avatar) { handleUploadChange([ avatar ]); }
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致!');
    }

    if (callback) { callback(); }
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form,
      dispatch,
    } = this.props;
    const {
      id,
      avatar,
    } = this.state;

    form.validateFields((err, values) => {
      if (err) { return; }

      const {
        mode,
      } = this.state;
      const type = mode === modeType.NEW
        ? `account/post`
        : `account/put`;

      dispatch({
        type,
        payload: {
          ...values,
          avatar,
          id,
        },
        callback() {
          message.success('操作成功！');
          router.push('/account');
        }
      });
    });
  };

  handleCancel = () => {
    router.push('/account');
  };

  handleUploadChange = (urls) => {
    const [ avatar ] = urls;

    this.setState({ avatar });
  };

  render() {
    const { form } = this.props;
    const {
      mode,
      avatar,
    } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    const title = mode === modeType.EDIT ? '编辑' : '新增用户';

    return (
      <PageHeaderWrapper title={title}>
        <Card>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label='用户名'>
              { form.getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: '请输入 5 ~ 30 位不以数字开头的字符！',
                  min: 5,
                  max: 30,
                  whitespace: true,
                  pattern: /^[^\d]+.{4,}/
                }],
              })(<Input placeholder='请输入用户名' allowClear />) }
            </Form.Item>
            <Form.Item label='登录名'>
              { form.getFieldDecorator('loginname', {
                rules: [{
                  required: true,
                  max: 50,
                  whitespace: true,
                }],
              })(<Input placeholder='请输入登录名' allowClear />) }
            </Form.Item>
            <Form.Item label='昵称'>
              { form.getFieldDecorator('nickname', {
                rules: [{
                  required: true,
                  max: 50,
                  whitespace: true,
                }],
              })(<Input placeholder='请输入昵称' allowClear />) }
            </Form.Item>
            <Form.Item label='手机号码'>
              { form.getFieldDecorator('phone', {
                rules: [{
                  required: true,
                  message: '请输入 11 位手机号码！',
                  len: 11,
                  pattern: /^\s*1\d{10}\s*$/
                }],
              })(<Input placeholder='请输入 11 位手机号码' allowClear />) }
            </Form.Item>
            <Form.Item label='E-mail'>
              { form.getFieldDecorator('mail', {
                rules: [{
                  type: 'email', message: '邮箱格式不合法!'
                }],
              })(<Input placeholder='请输入你的邮箱地址' allowClear />) }
            </Form.Item>
            <Form.Item label='微信'>
              { form.getFieldDecorator('wechatId', {
                rules: [{
                  required: true, message: '请输入微信 ID！', min: 1
                }],
              })(<Input placeholder='请输入微信 ID' />) }
            </Form.Item>
            <Form.Item label='登录密码'>
              { form.getFieldDecorator('password', {
                rules: [{
                  required: false, message: '请输入你的登录密码!',
                }, {
                  pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{6,16}$'),
                  message: '密码必须包含至少一个数字、字母和特殊字符，长度在 6 ~ 16 位之间!',
                }],
              })(<Input.Password type='password' placeholder='请输入你的登录密码' allowClear />) }
            </Form.Item>
            <Form.Item label='确认密码'>
              { form.getFieldDecorator('confirm', {
                rules: [{
                  required: false, message: '请输入确认密码!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(<Input.Password
                type='password'
                placeholder='请再次输入密码'
                onBlur={this.compareToFirstPassword}
                allowClear
                disabled={!form.getFieldValue('password')}
              />) }
            </Form.Item>
            <Form.Item label='头像'>
              {avatar
                ? <ImgUPload
                  key={'edit'}
                  fileList={[avatar]}
                  limit={1}
                  onChange={(url) => this.handleUploadChange(url)}
                />
                : <ImgUPload
                  key={'new'}
                  fileList={[]}
                  limit={1}
                  onChange={(url) => this.handleUploadChange(url)}
                />
              }

            </Form.Item>
            <Form.Item label={<></>} colon={false}>
              <Button onClick={this.handleCancel} style={{ marginRight: 8 }}>取消</Button>
              <Button type="primary" htmlType="submit">保存</Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserInfo;
