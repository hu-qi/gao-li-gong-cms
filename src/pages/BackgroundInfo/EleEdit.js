import React, { PureComponent } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, Icon, Tooltip, message } from 'antd';
import { connect } from 'dva';
import debounce from 'lodash/debounce';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ImgUPload from '@/components/ImgUpload';
import RichTextEditor from '@/components/RichTextEditor';

const FormItem = Form.Item;

@Form.create()
@connect(({ backgroundInfo }) => ({
  backgroundInfo,
}))
class EleEdit extends PureComponent {
  state = {
    content: ''
  };

  componentDidMount() {
    const {
      dispatch,
      form,
      match: { params },
    } = this.props;

    dispatch({
      type: 'backgroundInfo/fetchBackgroundInfoEle',
      payload: {
        name: params.name,
      },
      callback: resp => {
        this.setState({ content: resp });
        console.log('resp', resp, params)
      },
    });

  }
  handleChange = (value, key) => {
    console.log({[key]: value})
    // this.setState({ [key]: value });
    const { dispatch } = this.props;
    dispatch({
      type: 'backgroundInfo/setBackgroundInfoEle',
      payload: {
        [key]: value,
      },
    });

  }
  handleSubmit = e => {
    const {
      dispatch,
      form,
      backgroundInfo,
      match: { params },
    } = this.props;

    // const { content } = this.state;

    e.preventDefault();
    dispatch({
      type:  'backgroundInfo/updateBackgroundInfoEle',
      payload: {
        name: params.name,
        ...backgroundInfo
      },
      callback: () => {
        message.info('保存成功！');
        history.push('./');
      },
    });

  };

  render() {
    const { submitting, history } = this.props;
    const { content } = this.state;

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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 5 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
         
            <FormItem
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
                value={content}
                onChange={e => this.handleChange(e, 'content')}
              />
            </FormItem>
  
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="default" htmlType="button" onClick={() => history.go(-1)}>
                返回
              </Button>
              &emsp;
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default EleEdit;
