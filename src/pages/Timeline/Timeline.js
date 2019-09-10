import React, { PureComponent } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { Card, List, Button, Icon, Popconfirm } from 'antd';
import { connect } from 'dva';

import styles from './Timeline.less';

import { host } from '@/components/ImgUpload';
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
      list: { list = [] },
      loading,
    } = this.props;
    const lines = list.sort((a, b) => new Date(b.time) - new Date(a.time));

    return (
      <PageHeaderWrapper>
        <div className={styles.tileLineList}>
          <List
            rowKey="id"
            loading={loading}
            style={{display: 'flex', flexWrap: 'wrap'}}
            dataSource={['', ...lines]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card
                    size='small'
                    hoverable
                    cover={<img alt={item.title} src={`${host}${item.imgUrl}`} />}
                    actions={[
                      <a onClick={() => this.toEditPage(item.id)}>编辑</a>,
                      <Popconfirm title="确定要删除吗?" onConfirm={() => this.delete(item.id)}>
                        <a href="javascript:;">删除</a>
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta
                      title={moment(item.time).format('YYYY-MM-DD hh:mm')}
                      description={
                        <Ellipsis lines={2}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Card className='new-line'>
                    <Button type="dashed" onClick={this.toEditPage}>
                      <Icon type="plus" /> 新增时间线
                    </Button>
                  </Card>
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
