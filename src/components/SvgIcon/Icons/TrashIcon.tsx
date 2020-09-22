import React from 'react';
import { ISvg } from '../SvgIcon';

const TrashIcon : React.FC<ISvg> = (props:ISvg) => {
  const {
    className, color = '#000', height = 21.666, width = 17.107,
  } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} onClick={e => props.onClick && props.onClick(e)}>
      <g transform="translate(-1586 -259.472)">
        <g transform="translate(1586 259.472)">
          <path fill={color} fillRule="evenodd" className="" d="M918.231,2689.357H902.144v1.869h16.087v-1.869Zm-9.714-.51v-1.1a.256.256,0,0,1,.256-.255h2.83a.255.255,0,0,1,.254.255v1.1h6.63a.255.255,0,0,1,.254.256v2.378a.255.255,0,0,1-.254.256h-.642v15.893a1.531,1.531,0,0,1-.449,1.08h0a1.522,1.522,0,0,1-1.08.449H904.061a1.533,1.533,0,0,1-1.53-1.529v-15.893h-.642a.256.256,0,0,1-.255-.256V2689.1a.256.256,0,0,1,.255-.256Zm2.83,0V2688h-2.318v.844Zm-7.286,19.8a1.019,1.019,0,0,1-1.02-1.019v-15.893h14.293v15.893a1.017,1.017,0,0,1-.3.721h0a1.02,1.02,0,0,1-.72.3Z" transform="translate(-901.634 -2687.494)" />
        </g>
        <line fill="none" stroke={color} strokeWidth="0.7px" className="" y2="11.764" transform="translate(1590.412 266.505)" />
        <line fill="none" stroke={color} strokeWidth="0.7px" className="" y2="11.764" transform="translate(1594.422 266.505)" />
        <line fill="none" stroke={color} strokeWidth="0.7px" className="" y2="11.764" transform="translate(1598.433 266.505)" />
      </g>
    </svg>
  );
};

export default TrashIcon;
