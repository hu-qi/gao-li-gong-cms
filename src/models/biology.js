import {
  queryBiologyList,
  getBiologyById,
  delBilology,
  getSpecies,
  queryLabelList,
  postBiology,
  putBilology,
} from '@/services/api';

export default {
  namespace: 'biology',

  state: {
    list: [],
    pagination: {
      total: 0,
      page: 1,
      size: 115,
    },
    biology: {
      name: '',
      brief: '',
      content: '',
      imgUrl: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj5h7C7vofjAhUV3o8KHWV6DigQjRx6BAgBEAU&url=https%3A%2F%2Fwww.mlar.org%2F&psig=AOvVaw2n4Uc4FiRZE0FsrmtW-wak&ust=1561650195989783',
      thumbnails: [],
      labels: [],
      speciesId: 3,
    },
    species: [],
    tags: [],
    search: {
      name: '',
      speciesId: null,
    }
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const {
        data: { dateList: list = [], total } = {},
      } = yield call(queryBiologyList, payload);

      yield put({
        type: 'queryList',
        payload: {
          list,
          total,
          ...payload,
        },
      });
    },

    * fetchBiologyById({ payload }, { call, put }) {
      const { data } = yield call(getBiologyById, payload);

      yield put({
        type: 'setBiology',
        payload: data,
      });
    },

    * remove({ payload, callback = () => void 0 }, { call, put }) {
      yield call(delBilology, payload);
      yield put({
        type: 'fetch',
        payload,
      });

      callback();
    },

    * fetchSpecies({ payload, callback = () => void 0 }, { call, put }) {
      const { data = [] } = yield call(getSpecies, payload);

      yield put({
        type: 'setSpecies',
        payload: data,
      });

      callback();
    },

    * fetchLabelList({ payload, callback = () => void 0 }, { call, put }) {
      const {
        data: { dateList = [] } = {},
      } = yield call(queryLabelList, payload);

      yield put({
        type: 'setTags',
        payload: dateList,
      });

      callback();
    },

    * updateBiology({ payload, callback = () => void 0 }, { call, put }) {
      yield call(putBilology, payload);
      yield put();

      callback();
    },

    * addBiology({ payload, callback = () => void 0 }, { call, put }) {
      yield call(postBiology, payload);
      yield put();

      callback();
    }
  },

  reducers: {
    queryList(state, action) {
      const {
        list,
        total,
        page,
        size,
        name,
        speciesId,
      } = action.payload;

      return {
        ...state,
        list,
        search: {
          name,
          speciesId,
        },
        pagination: {
          total,
          page,
          size,
        },
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },

    setBiology(state, action) {
      return {
        ...state,
        biology: action.payload,
      };
    },

    setSpecies(state, action) {
      return {
        ...state,
        species: action.payload,
      };
    },

    setTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};
