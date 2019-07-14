import React from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import debounce from 'lodash/debounce';

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

    return (<BraftEditor value={editorState} onChange={this.handleEditorChange} />);
  }
}

export default ReachTextEditor;
