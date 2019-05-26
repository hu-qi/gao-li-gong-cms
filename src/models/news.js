import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getNews, deleteNews, addNews, changeNews } from '@/services/api';

export default {
  namespace: 'news',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getNews, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        const responseData = response.data.dateList;
        yield put({
          type: 'queryList',
          payload: {
            list: responseData,
            pagination: {
              current: payload.page,
              pageSize: payload.size,
              total: response.data.total
            }
          }
        });
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteNews, payload);
      let { pagination } = payload;
      const { list } = payload;
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success("删除成功");
        debugger;
        if (list.length === 1) {
          pagination.current = pagination.current > 1 ? pagination.current-- : 1;
        }
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            size: pagination.pageSize
          },
        });
      }
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addNews, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success('提交成功');
        yield put(routerRedux.push('/news'));
      }
    },
    *modify({ payload }, { call, put }) {
      const response = yield call(changeNews, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        message.success('修改成功');
        yield put(routerRedux.push('/news'));
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
