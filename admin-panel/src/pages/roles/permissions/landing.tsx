import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../../components/common/AlertMessage";
import AddBulkPermissionForm from "../../../components/forms/roles/bulkPermissions/Add";
import FormContainerModal from "../../../components/modals/FormContainerModal";
import { setBulkPermissionList } from "../../../features/dynamicDataSlice";
import { setError, setSuccess } from "../../../features/generalSlice";
import { setFormModalShow } from "../../../features/modalSlice";
import AdminLayout from "../../../layout/admin";
import hitApi from "../../../services/apiService";

const PermissionsLandingPage = () => {
  const dispatch = useDispatch();
  //states
  const {
    dynamicData: { bulkPermissionList },
    general: { isSuccess, isError },
  } = useSelector((state: any) => state);

  //API calls
  const fetchList = async () => {
    const res = await hitApi("GET", "/role/listBulkPermissions");
    if (res.status === "success") {
      dispatch(setBulkPermissionList(res.result));
    } else {
      dispatch(setError(res.message));
    }
  };

  const deletePermission = async (id: number) => {
    if (
      window.confirm(
        "Are you sure to delete? you will not able to revert this action."
      ) === true
    ) {
      const res = await hitApi("DELETE", `/role/deleteBulkPermission/${id}`);
      if (res.status === "success") {
        dispatch(setSuccess(res.message));
      } else {
        dispatch(setError(res.message));
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  //data table columns
  const columns = [
    {
      name: "Permissions",
      selector: (row: any) => row.permission,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <>
          <button
            className="btn btn-danger btn-sm"
            title="Delete Permission from list"
            onClick={() => {
              deletePermission(row.id);
            }}
          >
            <i className="bi bi-trash" />
          </button>
        </>
      ),
    },
  ];
  return (
    <>
      <AdminLayout
        pageTitle="Permissions"
        breadcrumbs={[
          { title: "Roles", isActive: false, link: "/roles" },
          { title: "Permissions", isActive: true },
        ]}
      >
        <section className="section profile">
          <div className="card">
            <div className="card-body pt-3">
              <div className="row">
                {(isError || isSuccess) && <AlertMessage />}
                <div className="col-md-5">
                  <div className="d-flex justify-content-between">
                    <h4>Bulk list</h4>
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
                  <DataTable columns={columns} data={bulkPermissionList} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
      <FormContainerModal
        modalTitle="Add new permission"
        formKey="BULK_PER_ADD"
      >
        <AddBulkPermissionForm />
      </FormContainerModal>
    </>
  );
};

export default PermissionsLandingPage;
