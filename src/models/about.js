import { getAboutUs, setAboutUs } from '@/services/api';

export default {
  namespace: 'aboutUs',

  state: {
    content: '',
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  effects: {
    *fetch(action, { call, put }) {
      const { data: content = '' } = yield call(getAboutUs);

      yield put({
        type: 'save',
        payload: { content },
      });
    },

    *update({ payload: content }, { call, put }) {
      const {} = yield call(setAboutUs, content);

      yield put({
        type: 'save',
        payload: { content },
      });
    }
  },
};
