import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Profile = {
  "avatar": string,
  "player_id": number,
  "@id": string,
  "url": string,
  "name": string,
  "username": string,
  "followers": number,
  "country": string,
  "last_online": number,
  "joined": number,
  "status": string,
  "is_streamer": boolean,
  "verified": boolean,
  "league": string,
  "streaming_platforms": []
}

const GrandmasterProfile = () => {
    const { id } = useParams();
  
    const [profile, setProfile] = useState<Profile | null>(null)

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

    if (!profile) {
        return <p className="p-4 text-red-500">Grandmaster not found</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{profile.name}'s Profile</h2>
            <p>League: {profile.league}</p>
            <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
                ← Back to User List
            </Link>
        </div>
    );
}

export default GrandmasterProfile;