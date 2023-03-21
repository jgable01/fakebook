/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Object-oriented JavaScript
  Joshua Gable

  Assignment 3

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict'

const postBtn = document.querySelector('.addPost');
const content = document.querySelector('.content');
const imgUpload = document.querySelector('#imgUpload');
let file = imgUpload.files[0];
const fileResult = document.querySelector('.fileName');
const profileIcon = document.querySelector('.profile');
const textArea = document.querySelector('.post');
const postArea = document.querySelector('.postArea');
const infoMsg = document.querySelector('.infoMsg');
const reader = new FileReader();
const userInfo = document.querySelector('.userInfo');
const exitBtn = document.querySelector('.fa-xmark');
const localUserInfo = document.createElement('p');
let currentImg;

class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get userName() {
    return this.#userName;
  }

  get email() {
    return this.#email;
  }

  getInfo() {
    return this.id + this.name + this.userName + this.email;
  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() {
    return this.#pages;
  }

  get groups() {
    return this.#groups;
  }

  get canMonetize() {
    return this.#canMonetize;
  }

  getInfo() {
    return (`ID: ${this.id}, \nName: ${this.name}, \nUsername: ${this.userName},
  \nemail: ${this.email}, \nPages: ${this.pages}, \nGroups: ${this.groups},  
  \nCan monetize: ${this.canMonetize}`);
  }
}

const sub1 = new Subscriber(6969, 'Johnathon', 'jjohn', 'jj@email.com', 10, 5, false);

imgUpload.addEventListener('change', () => {
  file = imgUpload.files[0];
  const fileName = file.name;
  const extension = fileName.split('.').pop(); // extension comes after .
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  if (allowedExtensions.includes(extension)) { // file type validation via extension
    fileResult.innerText = fileName;
    imgUpload.src = reader.result;
    reader.readAsDataURL(file);
  } else {
    postArea.style.border = '1px solid #ff2846';
    infoMsg.innerHTML = 
    (`Invalid file. Please upload ${allowedExtensions.join(', ')} files`);
    postArea.appendChild(infoMsg);
  }
});

reader.addEventListener('load', () => { //  on load, creates post img element
  currentImg = document.createElement('img');
  currentImg.src = reader.result;
});

function addPost(input) { //  function to add post
  let date = new Date();
  let div = document.createElement('div');
  let postInfo = document.createElement('div');
  postInfo.classList.add("postInfo", "flex");
  let dateInfo = document.createElement('p');
  let userInfo = document.createElement('p');
  userInfo.classList.add('flex');
  let img = document.createElement('img');
  img.src = './assets/img/profile.JPG';
  img.classList.add('flex');
  userInfo.appendChild(img);
  userInfo.innerHTML += 'Placeholder';
  dateInfo.innerHTML = date.toDateString();
  postInfo.appendChild(userInfo);
  postInfo.appendChild(dateInfo);
  div.appendChild(postInfo);
  div.classList.add('postBox');
  let pText = document.createElement('p');
  let pImg = document.createElement('p');
  pText.innerHTML = input;
  if (fileResult.innerHTML != '') {
    pImg.appendChild(currentImg);
    div.appendChild(pImg);
  }
  div.appendChild(pText);
  content.prepend(div);
  clearPost();
}

function clearPost() {
  textArea.value = '';
  fileResult.innerHTML = '';
}

postBtn.addEventListener('click', () => {
  let input = textArea.value.trim();
  try {
    if (input.toString().length >= 1 || fileResult.innerHTML != '') {
      postArea.style.border = '';
      infoMsg.innerHTML = '';
      addPost(input);
    } else {
      postArea.style.border = '1px solid #ff2846';
      infoMsg.innerHTML = 'Invalid Input, you cannot post Nothing!';
      postArea.appendChild(infoMsg);
    }

  } catch (err) {
    throw "Invalid input";
  }

});

profileIcon.addEventListener('click', () => {
  localUserInfo.innerHTML = sub1.getInfo().replace(/,/g, '<br>')
  localUserInfo.classList.add('infoLocalUser');
  localUserInfo.classList.add('flex');
  userInfo.classList.add('infotest');
  userInfo.appendChild(localUserInfo);
  userInfo.style.display = 'flex';
  postArea.style.display = 'none';
  content.style.display = 'none';
});

exitBtn.addEventListener('click', () => {
  userInfo.style.display = 'none';
  postArea.style.display = 'inline';
  content.style.display = 'grid';
});







