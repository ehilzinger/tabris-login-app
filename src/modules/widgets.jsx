import { TextView, Color, Font, Button, drawer } from 'tabris';
import { loginPage } from '../pages/loginPage';
import { heading_color, button_color_action, font_large } from '../config/config';

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
        navigationView.pages().detach();
        drawer.enabled = false;
        navigationView.drawerActionVisible = false;
        navigationView.append(loginPage(navigationView));
    });
    drawer.append(logoutButton);
}

export { getActionButton, getHeadingText, initializeDrawer };
