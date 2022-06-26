import { isMainnet } from '@/config/constants';

type LoggerType = 'log' | 'warn' | 'error';

interface LoggerProps {
  module: string;
  msg: string;
  type?: LoggerType;
}

export const logger = ({ module, msg, type = 'log' }: LoggerProps) => {
  if (!isMainnet) {
    console[type](`${module}: ${msg}`);
  }
};
