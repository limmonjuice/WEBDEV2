import ProfileCard from "./ProfileCard";

function ProfileList() {
  return (
    <div>
      <h2>Profile List</h2>

      <ProfileCard 
        name="Zaimond Lim" 
        age={25} 
        role="Cafe Owner" 
      />

      <ProfileCard 
        name="Alexa Dulay" 
        age={27} 
        role="Cashier" 
      />

      <ProfileCard 
        name="Siri Lee" 
        age={35} 
        role="Barista" 
      />
    </div>
  );
}

export default ProfileList;
