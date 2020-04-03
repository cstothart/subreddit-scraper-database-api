const lastUpdatedDate = document.querySelector('#last_updated_date');

const newDate = new Date(lastUpdatedDate.textContent);

lastUpdatedDate.textContent = newDate;