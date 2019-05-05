import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GroupList from './GroupList';

@connect()
class SearchList extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'applications':
        router.push(`${match.url}/applications`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  render() {
    const tabList = [
      {
        key: 'protection',
        tab: '保护等级',
      },
      {
        key: 'endangered',
        tab: '濒危等级',
      },
      {
        key: 'Species',
        tab: '物种分类',
      },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const { match, children, location } = this.props;

    return (
      <PageHeaderWrapper
        title="搜索标签"
        content={mainSearch}
        tabList={tabList}
        tabActiveKey="protection"
        onTabChange={this.handleTabChange}
      >
        <GroupList />
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
