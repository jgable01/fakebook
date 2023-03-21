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

let currentImg;

imgUpload.addEventListener('change', () => {
  file = imgUpload.files[0];
  const fileName = file.name;
  fileResult.innerText = fileName;
  imgUpload.src = reader.result;
  reader.readAsDataURL(file);
});

reader.addEventListener('load', () => {
  console.log('im working');
  currentImg = document.createElement('img');
  currentImg.src = reader.result;
});

function addPost(input) {
  let date = new Date();
  let div = document.createElement('div');
  let postInfo = document.createElement('div');
  postInfo.classList.add("postInfo", "flex");
  let dateInfo = document.createElement('p');
  let userInfo = document.createElement('p');
  userInfo.classList.add('flex');
  let img = document.createElement('img');
  console.log(img);
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
  if(fileResult.innerHTML != '') { 
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
      console.log(input);
      addPost(input);
    } else { 
      postArea.style.border = '1px solid #ff2846';
      infoMsg.innerHTML = 'Invalid Input, you cannot post Nothing!';
      postArea.appendChild(infoMsg);
      console.log('Invalid input'); 
    }

  } catch (err) {
    throw "Invalid input";
  }

});







