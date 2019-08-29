import { Page, Color, drawer, TextView } from 'tabris';
import { heading_color, button_color_action, font_large } from '../config/config';
import { getUserName } from '../modules/api';

const mainPage = new Page({ title: '', background: Color.white, autoDispose: false });
const greetingText = new TextView({
    left: 16, right: 16, top: 5,
    alignment: 'centerX',
    text: 'Welcome, '.concat(localStorage.getItem('username')),
    textColor: heading_color,
    font: font_large
}).appendTo(mainPage);


export { mainPage };