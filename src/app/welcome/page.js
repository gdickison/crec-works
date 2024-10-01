

async function Welcome() {
  // const response = await fetch("http://localhost:3000/api/users");
  // const {users, total} = await response.json();
  // console.log('users', users);
  // console.log('total', total);

  return (
    <form>
      <label>
        Last Name
        <input type="text" name="name" />
      </label>
      <button type="submit">Submit</button>
      <div>
        <p>Welcome form wil Go Here</p>
        <p>This form will get the first and last name from the user, the usser&apos;s church, and have the user agree to the terms of service.</p>
        <p>This should somehow verify the user so that the app can grant them access to the directory.</p>
        {/* {users.map((user) => (
          <div key={user.$id}>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.$id}</p>
          </div>
        ))} */}
      </div>
    </form>
  )
}

export default Welcome