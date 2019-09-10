import { getFakeSliders, deleteFakeSliders, addRollimages, getRollimages, updateRollimages } from '@/services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'slider',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getFakeSliders, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteFakeSliders, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *addRollimages({ payload }, { call, put }) {
      yield call(addRollimages, payload);
      yield put(routerRedux.push('/home/slider'));
    },
    *updateRollimages({ payload }, { call, put }) {
      yield call(updateRollimages, payload);
      yield put(routerRedux.push('/home/slider'));
    },
    *getRollimages({ payload, callback = () => void 0 }, { call, put }) {
      const resp = yield call(getRollimages, payload);
      yield put();
      callback(resp.data);
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
