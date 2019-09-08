import pathToRegexp from 'path-to-regexp';
import { getStarAnimalByName, getStarAnimals, setStarAnimals } from '../../../services/api';

export default {
  namespace: 'starAnimals',

  state: {
    animals: [],
    currentAnimal: null,
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
      const { data: animals = [] } = yield call(getStarAnimals);

      yield put({
        type: 'save',
        payload: {
          animals,
          currentAnimal: null,
        },
      });
    },

    *fetchAnimal({ payload }, { call, put }) {
      const { data: currentAnimal } = yield call(getStarAnimalByName, payload.name);

      yield put({
        type: 'save',
        payload: {
          currentAnimal,
        },
      });
    },

    *updateAnimal({ payload, callback = () => void 0 }, { call, put }) {
      yield call(setStarAnimals, payload);

      yield put({
        type: 'save',
        payload,
      });

      callback();
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(location => {
        const matchStarAnimalEdit = pathToRegexp('/starAnimals/edit/:name').exec(location.pathname);
        const matchStarAnimals = pathToRegexp('/starAnimals').exec(location.pathname);

        if (matchStarAnimalEdit) {
          dispatch({
            type: 'fetchAnimal',
            payload: {
              name: matchStarAnimalEdit[1],
            },
          });
        } else if (matchStarAnimals) {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};
