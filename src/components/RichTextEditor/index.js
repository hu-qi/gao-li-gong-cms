import React from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import debounce from 'lodash/debounce';

import styles from './index.less';

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
    this.handleChange(editorState);
  };

  render() {
    const { editorState } = this.state;

    return (
      <section className={styles.richText}>
        <BraftEditor value={editorState} onChange={this.handleEditorChange} />
      </section>
    );
  }
}

export default ReachTextEditor;
