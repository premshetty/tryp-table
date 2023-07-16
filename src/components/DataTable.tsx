import { useState } from "react";
import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  Select,
  Button,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";

interface DataRow {
  Timestamp: string;
  "Purchase Id": string;
  Mail: string;
  Name: string;
  Source: string;
  Status: string;
}

interface DataTableProps {
  headers: { [key: string]: string };
  rows: DataRow[];
  caption: string;
  sorting?: boolean;
  pagination?: boolean;
  filter?: boolean;
  searchbar?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  headers,
  rows,
  caption = '',
  sorting = false,
  pagination = false,
  filter = false,
  searchbar = false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const headerValues = Object.values(headers);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiff = now.getTime() - date.getTime();

    if (date.toDateString() === now.toDateString()) {
      const minsDiff = Math.floor(timeDiff / (1000 * 60));
      const hrsDiff = Math.floor(timeDiff / (1000 * 60 * 60));

      if (minsDiff < 60) {
        return `${minsDiff} min${minsDiff !== 1 ? 's' : ''} ago`;
      }
      return `${hrsDiff} hr${hrsDiff !== 1 ? 's' : ''} ago`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSource(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedRows = [...rows].sort((a, b) => {
    const timestampA = new Date(a.Timestamp).getTime();
    const timestampB = new Date(b.Timestamp).getTime();

    return sortOrder === "asc"
      ? timestampA - timestampB
      : timestampB - timestampA;
  });

  const filteredRows = sortedRows.filter((row) => {
    const sourceMatches =
      selectedSource === "" || row.Source === selectedSource;
    const statusMatches =
      selectedStatus === "" || row.Status === selectedStatus;
    const searchTermMatches = Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sourceMatches && statusMatches && searchTermMatches;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedRows = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          className="pagination-btn"
          size="sm"
          colorScheme={currentPage === i ? "blue" : "gray"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <TableContainer className="table-container">
      <div className="filter-section">
        {searchbar && <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search text-secondary "
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>}
        {filter && (
          <Select
            className="text-secondary select pointer"
            placeholder="Select source"
            onChange={handleSourceChange}
            value={selectedSource}
          >
            <option value="">All</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Website">Website</option>
          </Select>
        )}
        {filter && (
          <Select
            className="text-secondary select pointer"
            placeholder="Select status"
            onChange={handleStatusChange}
            value={selectedStatus}
          >
            <option value="">All</option>
            <option value="Waiting">Waiting</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </Select>
        )}
      </div>
      <Table variant="simple" className="table" >
        <TableCaption className="text-secondary">{caption}</TableCaption>
        <Thead>
          <Tr>
            {headerValues.map((header, index) => {
              return header.toLowerCase() === "timestamp" ? (
                <Th
                  className="text-main pointer"
                  key={index}
                  onClick={handleSort}
                >
                  <Flex alignItems={"center"}>
                    {header}
                    {sorting && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="sort-icon lucide lucide-arrow-down-up"
                      >
                        <path d="m3 16 4 4 4-4" />
                        <path d="M7 20V4" />
                        <path d="m21 8-4-4-4 4" />
                        <path d="M17 4v16" />
                      </svg>
                    )}
                  </Flex>
                </Th>
              ) : (
                <Th className="text-main" key={index}>
                  {header}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {paginatedRows.map((row) => (
            <Tr className="text-secondary" key={row["Purchase Id"]}>
              <Td>{formatDate(row.Timestamp)}</Td>
              <Td>{row["Purchase Id"]}</Td>
              <Td>{row.Mail}</Td>
              <Td>{row.Name}</Td>
              <Td>{row.Source}</Td>
              <Td>
                <span className={row.Status}>{row.Status}</span>
              </Td>
              <Td>
                <span className="selectrow">Select</span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {pagination && (
        <Flex className="pagination" mt={4}>
          <ButtonGroup>{renderPaginationButtons()}</ButtonGroup>
        </Flex>
      )}
    </TableContainer>
  );
};

export default DataTable;
