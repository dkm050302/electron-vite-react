export default {
  namespace: "app",
  state: {
    siderCollapsed: false,
    selectedKeys: ["home"],
    siderWidth: 200,
    openedTabs: [
      {
        key: "home",
        title: "首页",
        component: "home",
        suspend: false,
      },
    ],
    activeTabKey: "home",
  },
  reducers: {
    updateState(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    toggleSider(state: any) {
      return { ...state, siderCollapsed: !state.siderCollapsed };
    },
    setSelectedKeys(state: any, { payload }: any) {
      return { ...state, selectedKeys: payload };
    },
    updateSiderStatus(state: any, { payload }: any) {
      const siderCollapsed = !state.siderCollapsed;
      return {
        ...state,
        siderCollapsed,
        siderWidth: siderCollapsed ? 80 : 200,
      };
    },
    openTab(state: any, { payload }: any) {
      const { openedTabs, activeTabKey } = state;
      const { key, title } = payload;
      let newActiveTabKey = key;
      const newOpenedTabs = [...openedTabs];

      const newTab = {
        key,
        title: title || key,
        component: key,
        suspend: false,
      };

      // 检查是否已经存在该 tab
      if (openedTabs.some((tab: any) => tab.key === key)) {
        const tabs = openedTabs.map((item: any) => {
          if (item.key === key) {
            return {
              ...item,
              suspend: false,
            };
          }
          return item;
        });
        return {
          ...state,
          openedTabs: tabs,
          activeTabKey: key,
        };
      }

      // 添加新 tab
      const currentIndex = openedTabs.findIndex(
        (tab: any) => tab.key === activeTabKey
      );
      if (currentIndex !== -1) {
        newOpenedTabs.splice(currentIndex + 1, 0, newTab);
      } else {
        newOpenedTabs.push(newTab);
      }

      return {
        ...state,
        openedTabs: newOpenedTabs,
        activeTabKey: key,
      };
    },
    updateActiveTabKey(state: any, { payload }: any) {
      const { openedTabs } = state;
      const tabs = openedTabs.map((item: any) => {
        if (item.key === payload.key) {
          return {
            ...item,
            suspend: false,
          };
        }
        return item;
      });
      return {
        ...state,
        openedTabs: tabs,
        activeTabKey: payload.key,
      };
    },
    closeTab(state: any, { payload }: any) {
      const { openedTabs, activeTabKey } = state;
      const newOpenedTabs = openedTabs.filter(
        (tab: any) => tab.key !== payload.key
      );

      let newActiveTabKey = activeTabKey;
      if (activeTabKey === payload.key && newOpenedTabs.length > 0) {
        const currentIndex = openedTabs.findIndex(
          (tab: any) => tab.key === payload.key
        );
        newActiveTabKey = newOpenedTabs[Math.max(0, currentIndex - 1)].key;
      }

      return {
        ...state,
        openedTabs: newOpenedTabs,
        activeTabKey: newActiveTabKey,
      };
    },
  },
  effects: {
    *toggleSiderAsync(_: any, { put }: any) {
      yield put({ type: "toggleSider" });
    },
  },
};
