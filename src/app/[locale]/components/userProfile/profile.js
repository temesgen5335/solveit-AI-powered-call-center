"use client";

import { useEffect, useState } from "react";
import { getProfile } from "../lib/apis";
import { isAuthenticated, removeToken } from "../lib/auth";
import { useRouter } from "next/navigation";
import { LogOut, Edit3 } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!isAuthenticated()) {
          router.push("/signin");
          return;
        }
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push("/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-500 rounded-full mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-3xl font-semibold text-blue-600 dark:text-white uppercase">
              {profile?.full_name?.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">{profile?.full_name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</p>
            <span className="mt-2 inline-block px-3 py-1 text-sm rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 capitalize">
              {profile?.role}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded flex items-center justify-center gap-2">
              <Edit3 size={16} /> Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full border border-red-500 text-red-600 hover:text-white hover:bg-red-600 text-sm font-semibold px-4 py-2 rounded flex items-center justify-center gap-2"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow space-y-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Info label="Full Name" value={profile?.full_name} />
            <Info label="Email" value={profile?.email} />
            <Info label="Role" value={profile?.role} />

            {profile?.role === "company" ? (
              <>
                <Info label="Domain" value={profile?.domain} />
                <Info label="Business Phone" value={profile?.business_phone_number} />
              </>
            ) : (
              <Info label="WhatsApp Number" value={profile?.whatsapp_number} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</h4>
      <div className="text-base font-semibold text-gray-900 dark:text-white">{value || "—"}</div>
    </div>
  );
}
