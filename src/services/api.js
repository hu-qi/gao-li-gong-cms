import { stringify } from 'qs';
import { extend } from 'umi-request';
import request from '@/utils/request';
import { debug } from 'util';
extend({
  mode: 'no-cors',
});

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getNews(params) {
  return request(`/api/news?page=${params.page}&size=${params.size}`);
}

export async function getNewsById(params) {
  return request(`/api/news/${params.id}`);
}

export async function deleteNews(params) {
  return request(`/api/news/${params.id}`, { method: 'DELETE' });
}

export async function changeNews(params) {
  return request(`/api/news/${params.id}`, {
    method: 'PUT',
    data: params
  });
}

export async function addNews(params) {
  return request(`/api/news`, {
    method: 'POST',
    data: params,
  });
}

export async function getFakeVideos() {
  return request(`/api/fake_videos`);
}

export async function deleteFakeVideos(params) {
  return request(`/api/delete_videos?${stringify(params)}`);
}

export async function getFakeSliders() {
  return request(`/api/fake_sliders`);
}

export async function deleteFakeSliders(params) {
  return request(`/api/delete_sliders?${stringify(params)}`);
}

export async function getPartners() {
  return request(`/api/partners/list`);
}

export async function getPartnerById(params) {
  return request(`/api/partner/${params.id}`);
}

export async function deletePartner(params) {
  return request(`/api/partner/${params.id}`, { method: 'DELETE' });
}

export async function addPartner(params) {
  return request(`/api/partner`, {
    method: 'POST',
    data: params,
  });
}

export async function changePartner(params) {
  return request(`/api/partner/${params.id}`, {
    method: 'PUT',
    data: params
  });
}

export async function getTimelines() {
  return request(`/api/timeline`);
}

export async function getTimelineById(params) {
  return request(`/api/timeline/${params.id}`);
}

export async function deleteTimeline(params) {
  return request(`/api/timeline/${params.id}`, { method: 'DELETE' });
}

export async function addTimeline(params) {
  return request(`/api/timeline`, {
    method: 'POST',
    data: params,
  });
}

export async function changeTimeline(params) {
  return request(`/api/timeline/${params.id}`, {
    method: 'PUT',
    data: params
  });
}



export async function getClassify() {
  return request(`/api/getClassify`);
}

export async function getStarAnimals() {
  return request(`/api/starAnimals`);
}

export async function getStarAnimalByName(name) {
  return request(`/api/starAnimals/${name}`);
}


/**
 * 获取用户列表信息, 同时支持nickname和姓名的模糊查询
 * @param params
 * @returns {Promise<void>}
 */
export async function userList(params) {
  return request(`/api/users/list?${stringify(params)}`);
}

/**
 * 新增用户
 * @param params
 * @returns {Promise<void>}
 */
export async function userPost(params) {
  return request(`/api/users`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改用户
 * @param params
 * @returns {Promise<void>}
 */
export async function userPut(params) {
  return request(`/api/users/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 删除用户
 * @param params
 * @returns {Promise<void>}
 */
export async function userDelete(params) {
  return request(`/api/users/${params.id}`, {
    method: 'DELETE',
  });
}

/**
 * 生物多样性 列表查
 * @param params
 * @returns {Promise<void>}
 */
export async function queryBiologyList(params) {
  return request(`/api/biodiversity/list?${stringify(params)}`);
}

/**
 * 生物多样性 个体查
 * @param params
 * @returns {Promise<void>}
 */
export async function getBiologyById({id}) {
  return request(`/api/biodiversity/${id}`);
}

/**
 * 标签查
 * @param params { name, type, page, size }
 * @returns {Promise<void>}
 */
export async function queryLabelList(params) {
  return request(`/api/label/list?${stringify(params)}`);
}

/**
 * 标签 增
 * @param params
 * @returns {Promise<void>}
 */
export async function postLabel(params) {
  return request(`/api/label`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 标签 删
 * @param id
 * @returns {Promise<void>}
 */
export async function delLabel({ id }) {
  return request(`/api/label/${id}`);
}

/**
 * 标签 改
 * @param params
 * @returns {Promise<void>}
 */
export async function putLabel(params) {
  return request(`/api/label`, {
    method: 'PUT',
    data: params,
  });
}

