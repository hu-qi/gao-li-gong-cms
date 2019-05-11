import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, Select, Icon, Upload } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class SliderEdit extends PureComponent {
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
              {
                <TextArea
                  rows={4}
                  placeholder={formatMessage({ id: 'form.description.placeholder' })}
                />
              }
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.news.link.label" />}>
              {getFieldDecorator('link', {
                rules: [
                  {
                    type: 'url',
                    required: true,
                    message: formatMessage({ id: 'validation.news.link.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.news.link.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.thumbnail.label" />}>
              {getFieldDecorator('thumbnail', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
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

export default SliderEdit;
