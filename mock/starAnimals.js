import pathToRegexp from 'path-to-regexp';
import qs from 'querystring';

const starAnimals = [
  {
    name: '天行长臂猿',
    imgUrl:
      '//gw.alicdn.com/bao/uploaded/i2/725677994/TB2Eho9c7voK1RjSZFwXXciCFXa_!!725677994-0-sm.jpg',
  },
  {
    name: '怒江金丝猴',
    imgUrl:
      '//gw.alicdn.com/bao/uploaded/i2/725677994/TB2Eho9c7voK1RjSZFwXXciCFXa_!!725677994-0-sm.jpg',
  },
  {
    name: '迪迦奥特曼',
    imgUrl:
      '//gw.alicdn.com/bao/uploaded/i2/725677994/TB2Eho9c7voK1RjSZFwXXciCFXa_!!725677994-0-sm.jpg',
  },
  {
    name: '东北大拉皮',
    imgUrl:
      '//gw.alicdn.com/bao/uploaded/i2/725677994/TB2Eho9c7voK1RjSZFwXXciCFXa_!!725677994-0-sm.jpg',
  },
];

export default {
  'GET /api/starAnimals': (req, res) => {
    res.send(starAnimals);
  },

  'GET /api/starAnimals/:name': (req, res) => {
    const match = pathToRegexp('/api/starAnimals/:name').exec(req.url);
    if (!match) {
      throw new Error(`path not match`);
    }

    res.send({
      name: qs.unescape(match[1]),
    });
  },
};
