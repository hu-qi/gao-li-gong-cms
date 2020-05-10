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
    content: '',
    imgList: []
  };

  componentDidMount() {
    const {
      dispatch,
      form
    } = this.props;

    dispatch({
      type: 'aboutUs/fetch',
      payload: {},
      callback: ({ nameLeft, nameRight, contentLeft, contentRight, description, logos }) => {
        const imgList = logos || [];
 
        form.setFieldsValue({
          nameLeft,
          nameRight,
          contentLeft,
          contentRight,
          description,
        });
        this.setState({
          imgList
        })
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
  handleUploadChange = (fileList) => {
    const imgs = fileList.filter(f => f);
    this.setState({
      imgList: imgs
    })
    this.handleChange(imgs, 'logos')
  }

  prompt = debounce(e => {
    const { dispatch, form, aboutUs: { aboutUs }, history } = this.props;
    const { content, imgList } = this.state;

    // e.preventDefault();
    e.persist()
    form.validateFieldsAndScroll((err, values) => {
      if(!err) {
        dispatch({
          type: 'aboutUs/update',
          payload: {
            ...aboutUs,
          },
          callback: () => history.push('/about-us')
        });
      }
    })
  }, 500);

  render() {
    const {
      aboutUs: { aboutUs },
      loading: { global },
      form
    } = this.props;
    const {imgList} = this.state;
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

    // if (!content) { return null; }

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
                logos&nbsp;
                      <Tooltip title={`最多可上传20张图片`}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }>
              {
                <ImgUPload
                  fileList={imgList}
                  limit={'20'}
                  onChange={imgs => this.handleUploadChange(imgs)}
                />
              }
            </FormItem>
           
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  详情描述&nbsp;
                  <Tooltip title="Ctrl + S 保存当前编辑进度">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              <RichTextEditor value={aboutUs.description || ''} onChange={e => this.handleChange( e, 'description')} />
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
