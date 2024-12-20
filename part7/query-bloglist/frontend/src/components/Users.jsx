import { Link } from "react-router-dom";

const Users = ({ users, blogs}) => {
  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => {
        const count = user.blogs.length;
        return (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <p>Blogs: {count}</p>
          </li>
        )
      })}
    </div>
  );
}

export default Users