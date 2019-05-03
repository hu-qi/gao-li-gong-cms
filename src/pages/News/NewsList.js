import React, { PureComponent, Fragment } from 'react';
import { Card, Table, Divider } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './NewsList.less';

@connect(({ list, loading }) => ({
  list,
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

  render() {
    const {
      list: { list },
      loading,
    } = this.props;
    console.log(this);

    const columns = [
      {
        title: '标题',
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
            <a href="javascript:;">Invite {record.lastName}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper>
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
