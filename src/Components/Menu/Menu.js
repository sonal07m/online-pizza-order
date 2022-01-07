import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { dataForTheMenu } from '../../Data';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
const ConnectedMenu = () => {
  const [expandedMenuItems, setExpandedMenuItems] = useState({ 1: true });
  const [dataForTheMenuData] = useState(dataForTheMenu);
  const showMenu = useSelector((state) => state.showMenu);
  // This method determines from URL whether to highlight a menu item or not
  const isMenuItemActive = (item, location) => {
    if (location.pathname === '/' && location.search) {
      let queryStringParsed = queryString.parse(location.search);

      return item.name === queryStringParsed.category;
    }

    return item.url === location.pathname;
  };
  const renderMenu = (data) => {
    return (
      <List>
        {data.map((x) => {
          if (!x.children) {
            return (
              <NavLink
                to={x.url}
                exact
                isActive={(param, location) => {
                  return isMenuItemActive(x, location);
                }}
                style={{
                  textDecoration: 'none',
                  color: 'rgb(32, 32, 34)',
                }}
                key={x.id}
                activeStyle={{
                  color: '#4282ad',
                  fontWeight: 'bold',
                }}
              >
                <ListItem dense button>
                  <ListItemIcon>
                    <Icon>{x.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={<div style={{ color: 'inherit' }}>{x.name}</div>}
                  />
                </ListItem>
              </NavLink>
            );
          } else {
            return (
              <Fragment key={x.id}>
                <ListItem
                  button
                  dense
                  onClick={() => {
                    // Update in state which menu items are expanded.
                    setExpandedMenuItems((ps) => {
                      return {
                        ...ps.expandedMenuItems,
                        [x.id]: !ps.expandedMenuItems[x.id],
                      };
                    });
                  }}
                >
                  <ListItemText primary={x.name} />
                  {expandedMenuItems[x.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={expandedMenuItems[x.id]} timeout="auto" unmountOnExit>
                  {this.renderMenu(x.children)}
                </Collapse>
              </Fragment>
            );
          }
        })}
      </List>
    );
  };
  if (!showMenu) return null;
  return (
    <div
      style={{
        backgroundColor: '#FAFAFB',
        minWidth: 250,
      }}
    >
      {/* Render our menu */}
      {renderMenu(dataForTheMenuData)}
    </div>
  );
};
// this.renderMenu = this.renderMenu.bind(this)
export default ConnectedMenu;
