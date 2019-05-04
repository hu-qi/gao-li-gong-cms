import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { Card, Table, Divider, Button, Popconfirm } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './NewsList.less';

@connect(({ news, loading }) => ({
  list: news,
  loading: loading.models.list,
}))
class NewsList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'news/fetch',
      payload: {
        count: 10,
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
    const { dispatch } = this.props;
    dispatch({
      type: 'news/delete',
      payload: {
        id: id,
      },
    });
  };

  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    const columns = [
      {
        title: '标题',
        key: 'title',
        dataIndex: 'title',
      },
      {
        title: '摘要',
        dataIndex: 'desciription',
      },
      {
        title: '外链',
        dataIndex: 'link',
      },
      {
        title: '操作',
        dataIndex: 'action',
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
          <Table columns={columns} dataSource={list} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewsList;
