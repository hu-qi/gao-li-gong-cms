import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  Button,
  Card,
  Select,
} from 'antd';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import { buildTagsGroup } from './BiologyList';
import styles from './Biology.less';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading, biology }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  biology,
}))
@Form.create()
class Biology extends PureComponent {
  state = {
    editorState: BraftEditor.createEditorState(null)
  };

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    dispatch({
      type: 'biology/fetchBiologyById',
      payload: {
        id,
      },
    });

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

  handleEditorChange = editorState => void this.setState({ editorState });

  render() {
    const {
      submitting,
      biology: {
        biology = {},
        tags,
      },
      form: { getFieldDecorator },
    } = this.props;
    const { editorState } = this.state;
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
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <Card bordered={false} className={styles.Biology}>
        <Form onSubmit={ this.handleSubmit } hideRequiredMark style={ { marginTop: 8 } }>
          <FormItem { ...formItemLayout } label={ <FormattedMessage id='form.title.label'/> }>
            { getFieldDecorator('title', {
              initialValue: biology.name,
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.title.required' }),
                },
              ],
            })(<Input placeholder={ formatMessage({ id: 'form.title.placeholder' }) }/>) }
          </FormItem>
          <FormItem { ...formItemLayout } label={ <FormattedMessage id='form.goal.label'/> }>
            { getFieldDecorator('goal', {
              initialValue: biology.content,
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.goal.required' }),
                },
              ],
            })(
              <TextArea
                style={ { minHeight: 32 } }
                placeholder={ formatMessage({ id: 'form.goal.placeholder' }) }
                rows={ 4 }
              />,
            ) }
          </FormItem>
          {
            labels.map(([label, tag]) => (
              <FormItem {...formItemLayout} key={label} label={label}>
                <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  defaultValue={['level2', 'level3']}
                  onChange={this.handleChange}
                >
                  {tag.map(({ name, id }) => <Option key={id.toString()}>{ name }</Option>)}
                </Select>
              </FormItem>
            ))
          }
          <FormItem {...formItemLayout} label='物种介绍'>
            <BraftEditor value={editorState} onChange={this.handleEditorChange} />
          </FormItem>
          <FormItem {...submitFormLayout} style={{marginTop:32}}>
            <Button type='primary' htmlType='submit' loading={ submitting }>
              <FormattedMessage id='form.submit' />
            </Button>
            <Button style={{marginLeft: 8 }} >
              <FormattedMessage id='form.save' />
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Biology;
