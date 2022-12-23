export default function useDisclosure(isOpenDefault?: boolean): {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
};
