'use client';

import type { FC } from 'react';

import { ParamProps } from '@/types/appNode';

const BrowserInstanceParam: FC<ParamProps> = ({ param }) => {
  return <p className="text-xs">{param.name}</p>;
};

export default BrowserInstanceParam;