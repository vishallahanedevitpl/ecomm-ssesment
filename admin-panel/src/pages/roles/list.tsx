import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/admin";
import hitApi from "../../services/apiService";
import DataTable from "react-data-table-component";
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFormModalShow } from "../../features/modalSlice";
import FormContainerModal from "../../components/modals/FormContainerModal";
import AddRoleForm from "../../components/forms/roles/Add";
import AlertMessage from "../../components/common/AlertMessage";
import { setError, setLoading } from "../../features/generalSlice";
import { setSingleRole } from "../../features/dynamicDataSlice";
const RolesListPage = () => {
  const dispatch = useDispatch();
  //States
  const { isSuccess, isError } = useSelector((state: any) => state.general);
  const { singleRole } = useSelector((state: any) => state.dynamicData);
  const [roles, setRoles] = useState([]);

  const fetchList = async () => {
    dispatch(setLoading(true));
    const res = await hitApi("GET", `/role/list`);
    setRoles(res.result);
    dispatch(setLoading(false));
  };

  const getRoleToEdit = async (id: number) => {
    dispatch(setLoading(true));
    const res = await hitApi(`GET`, `/role/details/${id}`);
    if (res.status === "success") {
      dispatch(setSingleRole(res.result));
      dispatch(setFormModalShow(true));
      dispatch(setLoading(false));
    } else {
      dispatch(setError(res.message));
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  //Data table columns
  const columns = [
    {
      name: "Role",
      selector: (row: any) => row.roleName,
      sortable: true,
    },
    {
      name: "Permissions",
      selector: (row: any) => row.permissions,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <>
          <button
            className="btn btn-primary btn-sm me-2"
            title="Edit Role"
            onClick={() => {
              getRoleToEdit(row.id);
            }}
          >
            <i className="bi bi-pencil" />
          </button>
          <button className="btn btn-danger btn-sm" title="Delete Role">
            <i className="bi bi-trash" />
          </button>
        </>
      ),
    },
  ];
  return (
    <>
      <AdminLayout
        pageTitle="Roles and Permissions"
        breadcrumbs={[{ title: "Roles", isActive: true }]}
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
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                    <InputGroup.Text className="bg-transparent">
                      <button className="border-0 bg-transparent">
                        <i className="bi bi-search"></i>
                      </button>
                    </InputGroup.Text>
                  </InputGroup>
                </form>
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                    title="Add new Role"
                    onClick={() => {
                      dispatch(setFormModalShow(true));
                    }}
                  >
                    <i className="bi bi-plus-lg" />
                  </button>
                </div>
              </div>
              <div className="row">
                {(isError || isSuccess) && <AlertMessage />}
                <DataTable columns={columns} data={roles} />
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
      <FormContainerModal
        modalTitle={singleRole.id ? "Update Role" : "Add New Role"}
        formKey="ROLE_FORM"
        size="xl"
      >
        <AddRoleForm />
      </FormContainerModal>
    </>
  );
};

export default RolesListPage;
