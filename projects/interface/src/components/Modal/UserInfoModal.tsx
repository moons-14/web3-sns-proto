import Avatar from "boring-avatars";
import { useRecoilValue } from "recoil";

import { Modal, ModalProps, ModalTitle } from "../Elements";

import { profileState } from "@/states/account";
import { abbreviate } from "@/utils";

export const UserInfoModal: React.FC<ModalProps & { address: string }> = ({
  address,
  ...props
}) => {
  const profile = useRecoilValue(profileState(address));
  return (
    <Modal className="flex flex-col items-center bg-white py-4 px-8" {...props}>
      <div className="w-24 drop-shadow-lg">
        <Avatar size="100%" name={address} />
      </div>
      <ModalTitle className="text-2xl font-bold">{profile?.name}</ModalTitle>
      <div>
        Address
        <button
          className="btn btn-sm btn-ghost ml-2 px-0 text-sm"
          //  onClick={copyAddress}
        >
          {address ? abbreviate(address) : "0x00...000"}
        </button>
      </div>

      <div className="whitespace-pre break-words">{profile?.profile}</div>
    </Modal>
  );
};
