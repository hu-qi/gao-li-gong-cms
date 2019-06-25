import React from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import debounce from 'lodash/debounce';

class ReachTextEditor extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
  };

  static getDerivedStateFromProps(props, state) {
    const { editorState } = state;
    const curHtmlContent = editorState.toHTML();

    if (editorState !== curHtmlContent) {
      return {
        editorState: BraftEditor.createEditorState(editorState),
      };
    }

    return BraftEditor.createEditorState(null);
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

    return (<BraftEditor value={editorState} onChange={this.handleEditorChange} />);
  }
}

export default ReachTextEditor;
