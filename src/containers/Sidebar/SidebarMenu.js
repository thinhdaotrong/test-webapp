import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Menu from '@hoa/components/uielements/menu';
import IntlMessages from '@hoa/components/utility/intlMessages';
import Auth from '@hoa/components/Auth';

const SubMenu = Menu.SubMenu;

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};
export default React.memo(({
  singleOption,
  submenuStyle,
  submenuColor,
  state,
  ...rest
}) => {
    const match = useRouteMatch();

    const { key, label, leftIcon, children } = singleOption;
    const url = stripTrailingSlash(match.url);
    const isAdmin = Auth.getRole() === 'admin' ? true : false;

    if (!isAdmin ) {
        if (key === 'people' || key === 'device') {
            return null;
        }
    }

    if (children ) {
        return (
            <SubMenu
                key={key}
                title={
                <span className="isoMenuHolder" style={submenuColor}>
                    {/* <Icon className="icon" type={leftIcon} theme="outlined" /> */}
                    {leftIcon}
                    <span className="nav-text">
                    <IntlMessages id={label} />
                    </span>
                </span>
                }
                {...rest}
            >
                {children.map(child => {
                    const linkTo = child.withoutDashboard
                        ? `/${child.key}`
                        : `${url}/${key}/${child.key}`;
                    return (
                        <Menu.Item key={child.key} style={submenuStyle}>
                            <Link style={submenuColor} to={linkTo}>
                                <IntlMessages id={child.label} />
                            </Link>
                        </Menu.Item>
                    );
                })}
            </SubMenu>
        );
    }

    return (
        <Menu.Item key={key} {...rest}>
            <Link to={`${url}/${key}`}>
                <span className="isoMenuHolder" style={submenuColor}>
                    {/* <Icon className="icon" type={leftIcon} theme="outlined" /> */}
                    {leftIcon}
                    <span className="nav-text">
                        <IntlMessages id={label} />
                    </span>
                </span>
            </Link>
        </Menu.Item>
    );
});
