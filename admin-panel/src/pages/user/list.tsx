import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../components/common/AlertMessage";
import UpdateUserRoleForm from "../../components/forms/user/UpdateRole";
import FormContainerModal from "../../components/modals/FormContainerModal";
import { setRoleList } from "../../features/dynamicDataSlice";
import { setFormModalShow } from "../../features/modalSlice";
import { setSingleUser, setUserList } from "../../features/userSlice";
import AdminLayout from "../../layout/admin";
import hitApi from "../../services/apiService";

const UserListPage = () => {
  const dispatch = useDispatch();
  //States
  const { isSuccess, isError, user } = useSelector(
    (state: any) => state.general
  );
  const { userList } = useSelector((state: any) => state.user);
  //
  const fetchUsers = async () => {
    const res = await hitApi(`GET`, `/user/list`);
    dispatch(setUserList(res.result.rows));

    const roles = await hitApi(`GET`, `/role/list`);
    dispatch(setRoleList(roles.result));
  };

  //
  const getUserToUpdateRole = async (id: number) => {
    const role = await hitApi(`GET`, `/user/singleUser/${id}`);
    dispatch(setSingleUser(role.result));
    dispatch(setFormModalShow(true));
  };

  //Effects
  useEffect(() => {
    fetchUsers();
  }, []);
  //Data table columns
  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: any) => row.role.roleName,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <>
          {/* Access control check */}
          {user.role.permissions.includes("USER_UPDATE") && (
            <button
              className="btn btn-primary btn-sm me-2"
              title="Update Role"
              onClick={() => {
                getUserToUpdateRole(row.id);
              }}
            >
              <i className="bi bi-award" />
            </button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <AdminLayout
        pageTitle="Users"
        breadcrumbs={[{ title: "Users", isActive: true }]}
      >
        <section className="section profile">
          <div className="card">
            <div className="card-body pt-3">
              <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-4">
                <form
                  className="search-form d-flex align-items-center"
                  method="POST"
                  action="#"
                >
                  <InputGroup>
                    <Form.Control
                      size="sm"
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                    <InputGroup.Text className="bg-transparent">
                      <button className="border-0 bg-transparent">
                        <i className="bi bi-search"></i>
                      </button>
                    </InputGroup.Text>
                  </InputGroup>
                </form>
              </div>

              <div className="row">
                {(isError || isSuccess) && <AlertMessage />}
                <DataTable columns={columns} data={userList} />
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
      <FormContainerModal
        modalTitle="Update user's role"
        formKey="USER_ROLE_UPDATE_FORM"
      >
        <UpdateUserRoleForm />
      </FormContainerModal>
    </>
  );
};

export default UserListPage;
