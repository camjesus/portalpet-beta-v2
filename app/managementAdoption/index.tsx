import { AdoptionRequestModal } from "@/components/chat";
import AdoptionProgress from "@/components/managementAdoption/AdoptionProgress";
import { PendingRequestsView } from "@/components/managementAdoption/PendingRequestsView";
import { HeaderCustom, IconSymbol, Loading, TextInfo, ViewCustom } from "@/components/ui";
import { useManagementAdoption } from "@/features/adoption/hooks/useManagementAdoption";
import { router } from "expo-router";

export default function ManagementAdoption() {
  const { items, selected, showModal, setShowModal, pinnedIds, togglePin,
    handleOpenModal, handleAccept, handleReject, acceptedRequest, loading, isAdopted , readOnly} = useManagementAdoption();
  
if (loading) return <Loading />;

  return (
      <ViewCustom>
        {isAdopted && (
          <TextInfo text={`La mascota ha sido adoptada.`} />
        )}
      {acceptedRequest && !isAdopted? (
        <AdoptionProgress acceptedRequest={acceptedRequest} 
          onGoToChat={() =>
            router.push({ pathname: "/chat", params: { chatId: acceptedRequest.request.chatId } })
          }
          onOpenProfile={() => handleOpenModal(acceptedRequest, true)}
        />
      ) : !acceptedRequest && !isAdopted && (
        <PendingRequestsView
        items={items}
        selected={selected}
        showModal={showModal}
        setShowModal={setShowModal}
        pinnedIds={pinnedIds}
        togglePin={togglePin}
        handleOpenModal={handleOpenModal}
        handleAccept={handleAccept}
        handleReject={handleReject}
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
    </ViewCustom>
  );
}