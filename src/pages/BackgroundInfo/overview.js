import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Button, Card, Form, Icon, Tooltip, message } from 'antd';
import router from 'umi/router';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import last from 'lodash/last';

import PageLoading from '@/components/PageLoading';
import ImgUPload from '@/components/ImgUpload';
import RichTextEditor from '@/components/RichTextEditor';

@Form.create()
@connect(({ backgroundInfo }) => ({
  backgroundInfo,
}))
class BackgroundInfo extends PureComponent {
  state = {
    mainImageUrl: null
  }
  handleSubmit = debounce(e => {
    const { dispatch, form, backgroundInfo, history } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll(err => {
      if (!err) {
        dispatch({
          type: 'backgroundInfo/updateBackgroundInfo',
          payload: {
            ...backgroundInfo,
            mainImageUrl: this.state.mainImageUrl[0]
          },
          callback: () => {
            message.info('保存成功！');
            history.push('/background-info/overview');
          },
        });
      }
    });
  }, 500);

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'backgroundInfo/fetchBackgroundInfo',
      payload: {},
      callback: (data) => {
        this.setState({
          mainImageUrl: data.mainImageUrl?[data.mainImageUrl]: []
        })
        delete data.mainImageUrl

        form.setFieldsValue({
          ...data,
        });
      }
    });
  }

  handleChange = (value, key) => {
    const { dispatch, backgroundInfo } = this.props;

    dispatch({
      type: 'backgroundInfo/setBackgroundInfo',
      payload: {
        ...backgroundInfo,
        [key]: value,
      },
    });
  };

  handleUploadChange = (fileList, type) => {
    const imgs = fileList.filter(f => f);

    this.handleChange(JSON.stringify(imgs), type);
  };

  handleGroupUploadChange = (fileList, groups, group) => {
    const newImage = last(fileList.filter(f => f));
    const newGroups = groups.slice();
    newGroups.map(newGroup => {
      if (newGroup.name === group.name) {
        newGroup.imgUrl = newImage;
      }
      return newGroup;
    });

    this.handleChange(newGroups, 'children');
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
        sm: { span: 16 },
        md: { span: 16 },
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
    const { mainImageUrl } = this.state;

    console.log('mainImageUrl', backgroundInfo.mainImageUrl)
    return (
      <React.Fragment>
        <PageHeaderWrapper />
        <Card bordered={false} style={{ marginTop: '1em' }} key={name}>
          <Form style={{ marginTop: 8 }}>
            <Form.Item {...formItemLayout} label={labelTip(1, '背景图片')}>
              {mainImageUrl && 
                  <ImgUPload
                  key="mainImageUrl"
                  fileList={mainImageUrl}
                  multiple={false}
                  limit={1}
                  onChange={mainImageUrl => this.setState({ mainImageUrl })}
                />
              }

            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={
                <span>
                  详情描述&nbsp;
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

            {backgroundInfo.children.map(group => (
              <Form.Item
                key={group.name}
                {...formItemLayout}
                label={labelTip(1, `${group.name}封面图`)}
              >
                <ImgUPload
                  multiple={false}
                  fileList={[group.imgUrl]}
                  limit={1}
                  onChange={fileList =>
                    this.handleGroupUploadChange(fileList, backgroundInfo.children, group)
                  }
                />
                <Button type="default" htmlType="button" style={{position:'absolute',top: 0,left: 400}} onClick={() => {
                  console.log('子页面编辑', group.name)
                  router.push(`/background-info/name/${group.name}`)
                }}>子页面编辑</Button> 
              </Form.Item>
            ))}

            <Form.Item {...formItemLayout} colon={false} label={<></>}>
              <Button type="default" htmlType="button" onClick={() => history.push('/')}>
                取消
              </Button>
              &emsp;
              <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
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
