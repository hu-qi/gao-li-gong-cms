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
      size: 20,
    },
    biology: {
      name: '',
      brief: '',
      content: '',
      imgUrl: JSON.stringify([]),
      thumbnails: [],
      labels: [],
      speciesId: 0,
    },
    species: [],
    tags: [],
    search: {
      name: '',
      speciesId: null,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data: { dateList: list = [], total } = {} } = yield call(queryBiologyList, payload);

      yield put({
        type: 'queryList',
        payload: {
          list,
          total,
          ...payload,
        },
      });
    },

    *fetchBiologyById({ payload, callback = () => void 0 }, { call, put }) {
      const { data = {} } = yield call(getBiologyById, payload);

      yield put({
        type: 'setBiology',
        payload: data,
      });

      callback(data);
    },

    *remove({ payload, callback = () => void 0 }, { call, put }) {
      yield call(delBilology, payload);
      yield put({
        type: 'fetch',
        payload,
      });

      callback();
    },

    *fetchSpecies({ payload, callback = () => void 0 }, { call, put }) {
      const { data = [] } = yield call(getSpecies, payload);

      yield put({
        type: 'setSpecies',
        payload: data,
      });

      callback();
    },

    *fetchLabelList({ payload, callback = () => void 0 }, { call, put }) {
      const { data: { dateList = [] } = {} } = yield call(queryLabelList, payload);

      yield put({
        type: 'setTags',
        payload: dateList,
      });

      callback(dateList);
    },

    *updateBiology({ payload, callback = () => void 0 }, { call, put }) {
      yield call(putBilology, payload);

      callback();
    },

    *addBiology({ payload, callback = () => void 0 }, { call, put }) {
      yield call(postBiology, payload);

      callback();
    },
  },

  reducers: {
    queryList(state, action) {
      const { list, total, page, size, name, speciesId } = action.payload;

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

    initBiology(state, action) {
      return {
        ...state,
        biology: action.payload,
      };
    },
  },
};
