import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

function DoctorTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "price-asc", label: "Sort by price (low first)" },
          { value: "price-desc", label: "Sort by price (high first)" },
          {
            value: "joiningDate-asc",
            label: "Sort by joining Date (recent first)",
          },
          {
            value: "joiningDate-desc",
            label: "Sort by joining Date (earlier first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default DoctorTableOperations;
