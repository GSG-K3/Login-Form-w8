const url = window.location.pathname;
apiCall('GET', `/api${url}`, null, res => {
  console.log(res);
  let profile = document.getElementById('userProfile');
  profile.appendChild(createItems(res));
});

function createItems(item) {
  let divFirst = document.createElement('div');

  let divSecond = document.createElement('div');
  let Name = document.createElement('h2');
  let Email = document.createElement('h3');
  let divThird = document.createElement('div');
  let Telephone = document.createElement('h3');
  let role = document.createElement('h3');
  let delbtn = document.createElement('button');

  delbtn.addEventListener('click', deleteUser);
  delbtn.innerHTML = 'Delete Account';
  delbtn.classList.add('btn', 'btn-blue');

  Name.innerHTML = 'User Name  : ' + item.user_name;
  Email.innerHTML = 'Email : ' + item.user_email;
  Telephone.innerHTML = 'Telephone : ' + item.user_telephone;
  role.innerHTML = 'Role : ' + item.role;

  divFirst.appendChild(divSecond);
  divSecond.appendChild(Name);
  divSecond.appendChild(Email);
  divFirst.appendChild(divThird);
  divThird.appendChild(Telephone);
  divThird.appendChild(role);
  divFirst.appendChild(delbtn);
  return divFirst;
}

function deleteUser(e) {
  e.preventDefault();
  apiCall('DELETE', `/api/delete${url}`, null, res => {
    if (res.status === 'ok') {
      alert(res.message);
      window.location.replace('/');
    }
  });
}
