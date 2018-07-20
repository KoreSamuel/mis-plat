/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

const menuData = [
  {
    name: '管理目录',
    icon: 'dashboard',
    path: 'menus',
  },
  {
    name: '管理页面',
    icon: 'book',
    path: 'pages',
  },
  {
    name: '管理页面模板',
    icon: 'gift',
    path: 'templates',
  },
];
const menus = [
  {
    name: '管理项目',
    icon: 'dashboard',
    path: ''
  }
]

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}
export const getMenuData = (location) => {
  const _menuData = location.pathname === '/' ? menus : menuData;
  return formatter(_menuData);
}
