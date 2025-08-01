"use client";

import { useAppSelector } from "../store/hooks";
import { useState, useEffect } from "react";
import { Mail, User } from "lucide-react";
import Button from "./Button";
import type { RootState } from "../store";

interface ProfileFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onLogout?: () => void;
  onSave: (firstName: string, lastName: string) => void;
  editButtonText?: string;
  logoutButtonText?: string;
}

export default function ProfileForm({
  initialData,
  onLogout,
  onSave,
  editButtonText = "Edit Profil",
  logoutButtonText = "Logout",
}: ProfileFormProps) {
  const profile = useAppSelector((state: RootState) => state.profile.data);
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState(initialData.firstName);
  const [lastName, setLastName] = useState(initialData.lastName);
  const [email, setEmail] = useState(initialData.email);

  useEffect(() => {
    setFirstName(initialData.firstName);
    setLastName(initialData.lastName);
    setEmail(initialData.email);
  }, [initialData.firstName, initialData.lastName, initialData.email]);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
  };

  const handleSaveClick = () => {
    onSave(firstName, lastName);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-md space-y-6 text-gray-700">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none ${
              isEditing
                ? "bg-white focus:ring-2 focus:ring-red-500"
                : "bg-gray-50"
            }`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Depan
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!isEditing}
            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none ${
              isEditing
                ? "bg-white focus:ring-2 focus:ring-red-500"
                : "bg-gray-50"
            }`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Belakang
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!isEditing}
            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none ${
              isEditing
                ? "bg-white focus:ring-2 focus:ring-red-500"
                : "bg-gray-50"
            }`}
          />
        </div>
      </div>

      <div className="space-y-3 pt-4">
        {isEditing ? (
          <>
            <Button
              onClick={handleSaveClick}
              variant="primary"
              className="w-full"
            >
              Simpan
            </Button>
            <Button
              onClick={handleCancelClick}
              variant="outline"
              className="w-full"
            >
              Batalkan
            </Button>
          </>
        ) : (
          <Button
            onClick={handleEditClick}
            variant="primary"
            className="w-full"
          >
            {editButtonText}
          </Button>
        )}

        {!isEditing && (
          <Button
            onClick={onLogout}
            variant="secondary"
            className="w-full border-red-500 text-red-500 hover:bg-red-50"
          >
            {logoutButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
