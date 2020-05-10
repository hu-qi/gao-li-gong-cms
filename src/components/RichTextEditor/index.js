import React from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import debounce from 'lodash/debounce';
import styles from './index.less';
import { ContentUtils } from 'braft-utils';
import { Upload, Button, Icon } from 'antd';

class ReachTextEditor extends React.Component {
  handleChange = debounce(editorState => {
    const { onChange } = this.props;
    onChange(editorState.toHTML());
  }, 200);

  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(null),
      prevValue: props.value,
    };
    this.editorInstance = undefined;
  }

  componentDidMount() {
    const { value = null } = this.props;
    const editorState = BraftEditor.createEditorState(value);

    this.setState({ editorState });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.prevValue) {
      return {
        prevValue: props.value,
        editorState: BraftEditor.createEditorState(props.value),
      };
    }
    return null;
  }
  handleEditorChange = editorState => {
    this.setState({ editorState });
    this.handleFileChange(editorState);
  };
  beforeUpload = ({ file, fileList }) => {
    //判断图片是否上传成功
    const host =
      window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
        ? ''
        : 'http://static.wildgaoligong.com';
    if (file.status === 'uploading') {
    }
    //上传成功后的回调
    if (file.status === 'done') {
      this.setState({
        editorState: ContentUtils.insertMedias(this.state.editorState, [
          {
            type: 'IMAGE',
            url: host + file.response,
          },
        ]),
      });
    }
  };
  render() {
    const { editorState } = this.state;
    //隐藏原来的上传
    const excludeControls = ['media'];
    const uploadUrl = '/api/upload/image';
    // 添加需要展示的扩展控件
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            action={uploadUrl}
            showUploadList={false}
            onChange={this.beforeUpload}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        ),
      },
    ];

    return (
      <section className={styles.richText}>
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          excludeControls={excludeControls}
          extendControls={extendControls}
        />
      </section>
    );
  }
}

export default ReachTextEditor;
