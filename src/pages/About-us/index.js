import React from 'react';
import { Form, Button, Input, Icon, Tooltip, Card, Spin, message } from 'antd';
import { connect } from 'dva';
import debounce from 'lodash/debounce';

import ImgUPload from '@/components/ImgUpload';
import RichTextEditor from '@/components/RichTextEditor';

const { TextArea } = Input;
const FormItem = Form.Item;

@Form.create()
@connect(({ aboutUs, loading }) => ({
  aboutUs,
  loading,
}))
export default class AboutUs extends React.Component {
  state = {
    imgLeft: '',
    imgRight: ''
  };

  componentDidMount() {
    const {
      dispatch,
      form
    } = this.props;

    dispatch({
      type: 'aboutUs/fetch',
      payload: {},
      callback: ({ nameLeft, nameRight, contentLeft, contentRight, logoLeft, logoRight}) => {
        this.setState({ 
          imgLeft: [logoLeft],
          imgRight: [logoRight]
        });
        form.setFieldsValue({
          nameLeft,
          nameRight,
          contentLeft,
          contentRight,
        });
      }
    });
  }
  handleChange = (value, key) => {
    const {
      dispatch,
      aboutUs: { aboutUs }
    } = this.props;

    dispatch({
      type: 'aboutUs/save',
      payload: {
        ...aboutUs,
        [key]: value
      }
    })
  }
  handleUploadChange = (file, type) => {
    switch (type) {
      case 'left':
        this.setState({
          imgLeft: file
        })
        this.handleChange(file[0], 'logoLeft')
      break;
      case 'right':
        this.setState({
          imgRight: file
        })
        this.handleChange(file[0], 'logoRight')
      break;
      default:
        void 0;
    }
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  prompt = debounce(e => {
    const { dispatch, form, aboutUs: { aboutUs }, history } = this.props;
    const { imgLeft, imgRight } = this.state;

    // e.preventDefault();
    e.persist()
    form.validateFieldsAndScroll((err, values) => {
      if(!err) {
        dispatch({
          type: 'aboutUs/update',
          payload: {
            ...aboutUs,
          },
          callback: () => {
            // history.push('/about-us')
            message.success('保存成功');
            window.scrollTo(0, 0);
          }
        });
      }
    })
  }, 500);
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render() {
    const {
      aboutUs: { aboutUs },
      loading: { global },
      form
    } = this.props;
    const {imgLeft, imgRight} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
        md: { span: 15 },
      },
    };

    return (
      <Spin spinning={global} delay={500}>
        <Card title="关于我们">
          <Form onSubmit={this.prompt}>
            <FormItem {...formItemLayout} label={"左标题"}>
              {form.getFieldDecorator('nameLeft', {
                rules: [
                  { required: true, message: '左标题不能为空！', },
                ],
              })(<Input
                onChange={e => this.handleChange(e.target.value, 'nameLeft')}
                placeholder="请输入左标题" />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label={"左内容"}>
              {form.getFieldDecorator('contentLeft', {
                rules: [
                  { required: true, message: '左内容不能为空！', },
                ],
              })(<TextArea rows={4} 
                onChange={e => this.handleChange(e.target.value, 'contentLeft')}
                placeholder="请输入左内容" />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label={"右标题"}>
              {form.getFieldDecorator('nameRight', {
                rules: [
                  { required: true, message: '右标题不能为空！', },
                ],
              })(<Input
                onChange={e => this.handleChange(e.target.value, 'nameRight')}
                placeholder="请输入右标题" />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label={"右内容"}>
              {
              form.getFieldDecorator('contentRight', {
                rules: [
                  { required: true, message: '右内容不能为空！', },
                ],
              })(<TextArea rows={4}
                onChange={e => this.handleChange(e.target.value, 'contentRight')}
                placeholder="请输入右内容" />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
                logoLeft&nbsp;
                  <Tooltip title={`只能上传1张图片`}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }>
              {imgLeft && (
                <ImgUPload
                fileList={imgLeft}
                limit={1}
                onChange={imgUrl => this.handleUploadChange(imgUrl, 'left')}
              />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
                logoRight&nbsp;
                  <Tooltip title={`只能上传1张图片`}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }>
              {imgRight && (
                <ImgUPload
                fileList={imgRight}
                limit={1}
                onChange={imgUrl => this.handleUploadChange(imgUrl, 'right')}
              />
              )}
            </FormItem>
      
            <FormItem {...formItemLayout} colon={false} label={<></>}>
              <Button style={{ marginTop: 16 }} type={'primary'}  htmlType="button" onClick={this.prompt}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </Spin>
    );
  }
}
