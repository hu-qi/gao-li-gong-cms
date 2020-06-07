import { getBackgroundInfo, updateBackgroundInfo, getBackgroundInfoEle, updateBackgroundInfoEle } from '@/services/api';

export default {
  namespace: 'backgroundInfo',

  state: {
    // mainImageUrl: [],
    description: '',
    children: [],
    content: ''
  },

  effects: {
    *fetchBackgroundInfo({ payload, callback = () => void 0 }, { call, put }) {
      const { data } = yield call(getBackgroundInfo, payload);

      yield put({
        type: 'setBackgroundInfo',
        payload: data,
      });

      callback(data);
    },

    *updateBackgroundInfo({ payload, callback = () => void 0 }, { call }) {
      yield call(updateBackgroundInfo, payload);

      callback();
    },
    *fetchBackgroundInfoEle({ payload, callback = () => void 0 }, { call, put }) {
      const { data } = yield call(getBackgroundInfoEle, payload);

      yield put({
        type: 'setBackgroundInfoEle',
        payload: data,
      });

      callback(data);
    },

    *updateBackgroundInfoEle({ payload, callback = () => void 0 }, { call }) {
      yield call(updateBackgroundInfoEle, payload);

      callback();
    },
  },

  reducers: {
    setBackgroundInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setBackgroundInfoEle(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    }
  },
};
