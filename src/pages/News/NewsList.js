import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Card, Table, Divider, Button, Modal, Avatar } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';
import { host } from '@/components/ImgUpload';

@connect(({ news, loading }) => ({
  ...news,
  loading: loading.models.list,
}))

class NewsList extends PureComponent {
  state = {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { pagination } = this.state;
    dispatch({
      type: 'news/fetch',
      payload: {
        page: pagination.current,
        size: pagination.pageSize
      },
    });
  }

  toEditPage = param => {
    if (typeof param === 'object') {
      router.push(`/news/news-add`);
      return;
    }
    router.push(`/news/news-edit/id/${param}`);
  };

  delete = record => {
    const {
      dispatch,
      list,
    } = this.props;
    const { pagination } = this.state;

    Modal.confirm({
      title: '确定删除吗?',
      content: '删除后不可恢复',
      onOk() {
        dispatch({
          type: 'news/delete',
          payload: {
            id: record.id,
            list,
            pagination
          },
        });
      },
      onCancel() {},
    });
  };
  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;

    const params = {
      page: pagination.current,
      size: pagination.pageSize,
    };

    dispatch({
      type: 'news/fetch',
      payload: params,
    });
  };

  render() {
    const {
      list,
      pagination,
    } = this.props;
    if (pagination) {
      this.setState({
        pagination: pagination
      })
    }

    const dataList = list.sort((a, b) => b.id - a.id);

    const columns = [
      {
        title: '缩略图',
        dataIndex: 'thumbnail',
        render: url => <Avatar src={url ? `${host}${JSON.parse(url)[0]}`: ''} shape='square' size='large' />,
      },
      {
        title: '时间',
        dataIndex: 'time',
        width: 160,
        render: time => <span>{moment(time).format('YYYY-MM-DD hh:mm')}</span>,
      },
      {
        title: '标题',
        width: 200,
        dataIndex: 'title',
        render: title => <p className={styles.link}>{title}</p>,
      },
      {
        title: '摘要',
        dataIndex: 'brief',
        render: brief => <p className={styles.link}>{brief}</p>,
      },
      {
        title: '外链',
        dataIndex: 'link',
        width: 350,
        render: link => (
          <a
            className={styles.link}
            target='_blank'
            style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
            href={`${link}`}
          >
            {link}
          </a>
        ),
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 120,
        render: (text, record) => (
          <span>
            <a onClick={() => this.toEditPage(record.id)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(record)}>删除</a>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper>
        <Button icon="plus" type="primary" onClick={this.toEditPage}>
          新建
        </Button>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <Table
            className={styles.newList}
            rowKey="id"
            columns={columns}
            dataSource={dataList}
            pagination={this.state.pagination}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewsList;
