import { userList, userPost, userPut, userDelete  } from '@/services/api';

export default {
  namespace: 'account',

  state: {
    list: [],
    pagination: {  },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const {
        data: { dateList: list = [], total} = {},
      } = yield call(userList, payload);

      yield put({
        type: 'save',
        payload: { list, ...payload, total },
      });
    },

    *post({ payload, callback }, { call, put }) {
      const response = yield call(userPost, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    *delete({ payload, callback }, { call, put }) {
      const response = yield call(userDelete, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    *put({ payload, callback }, { call, put }) {
      const response = yield call(userPut, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, { payload: { list, ...pagination }}) {
      return {
        list,
        pagination,
      };
    },
  },
};
