import React from 'react';
import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const host = '47.96.116.169';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    const { onChange } = this.props;

    onChange(fileList.map(({ response }) => response));
  };

  render() {
    const {
      previewVisible,
      previewImage,
    } = this.state;
    const {
      limit,
      fileList,
    } = this.props;
    const uploadUrl = '/api/upload/image';
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    );

    const defaultFileList = [];

    fileList.forEach(url => {
      if (!url) return;

      defaultFileList.push({
        uid: Math.random().toString(),
        status: 'done',
        response: url,
        url: `//${host}${url}`,
      });
    });

    return (
      <div className='clearfix'>
        <Upload
          multiple
          listType='picture-card'
          action={uploadUrl}
          defaultFileList={defaultFileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {defaultFileList.length >= +limit ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
