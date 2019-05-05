import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List, Icon } from 'antd';
import router from 'umi/router';

import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './BiologyList.less';

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */

@connect(res => {
  const { biology: allBiology, loading } = res;
  return {
    allBiology,
    loading: loading.models.list,
  }
})
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log('表单项变化请求数据: ', changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'biology/fetch',
      payload: {
        count: 8,
      },
    });
  },
})
class CoverCardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'biology/fetch',
      payload: {
        count: 8,
      },
    });
  }

  preview() {
    const BiologyId = '123';
    router.push(`/Biodiversity/${BiologyId}`);
  }

  render() {
    const {
      allBiology: { list = [] } = {},
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.name} src={item.cover} />}
              actions={[<Icon type="eye" onClick={this.preview}  />, <Icon type="edit" onClick={this.preview} />]}
            >
              <Card.Meta
                title={<a>{item.name}</a>}
                description={<Ellipsis lines={2}>{item.subDesc}</Ellipsis>}
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="mini">
                    {item.members.map((member, i) => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${i}`}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div className={styles.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="作者">
                    {getFieldDecorator('author', {})(
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="lisa">123</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <div className={styles.cardList}>{cardList}</div>
      </div>
    );
  }
}

export default CoverCardList;
