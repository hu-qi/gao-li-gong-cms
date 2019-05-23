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
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteTimeline, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addTimeline, payload);
      debugger;
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
