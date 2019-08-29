import { Page, Color, drawer, TextView } from 'tabris';
import { heading_color, button_color_action, font_large } from '../config/config';
import { getUserName } from '../modules/api';

export function mainPage(username, navigationView) {
    drawer.enabled = true;
    navigationView.drawerActionVisible = true;
    const page = new Page({ title: '', background: Color.white, autoDispose: true });
    const greetingText = new TextView({
        left: 16, right: 16, top: 0,
        alignment: 'centerX',
        text: 'Welcome, '.concat(username),
        textColor: heading_color,
        font: font_large
    }).appendTo(page);

    return page;
}
