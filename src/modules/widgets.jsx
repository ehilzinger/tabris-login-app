import { TextView, Color, Font, Button } from 'tabris';
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

export { getActionButton, getHeadingText };