import React, { useState } from "react";
import { User, IndianRupee, Save, WalletCards, Copy } from "lucide-react";
import toast from "react-hot-toast";
import userStore from "../store/user.store.js";
import Loading from "../components/layout/Loading.jsx";

const Profile = () => {
  const { user, updateUser, updateAvatar } = userStore();

  const [formData, setFormData] = useState({
    name: user.name || "",
    upi_id: user.upi_id || "",
    currency: user.currency || "INR",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const inviteCode = user.invite_code;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);

    toast.success("Invite code copied");
  };

  const handleSubmitAvatar = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setAvatar(file);

    setAvatarPreview(URL.createObjectURL(file));

    setLoading(true);

    await updateAvatar(file);

    setLoading(false);
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.upi_id.trim() ||
      !formData.currency.trim()
    ) {
      toast.error("Fill the form");
      return;
    }

    setLoading(true);

    await updateUser(formData);

    setLoading(false);
  };

  return (
    <div className="p-4">
      {/* Header */}

      <div
        className="
        flex
        justify-between
        items-center
        mb-5
        "
      >
        <h1
          className="
          text-2xl
          font-bold
          text-gray-800
          "
        >
          Profile
        </h1>

        <button
          onClick={copyInviteCode}
          className="
          flex
          items-center
          gap-2
          px-3
          py-2
          rounded-xl
          bg-green-100
          text-green-700
          text-sm
          font-medium
          "
        >
          {inviteCode}

          <Copy size={15} />
        </button>
      </div>

      {/* Avatar */}

      <div
        className="
        flex
        flex-col
        items-center
        mb-5
        "
      >
        <div
          className="
          w-24
          h-24
          rounded-full
          overflow-hidden
          bg-gray-100
          flex
          items-center
          justify-center
          "
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="
              w-full
              h-full
              object-cover
              "
            />
          ) : user.avatar_url ? (
            <img
              src={user.avatar_url}
              className="
              w-full
              h-full
              object-cover
              "
            />
          ) : (
            <User size={40} className="text-gray-400" />
          )}
        </div>

        <label
          className={`
          mt-3
          px-5
          py-2
          rounded-xl
          bg-blue-100
          text-blue-600
          cursor-pointer
          ${loading ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          Change Avatar
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleSubmitAvatar}
          />
        </label>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmitUser}
        className="
        border
        border-gray-200
        rounded-2xl
        p-5
        space-y-4
        "
      >
        <InputBox
          icon={<User size={18} className="text-blue-600" />}
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />

        <InputBox
          icon={<WalletCards size={18} className="text-blue-600" />}
          label="UPI ID"
          name="upi_id"
          value={formData.upi_id}
          onChange={handleChange}
          placeholder="example@upi"
        />

        {/* Currency */}

        <div>
          <label className="text-sm text-gray-500">Currency</label>

          <div
            className="
            flex
            items-center
            gap-2
            border
            border-gray-200
            rounded-2xl
            px-3
            bg-white
            shadow-sm
            "
          >
            <div
              className="
              w-9
              h-9
              rounded-xl
              bg-blue-100
              flex
              items-center
              justify-center
              "
            >
              <IndianRupee size={18} className="text-blue-600" />
            </div>

            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="
              flex-1
              p-3
              outline-none
              bg-transparent
              appearance-none
              cursor-pointer
              "
            >
              <option value="INR">🇮🇳 INR - ₹</option>

              <option value="USD">🇺🇸 USD - $</option>

              <option value="EUR">🇪🇺 EUR - €</option>
            </select>

            <span className="text-gray-400">▼</span>
          </div>
        </div>

        <button
          disabled={loading}
          className="
          w-full
          py-3
          rounded-xl
          bg-blue-600
          text-white
          flex
          justify-center
          items-center
          gap-2
          disabled:opacity-60
          "
        >
        

          {loading ? <Loading /> : <><Save size={18} /> Update</>}
        </button>
      </form>
    </div>
  );
};

const InputBox = ({ icon, label, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>

    <div
      className="
flex
items-center
gap-2
border
border-gray-200
rounded-xl
px-3
"
    >
      {icon}

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
w-full
p-3
outline-none
"
      />
    </div>
  </div>
);

export default Profile;
