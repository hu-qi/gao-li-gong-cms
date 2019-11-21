import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, Icon, Upload } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

import ImgUPload from '@/components/ImgUpload';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';

@connect(({ partner, loading }) => ({
  ...partner,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class PartnerEdit extends PureComponent {
  state = {
    id: null,
    imgUrl: null,
  };

  componentDidMount() {
    const { params } = this.props.match;
    const { dispatch } = this.props;
    if (params.id) {
      this.setState({
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

          this.props.form.setFieldsValue({
            ...resp,
          });
        },
      });
    } else {
      this.setState({ imgUrl: [] });
    }
  }

  handleSubmit = e => {
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
            imgUrl: this.state.imgUrl[0],
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
                  onChange={imgUrl => this.setState({ imgUrl })}
                />
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

export default PartnerEdit;
