const lastUpdatedDate = document.querySelector('#last_updated_date');

const newDate = new Date(lastUpdatedDate.textContent);

lastUpdatedDate.textContent = newDate;

if(!(window.ActiveXObject) && "ActiveXObject" in window) {
  document.getElementById('ie').style.display = 'block';
} else {
  document.getElementById('no-ie').style.display = 'block';
}