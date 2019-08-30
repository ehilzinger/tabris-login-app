import { Page, Color, drawer, TextView, Button } from 'tabris';
import { heading_color, button_color_action, font_large } from '../config/config';
import { getUserName } from '../modules/api';
import { getActionButton, getHeadingText, getInfoText } from '../modules/widgets';
import { Tab, TabFolder, contentView } from 'tabris';


export function mainPage(username, navigationView) {
    drawer.enabled = true;
    navigationView.drawerActionVisible = true;
    navigationView.titleTextColor = heading_color;
    const page = new Page({ title: 'Welcome, '.concat(username), background: Color.white, autoDispose: true });

    return page;
}
