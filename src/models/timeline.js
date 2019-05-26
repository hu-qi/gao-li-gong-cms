import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getTimelines, deleteTimeline, addTimeline } from '@/services/api';

export default {
  namespace: 'timeline',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getTimelines, payload);
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
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteTimeline, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        yield put({
          type: 'fetch'
        });
      }
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addTimeline, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success('提交成功');
        yield put(routerRedux.push('/timeline'));
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
  },
};
