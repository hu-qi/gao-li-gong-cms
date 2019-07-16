export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      // 首页管理
      {
        name: 'index',
        icon: 'home',
        path: '/home',
        routes: [
          {
            path: '/home/slider',
            name: 'slider',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/home/slider',
                component: './Home/Slider',
              },
              {
                path: '/home/slider/slider-add',
                name: 'slider-add',
                component: './Home/SliderEdit',
              },
              {
                path: '/home/slider/slider-edit/id/:id',
                name: 'slider-edit',
                component: './Home/SliderEdit',
              },
            ],
          },
          {
            path: '/home/partner',
            name: 'partner',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/home/partner',
                component: './Home/Partner',
              },
              {
                path: '/home/partner/partner-add',
                name: 'partner-add',
                component: './Home/PartnerEdit',
              },
              {
                path: '/home/partner/partner-edit/id/:id',
                name: 'partner-edit',
                component: './Home/PartnerEdit',
              },
            ],
          },
        ],
      },
      // 账户管理
      {
        name: 'account',
        icon: 'usergroup-delete',
        path: '/account',
        routes: [
          {
            path: '/account/list',
            name: 'list',
            component: './Account/User/TableList.tmp',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/account/new',
                name: 'new',
                // component: './Account/User/Create',
              },
              {
                path: '/account/preview',
                name: 'preview',
              },
            ],
          },
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      // 明星物种
      {
        name: 'starAnimals',
        icon: 'twitter',
        path: '/starAnimals',
        component: './StarAnimals',
        hideChildrenInMenu: true,
      },
      {
        path: '/starAnimals/edit/:name',
        component: './StarAnimals/edit',
        name: 'starAnimals',
        hideInMenu: true,
      },
      // 新闻管理
      {
        name: 'news',
        icon: 'read',
        path: '/news',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/news',
            redirect: '/news/news-list',
          },
          {
            path: '/news/news-list',
            component: './News/NewsList',
          },
          {
            path: '/news/news-add',
            name: 'news-add',
            component: './News/NewsEdit',
          },
          {
            path: '/news/news-edit/id/:id',
            name: 'news-edit',
            component: './News/NewsEdit',
          },
        ],
      },
      {
        name: 'biodiversity',
        icon: 'deployment-unit',
        path: '/biodiversity',
        component: './Biodiversity/index',
      },
      {
        path: '/biodiversity/:id',
        name: 'biology',
        hideInMenu: true,
        component: './Biodiversity/Biology',
      },
      // 时间线
      {
        name: 'timeline',
        icon: 'calendar',
        hideChildrenInMenu: true,
        path: '/timeline',
        routes: [
          {
            path: '/timeline',
            component: './Timeline/Timeline',
          },
          {
            path: '/timeline/timeline-add',
            name: 'timeline-add',
            component: './Timeline/TimelineEdit',
          },
          {
            path: '/timeline/timeline-edit/id/:id',
            name: 'timeline-edit',
            component: './Timeline/TimelineEdit',
          },
        ],
      },
      // 标签
      {
        name: 'labels',
        icon: 'tags',
        path: '/labels',
        component: './Tags/Index',
      },
      // 关于我们
      {
        name: 'aboutUs',
        icon: 'smile',
        path: '/about-us',
        component: './About-us/edit',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
