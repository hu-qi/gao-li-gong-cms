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
      {
        path: '/',
        redirect: '/home',
      },
      // 首页管理
      {
        name: 'index',
        icon: 'home',
        path: '/home',
        routes: [
          {
            path: '/home',
            redirect: '/home/slider',
          },
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
          {
            path: '/home/photographer',
            name: 'photographer',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/home/photographer',
                component: './Home/Photographer',
              },
              {
                path: '/home/photographer/photographer-add',
                name: 'photographer-add',
                component: './Home/PhotographerEdit',
              },
              {
                path: '/home/photographer/photographer-edit/id/:id',
                name: 'photographer-edit',
                component: './Home/PhotographerEdit',
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
        component: './Account/index',
      },
      {
        path: '/account/:id',
        component: './Account/UserInfo',
        hideInMenu: true,
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
      // 高黎贡山介绍
      {
        name: 'backgroundInfo',
        icon: 'exception',
        path: '/background-info',
        routes: [
          {
            path: '/background-info',
            redirect: '/background-info/overview',
          },
          {
            path: '/background-info/overview',
            name: 'overview',
            component: './BackgroundInfo/overview',
          },
          {
            hideInMenu: true,
            path: '/background-info/name/:name',
            // name: 'elementedit',
            component: './BackgroundInfo/EleEdit',
          },
          // 先隐藏，/api/background-info/{name} 这个接口目前有问题
          {
            hideInMenu: true,
            path: '/background-info/group',
            name: 'group',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/background-info/group',
                component: './BackgroundInfo/Group',
              },
              {
                path: '/background-info/group/:name',
                component: './BackgroundInfo/GroupEdit',
              },
            ],
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
        component: './About-us/index',
      },
      {
        component: '404',
      },
    ],
  },
];
