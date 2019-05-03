import { queryBiologyList } from '@/services/api';

export default {
  namespace: 'biology',

  state: {
    data: {
      list: [],
      pagination: {},
    } ,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBiologyList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
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
  },
};
