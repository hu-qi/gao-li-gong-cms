import React from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import debounce from 'lodash/debounce';

import styles from './index.less';

class ReachTextEditor extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
  };

  componentDidMount() {
    const { value = null } = this.props;
    const editorState = BraftEditor.createEditorState(value);

    this.setState({ editorState });
  }

  handleChange = debounce(editorState => {
    const { onChange } = this.props;

    onChange(editorState.toHTML())
  }, 800);

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
