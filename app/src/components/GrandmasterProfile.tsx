import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Profile = {
  "avatar"?: string,
  "profile_id": number,
  "@id": string,
  "url": string,
  "name"?: string,
  "username": string,
  "title"?: string;
  "followers"?: number,
  "country"?: string,
  "last_online": number,
  "joined": number,
  "status"?: string,
  "is_streamer"?: boolean,
  "verified"?: boolean,
  "league"?: string,
  "streaming_platforms"?: string[],
  "code"?: number // For checking if user exists
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

const getTimeSinceLastOnline = (lastOnline: number) => {
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    const diff = now - lastOnline;

    const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
    const seconds = String(diff % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`
}

const GrandmasterProfile = () => {
    const { id } = useParams();
  
    const [profile, setProfile] = useState<Profile | null>(null)
    const [timeSince, setTimeSince] = useState("00:00:00");

    const fetchProfile = async () => {
        try {
            const response = await fetch(`https://api.chess.com/pub/player/${id}`);
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    useEffect(() => {
        if (!profile) return;

        const updateTime = () => {
            setTimeSince(getTimeSinceLastOnline(profile.last_online));
        };

        updateTime(); // initial call
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [profile]);

    if (!profile) {
        return <p className="p-4 text-gray-500">Loading...</p>;
    }

    // Add fallback if grandmaster doesn't exists
    if (profile.code === 0) {
        return <p className="p-4 text-red-500">Grandmaster not found</p>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border mb-4 flex items-center justify-center bg-gray-100">
                    {profile.avatar ? (
                        <img
                        src={profile.avatar}
                        alt={profile.username}
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        // Display first letter of user name if user doesn't have an avatar
                        <span className="text-gray-400 text-2xl">
                            {profile.username ? profile.username.charAt(0).toUpperCase() : "?"}
                        </span>
                    )}
                </div>
                <div className="ml-5">
                <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
                    {profile.name && profile.name.trim() !== "" ? (
                        <span>{profile.name}</span>
                    ) : (
                        <span className="italic text-gray-400">No name provided</span>
                    )}
                    {profile.title && (
                    <span className="bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded-md font-semibold">
                        {profile.title}
                    </span>
                    )}
                </h1>
                <p className="text-gray-200">@{profile.username}</p>
                <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-yellow-300 hover:underline hover:text-yellow-300"
                >
                    View on Chess.com
                </a>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-gray-500 text-sm">Followers</p>
                    <p className="text-lg text-black font-semibold ">{profile.followers}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-gray-500 text-sm">League</p>
                    <p className="text-lg text-black font-semibold">{profile.league}</p>
                </div>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                <p>
                    <span className="font-semibold">Account Status:</span>{" "}
                    <span
                    className={`${
                        profile.status === "premium"
                        ? "text-green-600 font-bold"
                        : "text-gray-600"
                    }`}
                    >
                    {profile.status}
                    </span>
                </p>
                <p>
                    <span className="font-semibold">Joined:</span>{" "}
                    {formatDate(profile.joined)}
                </p>
                <p>
                    <span className="font-semibold">Last Online:</span>{" "}
                    {timeSince} ago
                </p>
                <p>
                    <span className="font-semibold">Verified:</span>{" "}
                    {profile.verified ? "✅ Yes" : "❌ No"}
                </p>
                <p>
                    <span className="font-semibold">Streamer:</span>{" "}
                    {profile.is_streamer ? "🎥 Yes" : "No"}
                </p>
                </div>
            </div>

            
            {/* Back to list button */}
            <Link to="/" className="p-3 mt-4 inline-block text-blue-600 hover:underline">
                ← Back to User List
            </Link>
        </div>
  );
}

export default GrandmasterProfile;