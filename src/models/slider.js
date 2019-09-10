import { getFakeSliders, deleteFakeSliders, addRollimages, getRollimages, updateRollimages } from '@/services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'slider',

  state: {
    list: [],
    detail: null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data: list = [] } = yield call(getFakeSliders, payload);
      yield put({
        type: 'save',
        payload: { list },
      });
    },
    *delete({ payload }, { call, put }) {
      yield call(deleteFakeSliders, payload);
      yield put({
        type: 'fetch',
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
      const { data: detail = {} } = yield call(getRollimages, payload);
      yield put({
        type: 'save',
        payload: { detail },
      });
      callback(detail);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
