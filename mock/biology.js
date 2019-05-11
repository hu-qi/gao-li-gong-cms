const biology = [
  '天行长臂猿',
  '大熊猫',
  '白眉长臂猿',
  '滇金丝猴',
  '大狮子',
  '小熊猫',
  '懒猴',
  '黑叶猴',
  '灰叶猴',
  '红面猴',
  '云豹',
  '金猫',
  '灵猫',
  '白尾梢红雉',
  '红腹角雉',
  '白鹇',
  '金鸡',
  '白腹锦鸡',
  '红腹锦鸡',
  '绿孔雀',
  '太阳鸟',
];

const species = [
  '鸟类',
  '动物',
  '植物',
  '爬行类',
];

const desc = [
  '高黎贡山属青藏高原南部，横断山脉西部断块带，印度板块和欧亚板块相碰撞及板块俯冲的缝合线地带，是著名的深大断裂纵谷区',
  '高黎贡山素有：“世界物种基因库”、“世界自然博物馆”、“生命的避难所”、“野生动物的乐园”、“哺乳类动物祖先的发源地”、“东亚植物区系的摇篮”、“人类的双面书架”的美称。',
  '高黎贡山被称为“世界自然博物馆”和“世界物种基因库”。“植物活化石”桫椤撑起一片天地，延续着恐龙的“绿色梦”；“世界杜鹃花王”，最古老的一棵树龄达280多年，整棵花树占地500平方米。高黎贡山有扭角羚、蜂猴、绿孔雀、白眉长臂猿、孟加拉虎等20多种国家一级保护动物在这里生息繁衍，还被誉为 “野生动物的乐园”。',
  '白尾梢红雉、红腹角雉、白鹇、金鸡、白腹锦鸡、红腹锦鸡、绿孔雀、太阳鸟和种类繁多的画眉等等。高黎贡山有兽类154种，鸟类419种，两栖动物21种，爬行型类动物56种，鱼类49种，昆虫1690种，其中国家一级保护动物18种、国家二级保护动物49种，省级重点保护动物5种。如孟加拉虎、羚牛、白眉长臂猿、白尾梢虹雉、小熊猫等',
  '北南延伸的横断山脉，动物学家把它称之为南北动物区的走廊。被誉为“哺乳动物祖先分化”的发源地。保护区内生活着各种野生动物，属国家保护的野生动物就有30种。与大熊猫和滇金丝猴享有同样声誉的羚牛，是高黎贡山的古原生动物。还有长臂猿、懒猴、黑叶猴、灰叶猴、熊猴、红面猴、黑麝、云豹、金猫、灵猫等。',
  '高黎贡山在当地历来是一座神山，有许多名刹古寺，如斋公房，天台寺、宝华寺、丹阳寺、古城寺、诸佛寺、观音寺等。在保护区及其周边地区有许多文物，至今为止当地人都在使用，如怒江双虹桥、黄竹河石拱桥、江苴古镇、野猪箐木桥等',
];

const covers = [
  'http://special.yunnan.cn/2008page/ynjjrb/images/attachement/jpg/site2/20170520/8c89a592ca791a8a524e06.jpg',
  'http://5b0988e595225.cdn.sohucs.com/images/20171211/a19ccf95b31f4b9faad1711dae5c40e3.jpeg',
  'http://img0.imgtn.bdimg.com/it/u=2437495304,4172239910&fm=26&gp=0.jpg',
  'http://img4.imgtn.bdimg.com/it/u=245590670,2948369450&fm=15&gp=0.jpg',
  'http://img2.imgtn.bdimg.com/it/u=3116104990,3964817330&fm=26&gp=0.jpg',
  'http://dimg04.c-ctrip.com/images/300a0a00000050lop0494.jpg',
  'http://tpic.home.news.cn/xhForum/xhdisk002/M00/38/BF/wKhJDFwGCEcEAAAAAAAAAAAAAAA149.jpg',
  'http://www.kunming.cn/attachement/jpg/site22/20171212/eca86b6b05bc1b996a3f35.jpg',
];

const user = [
  '高黎贡',
  '林中鸣',
  '驴哥',
  '悟空',
  '大师兄',
  '高黎',
  '高贡山',
  '自然保',
];

const avatars = [
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
  'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
];

const BiologyCount = biology.length,
  SpeciesCount = species.length,
  DescCount = desc.length,
  CoversCount = covers.length,
  AvatarCount = avatars.length,
  UserCount = user.length;

function fakeList(count = 0) {
  const list = [];

  for (; count --; ) {
    list.push({
      id: `${1000 + count}`,
      name: biology[count % BiologyCount],
      species: species[count % SpeciesCount],
      subDesc: desc[count % DescCount],
      cover: covers[count % CoversCount],
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * count),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * count),
      members: new Array(Math.ceil(Math.random() * 10 % 3)).fill().map(() => ({
        avatar: avatars[Number.parseInt(Math.random() * 10, 10) % AvatarCount],
        name: user[Number.parseInt(Math.random() * 10, 10) % UserCount],
        id: (100 + Number.parseInt(Math.random() * 10, 10)).toString(),
      })),
    });
  }

  return list;
}

export default {
  'GET /api/queryBiologyList':  (req, res) => {
    const resData = [];

    resData.push(...fakeList(Number.parseInt(Math.random() * 20, 10) + 5));

    res.send(resData);
  },
};
