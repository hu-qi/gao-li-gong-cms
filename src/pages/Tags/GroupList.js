import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { Form, Card, Icon, List, Button } from 'antd/lib/index';

import styles from './GroupList.less';

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  },
})
class FilterCardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      list: { list },
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
                  avatar={<Button shape="round" type="primary">Primary</Button>}
                />
              </Card>
            </List.Item>
          )}
        />p
      </div>
    );
  }
}

export default FilterCardList;
