import { Tab, Tabs } from "react-bootstrap";
import AdminLayout from "../layout/admin";
import ProfileDetailsForm from "../components/forms/profile/ProfileDetails";
import ProfilePicForm from "../components/forms/profile/ProfilePic";
import ChangePasswordForm from "../components/forms/profile/ChangePassword";
import { useEffect } from "react";
import ErrorMessage from "../components/common/AlertMessage";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { isError, isSuccess } = useSelector((state: any) => state.general);
  return (
    <>
      <AdminLayout
        pageTitle="Profile"
        breadcrumbs={[{ title: "Profile", isActive: true }]}
      >
        <section className="section profile">
          <div className="row">
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  {(isError || isSuccess) && <ErrorMessage />}
                  <Tabs id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="home" title="Profile Details">
                      {/* Profile Picture Update form */}
                      <ProfilePicForm />
                      {/* Profile details update form */}
                      <ProfileDetailsForm />
                    </Tab>
                    <Tab eventKey="changePassword" title="Change Password">
                      {/* Change PAssword form */}
                      <ChangePasswordForm />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
    </>
  );
};

export default ProfilePage;
