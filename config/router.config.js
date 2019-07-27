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
    Routes: ['src/pages/Authorized'],
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
      // 账户管理
      {
        name: 'account',
        icon: 'usergroup-delete',
        path: '/account',
        component: './Account/User/TableList.tmp',
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
      // 生物多样性
      {
        name: 'biodiversity',
        icon: 'deployment-unit',
        path: '/biodiversity',
        component: './Biodiversity/index',
      },
      // 生物多样性-新建
      {
        path: '/biodiversity/:id',
        name: 'biology',
        hideInMenu: true,
        component: './Biodiversity/Biology',
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
        component: './About-us/index',
      },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      {
        component: '404',
      },
    ],
  },
];
