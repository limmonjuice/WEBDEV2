const apiUrl = "http://localhost:2020/api";

function CarManagementApp() {
  const [token, setToken] = React.useState(null);
  const [showRegister, setShowRegister] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [cars, setCars] = React.useState([]);
  const [editingCar, setEditingCar] = React.useState(null);
  
  const [loginForm, setLoginForm] = React.useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = React.useState({ username: '', password: '' });
  const [carForm, setCarForm] = React.useState({
    id: '',
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    color: '',
    bodyType: '',
    engineType: '',
    transmission: ''
  });

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchCars(storedToken);
    }
  }, []);

  const fetchCars = async (authToken = token) => {
    if (!authToken) return;
    
    try {
      const res = await fetch(`${apiUrl}/cars`, {
        headers: { "Authorization": `Bearer ${authToken}` }
      });
      
      if (!res.ok) throw new Error("Failed to fetch cars");
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      alert("Login successful!");
      fetchCars(data.token);
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Invalid username or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm)
      });

      if (!res.ok) throw new Error("Registration failed");
      alert("Registration successful! You can now log in.");
      setShowRegister(false);
      setRegisterForm({ username: '', password: '' });
    } catch (err) {
      console.error("Error registering:", err);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCars([]);
    setLoginForm({ username: '', password: '' });
  };

  const handleSaveCar = async (e) => {
    e.preventDefault();
    
    const method = carForm.id ? "PUT" : "POST";
    const url = carForm.id ? `${apiUrl}/cars/${carForm.id}` : `${apiUrl}/cars`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(carForm)
      });

      if (!res.ok) throw new Error("Failed to save car");
      
      setShowModal(false);
      setCarForm({
        id: '', licensePlate: '', model: '', year: '', make: '',
        color: '', bodyType: '', engineType: '', transmission: ''
      });
      fetchCars();
    } catch (err) {
      console.error("Error saving car:", err);
    }
  };

  const handleEditCar = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/cars/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error("Failed to fetch car");
      const car = await res.json();
      
      setCarForm(car);
      setEditingCar(car);
      setShowModal(true);
    } catch (err) {
      console.error("Error editing car:", err);
    }
  };

  const handleDeleteCar = async (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    
    try {
      const res = await fetch(`${apiUrl}/cars/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error("Failed to delete car");
      fetchCars();
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };

  const openAddModal = () => {
    setCarForm({
      id: '', licensePlate: '', make: '', model: '', year: '',
      color: '', bodyType: '', engineType: '', transmission: ''
    });
    setEditingCar(null);
    setShowModal(true);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {!showRegister ? (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition">
                  Login
                </button>
              </form>
              <p className="text-center mt-4 text-gray-600">
                Don't have an account?{' '}
                <button onClick={() => setShowRegister(true)} className="text-orange-500 font-bold hover:underline">
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h2>
              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition">
                  Register
                </button>
              </form>
              <p className="text-center mt-4 text-gray-600">
                Already have an account?{' '}
                <button onClick={() => setShowRegister(false)} className="text-orange-500 font-bold hover:underline">
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Car Management System</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition">
            Logout
          </button>
        </div>

        <button onClick={openAddModal} className="mb-6 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
          + Add New Car
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-6 py-4 text-center">ID</th>
                <th className="px-6 py-4 text-center">License Plate</th>
                <th className="px-6 py-4 text-center">Make</th>
                <th className="px-6 py-4 text-center">Model</th>
                <th className="px-6 py-4 text-center">Year</th>
                <th className="px-6 py-4 text-center">Color</th>
                <th className="px-6 py-4 text-center">Body Type</th>
                <th className="px-6 py-4 text-center">Engine Type</th>
                <th className="px-6 py-4 text-center">Transmission</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-center text-orange-500 font-bold">{car.id}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{car.licensePlate}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{car.make}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{car.model}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{car.year}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{car.color}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{car.bodyType}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{car.engineType}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{car.transmission}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleEditCar(car.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold mr-2 hover:bg-blue-600 transition">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCar(car.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {editingCar ? 'Edit Car' : 'Add New Car'}
              </h2>
              <form onSubmit={handleSaveCar} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="License Plate"
                    value={carForm.licensePlate}
                    onChange={(e) => setCarForm({...carForm, licensePlate: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Make"
                    value={carForm.make}
                    onChange={(e) => setCarForm({...carForm, make: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Model"
                    value={carForm.model}
                    onChange={(e) => setCarForm({...carForm, model: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    value={carForm.year}
                    onChange={(e) => setCarForm({...carForm, year: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Color"
                    value={carForm.color}
                    onChange={(e) => setCarForm({...carForm, color: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <select
                    value={carForm.bodyType}
                    onChange={(e) => setCarForm({...carForm, bodyType: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select Body Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Van">Van</option>
                    <option value="Convertible">Convertible</option>
                  </select>
                  <select
                    placeholder="Engine Type"
                    value={carForm.engineType}
                    onChange={(e) => setCarForm({...carForm, engineType: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select Engine Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <select
                    placeholder="Transmission"
                    value={carForm.transmission}
                    onChange={(e) => setCarForm({...carForm, transmission: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select Transmission Type</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div className="flex gap-4 mt-6">
                  <button type="submit" className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition">
                    Save
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CarManagementApp />);