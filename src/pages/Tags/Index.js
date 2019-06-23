import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button, Modal, Icon, Form, Select, Popover } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { ChromePicker } from 'react-color';
import GroupList from './GroupList';
import { tabList } from './constant';

import styles from './index.less';

const typeMap = {
  NAME: 'name',
  TYPE: 'type',
  BG: 'bg',
};

@connect(({ tags, loading }) => ({
  tags,
  loading: loading.models.list,
}))
class SearchList extends Component {
  state = {
    activeTabKey: tabList[0].key,
    searchVal: null,
    newTag: {
      name: '',
      type: '物种分类',
      backgroundColor: '#000',
    }
  };

  handleTabChange = activeTabKey => {
    this.setState({
      activeTabKey,
      searchVal: null,
    });
  };

  @Debounce(500)
  handleSearchSubmit = () => {
    this.child.fetchData();
  };

  handleSearchChange = (searchVal) => {
    this.setState({ searchVal },
      this.handleSearchSubmit,
    );
  };

  onNewTagChange = (newVal, TYPE) => {
    const { newTag } = this.state;

    switch (TYPE) {
      case typeMap.NAME:
        newTag.name = newVal;
        break;
      case typeMap.TYPE:
        newTag.type = newVal;
        break;
      case typeMap.BG:
        newTag.backgroundColor = newVal;
        break;
      default:
        void 0;
    }

    this.setState({ newTag });
  };

  renderNewTag() {
    const { dispatch } = this.props;
    const { newTag } = this.state;
    const { tabActiveKey } = this.child.state;
    const activeTab = tabList.find(({ key }) => key === tabActiveKey).tab;
    const {
      name,
      type,
      backgroundColor,
    } = newTag;
    const options = tabList.map(({ tab: label }) => label);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const onPopover = e => {
      const colorBtn = document.querySelector('.Jbtn');
      const c = e.rgb;
      const bg = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;

      colorBtn.style.backgroundColor = bg;
      colorBtn.textContent = bg;
      this.onNewTagChange(bg, typeMap.BG)
    };

    const body = (
      <Form {...formItemLayout}>
        <Form.Item label='标签名'>
          <Input placeholder='不能为空！' defaultValue={name} onChange={e => this.onNewTagChange(e.target.value, typeMap.NAME)} allowClear />
        </Form.Item>
        <Form.Item label='标签类别'>
          <Select defaultValue={type} onChange={newVal => this.onNewTagChange(newVal, typeMap.TYPE)}>
            { options.map(o => <Select.Option value={o}>{o}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item label='颜色选择'>
          <Popover
            placement='bottomLeft'
            content={
              <ChromePicker
                color={backgroundColor}
                onChangeComplete={onPopover}
              />
            }
          >
            <Button className='Jbtn btn' shape='round' style={{background: backgroundColor}}>{backgroundColor}</Button>
          </Popover>
        </Form.Item>
      </Form>
    );

    Modal.confirm({
      title: <p>新建标签</p>,
      icon: <Icon type='plus-circle' />,
      content: body,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        if (!newTag.name) {
          return Promise.reject();
        }

        return dispatch({
          type: 'tags/add',
          payload: newTag,
          callback() {
            dispatch({
              type: 'tags/fetch',
              payload: { type: activeTab },
            });
          }
        });
      }
    });
  }

  render() {
    const {
      activeTabKey,
      searchVal,
    } = this.state;

    const mainSearch = (
      <section >
        <Button
          className={styles.newTag}
          type='primary'
          icon='plus'
          shape='circle'
          size='large'
          onClick={() => this.renderNewTag()}
        >
        </Button>
        <div style={{ textAlign: 'center' }}>
          <Input.Search
            placeholder='请输入标签关键字'
            enterButton='搜索'
            size='large'
            value={searchVal}
            onChange={e => this.handleSearchChange(e.target.value)}
            onSearch={this.handleSearchSubmit}
            style={{width: 522}}
          />
        </div>
      </section>
    );

    return (
      <section className={styles.tags}>
        <PageHeaderWrapper
          content={mainSearch}
          tabList={tabList}
          tabActiveKey={activeTabKey}
          onTabChange={this.handleTabChange}
        >
          <GroupList
            onRef={ref => void (this.child = ref)}
            tabActiveKey={activeTabKey}
            searchVal={searchVal}
            handleTabChange={this.handleTabChange}
          />
        </PageHeaderWrapper>
      </section>
    );
  }
}

export default SearchList;
