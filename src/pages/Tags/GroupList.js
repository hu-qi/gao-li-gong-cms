import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { Form, Card, Icon, List, Button } from 'antd/lib/index';
import { tabList } from './constant';
import styles from './GroupList.less';

@connect(({ tags, loading }) => ({
  tags,
  loading: loading.models.list,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'tags/fetch',
      payload: {
        // type: tabList.find(({ key }) => key === tabActiveKey).tab
      },
    });
  },
})
class FilterCardList extends PureComponent {
  state = {
    tabActiveKey: null,
  };

  componentDidMount() {
    const { tabActiveKey, onRef } = this.props;

    onRef(this);
    this.setState({ tabActiveKey }, this.fetchData);
  }

  componentWillReceiveProps(props) {
    const { tabActiveKey } = props;
    const {
      tabActiveKey: curTabActiveKey
    } = this.state;

    if (curTabActiveKey === tabActiveKey) return;

    this.setState( { tabActiveKey }, this.fetchData);
  }

  fetchData() {
    const { dispatch, searchVal: name } = this.props;
    const { tabActiveKey } = this.state;
    const { tab: type } = tabList.find(({ key }) => key === tabActiveKey) || {};

    dispatch({
      type: 'tags/fetch',
      payload: { type, name },
    });
  }

  render() {
    const {
      tags: { list },
      loading,
    } = this.props;

    return (
      <div className={styles.filterCardList}>
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card actions={[<Icon type="bg-colors" />, <Icon type="font-colors" />, <Icon type="ordered-list" />, <Icon type="ellipsis" />]}>
                <Card.Meta
                  avatar={<Button shape="round" type="primary">{item.name}</Button>}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default FilterCardList;
