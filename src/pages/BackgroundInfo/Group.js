import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Card, List } from 'antd';
import { connect } from 'dva';
import styles from './group.less';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { host } from '@/components/ImgUpload';

@connect(({ group }) => ({
  list: group,
}))
class Group extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'group/fetch',
    });
  }

  toEditPage = param => {
    if (typeof param === 'object') {
      router.push(`/background-info/group`);
      return;
    }
    router.push(`/background-info/group/${param}`);
  };

  render() {
    const {
      list: { list = [] },
    } = this.props;
    const groups = list.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));

    return (
      <PageHeaderWrapper>
        <div className={styles.sliderList} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {groups.map(item => (
            <List.Item key={item.id}>
              <Card
                size="small"
                hoverable
                cover={<img alt={item.title} src={`${host}${item.imgUrl}`} />}
                actions={[<a onClick={() => this.toEditPage(item.name)}>编辑</a>]}
              >
                <Card.Meta
                  title={item.title}
                  description={<Ellipsis lines={2}>{item.description}</Ellipsis>}
                />
              </Card>
            </List.Item>
          ))}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Group;
