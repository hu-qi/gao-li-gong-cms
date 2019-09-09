import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Layout, message } from 'antd';
import { connect } from 'dva';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import styles from './Header.less';

const { Header } = Layout;

class HeaderView extends Component {
  state = {};

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleNoticeClear = type => {
    message.success(
      `${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({
        id: `component.globalHeader.${type}`,
      })}`
    );
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };

  handleMenuClick = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'login/logout',
    });
  };

  handleNoticeVisibleChange = visible => {
    if (visible) {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  };

  render() {
    const { isMobile, handleMenuCollapse, setting } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();

    return (
      <Header
        style={{ padding: 0, width, zIndex: 2 }}
        className={fixedHeader ? styles.fixedHeader : ''}
      >
        {isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        ) : (
          <GlobalHeader
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        )}
      </Header>
    );
  }
}

export default connect(({ user, global, setting, loading, login }) => {
  return  ({
    currentUser: login.currentUser,
    collapsed: global.collapsed,
    fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices,
    setting,
  })
})(HeaderView);
