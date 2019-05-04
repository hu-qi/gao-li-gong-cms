import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva/index';
import { FormattedMessage } from 'umi-plugin-react/locale/index';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu, Button, Ellipsis } from 'antd/lib/index';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './GroupList.less';

const { Option } = Select;
const FormItem = Form.Item;

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
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const CardInfo = ({ activeUser, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>关联物种数量： {activeUser}</p>
        </div>
      </div>
    );

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
