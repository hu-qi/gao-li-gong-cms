import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, DatePicker, Select, Icon, Upload } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class TimelineEdit extends PureComponent {
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {imgUrl, time, ...restValues} = values;
        dispatch({
          type: 'timeline/add',
          payload: {
            imgUrl: imgUrl[0].response,
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
              {getFieldDecorator('description')(
                <TextArea
                  rows={4}
                  placeholder={formatMessage({ id: 'form.description.placeholder' })}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.datepicker.label" />}>
              {getFieldDecorator('time')(
                <DatePicker placeholder={formatMessage({ id: 'form.datepicker.placeholder' })} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.thumbnail.label" />}>
              {getFieldDecorator('imgUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile
              })(
                <Upload name="file" action="/api/upload/image" listType="picture" accept="image/*">
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
