"use client";

import {
  Group,
  Text,
  Modal,
  ModalProps,
  Button,
  Stack,
  Flex,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";

interface UploadModalProps extends Omit<ModalProps, "onSubmit"> {
  onUpload: (files: File[]) => Promise<void>;
  dropzoneProps?: Partial<DropzoneProps>;
}

const UploadModal = ({
  opened,
  onClose,
  dropzoneProps,
  onUpload,
}: UploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (accepted: File[]) => {
    console.log("Accepted files:", accepted);
    setFiles(accepted);
  };

  const [loading, setLoading] = useState(false);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton
      centered
      title="Upload Image"
    >
      <Dropzone
        onDrop={handleDrop}
        onReject={(rejected) => console.log("Rejected files:", rejected)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...dropzoneProps}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={52}
              color="var(--mantine-color-blue-6)"
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              size={52}
              color="var(--mantine-color-dimmed)"
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            {files.length > 0 ? (
              <Stack mt="md">
                {files.map((file) => (
                  <Text key={file.name}>{file.name}</Text>
                ))}
              </Stack>
            ) : (
              <>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5MB
                </Text>
              </>
            )}
          </div>
        </Group>
      </Dropzone>

      <Flex direction={"row"} justify={"end"}>
        <Button
          mt="md"
          loading={loading}
          onClick={async () => {
            if (files.length === 0) return;

            try {
              setLoading(true);
              await onUpload(files);
              setFiles([]);
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          }}
          disabled={files.length === 0}
        >
          Submit
        </Button>
      </Flex>
    </Modal>
  );
};

export default UploadModal;
