import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeWithContent = ({ content }) => {
  return (
    <div>
      <div>{content}</div>
      <QRCode value={content} />
    </div>
  );
};

export default QRCodeWithContent;
