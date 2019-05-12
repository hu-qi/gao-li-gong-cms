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
class PartnerEdit extends PureComponent {
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

    let FormItems;
    const partnerType = getFieldValue('partnerType');
    if (partnerType == 3) {
      FormItems = <>
        <FormItem
          {...formItemLayout} label={<FormattedMessage id="form.partner.photographer.label"
          />}>
          {getFieldDecorator('photographer', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.news.link.required' }),
              },
            ],
          })(<Input placeholder={formatMessage({ id: 'form.partner.photographer.placeholder' })} />)}
        </FormItem>
      </>;
    } else {
      FormItems = <>
        <FormItem
          {...formItemLayout} label={<FormattedMessage id="form.news.link.label"
          />}>
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
        <FormItem {...formItemLayout} label={<FormattedMessage id="form.partner.logo.avatar" />}>
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
      </>;
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.partner.type.label" />}>
              {getFieldDecorator('partnerType')(
                <Select
                  placeholder={formatMessage({ id: 'form.partner.type.placeholder' })}
                  style={{
                    margin: '8px 0',
                  }}
                  defaultValue="1"
                >
                  <Select.Option value="1">
                    <FormattedMessage id="form.publicUsers.option.A" />
                  </Select.Option>
                  <Select.Option value="2">
                    <FormattedMessage id="form.publicUsers.option.B" />
                  </Select.Option>
                  <Select.Option value="3">
                    <FormattedMessage id="form.publicUsers.option.C" />
                  </Select.Option>
                </Select>
              )}
            </FormItem>
            {FormItems}
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

export default PartnerEdit;