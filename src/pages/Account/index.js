import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Input,
  Button,
  message,
  notification,
  Divider,
  Avatar,
  Modal,
  Typography,
  Tooltip,
} from 'antd';
import router from 'umi/router';

import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';
import { host } from '../../components/ImgUpload';

const { Text } = Typography;

@connect(models => {
  const { account, loading } = models;

  return {
    account,
    loading: loading.models.account,
  };
})
@Form.create()
class TableList extends PureComponent {
  state = {
    name: '',
  };

  // 列表配置
  columns = [
    {
      title: '用户',
      dataIndex: 'avatar',
      render: url => <Avatar src={url ? `${url}` : ''} shape="square" size="large" />,
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '登录名',
      dataIndex: 'loginname',
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
      render: wechat => <a onClick={() => this.onCopyClipboard(wechat)}>{wechat}</a>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => router.push(`/account/${record.id}`)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {
      dispatch,
      account: {
        pagination: { size, page },
      },
    } = this.props;
    const { name } = this.state;

    dispatch({
      type: 'account/fetch',
      payload: {
        page,
        size,
        name,
      },
    });
  };

  onCopyClipboard = webchat => {
    const input = document.createElement('input');
    document.body.appendChild(input);

    input.setAttribute('value', webchat);
    input.select();

    if (document.execCommand('copy')) {
      document.execCommand('copy');

      notification.info({
        message: (
          <React.Fragment>
            已复制微信号：<a href="javascript: void 0;">${webchat}</a> 到粘贴板😀
          </React.Fragment>
        ),
        onClick: () => void 0,
        duration: 2,
      });
    }

    input.setAttribute('style', 'display:none');
  };

  handleDelete = user => {
    const {
      props: { dispatch },
      fetchData,
    } = this;

    Modal.confirm({
      title: (
        <p>
          确定删除 <Text type="warning">{user.name}</Text> 吗？
        </p>
      ),
      content: <Text type="danger">删除后不可恢复</Text>,
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        dispatch({
          type: 'account/delete',
          payload: { id: user.id },
          callback: ({ isError }) => {
            if (!isError) {
              message.success('账号删除成功！');
            } else {
              message.warning('账号删除失败，请重试！');
            }

            fetchData();
          },
        });
      },
      onCancel() {},
    });
  };

  handleSearchChange = name => this.setState({ name });

  handleSearchSubmit = () => {
    const {
      dispatch,
      account: {
        pagination: { size },
      },
    } = this.props;
    const { name } = this.state;

    dispatch({
      type: 'account/fetch',
      payload: {
        name,
        size,
        page: 1,
      },
    });
  };

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { name } = this.state;

    const payload = {
      page: pagination.current,
      size: pagination.pageSize,
      name,
    };

    dispatch({
      type: 'account/fetch',
      payload,
    });
  };

  render() {
    const {
      account: { list = [], pagination: { page: current, size: pageSize, total } } = {},
      loading,
    } = this.props;
    const { name } = this.state;
    const data = {
      list,
      pagination: {
        current,
        pageSize,
        total,
      },
    };

    const mainSearch = (
      <section className={styles.tableList}>
        <Tooltip title="新增用户">
          <Button
            className={styles.newTag}
            type="primary"
            icon="plus"
            shape="circle"
            size="large"
            onClick={() => router.push('/account/0')}
          />
        </Tooltip>
        <div style={{ textAlign: 'center' }}>
          <Input.Search
            placeholder="请输入用户名或昵称"
            enterButton="搜索"
            size="large"
            value={name}
            onChange={e => this.handleSearchChange(e.target.value)}
            onSearch={this.handleSearchSubmit}
            style={{ width: 522 }}
            allowClear
          />
        </div>
      </section>
    );

    return (
      <PageHeaderWrapper className={styles.tableList} content={mainSearch}>
        <Card bordered={false}>
          <StandardTable
            selectedRows={[]}
            loading={loading}
            data={data}
            columns={this.columns}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
