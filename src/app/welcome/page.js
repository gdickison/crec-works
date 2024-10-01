

async function Welcome() {
  const response = await fetch("http://localhost:3000/api/users");
  const {users, total} = await response.json();
  console.log('users', users);
  console.log('total', total);

  return (
    <form>
      <label>
        Last Name
        <input type="text" name="name" />
      </label>
      <button type="submit">Submit</button>
      <div>
        {users.map((user) => (
          <div key={user.$id}>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.$id}</p>
          </div>
        ))}
      </div>
    </form>
  )
}

export default Welcome