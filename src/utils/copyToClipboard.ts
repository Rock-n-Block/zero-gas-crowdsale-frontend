import { notify } from './notify';

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
  notify.success('Copied');
};
