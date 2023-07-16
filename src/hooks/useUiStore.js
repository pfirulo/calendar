import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isDateModalOpen
    } = useSelector(state => state.ui);

    const openDataModal = () => {
        dispatch(onOpenDateModal());
    }

    const closeDataModal = () => {
        dispatch(onCloseDateModal());
    }

    return {
        isDateModalOpen,
        openDataModal,
        closeDataModal
    }
}