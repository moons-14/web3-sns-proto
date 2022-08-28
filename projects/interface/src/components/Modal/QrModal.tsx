import { QRCodeSVG } from "qrcode.react";

import { Modal, ModalProps, ModalTitle } from "../Elements";

export const QrModal: React.FC<ModalProps & { value?: string }> = ({
  value,
  ...props
}) => {
  return (
    <Modal className="flex flex-col items-center gap-2 bg-white p-4" {...props}>
      <ModalTitle className="text-lg font-bold">Wallet QRCode</ModalTitle>
      <div className="relative aspect-square h-full w-full max-w-xs">
        <QRCodeSVG className="h-full w-full" value={value || ""} />
      </div>
    </Modal>
  );
};
