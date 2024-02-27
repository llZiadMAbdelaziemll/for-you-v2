import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="appointmentsFilters"
        options={[
          { value: "all", label: "All" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "severe", label: "Severe" },
          { value: "mild", label: "Mild" },
          { value: "moderate", label: "Moderate" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A to Z)" },
          { value: "name-desc", label: "Sort by name (Z to A)" },
          { value: "startDate-asc", label: "Sort by date (recent first)" },
          { value: "startDate-desc", label: "Sort by date (earlier first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
