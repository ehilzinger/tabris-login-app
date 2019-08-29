import { Button, TextInput, TextView, contentView, Color, Font, AnimationOptions, CheckBox, NavigationView, Page, drawer } from 'tabris';
import { mainPage } from './pages/mainPage';
import { registerPage } from './pages/registerPage';
import { heading_color, info_color, button_color_action, font_info } from './config/config';
import { getActionButton, getHeadingText } from './modules/widgets';
import { getTimeOfDay } from './modules/helpers';

import { getUserName, api_url } from './modules/api';

const navigationView = new NavigationView({
  layoutData: 'stretch',
  visible: true,
  toolbarColor: Color.white,
  titleTextColor: Color.black,
  actionColor: Color.black
}).appendTo(contentView);

const page = new Page({
  title: '',
  background: Color.white
}).appendTo(navigationView);

const welcomeText = getHeadingText('Good '.concat(
  getTimeOfDay(new Date().getHours()))
).appendTo(page).animate({
  opacity: 0.9,
  transform: {
    scaleX: 1.1,
    scaleY: 1.1
  }
}, {
    delay: 0,
    duration: 2000,
    repeat: Infinity,
    reverse: true,
    easing: 'ease-out'
  });

const username = new TextInput({
  left: 16, right: 16, top: 'prev() 40',
  message: 'Username'
}).appendTo(page);

const password = new TextInput({
  left: 16, right: 16, top: 'prev() 8',
  message: 'Password',
  type: 'password'
}).appendTo(page);

new CheckBox({
  left: 16, right: 16, top: 'prev() 8',
  text: 'Show password'
}).onCheckedChanged(event => password.revealPassword = event.value)
  .appendTo(page);

const loginButton = getActionButton('Login').onSelect(send).appendTo(page);

const registerButton = getActionButton('Register').onSelect(register).appendTo(page);

const infoText = new TextView({
  left: 16, right: 16, top: 'prev() 8',
  alignment: 'centerX',
  text: 'Please enter Pasword and Username',
  textColor: info_color,
  font: font_info,
  opacity: 0
}).appendTo(page);

async function send() {
  if (username.text === "" && password.text === "") {
    infoText.animate({ opacity: 1 });
  } else {
    const formData = new FormData();
    formData.set('username', username.text);
    formData.append('password', password.text);
    const response = await fetch(api_url.concat('auth/token/'), { method: 'POST', body: formData });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      let u = await getUserName();
      u.json().then(js => { localStorage.setItem('username', js.username); });

      //getUserName().then(_data => {_data.json();}).then(js => { localStorage.setItem('username', js.username); });

      // page redirect occurs before username is updated
      openMainPage();
    } else {
      infoText.text = "Wrong Password or Username";
      infoText.animate({ opacity: 1 });
    }
  }
}

function openMainPage() {
  mainPage.appendTo(navigationView);
}

function register() {
  registerPage.appendTo(navigationView);
}
