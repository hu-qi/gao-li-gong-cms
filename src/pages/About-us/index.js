import React from 'react';
import { Button, Card, Spin, message } from 'antd';
import { connect } from 'dva';

import RichTextEditor from '@/components/RichTextEditor';

@connect(res => {
  const { aboutUs, loading } = res;

  return {
    aboutUs,
    loading,
  };
})
export default class AboutUs extends React.Component {
  state = {
    content: '',
  };

  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({
      type: 'aboutUs/fetch',
    });
  }

  prompt = () => {
    const { dispatch } = this.props;
    const { content } = this.state;

    dispatch({
      type: 'aboutUs/update',
      payload: content,
    }).then(() => {
      message.success('保存成功 :)');
    });
  };

  render() {
    const {
      aboutUs: { content },
      loading: { global },
    } = this.props;

    if (!content) { return null; }

    return (
      <Spin spinning={global} delay={500}>
        <Card title="关于我们">
          <RichTextEditor value={content} onChange={content => this.setState({ content })} />
          <Button style={{ marginTop: 16 }} type={'primary'} onClick={this.prompt}>保存</Button>
        </Card>
      </Spin>
    );
  }
}
