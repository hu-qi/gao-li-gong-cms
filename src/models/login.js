import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, accountLogin } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    currentUser: {},
  },

  effects: {
    *fakeLogin({ payload }, { call, put }) {
      const { userName: name, password } = payload;
      const {
        data: { dateList = [] },
      } = yield call(fakeAccountLogin, { name, page: 1, size: 100 });

      const user = dateList.find(({ mail, phone, wechatId }) => {
        return mail === password || phone === password || wechatId === password;
      });

      const response = {
        status: user ? 'ok' : 'error',
        type: 'account',
        currentAuthority: user ? 'admin' : 'guest',
        user,
      };

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *login({payload}, {call, put}) {
      const response = yield call(accountLogin, payload);
      if (response.isError) {
        message.error(response.error.message);
      } else {
        yield put({
          type: 'loginStatus',
          payload: response.data
        });
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }

      callback(response.data);
    },
    *logout(_, { put }) {
      yield put({
        type: 'loginStatus',
        payload: {},
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
    // *logout(_, { put }) {
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: {
    //       status: false,
    //       currentAuthority: 'guest',
    //     },
    //   });
    //   reloadAuthorized();
    //   // redirect
    //   if (window.location.pathname !== '/user/login') {
    //     yield put(
    //       routerRedux.replace({
    //         pathname: '/user/login',
    //         search: stringify({
    //           redirect: window.location.href,
    //         }),
    //       })
    //     );
    //   }

    // },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        currentUser: payload.user,
      };
    },
    loginStatus(state, action) {
      let _user = "admin";
      let token = action.payload.token
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token")
      }
      // setAuthority(_user);//设置权限  
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
