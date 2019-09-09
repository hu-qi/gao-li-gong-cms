import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, DatePicker  } from 'antd';
import ImgUPload from '@/components/ImgUpload';
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
    id: null,
    thumbnails: [],
    loading: true,
  }

  componentDidMount() {
    const {
      dispatch,
      match: {
        params,
      },
    } = this.props;

    if (params.id) {
      this.setState({
        id: params.id
      })
      dispatch({
        type: 'news/get',
        payload: {
          id: params.id
        },
        callback: ({ thumbnail }) => {
          let thumbnails = [];

          try {
            thumbnails = JSON.parse(thumbnail);
          } catch (e) {
            console.log(e);
          }

          this.setState({
            thumbnails,
            loading: false,
          });
        },
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleUploadChange = thumbnails => {
    this.setState({ thumbnails });
  };

  handleSubmit = e => {
    const { dispatch, form, id } = this.props;
    const { thumbnails } = this.state;

    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { time, ...restValues} = values;
        const type = id ? 'news/modify' : 'news/add';

        dispatch({
          type,
          payload: {
            id,
            thumbnail: JSON.stringify(thumbnails),
            time: time ? time.format('YYYY-MM-DD h:mm:ss') : '',
            ...restValues
          },
        });
      }
    });
  };

  componentWillUnmount() {
    this.props.form.resetFields();
  }

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator },
      title,
      brief,
      link,
      time,
    } = this.props;
    const {
      thumbnails,
      loading,
    } = this.state;

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
                initialValue: time ? moment(time) : null
              })(
                <DatePicker showTime placeholder={formatMessage({ id: 'form.datepicker.placeholder' })} />
              )}
            </FormItem>
            { !loading &&
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.thumbnail.label" />}>
                <ImgUPload
                  fileList={thumbnails}
                  limit={10}
                  onChange={fileList => this.handleUploadChange(fileList, 'thumbnail')}
                />
              </FormItem>
            }
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
