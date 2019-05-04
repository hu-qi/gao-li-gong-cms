import mockjs from 'mockjs';

export default {
  'GET /api/queryBiologyList':  (req, res) => {
    const resData = [];

    for (let i = 8; i --; ) {
      resData.push(
        {
          id: `10011${i}`,
          title: '大蜘蛛',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
          // status: ['active', 'exception', 'normal'][i % 3],
          // percent: Math.ceil(Math.random() * 50) + 50,
          logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
          href: '/',
          updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
          createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
          subDescription: '那是一种内在的东西， 他们到达不了，也无法触及的, 那是一种内在的东西， 他们到达不了，也无法触及的',
          description:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
          activeUser: Math.ceil(Math.random() * 100000) + 100000,
          newUser: Math.ceil(Math.random() * 1000) + 1000,
          star: Math.ceil(Math.random() * 100) + 100,
          like: Math.ceil(Math.random() * 100) + 100,
          message: Math.ceil(Math.random() * 10) + 10,
          content:
            '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
          members: [
            {
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
              name: '曲丽丽',
              id: 'member1',
            },
            {
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
              name: '王昭君',
              id: 'member2',
            },
            {
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
              name: '董娜娜',
              id: 'member3',
            },
          ],
        }
      );
    }

    res.send(resData);
  },
};
