import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from "@chakra-ui/react";

const ReportForm = ({ isOpen, onClose, reportedUser }) => {
  const [description, setDescription] = useState("");
  const [reportReason, setReportReason] = useState("Spam");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const reportedById = "66f76b65448108b9e666b989"; // Replace with the actual reportedBy ID

      const response = await fetch("http://localhost:5000/bb/user/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportedBy: reportedById, // Reported by user ID
          reportedUser: reportedUser._id, // Reported user ID
          description: `${reportReason} - ${description}`, // Description including the reason
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit report.");
      }

      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to submit report.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Report User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Reason for Reporting</FormLabel>
            <RadioGroup value={reportReason} onChange={setReportReason}>
              <Stack direction="column">
                <Radio value="Spam">Spam</Radio>
                <Radio value="Harassment">Harassment</Radio>
                <Radio value="Inappropriate Content">Inappropriate Content</Radio>
                <Radio value="Other">Other</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Additional Comments</FormLabel>
            <Textarea
              placeholder="Add any additional information (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit Report
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportForm;
