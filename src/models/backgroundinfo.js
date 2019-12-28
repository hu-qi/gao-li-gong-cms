import { getBackgroundInfo, updateBackgroundInfo } from '@/services/api';

export default {
  namespace: 'backgroundInfo',

  state: {
    mainImageUrl: '[]',
    description: '',
    children: [],
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
  },

  reducers: {
    setBackgroundInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
