import BottomFooter from "../footer/bottomFooter";

export default function Login() {
    return (
      <div className="min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          <form className="space-y-4">
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            <button className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500">
              Login
            </button>
          </form>
          <p className="text-sm mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-400 underline">Register</a>
          </p>
        </div>
        <BottomFooter />
      </div>
    );
  }
  
  function Input({ label, type = "text" }) {
    return (
      <div>
        <label className="block mb-1">{label}</label>
        <input
          type={type}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
    );
  }
  