import React from "react";
import PageWrapper from "../../global/PageWrapper";
import ProfileForm from "./components/ProfileForm";
import "./MyProfile.css";
import { useSelector } from "react-redux";
const MyProfile = (props) => {
  const user = useSelector((state) => {
    return state.user.user;
  });
  return (
    <PageWrapper>
      <div className="main-login">
        <div className="login-card">
          <h4 className="text-center mt-3 mb-4">Edit Profile</h4>
          <ProfileForm user={user} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default MyProfile;
