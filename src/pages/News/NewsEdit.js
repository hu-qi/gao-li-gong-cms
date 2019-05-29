import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, Select, Icon, Upload, DatePicker  } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { TextArea } = Input;

const FormItem = Form.Item;

@connect(({ news, loading }) => ({
  ...news,
  submitting: loading.effects['form/submitRegularForm'],
}))

@Form.create()
class NewsEdit extends PureComponent {
  state = {
    id: null
  }
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  componentDidMount() {
    const {params} = this.props.match;
    const {dispatch} = this.props;
    if (params.id) {
      this.setState({
        id: params.id
      })
      dispatch({
        type: 'news/get',
        payload: {
          id: params.id
        },
      });
    }
  }

  beforeUpload = file => {
    const isJPG = file.type.indexOf('image/') > -1;
    if (!isJPG) {
      message.error('仅支持上传图片');
    }
    const isLt1M = file.size / 1024 / 1024 <= 1;
    if (!isLt1M) {
      message.error('图片大小必须小于 1MB!');
    }
    return isJPG && isLt1M;
  }

  handleSubmit = e => {
    const { dispatch, form, id } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {thumbnail, time, ...restValues} = values;
        const type = id ? 'news/modify' : 'news/add';
        dispatch({
          type: type,
          payload: {
            id: id,
            thumbnail: thumbnail ? thumbnail[0].response : '',
            time: time ? time.format('YYYY-MM-DD h:mm:ss') : '',
            ...restValues
          },
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
      title,
      brief,
      link,
      time,
      thumbnail
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.news.title.label" />}>
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.news.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.news.title.placeholder' })} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.news.description.label" />}
            >
              {getFieldDecorator('brief', {
                initialValue: brief,
                rules: [{
                  required: true,
                  message: formatMessage({ id: 'validation.news.description.required' }),
                }]
              })(<TextArea
                  rows={4}
                  placeholder={formatMessage({ id: 'form.news.description.placeholder' })}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.news.link.label" />}>
              {getFieldDecorator('link', {
                initialValue: link,
                rules: [
                  {
                    type: 'url',
                    required: true,
                    message: formatMessage({ id: 'validation.news.link.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.news.link.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.datepicker.label" />}>
              {getFieldDecorator('time', {
                initialValue: time
              })(
                <DatePicker showTime placeholder={formatMessage({ id: 'form.datepicker.placeholder' })} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.thumbnail.label" />}>
              {getFieldDecorator('thumbnail', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  action="/api/upload/image"
                  listType="picture"
                  accept="image/*"
                  beforeUpload={this.beforeUpload}
                >
                  <Button>
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
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

export default NewsEdit;
