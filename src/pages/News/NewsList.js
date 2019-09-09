import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Card, Table, Divider, Button, Popconfirm, Avatar } from 'antd';
import { connect } from 'dva';

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

  delete = id => {
    const {
      dispatch,
      list,
    } = this.props;
    const { pagination } = this.state;
    dispatch({
      type: 'news/delete',
      payload: {
        id,
        list,
        pagination
      },
    });
  };
  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

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
      loading,
    } = this.props;
    if (pagination) {
      this.setState({
        pagination: pagination
      })
    }

    const columns = [
      {
        title: '缩略图',
        dataIndex: 'thumbnail',
        render: url => <Avatar src={url ? `//${host}${JSON.parse(url)[0]}`: ''} shape='square' size='large' />,
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
        render: link => <a className={styles.link} target='_blank' href={`${link}`}>{link}</a>,
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 120,
        render: (text, record) => (
          <span>
            <a onClick={() => this.toEditPage(record.id)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.delete(record.id)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
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
            dataSource={list}
            pagination={this.state.pagination}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewsList;
