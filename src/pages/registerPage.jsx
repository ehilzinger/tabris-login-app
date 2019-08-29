import { Page, Color, drawer, TextView, TextInput, CheckBox, ProgressBar, DateDialog } from 'tabris';
import { heading_color, info_color, button_color_action, font_large, font_info } from '../config/config';
import { getActionButton, getHeadingText } from '../modules/widgets';
import { postDataToEndpoint } from '../modules/api';

export function registerPage() {

    const _registerPage = new Page({ title: 'Join In', background: Color.white, autoDispose: true });

    const wasAdded = [];

    const progress = new ProgressBar({
        left: 16, right: 16, maximum: 100
    }).appendTo(_registerPage);

    const username = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Username'
    }).onInput(({ text }) => updateProgress(username)).appendTo(_registerPage);

    const email = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Email'
    }).onInput(({ text }) => updateProgress(email)).appendTo(_registerPage);

    const password = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Password',
        type: 'password'
    }).onInput(({ text }) => updateProgress(password)).appendTo(_registerPage);

    const confirm_password = new TextInput({
        left: 16, right: 16, top: 'prev() 8',
        message: 'Confirm Password',
        type: 'password'
    }).onInput(({ text }) => updateProgress(confirm_password)).appendTo(_registerPage);

    new CheckBox({
        left: 16, right: 16, top: 'prev() 8',
        text: 'Show password'
    }).onCheckedChanged(event => password.revealPassword = event.value)
        .appendTo(_registerPage);

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
        changeColor();
    }).appendTo(_registerPage);

    getActionButton('Register').onSelect(register).appendTo(_registerPage);

    const infoText = new TextView({
        left: 16, right: 16, top: 'prev() 8',
        alignment: 'centerX',
        text: '',
        textColor: info_color,
        font: font_info,
        opacity: 0
    }).appendTo(_registerPage);

    function register() {
        const errors = [];
        if (username.text === "" || email.text === "" || password.text === "" || confirm_password.text === "") {
            infoText.animate({ opacity: 1 });
            infoText.text = 'Please fill out all required fields \n \n';
            errors.push("missing_field");
        } else {
            infoText.text = '';
            errors.pop("missing_field");
        }
        if (!accept_terms.checked) {
            infoText.animate({ opacity: 1 });
            infoText.text += 'Please accept the Terms \n \n';
            errors.push("terms_unchecked");
        } else {
            infoText.text += '';
            errors.pop("terms_unchecked");
        }
        if (!(password.text === confirm_password.text)) {
            infoText.animate({ opacity: 1 });
            infoText.text += 'Passwords do not match \n \n';
            errors.push("passwords_not_matching");
        } else {
            infoText.text += '';
            errors.pop("passwords_not_matching");
        }

        if (errors.length === 0) {
            postDataToEndpoint('register/', false, {
                username: username.text,
                password: password.text,
                email: email.text
            }).then(response => {
                response.json().then(json => {
                    if (!response.ok) {
                        new tabris.AlertDialog({
                            title: json.message,
                            buttons: { ok: 'OK' }
                        }).open();
                    } else {
                        new tabris.AlertDialog({
                            title: json.message.concat('\nYou may login now'),
                            buttons: { ok: 'OK' }
                        }).onCloseOk(() => { _registerPage.dispose(); }).open();
                    }
                });
            });
        }

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
        changeColor();
    }

    function changeColor() {
        if (progress.selection >= progress.maximum) {
            progress.tintColor = Color.green;
        } else {
            progress.tintColor = button_color_action;
        }
    }

    return _registerPage;
}
