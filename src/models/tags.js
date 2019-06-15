import { queryLabelList, postLabel, delLabel, putLabel  } from '@/services/api';

export default {
  namespace: 'tags',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload, callback = () => void 0 }, { call, put }) {
      const {
        data: { dateList: list = [] } = {},
      } = yield call(queryLabelList, payload);

      yield put({
        type: 'queryList',
        payload: list,
      });

      callback();
    },

    *add({ payload, callback = () => void 0 }, { call, put }) {
      yield call(postLabel, payload);
      yield put();

      callback();
    },

    *remove({ payload, callback = () => void 0 }, { call, put }) {
      yield call(delLabel, payload);
      yield put();

      callback();
    },

    *update({ payload, callback = () => void 0 }, { call, put }) {
      yield call(putLabel, payload);
      yield put();

      callback();
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
