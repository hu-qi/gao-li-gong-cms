import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { Card, List, Button, Icon, Popconfirm } from 'antd';
import { connect } from 'dva';

import styles from './Timeline.less';

import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ timeline, loading }) => ({
  list: timeline,
  loading: loading.models.list,
}))
class Timeline extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'timeline/fetch',
    });
  }

  delete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'timeline/delete',
      payload: {
        id: id,
      },
    });
  };

  toEditPage = param => {
    if (typeof param === 'object') {
      router.push(`/timeline/timeline-add`);
      return;
    }
    router.push(`/timeline/timeline-edit/id/${param}`);
  };

  render() {
    const {
      list: { list },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    cover={<img alt={item.title} src={item.avatar} />}
                    actions={[
                      <a onClick={() => this.toEditPage(item.id)}>编辑</a>,
                      <Popconfirm title="确定要删除吗?" onConfirm={() => this.delete(item.id)}>
                        <a href="javascript:;">删除</a>
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                    <span>{moment(item.updatedAt).fromNow()}</span>
                  </Card>
                </List.Item>
              ) : (
                  <List.Item>
                    <Button type="dashed" className={styles.newButton} onClick={this.toEditPage}>
                      <Icon type="plus" /> 新增时间线
                  </Button>
                  </List.Item>
                )
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Timeline;