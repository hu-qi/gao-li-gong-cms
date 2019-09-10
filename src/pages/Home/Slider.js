import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { Card, List, Button, Icon, Popconfirm } from 'antd';
import { connect } from 'dva';

import styles from './Slider.less';

import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { host } from '@/components/ImgUpload';

@connect(({ slider, loading }) => ({
  list: slider,
  loading: loading.models.list,
}))
class Slider extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'slider/fetch',
    });
  }

  delete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'slider/delete',
      payload: {
        id: id,
      },
    });
  };

  toEditPage = param => {
    if (typeof param === 'object') {
      router.push(`/home/slider/slider-add`);
      return;
    }
    router.push(`/home/slider/slider-edit/id/${param}`);
  };

  render() {
    const {
      list: { list = [] },
      loading,
    } = this.props;
    const sliders = list.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));

    return (
      <PageHeaderWrapper>
        <div className={styles.sliderList}>
          <List
            rowKey="id"
            loading={loading}
            dataSource={['', ...sliders]}
            style={{display: 'flex', flexWrap: 'wrap'}}
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
                      title={item.title}
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
                      <Icon type="plus" /> 新建轮播图
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

export default Slider;
