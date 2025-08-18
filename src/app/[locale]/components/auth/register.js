export default function Register() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>
          <form className="space-y-4">
            <Input label="Name" />
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            <Input label="Company" />
            <Input label="Role" placeholder="Agent, Manager, Admin..." />
            <button className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500">
              Register
            </button>
          </form>
          <p className="text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 underline">Login</a>
          </p>
        </div>
      </div>
    );
  }
  
  function Input({ label, type = "text", placeholder = "" }) {
    return (
      <div>
        <label className="block mb-1">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
    );
  }
  