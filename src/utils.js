/* eslint-disable camelcase */
export function resizeImage(img, callback) {
  // const img = document.createElement('img');
  // img.src = fileUrl;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const MAX_WIDTH = 1200;
  const MAX_HEIGHT = 800;
  let { width } = img;
  let { height } = img;

  if (width > height && width > MAX_WIDTH) {
    height *= MAX_WIDTH / width;
    width = MAX_WIDTH;
  } else if (height > MAX_HEIGHT) {
    width *= MAX_HEIGHT / height;
    height = MAX_HEIGHT;
  }
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.createImageData(width, height);
  canvas.toBlob((f) => callback(f), 'image/jpeg', 0.8);
  canvas.remove();
}

export function avatarIsValid(img) {
  const MIN_WIDTH = 500;
  const MIN_HEIGHT = 333;
  let message = '';
  let status = true;
  if (img.width < img.height) {
    message = 'Фото должно быть горизонтальной ориентации';
    status = false;
  }
  if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
    message = 'Фото слишком никого разрешения';
    status = false;
  }
  return { message, status };
}

export function getCookie(name = 'csrftoken') {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
