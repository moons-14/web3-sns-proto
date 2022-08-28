import { Modal, ModalProps, ModalTitle } from "../Elements";

const CreateChannelForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <div className="form-control">
        <label className="label">Channel Name</label>
        <input className="input input-bordered w-full" placeholder="zk club" />
      </div>
      <div className="form-control">
        <label className="label">Invite Members</label>
        <textarea
          className="textarea textarea-bordered w-full resize-none"
          placeholder="Maybe the founder of ETH."
        />
      </div>
      <button className="btn btn-primary">Create</button>
    </form>
  );
};

export const CreateChannelModal: React.FC<ModalProps> = (props) => {
  return (
    <Modal className="flex flex-col gap-2 p-4 sm:p-6" {...props}>
      <ModalTitle className="text-lg font-bold">Create New Chat</ModalTitle>
      <CreateChannelForm />
    </Modal>
  );
};
