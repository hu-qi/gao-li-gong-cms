import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  Tooltip,
  Icon,
} from 'antd';

import ImgUPload from '@/components/ImgUpload'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RichTextEditor from '@/components/RichTextEditor';
import { buildTagsGroup } from './index';
import styles from './Biology.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const TypeMap = {
  MAIN: 'main',
  MINI: 'mini',
};


@connect(({ loading, biology }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  biology,
}))
class Biology extends PureComponent {
  state = {
    miniImgList: [],
    mainImgList: [],
  };

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    if (+id) {
      dispatch({
        type: 'biology/fetchBiologyById',
        payload: { id },
      });
    }

    dispatch({
      type: 'biology/fetchLabelList',
      payload: {},
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  handleUploadChange = (fileList, type) => {
    console.log(fileList)
    switch (type) {
      case TypeMap.MAIN:
        this.setState({
          mainImgList: fileList,
        });
        break;
      case TypeMap.MINI:
        this.setState({
          miniImgList: fileList,
        });
        break;
      default:
        void 0;
    }
  };

  handleNameChange = (value, key) => {
    const {
      dispatch,
      biology: { biology },
    } = this.props;

    dispatch({
      type: 'biology/setBiology',
      payload: {
        ...biology,
        [key]: value,
      },
    });
  };

  handleSave = () => {
    const {
      dispatch,
      biology: { biology },
    } = this.props;

    dispatch({
      type: 'biology/addBiology',
      payload: biology,
    });
  };

  render() {
    const {
      biology: {
        biology,
        tags,
      },
    } = this.props;
    const {
      mainImgList,
      miniImgList,
    } = this.state;
    const imgLim = {
      mini: 10,
      main: 10,
    };
    const labels = Object.entries(buildTagsGroup(tags));
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
    const labelTip = lim => <span>小图&nbsp;<Tooltip title={`最多可上传 ${lim} 张图片`}><Icon type='question-circle-o' /></Tooltip></span>;

    return (
      <React.Fragment>
        <PageHeaderWrapper />
        <Card bordered={false} style={{marginTop: '1em'}} className={styles.Biology}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>
            <FormItem {...formItemLayout} label={<FormattedMessage id='form.title.label' />}>
              <Input
                value={biology.name}
                placeholder='请输入物种名称'
                onChange={e => this.handleNameChange(e.target.value, 'name')}
              />
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id='form.goal.label' />}>
              <TextArea
                style={{minHeight: 32}}
                placeholder={formatMessage({ id: 'form.goal.placeholder'})}
                rows={4}
                value={biology.brief}
                onChange={e => this.handleNameChange(e.target.value, 'brief')}
              />
            </FormItem>
            {
              labels.map(([label, tag]) => (
                <FormItem {...formItemLayout} key={label} label={label}>
                  <Select
                    mode='multiple'
                    style={{ width: '100%' }}
                    placeholder='Please select'
                    defaultValue={[]}
                    onChange={this.handleChange}
                  >
                    {tag.map(({ name, id }) => <Option key={id.toString()}>{ name }</Option>)}
                  </Select>
                </FormItem>
              ))
            }
            <FormItem {...formItemLayout} label={labelTip(imgLim.mini)}>
              <ImgUPload fileList={miniImgList} limit={imgLim.mini} type={TypeMap.MINI} onChange={this.handleUploadChange} />
            </FormItem>
            <FormItem {...formItemLayout} label={labelTip(imgLim.main)}>
              <ImgUPload fileList={mainImgList} limit={imgLim.main} type={TypeMap.MAIN} onChange={this.handleUploadChange} />
            </FormItem>
            <FormItem {...formItemLayout} label={<span>物种详情&nbsp;<Tooltip title='Ctrl + S 保存当前编辑进度'><Icon type='question-circle-o' /></Tooltip></span>}>
              <RichTextEditor value={biology.content} onChange={e => this.handleNameChange(e, 'content')} />
            </FormItem>
              <Button type='primary' htmlType='submit' onClick={this.handleSave}>保存</Button>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

export default Biology;
