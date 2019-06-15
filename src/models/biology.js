import { queryBiologyList, getBiologyById, getClassify } from '@/services/api';

export default {
  namespace: 'biology',

  state: {
    list: [],
    pagination: {},
    biology: {},
    classify: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const {
        data: { dateList: list = [], total} = {},
      } = yield call(queryBiologyList, payload);

      yield put({
        type: 'queryList',
        payload: list,
      });
    },

    *fetchBiologyById({ payload }, { call, put }) {
      const { data } = yield call(getBiologyById, payload);

      yield put({
        type: 'getBiologyById',
        payload: data,
      });
    },

    *fetchClassify({ payload }, { call, put }) {
      const response = yield call(getClassify, payload);
      yield put({
        type: 'getClassify',
        payload: response,
      });
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },

    getBiologyById(state, action) {
      return {
        ...state,
        biology: action.payload,
      };
    },

    getClassify(state, action) {
      return {
        ...state,
        classify: action.payload,
      };
    },
  },
};
