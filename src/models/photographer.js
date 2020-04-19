import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  getPhotographers,
  getPhotographerById,
  deletePhotographer,
  addPhotographer,
  changePhotographer,
} from '@/services/api';

export default {
  namespace: 'photographer',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getPhotographers, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        const data = response.data;
        yield put({
          type: 'queryList',
          payload: Array.isArray(data) ? data : [],
        });
      }
    },
    *get({ payload, callback = () => void 0 }, { call, put }) {
      const response = yield call(getPhotographerById, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        yield put({
          type: 'queryPhotographer',
          payload: response.data,
        });
        callback(response.data);
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deletePhotographer, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success('删除成功');
        yield put({
          type: 'fetch',
        });
      }
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addPhotographer, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success('提交成功');
        yield put(routerRedux.push('/home/photographer'));
      }
    },
    *modify({ payload }, { call, put }) {
      const response = yield call(changePhotographer, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success('修改成功');
        yield put(routerRedux.push('/home/photographer'));
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    queryPhotographer(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
