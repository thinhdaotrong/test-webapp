import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import clone from 'clone';
import { Layout } from 'antd';
import Scrollbars from '@hoa/components/utility/customScrollBar';
import Menu from '@hoa/components/uielements/menu';
import appActions from '@hoa/redux/app/actions';
import Logo from '@hoa/components/utility/logo';
import options from './options';
import SidebarWrapper from './Sidebar.styles';
import SidebarMenu from './SidebarMenu';

const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;

export default React.memo(({
}) => {
  const dispatch = useDispatch();
  const {
    view,
    openKeys,
    collapsed,
    openDrawer,
    current,
    height,
  } = useSelector(state => state.App);
  const customizedTheme = useSelector(
    state => state.ThemeSwitcher.sidebarTheme
  );

  const state = useSelector(state => state);
  let key = useLocation().pathname;
  key = key.substr(1, key.length);
    
  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    if (view === 'MobileView') {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(
      key => !(openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }
  const getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  const isCollapsed = clone(collapsed) && !clone(openDrawer);
  const mode = isCollapsed === true ? 'vertical' : 'inline';
  const onMouseEnter = event => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  
  const styling = {
    backgroundColor: 'black',
  };
  const submenuStyle = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: customizedTheme.textColor,
  };
  const submenuColor = {
    color: customizedTheme.textColor,
  };

  return (
    <SidebarWrapper>
      <Sider
        className="isomorphicSidebar"
        collapsed={isCollapsed}
        collapsible
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styling}
        trigger={null}
        width={240}
      >
        <Logo collapsed={isCollapsed} />
        <Scrollbars style={{ height: height - 70 }}>
          <Menu
            className="isoDashboardMenu"
            mode={mode}
            onClick={handleClick}
            onOpenChange={onOpenChange}
            openKeys={isCollapsed ? [] : openKeys}
            selectedKeys={key}
            theme="dark"
          >
            {options.map(singleOption => (
              <SidebarMenu
                key={singleOption.key}
                singleOption={singleOption}
                submenuColor={submenuColor}
                submenuStyle={submenuStyle}
                state={state}
              />
            ))}
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
})
