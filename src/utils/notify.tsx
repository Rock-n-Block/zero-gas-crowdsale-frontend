import { ReactText } from 'react';
import { toast, ToastContent, ToastOptions, UpdateOptions } from 'react-toastify';

import { ErrorIcon, InfoIcon, Loader, SuccessIcon, WarningIcon } from '@/assets/img';

export const notify = {
  info: (content: ToastContent, options?: ToastOptions) =>
    toast.info(content, { icon: <InfoIcon />, ...options }),
  error: (content: ToastContent, options?: ToastOptions) =>
    toast.error(content, { icon: <ErrorIcon />, ...options }),
  success: (content: ToastContent, options?: ToastOptions) =>
    toast.success(content, { icon: <SuccessIcon />, ...options }),
  warn: (content: ToastContent, options?: ToastOptions) =>
    toast.warn(content, { icon: <WarningIcon />, ...options }),
  loading: (content: ToastContent, options?: ToastOptions) =>
    toast.loading(content, { icon: <Loader />, ...options }),
  update: (toastId: ReactText, options?: UpdateOptions) => toast.update(toastId, options),
};
