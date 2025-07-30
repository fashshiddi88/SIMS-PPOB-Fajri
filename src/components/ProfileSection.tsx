import ProfilePhoto from "../assets/ProfilePhoto.png";

interface ProfileSectionProps {
  profileImage?: string;
  userName?: string;
  welcomeText?: string;
}

export default function ProfileSection({
  profileImage,
  userName,
}: ProfileSectionProps) {
  return (
    <div className="flex flex-col items-start">
      <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
        <img
          src={profileImage ?? ProfilePhoto}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-gray-600 text-sm mb-1">Selamat Datang,</p>
      <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
    </div>
  );
}
