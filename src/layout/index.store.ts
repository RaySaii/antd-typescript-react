import {computed, action, observable, useStrict} from 'mobx';
useStrict(true);
interface Store {
    collapsed: boolean;
    preMenu: any[];
    loginOut(): void;
    toggleCollapsed(): void;
}
class LayoutStore implements Store {
    @observable private $preMenu = [
        {
            key: 'dashboard',
            name: '仪表盘',
            icon: 'laptop',
        },
        {
            key: 'users',
            name: '用户管理',
            icon: 'user',
        },
        {
            key: 'table',
            name: '数据表格',
            icon: 'database'
        },
        {
            key: 'form',
            name: '表单验证',
            icon: 'bars'
        },
        {
            key: 'chart',
            name: '图表',
            icon: 'bar-chart'
        },
        {
            key: 'ui',
            name: 'UI组件',
            icon: 'camera-o',
            clickable: false,
            child: [
                {
                    key: 'ico',
                    name: 'Ico 图标',
                },
                {
                    key: 'search',
                    name: 'Search 搜索',
                },
                {
                    key: 'dropOption',
                    name: 'DropOption 下拉操作',
                },
                {
                    key: 'layer',
                    name: 'Layer 弹层',
                },
            ],
        },
        {
            key: 'navigation',
            name: '测试导航',
            icon: 'setting',
            child: [
                {
                    key: 'navigation1',
                    name: '二级导航1',
                },
                {
                    key: 'navigation2',
                    name: '二级导航2',
                    child: [
                        {
                            key: 'navigation21',
                            name: '三级导航1',
                        },
                        {
                            key: 'navigation22',
                            name: '三级导航2',
                        },
                    ],
                },
            ],
        },
    ]
    @observable private $collapsed = false;

    @computed
    get collapsed() {
        return this.$collapsed;
    }

    @computed
    get preMenu() {
        return this.$preMenu;
    }

    @action.bound
    toggleCollapsed() {
        this.$collapsed = !this.$collapsed;
    }

    @action.bound
    loginOut() {

    }
}
export default new LayoutStore();
