import React from 'react';
import { Upload, Button, Icon } from 'antd';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import styles from './index.less';

class ReachTextEditor extends React.Component {
  extendControls = [
    'separator',
    {
      key: 'antd-uploader',
      type: 'component',
      title: 'antd图片上传',
      className: 'antdUploaderButton',
      html: null,
      text: '图片上传',
      component: (
        <Upload
          multiple={false}
          action="/api/upload/image"
          onChange={f => {
            this.handleFileChange(f);
          }}
          showUploadList={false}
        >
          <Button type="link">
            <Icon
              type="picture"
              theme="outlined"
              style={{ color: '#6a6f7b', position: 'relative', top: '3px' }}
            />
          </Button>
        </Upload>
      ),
    },
  ];

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

  handleFileChange = ({ fileList }) => {
    if (!fileList || !fileList.map(({ response }) => response)[0]) {
      return;
    }
    const imgUrl = fileList.map(({ response }) => response)[0];
    const { editorState } = this.state;
    // 编辑器插入图片标签
    this.setState({
      editorState: ContentUtils.insertMedias(editorState, [
        {
          type: 'IMAGE',
          url: `http://admin.wildgaoligong.com${imgUrl}`,
        },
      ]),
    });
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
    // this.handleFileChange(editorState);
  };

  render() {
    const { editorState } = this.state;

    return (
      <section className={styles.richText}>
        <BraftEditor
          ref={instance => {
            this.editorInstance = instance;
          }}
          value={editorState}
          onChange={this.handleEditorChange}
          hooks={this.uploadHandler}
          extendControls={this.extendControls}
        />
      </section>
    );
  }
}

export default ReachTextEditor;
