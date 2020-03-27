import React from 'react';
import { Upload, Icon } from 'antd';

export const host =
  window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' ? '' : '';

class PicturesWall extends React.Component {
  handlePreview = file => {
    const win = window.open();
    win.location.href = file.url;
  };

  handleChange = ({ fileList }) => {
    const { onChange } = this.props;

    onChange(fileList.map(({ response }) => response));
  };

  render() {
    const { limit, multiple = true, fileList } = this.props;
    const uploadUrl = '/api/upload/image';
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    const defaultFileList = [];

    fileList.forEach(url => {
      if (!url) {
        return;
      }

      defaultFileList.push({
        uid: Math.random().toString(),
        status: 'done',
        response: url,
        url: `${host}${url}`,
      });
    });

    return (
      <div className="clearfix">
        <Upload
          multiple={multiple}
          listType="picture-card"
          action={uploadUrl}
          defaultFileList={defaultFileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {defaultFileList.length >= +limit ? null : uploadButton}
        </Upload>
      </div>
    );
  }
}

export default PicturesWall;
