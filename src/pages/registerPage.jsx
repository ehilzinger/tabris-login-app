import { Page, Color, drawer, TextView, TextInput, CheckBox, ProgressBar, DateDialog } from 'tabris';
import { heading_color, info_color, button_color_action, font_large, font_info } from '../config/config';
import { getActionButton, getHeadingText } from '../modules/widgets';
import { postDataToEndpoint } from '../modules/api';

const registerPage = new Page({ title: 'Join In', background: Color.white, autoDispose: false });

const wasAdded = [];

const progress = new ProgressBar({
    left: 16, right: 16, maximum: 100
}).appendTo(registerPage);

const username = new TextInput({
    left: 16, right: 16, top: 'prev() 8',
    message: 'Username'
}).onInput(({ text }) => updateProgress(username)).appendTo(registerPage);

const email = new TextInput({
    left: 16, right: 16, top: 'prev() 8',
    message: 'Email'
}).onInput(({ text }) => updateProgress(email)).appendTo(registerPage);

const password = new TextInput({
    left: 16, right: 16, top: 'prev() 8',
    message: 'Password',
    type: 'password'
}).onInput(({ text }) => updateProgress(password)).appendTo(registerPage);

const confirm_password = new TextInput({
    left: 16, right: 16, top: 'prev() 8',
    message: 'Confirm Password',
    type: 'password'
}).onInput(({ text }) => updateProgress(confirm_password)).appendTo(registerPage);

new CheckBox({
    left: 16, right: 16, top: 'prev() 8',
    text: 'Show password'
}).onCheckedChanged(event => password.revealPassword = event.value)
    .appendTo(registerPage);

const accept_terms = new CheckBox({
    left: 16, right: 16, top: 'prev() 8',
    text: 'I accept the Terms and Conditions'
}).onCheckedChanged(event => {
    if (event.value) {
        infoText.animate({ opacity: 0 });
        progress.selection += 20;
        accept_terms.textColor = Color.green;
    } else {
        progress.selection -= 20;
        accept_terms.textColor = Color.black;
    }
}).appendTo(registerPage);

getActionButton('Register').onSelect(register).appendTo(registerPage);

const infoText = new TextView({
    left: 16, right: 16, top: 'prev() 8',
    alignment: 'centerX',
    text: '',
    textColor: info_color,
    font: font_info,
    opacity: 0
}).appendTo(registerPage);

function register() {
    if (username.text === "" || email.text === "" || password.text === "" || confirm_password === "") {
        infoText.animate({ opacity: 1 });
        infoText.text = 'Please fill out all required fields \n \n';
    } else {
        infoText.text = '';
    }
    if (!accept_terms.checked) {
        infoText.animate({ opacity: 1 });
        infoText.text += 'Please accept the Terms \n \n';
    } else {
        infoText.text += '';
    }
    if (!(password.text === confirm_password.text)) {
        infoText.animate({ opacity: 1 });
        infoText.text += 'Passwords do not match \n \n';
    } else {
        infoText.text += '';
    }

    postDataToEndpoint('register/', false, {
        username: username.text,
        password: password.text,
        email: email.text
    }).then(response => {
        console.log(response.status);
    });

}

function updateProgress(origin) {
    if (!wasAdded.includes(origin)) {
        infoText.animate({ opacity: 0 });
        wasAdded.push(origin);
        progress.selection += 20;
    }
    if (origin.text === "") {
        wasAdded.pop(origin);
        progress.selection -= 20;
    }
}

export { registerPage };