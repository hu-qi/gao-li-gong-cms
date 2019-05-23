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

export async function getFakeNews() {
  return request(`/api/fake_news`);
}

export async function deleteFakeNews(params) {
  return request(`/api/delete_news?${stringify(params)}`);
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

export async function getFakePartners() {
  return request(`/api/fake_partners`);
}

export async function deleteFakePartners(params) {
  return request(`/api/delete_partners?${stringify(params)}`);
}

export async function getTimelines() {
  return request(`/api/timeline`);
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

export async function queryBiologyList() {
  return request(`/api/queryBiologyList`);
}

export async function getBiologyById(params) {
  return request(`/api/getBiologyById`);
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
