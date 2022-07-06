import copy from 'copy-to-clipboard';

import { notify } from './notify';

export const copyToClipboard = (value: string) => {
  copy(value, { format: 'text/plain', onCopy: () => notify.success('Copied') });
};
