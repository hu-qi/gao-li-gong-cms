import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Card, List, Button, Icon, Popconfirm, Avatar } from 'antd';
import { connect } from 'dva';

import styles from './Slider.less';

import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { host } from '@/components/ImgUpload';

@connect(({ partner, loading }) => ({
  list: partner,
  loading: loading.models.list,
}))
class Partner extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/fetch',
    });
  }

  delete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/delete',
      payload: {
        id: id,
      },
    });
  };

  toEditPage = param => {
    if (typeof param === 'object') {
      router.push(`/home/partner/partner-add`);
      return;
    }
    router.push(`/home/partner/partner-edit/id/${param}`);
  };

  render() {
    const {
      list: { list },
      loading,
    } = this.props;
    const partners = list.sort((a, b) => b.id - a.id);

    return (
      <PageHeaderWrapper>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...partners]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a onClick={() => this.toEditPage(item.id)}>编辑</a>,
                      <Popconfirm title="确定要删除吗?" onConfirm={() => this.delete(item.id)}>
                        <a href="javascript:;">删除</a>
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta
                      avatar={
                        <Avatar
                          size="large"
                          shape="circle"
                          src={item.imgUrl ? `${host}${item.imgUrl}` : ''}
                        />
                      }
                      title={item.description}
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Card hoverable className={styles.card}>
                    <Button
                      type="dashed"
                      className={styles.partnerButton}
                      onClick={this.toEditPage}
                    >
                      <Icon type="plus" /> 新建伙伴
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

export default Partner;
