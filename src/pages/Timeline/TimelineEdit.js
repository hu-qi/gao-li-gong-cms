import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, DatePicker } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

import ImgUPload from '@/components/ImgUpload';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ timeline, loading }) => ({
  ...timeline,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class TimelineEdit extends PureComponent {
  state = {
    id: null,
    imgUrl: null,
  }

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
        callback: ({ imgUrl, time, description = '' }) => {
          this.setState({ imgUrl: [ imgUrl ] });

          this.props.form.setFieldsValue({
            description,
            time: time ? moment(time, 'YYYY-MM-DD hh:mm') : null,
          })
        },
      });
    } else {
      this.setState({ imgUrl: [] });
      this.props.form.resetFields();
    }
  }

  componentWillUnmount() {
    this.props.form.resetFields();
  }

  handleSubmit = e => {
    const { dispatch, form, match: { params } } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { time, ...restValues} = values;
        const type = params.id ? 'timeline/modify' : 'timeline/add';
        dispatch({
          type,
          payload: {
            id: params.id ? params.id : undefined,
            imgUrl: this.state.imgUrl[0],
            time: time.format('YYYY-MM-DD hh:mm'),
            ...restValues
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
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
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'form.datepicker.required' }),
                  },
                ],
              })(
                <DatePicker showTime placeholder={formatMessage({ id: 'form.datepicker.placeholder' })} />
              )}
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

export default TimelineEdit;
