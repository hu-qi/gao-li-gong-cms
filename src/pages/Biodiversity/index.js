import React, { Component } from 'react';
import { connect } from 'dva';
import debounce from 'lodash/debounce';
import { Form, Card, Select, List, Icon, Modal, Typography, message, Input, Button, Tooltip, Pagination } from 'antd';
import router from 'umi/router';

import AvatarList from '@/components/AvatarList';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

/**
 * buildTagsGroup
 * @param tags
 * @returns {*}
 */
export function buildTagsGroup(tags) {
  return tags.reduce((pre, cur) => {
    const { type, ...info } = cur;

    if (type in pre) {
      pre[type].push(info);
    } else {
      pre[type] = [info];
    }

    return pre;
  }, {});
}

@connect(res => {
  const { biology, loading } = res;
  return {
    biology,
    loading: loading.models.list,
  };
})
@Form.create({
  onValuesChange: debounce((props, changedValues, allValues) => {
    const {
      dispatch,
      biology: {
        pagination: {
          page,
          size,
        },
        species,
      },
    } = props;
    const { name, species: sps } = allValues;
    const { id: speciesId } = species.find(({ title }) => title === sps) || {};

    dispatch({
      type: 'biology/fetch',
      payload: {
        page,
        size,
        name,
        speciesId,
      },
    });
  }, 500),
})
class CoverCardList extends Component {
  componentDidMount() {
    const {
      dispatch,
      biology: {
        search,
        pagination: {
          page,
          size,
        },
      },
    } = this.props;

    dispatch({
      type: 'biology/fetchSpecies',
      payload: {},
    });
    dispatch({
      type: 'biology/fetchLabelList',
      payload: {},
    });
    dispatch({
      type: 'biology/fetch',
      payload: {
        ...search,
        page,
        size,
      },
    });
  }

  handlePreview = biology => {
    message.warning('将来直接跳到前台相应的页面！');
  };

  handleEdit = (biology = {}) => {
    const { id = 0 } = biology;
    router.push(`/Biodiversity/${id}`);
  };

  handleDel = biology => {
    const {
      dispatch,
      biology: {
        pagination,
        search,
      },
    } = this.props;
    const { id, name } = biology;

    Modal.confirm({
      title: <p>确定删除 <Typography.Text type='warning'>{name}</Typography.Text> 吗？</p>,
      icon: <Icon type='delete' />,
      content: <Typography.Text type='danger'>删除后不可恢复！</Typography.Text>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => dispatch({
        type: 'biology/remove',
        payload: {
          id,
          ...pagination,
          ...search,
        },
      }),
    });
  };

  handlePage = (page, size) => {
    const {
      biology: { search },
      dispatch,
    } = this.props;
    const payload = {
      page,
      size,
      ...search,
    };

    dispatch({
      type: 'biology/fetch',
      payload,
    });
  };

  handleSize = (_, size) => {
    const {
      biology: { search },
      dispatch,
    } = this.props;
    const payload = {
      page: 1,
      size,
      ...search,
    };

    dispatch({
      type: 'biology/fetch',
      payload,
    });
  };

  renderSearch() {
    const {
      biology: {
        species,
        tags,
        pagination: {
          page,
          size,
        },
      } = {},
      form,
      dispatch,
    } = this.props;
    const { getFieldDecorator } = form;
    const tagsGroup = Object.entries(buildTagsGroup(tags));

    const handleReset = () => {
      form.resetFields();

      dispatch({
        type: 'biology/fetch',
        payload: {
          page,
          size,
          name: '',
          speciesId: null,
        },
      });
    };

    return (
      <Card bordered={false}>
        <Form layout='inline'>
          <Form.Item>
            <Tooltip title="新增">
              <Button
                type='primary'
                icon='plus'
                shape='circle'
                size='large'
                onClick={() => this.handleEdit()}
              />
            </Tooltip>
          </Form.Item>
          <Form.Item label='名称'>
            {getFieldDecorator('name', {})(
              <Input placeholder='不限' />
            )}
          </Form.Item>
          <Form.Item label='类别'>
            {getFieldDecorator('species', {})(
              <Select placeholder='不限' showSearch style={{ minWidth: 200, width: '100%' }}>
                { species.map(s => <Select.Option key={s.id} value={s.title}>{s.title}</Select.Option>) }
              </Select>
            )}
          </Form.Item>
          <Form.Item label='标签'>
            {getFieldDecorator('tag', {})(
              <Select placeholder='不限' showSearch style={{ minWidth: 200, width: '100%' }}>
                {
                  tagsGroup.map(([g, t]) => (
                    <Select.OptGroup key={g} label={g}>
                      {t.map(tag => <Select.Option key={tag.id} value={tag.name}>{tag.name}</Select.Option>) }
                    </Select.OptGroup>
                  ))
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType='reset' type='primary' onClick={handleReset}>重置</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

  renderBilologyList() {
    const {
      biology: {
        list,
      } = {},
      loading,
    } = this.props;

    return list ? (
      <List
        rowKey='id'
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list.reverse()}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.name} src={item.thumbnail} />}
              actions={[
                <Icon type='eye' onClick={() => this.handlePreview(item)} />,
                <Icon type='edit' onClick={() => this.handleEdit(item)} />,
                <Icon type='delete' onClick={() => this.handleDel(item)} />]}
            >
              <Card.Meta
                title={<a>{item.name}</a>}
                description={<Ellipsis lines={2}>{item.brief}</Ellipsis>}
              />
              <div className={styles.cardItemContent}>
                <AvatarList size='large'>
                  <AvatarList.Item
                    src={'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png'}
                    tips={'鸟类'}
                  />
                </AvatarList>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;
  }

  render() {
    const {
      biology: {
        pagination: {
          total,
          page,
          size,
        }
      } = {},
    } = this.props;

    return (
      <section className={styles.coverCardList}>
        <PageHeaderWrapper content={this.renderSearch()} />
        <div className={styles.cardList}>{this.renderBilologyList()}</div>
        <Pagination
          current={page}
          total={total}
          pageSize={size}
          showSizeChanger
          onShowSizeChange={this.handleSize}
          onChange={this.handlePage}
        />
      </section>
    );
  }
}

export default CoverCardList;
