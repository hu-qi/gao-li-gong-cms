import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getTimelines, getTimelineById, deleteTimeline, addTimeline, changeTimeline } from '@/services/api';

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
    *get({ payload, callback = () => void 0}, { call, put }) {
      const response = yield call(getTimelineById, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        yield put({
          type: 'queryTimeline',
          payload: response.data
        });

        callback(response.data);
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteTimeline, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success("删除成功");
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
    *modify({ payload }, { call, put }) {
      const response = yield call(changeTimeline, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success('修改成功');
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
    queryTimeline(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
