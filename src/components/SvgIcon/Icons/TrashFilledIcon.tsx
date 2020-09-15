import React from 'react';
import { ISvg } from '../SvgIcon';

const TrashIcon : React.FC<ISvg> = (props:ISvg) => {
  const {
    className, color = '#000', height = 24, width = 24,
  } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} onClick={e => props.onClick && props.onClick(e)} color="#000">
      <path fill={color} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
    </svg>


  );
};

export default TrashIcon;
