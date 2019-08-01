import * as React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export const Spinner = () => (
  <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
    <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} />
  </div>
);
