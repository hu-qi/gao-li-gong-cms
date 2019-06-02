import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, Select, Icon, Upload } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ partner, loading }) => ({
  ...partner,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class PartnerEdit extends PureComponent {
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
        type: 'partner/get',
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
        let {imgUrl, description, ...restValues} = values;
        const type = id ? 'partner/modify' : 'partner/add';
        dispatch({
          type: type,
          payload: {
            id: id,
            description: description,
            // imgUrl: imgUrl && imgUrl.length ? imgUrl[0].response : '',
            imgUrl: imgUrl && imgUrl.length && imgUrl[0],
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
      link
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
    // const partnerType = getFieldValue('partnerType');
    // if (partnerType == 3) {
    //   FormItems = <>
    //     <FormItem
    //       {...formItemLayout} label={<FormattedMessage id="form.partner.photographer.label"
    //       />}>
    //       {getFieldDecorator('photographer', {
    //         rules: [
    //           {
    //             required: true,
    //             message: formatMessage({ id: 'validation.news.link.required' }),
    //           },
    //         ],
    //       })(<Input placeholder={formatMessage({ id: 'form.partner.photographer.placeholder' })} />)}
    //     </FormItem>
    //   </>;
    // } else {
      FormItems = <>
        <FormItem
          {...formItemLayout} label={<FormattedMessage id="form.news.link.label"
          />}>
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
        <FormItem {...formItemLayout} label={<FormattedMessage id="form.partner.logo.avatar" />}>
          {getFieldDecorator('thumbnail', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="file" action="/api/upload/image" listType="picture">
              <Button>
                <Icon type="upload" /> 点击上传
          </Button>
            </Upload>
          )}
        </FormItem>
      </>;
    // }

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {/* <FormItem {...formItemLayout} label={<FormattedMessage id="form.partner.type.label" />}>
              {getFieldDecorator('partnerType')(
                <Select
                  placeholder={formatMessage({ id: 'form.partner.type.placeholder' })}
                  style={{
                    margin: '8px 0',
                  }}
                  defaultValue="1"
                >
                  <Select.Option value="1">
                    主办方
                  </Select.Option>
                  <Select.Option value="2">
                    支持单位
                  </Select.Option>
                </Select>
              )}
            </FormItem> */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.description.label" />}>
              {getFieldDecorator('description', {
                initialValue: description,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.partner.description.required' }),
                  },
                ],
              })(
                <TextArea
                  rows={4}
                  placeholder={formatMessage({ id: 'form.description.placeholder' })}
                />
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