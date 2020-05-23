import { getAboutUs, setAboutUs } from '@/services/api';

export default {
  namespace: 'aboutUs',

  state: {
    aboutUs: {
      nameLeft: '',
      nameRight: '',
      contentLeft: '',
      contentRight: '',
      description: '',
      logoLeft: '',
      logoRight: '',
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        aboutUs: action.payload,
      };
    },
  },

  effects: {
    *fetch({ payload, callback = () => void 0}, { call, put }) {
      const { data = {} } = yield call(getAboutUs, payload);

      yield put({
        type: 'save',
        payload: data,
      });
      callback(data);
    },

    *update({ payload, callback = () => void 0  }, { call, put }) {
      yield call(setAboutUs, payload)

      callback();
    }
  },
};
