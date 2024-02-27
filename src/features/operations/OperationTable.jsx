import OperationRow from "./OperationRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useOperations } from "./useOperations";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";

function OperationTable() {
  const { operations, isLoading, count } = useOperations();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!operations.length) return <Empty resourceName="operations" />;

  // 1) FILTER
  const filterValue = searchParams.get("opr") || "all";

  let filteredOperations;
  if (filterValue === "all") filteredOperations = operations;
  if (filterValue === "checked-in")
    filteredOperations = operations.filter(
      (operation) => operation.status === "checked-in"
    );

  if (filterValue === "checked-out")
    filteredOperations = operations.filter(
      (operation) => operation.status === "checked-out"
    );
  if (filterValue === "unconfirmed")
    filteredOperations = operations.filter(
      (operation) => operation.status === "unconfirmed"
    );
  if (filterValue === "male")
    filteredOperations = operations.filter(
      (operation) => operation.patients.gender === "male"
    );

  if (filterValue === "female")
    filteredOperations = operations.filter(
      (operation) => operation.patients.gender === "female"
    );
  if (filterValue === "severe")
    filteredOperations = operations.filter(
      (operation) => operation.condition === "severe"
    );

  if (filterValue === "mild")
    filteredOperations = operations.filter(
      (operation) => operation.condition === "mild"
    );

  if (filterValue === "moderate")
    filteredOperations = operations.filter(
      (operation) => operation.condition === "moderate"
    );
  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  let sortedOperations;
  if (field === "name") {
    if (direction === "asc") {
      sortedOperations = filteredOperations.sort((a, b) =>
        a.patients[field].localeCompare(b.patients[field])
      );
    }
    if (direction === "desc") {
      sortedOperations = filteredOperations.sort((a, b) =>
        b.patients[field].localeCompare(a.patients[field])
      );
    }
  }
  if (field === "startDate") {
    if (direction === "asc") {
      sortedOperations = filteredOperations.sort((a, b) =>
        a[field].localeCompare(b[field])
      );
    }
    if (direction === "desc") {
      sortedOperations = filteredOperations.sort((a, b) =>
        b[field].localeCompare(a[field])
      );
    }
  }
  console.log(sortedOperations);
  return (
    <Menus>
      <Table columns="60px 120px 120px 120px 120px 100px 10px">
        <Table.Header>
          <div>Image</div>
          <div>Patient Name</div>

          <div>Doctor</div>
          <div>Date</div>
          <div>Report</div>
          <div>Diseases</div>

          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedOperations}
          render={(operation) => (
            <OperationRow key={operation.id} operation={operation} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OperationTable;
