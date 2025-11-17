function ProfileCard({ name, age, role }) {
  return (
    <div className="profile-card">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
}

export default ProfileCard;
