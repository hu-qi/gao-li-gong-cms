import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  message,
  notification,
  Divider, Avatar, Modal,
  Typography,
} from 'antd';
import router from 'umi/router';

import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';
import { host } from '../../components/ImgUpload';

const FormItem = Form.Item;
const { Text } = Typography;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(models => {
  const { account, loading } = models;

  return ({
    account,
    loading: loading.models.account,
  });
})
@Form.create()
class TableList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    pageSize: 10,
    currentPage: 1,
  };

  // 列表配置
  columns = [
    {
      title: '用户',
      dataIndex: 'avatar',
      render: url => <Avatar src={`//${host}${url}`} shape='square' size='large' />,
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      render: phone => <a href={`tel:${phone}`}>{phone}</a>,
    },
    {
      title: 'email',
      dataIndex: 'mail',
      render: mail => <a href={`mailto:${mail}?subject=来自高黎贡山 CMS`}>{mail}</a>,
    },
    {
      title: '微信',
      dataIndex: 'wechatId',
      render: wechat => <a onClick={() => this.onCopyClipboard(wechat)}>{wechat}</a>
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => router.push(`/account/${record.id}`)}>编辑</a>
          <Divider type='vertical' />
          <a onClick={() => this.handleDelete(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { dispatch } = this.props;
    const { pageSize: size, currentPage: page } = this.state;

    dispatch({
      type: 'account/fetch',
      payload: {
        page,
        size,
      }
    });
  }

  onCopyClipboard = (webchat) => {
    const input = document.createElement('input');
    document.body.appendChild(input);

    input.setAttribute('value', webchat);
    input.select();

    if (document.execCommand('copy')) {
      document.execCommand('copy');

      notification.info({
        message: <React.Fragment>已复制微信号：<a href='javascript: void 0;'>${webchat}</a> 到粘贴板😀</React.Fragment>,
        onClick: () => void 0,
        duration: 2,
      });
    }

    input.setAttribute('style','display:none');
  };

  handleDelete = user => {
    const { dispatch } = this.props;

    Modal.confirm({
      title: <p>确定删除 <Text type='warning'>{user.name}</Text> 吗？</p>,
      content: <Text type='danger'>删除后不可恢复</Text>,
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        dispatch({
          type: 'account/delete',
          payload: { id: user.id },
          callback: ({isError}) => {
            if (!isError) {
              message.success('账号删除成功！');
            } else {
              message.warning('账号删除失败，请重试！')
            }

            this.fetchData();
          }
        });
      },
      onCancel() {},
    });
  };

  handleFormReset = () => {
    const { form } = this.props;

    form.resetFields();

    this.setState({
      formValues: {},
    });

    this.fetchData();
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'account/fetch',
        payload: values,
      });
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      page: pagination.current,
      size: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'account/fetch',
      payload: params,
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout='inline'>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={10} sm={24}>
            <FormItem label='用户名/昵称'>
              {getFieldDecorator('name1')(<Input placeholder='请输入用户名或昵称' />)}
            </FormItem>
          </Col>
          <Col>
            <Button type='primary' htmlType='submit'>
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Button
            style={{ marginLeft: 10, marginBottom: 10, }}
            icon='plus'
            type='primary'
            onClick={() => router.push('/account/0')}
          >
            新建用户
          </Button>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      account: {
        list = [],
        pagination: { page: current, size: pageSize, total }
      } = {},
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const data = {
      list,
      pagination: { current, pageSize, total }};

    this.setState({
      currentPage: current,
    });

    return (
      <PageHeaderWrapper title='用户列表'>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
