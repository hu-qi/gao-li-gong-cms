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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading, biology }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  biology,
}))
@Form.create()
class BasicForms extends PureComponent {
  state = {
    value: 'test',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'biology/fetchBiologyById',
      payload: {
        id: 8,
      },
    });

    dispatch({
      type: 'biology/fetchClassify',
      payload: {},
    });
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

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

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const {
      submitting, biology: {
        biology = {},
        classify: {
          protection = [],
          endangered = [],
          species = [],
        } = {},
      },
    } = this.props;

    const {
      form: { getFieldDecorator },
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

    return (
      <Card bordered={ false }>
        <Form onSubmit={ this.handleSubmit } hideRequiredMark style={ { marginTop: 8 } }>
          <FormItem { ...formItemLayout } label={ <FormattedMessage id="form.title.label"/> }>
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
          <FormItem { ...formItemLayout } label={ <FormattedMessage id="form.goal.label"/> }>
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
          <FormItem { ...formItemLayout } label={ '保护等级' }>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['level2', 'level3']}
              onChange={this.handleChange}
            >
              {endangered.map(({ text, id }) => <Option key={id.toString()}>{ text }</Option>)}
            </Select>
          </FormItem>
          <FormItem { ...formItemLayout } label={ '濒危等级' }>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['level2']}
              onChange={this.handleChange}
            >
              {protection.map(({ text, id }) => <Option key={id.toString()}>{ text }</Option>)}
            </Select>
          </FormItem>
          <FormItem { ...formItemLayout } label={ '物种分类' }>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['bird', 'bird1', 'bird2']}
              onChange={this.handleChange}
            >
              {species.map(({ text, id }) => <Option key={id.toString()}>{ text }</Option>)}
            </Select>
          </FormItem>
          <ReactQuill value={ this.state.value } onChange={ this.handleChange }/>
          <FormItem { ...submitFormLayout } style={ { marginTop: 32 } }>
            <Button type="primary" htmlType="submit" loading={ submitting }>
              <FormattedMessage id="form.submit"/>
            </Button>
            <Button style={ { marginLeft: 8 } }>
              <FormattedMessage id="form.save"/>
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default BasicForms;
