const url = window.location.pathname;
apiCall('GET', `/api${url}`, null, res => {
  console.log(res);
  let profile = document.getElementById('userProfile');
  profile.appendChild(createItems(res));
});

/**
     * 
     * user_id SERIAL PRIMARY KEY,
            user_name TEXT NOT NULL,
            user_email VARCHAR(50) NOT NULL,
            password VARCHAR(500) NOT NULL,
            user_telephone NUMERIC NOT NULL,
            role VARCHAR(50) NOT NULL
     */

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
  delbtn.classList.add('btn');

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
  
}
