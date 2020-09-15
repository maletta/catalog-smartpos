import React from 'react';
import { ISvg } from '../SvgIcon';

const CloseIcon : React.FC<ISvg> = (props:ISvg) => {
  const {
    className, color = '#000', height = 22.413, width = 22.413, stroke = '#000', strokeLinecap = 'round',
  } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} onClick={e => props.onClick && props.onClick(e)}>
      <g transform="translate(0.5 0.5)">
        <g transform="translate(8.091 8.091)">
          <path fill={color} stroke={stroke} strokeLinecap={strokeLinecap} d="M4027.243,1513.418a.4.4,0,0,1-.282-.117l-12.523-12.524a.4.4,0,0,1,.565-.565l12.522,12.523a.4.4,0,0,1-.283.682Z" transform="translate(-4014.321 -1500.096)" />
        </g>
        <g transform="translate(0 0)">
          <path fill={color} stroke={stroke} strokeLinecap={strokeLinecap} d="M4015.263,1501.437a.4.4,0,0,1-.283-.117l-12.522-12.523a.4.4,0,0,1,.565-.565l12.523,12.523a.4.4,0,0,1-.283.683Z" transform="translate(-4002.339 -1488.114)" />
        </g>
        <g transform="translate(0 8.091)">
          <path fill={color} stroke={stroke} strokeLinecap={strokeLinecap} d="M4002.739,1513.418a.4.4,0,0,1-.282-.682l12.522-12.523a.4.4,0,1,1,.566.565l-12.523,12.524A.4.4,0,0,1,4002.739,1513.418Z" transform="translate(-4002.339 -1500.096)" />
        </g>
        <g transform="translate(8.091 0)"><path fill={color} stroke={stroke} strokeLinecap={strokeLinecap} d="M4014.72,1501.437a.4.4,0,0,1-.282-.683l12.523-12.523a.4.4,0,1,1,.564.565L4015,1501.32A.4.4,0,0,1,4014.72,1501.437Z" transform="translate(-4014.321 -1488.114)" /></g>
      </g>
    </svg>
  );
};

export default CloseIcon;
