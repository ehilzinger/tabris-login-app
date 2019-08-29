import { TextView, Color, Font, Button, drawer } from 'tabris';
import { loginPage } from '../pages/loginPage';
import { heading_color, button_color_action, font_large } from '../config/config';
import { logout } from './helpers';

function getHeadingText(text) {
    return new TextView({
        left: 16, right: 16, top: 40,
        alignment: 'centerX',
        text: text,
        textColor: heading_color,
        font: font_large,
    });
}

function getActionButton(text) {
    return new Button({
        left: 16, right: 16, top: 'prev() 8',
        text: text,
        background: button_color_action,
        highlightOnTouch: false
    });
}

function initializeDrawer(navigationView) {
    const logoutButton = new Button({
        layoutData: {
            bottom: true, height: 'auto',
            left: 16, right: 16
        },
        text: 'Logout',
        background: button_color_action,
        highlightOnTouch: false
    }).onSelect(() => {
        logout();
        navigationView.pages().detach();
        navigationView.drawerActionVisible = false;
        navigationView.append(loginPage(navigationView));
    });
    drawer.append(logoutButton);
}

export { getActionButton, getHeadingText, initializeDrawer };
