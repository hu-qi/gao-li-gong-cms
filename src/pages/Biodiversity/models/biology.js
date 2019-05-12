import { queryBiologyList, getBiologyById, getClassify } from '@/services/api';

export default {
  namespace: 'biology',

  state: {
    data: {
      list: [],
      pagination: {},
      biology: {},
      classify: {},
    } ,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBiologyList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },

    *fetchBiologyById({ payload }, { call, put }) {
      const response = yield call(getBiologyById, payload);
      yield put({
        type: 'getBiologyById',
        payload: response,
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
