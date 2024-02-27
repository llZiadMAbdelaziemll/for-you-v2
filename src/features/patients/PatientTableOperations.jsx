import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function PatientTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="patientFilters"
        options={[
          { value: "all", label: "All" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          {
            value: "birthdate-asc",
            label: "Sort by birthdate (recent first)",
          },
          {
            value: "birthdate-desc",
            label: "Sort by birthdate (earlier first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default PatientTableOperations;
