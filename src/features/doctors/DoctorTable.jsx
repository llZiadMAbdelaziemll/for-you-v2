import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useDoctors } from "./useDoctors";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import DoctorRow from "./DoctorRow";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

const TableTopic = styled.div`
  font-size: 1.7rem;
  letter-spacing: 0.0125em;
  font-weight: 500;
  padding: 1rem 1.5rem;
`;

function DoctorTable() {
  const { isLoading, doctors, count } = useDoctors();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!doctors.length) return <Empty resourceName="doctors" />;

  // 1) FILTER
  const filterValue = searchParams.get("department") || "all";

  let filteredDoctors;
  if (filterValue === "all") filteredDoctors = doctors;
  if (filterValue === "dentist")
    filteredDoctors = doctors.filter(
      (doctor) => doctor.department === "Dentist"
    );

  if (filterValue === "cardiology")
    filteredDoctors = doctors.filter(
      (doctor) => doctor.department === "Cardiology"
    );
  if (filterValue === "neurology")
    filteredDoctors = doctors.filter(
      (doctor) => doctor.department === "Neurology"
    );
  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "joiningDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedDoctors;
  if (field === "name" || field === "joiningDate") {
    if (direction === "asc") {
      sortedDoctors = filteredDoctors.sort((a, b) =>
        a[field].localeCompare(b[field])
      );
    }
    if (direction === "desc") {
      sortedDoctors = filteredDoctors.sort((a, b) =>
        b[field].localeCompare(a[field])
      );
    }
  }
  if (field === "price") {
    sortedDoctors = filteredDoctors.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  return (
    <Menus>
      <Table columns="60px 125px 120px 80px 110px 200px 80px 130px 10px">
        <TableTopic>Operations</TableTopic>
        <Table.Header>
          <div>Image</div>
          <div>Name</div>
          <div>Department</div>

          <div>Degree</div>
          <div>Mobile</div>
          <div>Email</div>
          <div>Price</div>
          <div>Joining Date</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedDoctors}
          render={(doctor) => <DoctorRow doctor={doctor} key={doctor.id} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default DoctorTable;
