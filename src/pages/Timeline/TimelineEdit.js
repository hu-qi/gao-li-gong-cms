import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, DatePicker, Select, Icon, Upload } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ timeline, loading }) => ({
  ...timeline,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class TimelineEdit extends PureComponent {
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
        type: 'timeline/get',
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
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {imgUrl, time, ...restValues} = values;
        const type = id ? 'timeline/modify' : 'timeline/add';
        dispatch({
          type: type,
          payload: {
            imgUrl: imgUrl && imgUrl.length ? imgUrl[0].response : '',
            time: time.format('YYYY-MM-DD h:mm:ss'),
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
      description,
      imgUrl,
      time
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
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.description.label" />}>
              {getFieldDecorator('description', {
                initialValue: description,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.timeline.description.required' }),
                  },
                ],
              })(
                <TextArea
                  rows={4}
                  placeholder={formatMessage({ id: 'form.description.placeholder' })}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.datepicker.label" />}>
              {getFieldDecorator('time', {
                initialValue: moment(time, 'YYYY-MM-DD'),
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'form.datepicker.required' }),
                  },
                ],
              })(
                <DatePicker placeholder={formatMessage({ id: 'form.datepicker.placeholder' })} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.thumbnail.label" />}>
              {getFieldDecorator('imgUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile
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

export default TimelineEdit;
