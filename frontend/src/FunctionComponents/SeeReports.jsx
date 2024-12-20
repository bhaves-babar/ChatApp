import React, { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, useToast } from "@chakra-ui/react";

const SeeReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:5000/bb/admin/report");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error fetching reports",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    fetchReports();
  }, [toast]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Reported By</Th>
              <Th>Reported User</Th>
              <Th>Description</Th>
              <Th>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports.map((report) => (
              <Tr key={report._id}>
                <Td>{report.reportedBy.name} ({report.reportedBy.email})</Td>
                <Td>{report.reportedUser.name} ({report.reportedUser.email})</Td>
                <Td>{report.description}</Td>
                <Td>{new Date(report.timestamp).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SeeReports;
