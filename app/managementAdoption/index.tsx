import { AdoptionRequestModal } from "@/components/chat";
import { AdoptedView } from "@/components/managementAdoption/AdoptedView";
import { PendingRequestsView } from "@/components/managementAdoption/PendingRequestsView";
import { Loading, ViewCustom, Toast } from "@/components/ui";
import { useManagementAdoption } from "@/features/adoption/hooks/useManagementAdoption";
import { router } from "expo-router";

export default function ManagementAdoption() {
  const {
    items, selected, showModal, setShowModal, pinnedIds, togglePin,
    handleOpenModal, handleAccept, handleReject, loading, isAdopted,
    readOnly, toast, toastConfig, setToast, acceptedRequest
  } = useManagementAdoption();

  if (loading) return <Loading />;

  return (
    <ViewCustom>
      {isAdopted && 
      <AdoptedView 
        request={acceptedRequest?.request}  
        onGoToChat={() =>
          router.replace({ pathname: "/chat", params: { chatId: acceptedRequest?.request.chatId } })
        } 
        onOpenProfile={() => handleOpenModal} />
      }

      {!isAdopted && (
        <PendingRequestsView
          items={items}
          pinnedIds={pinnedIds}
          togglePin={togglePin}
          handleOpenModal={handleOpenModal}
        />
      )}

      <AdoptionRequestModal
        visible={showModal}
        profile={selected?.profile ?? null}
        onClose={() => setShowModal(false)}
        onAccept={handleAccept}
        onReject={handleReject}
        readOnly={readOnly}
      />

      {toast && toastConfig && (
        <Toast validation={toastConfig} setToast={setToast} />
      )}
    </ViewCustom>
  );
}