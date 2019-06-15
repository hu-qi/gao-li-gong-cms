import React, { Component } from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GroupList from './GroupList';
import { tabList } from './constant';

@connect()
class SearchList extends Component {
  state = {
    activeTabKey: tabList[0].key,
    searchVal: null,
  };
  
  handleTabChange = activeTabKey => {
    this.setState({
      activeTabKey,
      searchVal: null
    });
  };

  @Debounce(200)
  handleSearchSubmit = () => {
    this.child.fetchData();
  };

  handleSearchChange(searchVal) {
    this.setState({ searchVal },
      this.handleSearchSubmit
    );
  };

  render() {
    const { 
      activeTabKey,
      searchVal,
    } = this.state;

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder='请输入标签关键字'
          enterButton='搜索'
          size='large'
          value={searchVal}
          onChange={e => this.handleSearchChange(e.target.value)}
          onSearch={this.handleSearchSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    return (
      <PageHeaderWrapper
        title='搜索标签'
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={activeTabKey}
        onTabChange={this.handleTabChange}
      >
        <GroupList onRef={ref => void (this.child = ref)} tabActiveKey={activeTabKey} searchVal={searchVal} />
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
