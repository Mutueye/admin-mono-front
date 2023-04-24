import { defineStore } from 'pinia';
import axios from 'axios';

// 首页类型： 默认 / 高校专属 / 区域专属
type HomeType = '' | 'school' | 'area';

interface AppConfig {
  /** 大数据地址 */
  BIGDATA?: string;
  /** 学校编码 */
  CODE?: string;
  /** 竞赛平台地址 */
  COMPETITION?: string;
  /** 考试系统地址 */
  EXAM?: string;
  /** 毕设平台地址 */
  GRAD?: string;
  /** 当前系统名称 */
  NAME?: string;
  /** 优加就业企业端地址 */
  OUREA_HR?: string;
  /** 优加就业学生端地址 */
  OUREA_STUDENT?: string;
  /** 用户中心地址 */
  QUC?: string;
  /** 首页类型：SAAS版为空; 'school': 高校首页, 'area': 区域专属首页 */
  TYPE?: HomeType;
  /** U+首页 */
  UPLUS?: string;
  /** U+课程 */
  UPLUS_TEACHER?: string;
  /** 高校首页模块列表，带顺序 */
  HOME_PAGE_MODULES?: string;
  [T: string]: any;
}

const dev_config: AppConfig = {
  QUC: 'https://uc.qstcloud.net',
  OUREA_HR: 'https://hr.qstcloud.net',
  OUREA_STUDENT: 'https://jiuye.qstcloud.net',
  EXAM: 'https://tev-exam.qstcloud.net',
  GRAD: 'https://tev-grad.qstcloud.net',
  UPLUS: 'https://uea.qstcloud.net',
  COMPETITION: 'https://tev-competition.qstcloud.net',
  UPLUS_TEACHER: 'http://tev-course.qstcloud.net',
  BIGDATA: 'https://tev-bd.qstcloud.net',
  CODE: 'qstcloud',
  TYPE: '',
  HOME_PAGE_MODULES: 'PROJECT,INTERN_PROJECT,COURSE,CAREER_COURSE',
};

interface AppConfigState {
  config: AppConfig;
}

export const useAppConfigStore = defineStore('appConfig', {
  state: (): AppConfigState => {
    return {
      config: {},
    };
  },
  actions: {
    getAppConfig() {
      return axios
        .get<AppConfig>('/get_appconfig?r=' + Math.random())
        .then((res) => {
          console.log('res::::', res);
        })
        .catch((err) => {
          document.write(err, '获取配置失败！请检查 nginx 配置');
        });
    },
  },
});
