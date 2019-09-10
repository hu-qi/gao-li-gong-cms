import React, { PureComponent } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card } from 'antd';
import { connect } from 'dva';

const { TextArea } = Input;
const FormItem = Form.Item;

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ImgUPload from '@/components/ImgUpload';

@connect(({ slider }) => ({
  slider,
}))
@Form.create()
class SliderEdit extends PureComponent {
  state = {
    imgUrl: null,
  };

  componentDidMount() {
    const {
      match: { params },
      dispatch,
    } = this.props;

    if (params.id) {
      dispatch({
        type: 'slider/getRollimages',
        payload: {
          id: params.id
        },
        callback: ( resp ) => {
          this.setState({ imgUrl: [ resp.imgUrl ] });

          delete resp.imgUrl;

          this.props.form.setFieldsValue({
            ...resp,
          })
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
        dispatch({
          type: params.id ? 'slider/updateRollimages' : 'slider/addRollimages',
          payload: {
            id: params.id ? params.id : undefined,
            imgUrl: this.state.imgUrl[0],
            ...values,
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
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'title 不能为空',
                  },
                ],
              })(<Input placeholder='请输入 title' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.description.label" />}>
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '描述不能为空',
                  },
                ],
              })(<TextArea
                rows={4}
                placeholder='请输入相关摘要'
              />)
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
              {
                imgUrl &&
                <ImgUPload
                  fileList={imgUrl}
                  limit={1}
                  onChange={imgUrl => this.setState({ imgUrl })}
                />
              }
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
