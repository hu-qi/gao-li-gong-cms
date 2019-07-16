import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { Input, Radio, Card, Icon, List, Button, Modal, Typography, Popover } from 'antd/lib/index';
import { ChromePicker } from 'react-color'
import Debounce from 'lodash-decorators/debounce';

import { tabList } from './constant';

import styles from './GroupList.less';

const operateType = {
  bg: 'bg-colors',
  edit: 'edit',
  shift: 'bars',
  delete: 'delete',
};

@connect(({ tags, loading }) => ({
  tags,
  loading: loading.models.list,
}))
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

  @Debounce(2000)
  handleChangeColor = (e, tag) => {
    const { dispatch } = this.props;
    const {
      rgb: { r, g, b, a},
    } = e;

    dispatch({
      type: 'tags/update',
      payload: { ...tag, backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` },
    });
  };

  handleChangeName = tag => {
    const { dispatch } = this.props;
    const { name } = tag;
    let newName = name;
    const changeName = name => void (newName = name);

    Modal.confirm({
      title: <p>重命名标签</p>,
      icon: <Icon type={operateType.edit} />,
      content: <Input defaultValue={newName} onChange={e => void changeName(newName = e.target.value)} placeholder='不能为空！' allowClear />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => dispatch({
        type: 'tags/update',
        payload: { ...tag, name: newName },
      }),
    });
  };

  handleChangeType = tag => {
    const { dispatch, handleTabChange } = this.props;
    const { name, type } = tag || {};
    const options = tabList.map(({ key: value, tab: label}) => ({ value, label}));
    let { key: curType } = tabList.find(({ tab: t }) => t === type );

    const changeType = e => void (curType = e.target.value);

    Modal.confirm({
      title: <p>改变 <Typography.Text type='warning'>{name}</Typography.Text> 分类：</p>,
      icon: <Icon type={operateType.shift} />,
      content: <Radio.Group defaultValue={curType} options={options} onChange={changeType} />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const { tab, key } = tabList.find(({ key }) => key === curType);

        dispatch({
          type: 'tags/update',
          payload: { ...tag, type: tab }
        }).then(() => void handleTabChange(key));
      },
    });
  };

  handleDel = tag => {
    const { dispatch } = this.props;
    const { name, id } = tag;

    Modal.confirm({
      title: <p>确定删除 <Typography.Text type='warning'>{name}</Typography.Text> 吗？</p>,
      icon: <Icon type={operateType.delete} />,
      content: <Typography.Text type='danger'>标签删除后不可恢复</Typography.Text>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => dispatch({
        type: 'tags/remove',
        payload: { id, ...tag },
      }),
    });
  };


  handleChange = (e, tag) => {
    const { icon: changeType } = e.target.dataset;

    switch (changeType) {
      case operateType.bg:
        void 0;
        break;
      case operateType.edit:
        this.handleChangeName(tag);
        break;
      case operateType.shift:
        this.handleChangeType(tag);
        break;
      case operateType.delete:
        this.handleDel(tag);
        break;
      default:
        void 0;
    }
  };

  renderOperate(tag) {
    return (
      [
        <Popover
          placement='bottomLeft'
          content={
            <ChromePicker
              color={tag.backgroundColor}
              onChangeComplete={e => this.handleChangeColor(e, tag)}
            />
          }
        >
          <div data-icon={operateType.bg}><Icon type={operateType.bg} /></div>
        </Popover>,
        <div data-icon={operateType.edit}><Icon type={operateType.edit} /></div>,
        <div data-icon={operateType.shift}><Icon type={operateType.shift} /></div>,
        <div data-icon={operateType.delete}><Icon type={operateType.delete} /></div>,
      ]
    );
  }

  render() {
    const {
      tags: { list },
      loading,
    } = this.props;

    return (
      <div className={styles.filterCardList}>
        <List
          rowKey='id'
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card actions={this.renderOperate(item)} onClick={e => this.handleChange(e, item)}>
                <Card.Meta
                  avatar={
                    <Button
                      className='btn'
                      shape='round'
                      style={{background: item.backgroundColor}}
                      type='primary'
                    >
                      {item.name}
                    </Button>}
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
