"use client";

import { Group, Text, Modal, ModalProps, Button, Stack } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { PropsWithChildren, useState } from "react";

interface ViewImageModal extends PropsWithChildren {
  opened: boolean;
  onClose: () => void;
}

const ViewImageModal = ({ opened, onClose, children }: ViewImageModal) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton
      centered
      title="Upload Image"
    >
      {children}
    </Modal>
  );
};

export default ViewImageModal;
