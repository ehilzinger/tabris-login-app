import { TextView, Color, Font, Button, drawer } from 'tabris';
import { loginPage } from '../pages/loginPage';
import { editProfilePage } from '../pages/editProfilePage';
import { overviewPage } from '../pages/overviewPage';
import { heading_color, button_color_action, font_large, info_color, font_info } from '../config/config';
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

function getInfoText(text)  {
    return new TextView({
        left: 16, right: 16, top: 'prev() 8',
        alignment: 'centerX',
        text: text,
        textColor: info_color,
        font: font_info,
        opacity: 0
    });
}

function initializeDrawer(navigationView) {
    const editProfileButton = new Button({
        layoutData: {
            top: 'prev() 8',
             height: 'auto',
            left: 16, right: 16
        },
        text: 'Edit Profile',
        background: button_color_action,
        highlightOnTouch: false
    }).onSelect(() => {
        navigationView.append(editProfilePage());
        drawer.close();
    });
    const overviewButton = new Button({
        layoutData: {
            top: 'prev() 8',
            left: 16, right: 16
        },
        text: 'View Overview',
        background: button_color_action,
        highlightOnTouch: false
    }).onSelect(() => {
        navigationView.append(overviewPage());
        drawer.close();
    });
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
    drawer.append(overviewButton);
    drawer.append(editProfileButton);
    drawer.append(logoutButton);
}

export { getActionButton, getHeadingText, initializeDrawer, getInfoText };
