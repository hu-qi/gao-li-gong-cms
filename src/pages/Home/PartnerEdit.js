import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, Select } from 'antd';

import ImgUPload from '@/components/ImgUpload';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ partner, loading }) => ({
  ...partner,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class PartnerEdit extends PureComponent {
  state = {
    // eslint-disable-next-line react/no-unused-state
    id: null,
    imgUrl: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { params } = this.props.match;
    const { dispatch, form } = this.props;
    if (params.id) {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        id: params.id,
      });
      dispatch({
        type: 'partner/get',
        payload: {
          id: params.id,
        },
        callback: resp => {
          this.setState({ imgUrl: resp.imgUrl ? [resp.imgUrl] : [] });
          delete resp.imgUrl;

          form.setFieldsValue({
            ...resp,
          });
        },
      });
    } else {
      this.setState({ imgUrl: [] });
    }
  }

  handleSubmit = e => {
    const { imgUrl } = this.state;
    const {
      dispatch,
      form,
      match: { params },
    } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const type = params.id ? 'partner/modify' : 'partner/add';
        dispatch({
          type,
          payload: {
            id: params.id,
            ...values,
            imgUrl: imgUrl[0],
          },
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { imgUrl } = this.state;

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
            <FormItem {...formItemLayout} label={<FormattedMessage id="链接" />}>
              {getFieldDecorator('link', {
                rules: [
                  {
                    type: 'url',
                    required: true,
                    message: formatMessage({ id: 'validation.news.link.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: '输入合作伙伴的链接' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.thumbnail.label" />}>
              {imgUrl && (
                <ImgUPload
                  fileList={imgUrl}
                  limit={1}
                  onChange={url => this.setState({ imgUrl: url })}
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.type.label" />}>
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择伙伴类型!' }],
                initialValue: '主办方',
              })(
                <Select>
                  <Option value="主办方">主办方</Option>
                  <Option value="支持单位">支持单位</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="排序" />}>
              {getFieldDecorator('orderNo', {
                rules: [{ type: 'string', required: true, message: '请输入整数!' }],
              })(<Input placeholder={formatMessage({ id: '输入正整数' })} />)}
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

export default PartnerEdit;
