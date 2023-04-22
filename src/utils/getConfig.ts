import { ConfigType } from '@/types/config';
import { readJson } from '@/utils';

export const getConfig = () => {
  const config = readJson<ConfigType>('rsc.config.json');
  return config;
};
