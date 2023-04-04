import React from "react";
import AdminLayout from "../../layout/admin";

const CategoryAddPage = () => {
  return (
    <>
      <AdminLayout>
        <section className="section profile">
          <div className="row">
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <form>
                    <div className="row mb-3">
                      <label
                        htmlFor="profileImage"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Profile Image
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <img src="/images/profile-img.jpg" alt="Profile" />
                        <div className="pt-2">
                          <a
                            href="#"
                            className="btn btn-primary btn-sm me-2"
                            title="Upload new profile image"
                          >
                            <i className="bi bi-upload" />
                          </a>
                          <a
                            href="#"
                            className="btn btn-danger btn-sm"
                            title="Remove my profile image"
                          >
                            <i className="bi bi-trash" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="fullName"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Full Name
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="fullName"
                          type="text"
                          className="form-control"
                          id="fullName"
                          defaultValue="Kevin Anderson"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
    </>
  );
};

export default CategoryAddPage;
