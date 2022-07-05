import { call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isMainnet } from '@/config/constants';
import { disconnectWalletState } from '../user/reducer';

import userSelector from '../user/selectors';

const client: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function* ajax<T = unknown>(
  config: AxiosRequestConfig,
): Generator<SelectEffect | CallEffect<T> | PutEffect, AxiosResponse> {
  // const accessToken = yield select(userSelector.getProp('key'));

  // if (accessToken) {
  //   client.defaults.headers.common.Authorization = `Token ${accessToken}`;
  // } else {
  //   client.defaults.headers.common.Authorization = '';
  // }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response: AxiosResponse<ApiResponse<T>> = yield call<
    (configVar: AxiosRequestConfig) => void
  >(client, config);

  // if (accessToken && response.status === 401) {
  //   yield put(disconnectWalletState());
  // }

  return response;
}
