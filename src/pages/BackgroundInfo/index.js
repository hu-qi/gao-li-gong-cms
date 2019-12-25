import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Button, Card, Form, Icon, Tooltip, Typography } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

import PageLoading from '@/components/PageLoading';
import ImgUPload from '@/components/ImgUpload';
import RichTextEditor from '@/components/RichTextEditor';

@Form.create()
@connect(({ backgroundInfo }) => ({
  backgroundInfo,
}))
class BackgroundInfo extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'backgroundInfo/fetchBackgroundInfo',
      payload: {},
    });
  }

  handleChange = (value, key) => {
    const { dispatch, backgroundInfo } = this.props;

    dispatch({
      type: 'backgroundInfo/updateBackgroundInfo',
      payload: {
        ...backgroundInfo,
        [key]: value,
      },
    });
  };

  render() {
    const {
      backgroundInfo: _backgroundInfo,
      history,
      match: {
        params: { name },
      },
    } = this.props;
    const imgLim = {
      mini: 50,
      main: 50,
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
        md: { span: 15 },
      },
    };

    const labelTip = (lim, tip) => (
      <span>
        {tip}&nbsp;
        <Tooltip title={`最多可上传 ${lim} 张图片`}>
          <Icon type="question-circle-o" />
        </Tooltip>
      </span>
    );

    const backgroundInfo = cloneDeep(_backgroundInfo);

    if (!backgroundInfo) return <PageLoading />;

    let mainImageUrl = [];

    try {
      mainImageUrl = backgroundInfo.mainImageUrl.split(',').map(url => url.replace('"', ''));
    } catch (e) {
      mainImageUrl = [backgroundInfo.mainImageUrl];
    }

    return (
      <React.Fragment>
        <PageHeaderWrapper />
        <Card bordered={false} style={{ marginTop: '1em' }} key={name}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <Form.Item {...formItemLayout} colon={false} label={<></>}>
              <Typography.Title level={3} style={{ textAlign: 'center' }}>
                {backgroundInfo.name}
              </Typography.Title>
            </Form.Item>
            <Form.Item {...formItemLayout} label={labelTip(imgLim.mini, '图片')}>
              <ImgUPload
                fileList={mainImageUrl}
                limit={imgLim.mini}
                onChange={fileList => this.handleUploadChange(fileList, 'mainImageUrl')}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={
                <span>
                  详情&nbsp;
                  <Tooltip title="Ctrl + S 保存当前编辑进度">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              <RichTextEditor
                value={backgroundInfo.description}
                onChange={e => this.handleChange(e, 'description')}
              />
            </Form.Item>
            <Form.Item {...formItemLayout} colon={false} label={<></>}>
              <Button type="default" htmlType="button" onClick={() => history.push('/')}>
                取消
              </Button>
              &emsp;
              <Button type="primary" htmlType="submit" onClick={this.handleSave}>
                保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  backgroundInfo: state.backgroundInfo,
});
export default connect(mapStateToProps)(BackgroundInfo);
