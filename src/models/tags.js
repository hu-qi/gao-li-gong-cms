import { queryLabelList, postLabel, delLabel, putLabel, getSpecies, postSpecies  } from '@/services/api';

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
    *fetchSpecies({ payload, callback = () => void 0 }, { call, put }) {
      const { data = [] } = yield call(getSpecies, payload);

      yield put({
        type: 'setSpecies',
        payload: data,
      });

      callback();
    },

    *add({ payload, callback = () => void 0 }, { call, put }) {
      yield call(postLabel, payload);

      callback();
    },

    *remove({ payload, callback = () => void 0 }, { call, put }) {
      yield call(delLabel, payload);
      yield put({
        type: 'fetch',
        payload: { type: payload.type },
      });

      callback();
    },

    *update({ payload, callback = () => void 0 }, { call, put }) {
      yield call(putLabel, payload);
      yield put({
        type: 'fetch',
        payload: { type: payload.type },
      });

      callback();
    },
    *updateSpecies({ payload, callback = () => void 0}, {call, put}) {
      yield call(postSpecies, payload);
      yield put({
        type: 'fetchSpecies',
        payload: {type: payload.type}
      });

      callback();
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    setSpecies(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
