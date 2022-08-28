import { Modal, ModalProps, ModalTitle } from "../Elements";

const CreateChannelForm = () => {
  return <form></form>;
};

export const CreateChannelModal: React.FC<ModalProps> = (props) => {
  return (
    <Modal className="flex flex-col gap-2 p-4 sm:p-6" {...props}>
      <ModalTitle className="text-lg font-bold">Create New Chat</ModalTitle>
      <CreateChannelForm />
    </Modal>
  );
};
