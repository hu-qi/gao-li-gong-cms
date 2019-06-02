import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getPartners, getPartnerById, deletePartner, addPartner, changePartner } from '@/services/api';

export default {
  namespace: 'partner',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getPartners, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        const data = response.data;
        yield put({
          type: 'queryList',
          payload: Array.isArray(data) ? data : [],
        });
      }
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getPartnerById, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        yield put({
          type: 'queryPartner',
          payload: response.data
        });
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deletePartner, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success("删除成功");
        yield put({
          type: 'fetch'
        });
      }
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addPartner, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success('提交成功');
        yield put(routerRedux.push('/home/partner'));
      }
    },
    *modify({ payload }, { call, put }) {
      const response = yield call(changePartner, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success('修改成功');
        yield put(routerRedux.push('/home/partner'));
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    queryPartner(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};