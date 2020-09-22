import React from 'react';

import { CloseIcon, TrashIcon, TrashFilledIcon } from './Icons';

export interface ISvg{
  onClick ?: (event : React.MouseEvent) => void;
  className?: string | undefined;
  width?: string;
  height?: string;
  color?: string;
  stroke ?: string;
  strokeLinecap ?: "inherit" | "butt" | "round" | "square" | undefined;
}

enum IconsOptions {
  Trash = "trash",
  TrashFilled = "trash-filled",
  Close = "close",
}

interface ISvgIcon extends ISvg {
  icon?: IconsOptions | undefined;
}

const SwitchIcon = (icon : string | undefined) => {
  switch (icon) {
    case IconsOptions.Close:
      return CloseIcon;
    case IconsOptions.Trash:
      return TrashIcon;
    case IconsOptions.TrashFilled:
      return TrashFilledIcon;
    default:
      return TrashIcon;
  }
};

const Icon : React.FC<ISvgIcon> = (params : ISvgIcon) => {
  const { icon, ...props } = params;
  const Component = SwitchIcon(icon);
  return <Component {...props} />;
};
const SvgIcon : React.FC<ISvgIcon> = (props:ISvg) => (
  <Icon {...props} />
);

export default SvgIcon;
