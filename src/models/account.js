import { userList, userById, userPost, userPut, userDelete  } from '@/services/api';

export default {
  namespace: 'account',

  state: {
    list: [],
    pagination: {
      page: 1,
      size: 20,
      total: 0,
    },
    account: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const {
        data: {
          dateList: list = [],
          total = 0
        } = {},
      } = yield call(userList, payload);
      const pagination = {
        total,
        page: payload.page,
        size: payload.size,
      };

      yield put({
        type: 'save',
        payload: {
          list,
          pagination,
          ...payload,
        },
      });
    },

    *fetchById({ payload, callback }, { call, put }) {
      const { data: account } = yield call(userById, payload);

      yield put({
        type: 'saveAccount',
        payload: { account },
      });

      if (callback) { callback(account); }
    },

    *post({ payload, callback }, { call, put }) {
      yield call(userPost, payload);

      yield put({
        type: 'saveAccount',
        payload,
      });

      if (callback) { callback(); }
    },

    *delete({ payload, callback }, { call, put }) {
      const response = yield call(userDelete, payload);

      if (callback) { callback(response); }
    },

    *put({ payload, callback }, { call, put }) {
      const response = yield call(userPut, payload);

      yield put({
        type: 'saveAccount',
        payload: response,
      });
      if (callback) { callback(response); }
    },
  },

  reducers: {
    save(state, {
      payload: {
        list,
        pagination,
      }
    }) {
      return {
        ...state,
        list,
        pagination,
      };
    },

    saveAccount(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
};
