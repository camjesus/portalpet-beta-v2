import AdoptionProgress from "@/components/managementAdoption/AdoptionProgress";
import { AdoptionRequestModal } from "@/components/chat";
import { Loading, ViewCustom } from "@/components/ui";
import { useManagementAdoptionProgress } from "@/features/adoption/hooks/useManagementAdoptionProgress";
import { router } from "expo-router";

export default function ManagementAdoptionProgress() {
  const {
    acceptedRequest,
    loading,
    selected,
    showModal,
    setShowModal,
    handleOpenModal,
    readOnly,
  } = useManagementAdoptionProgress();

  if (loading) return <Loading />;
  if (!acceptedRequest) return null;

  return (
    <ViewCustom>
      <AdoptionProgress
        acceptedRequest={acceptedRequest}
        onGoToChat={() =>
          router.push({ pathname: "/chat", params: { chatId: acceptedRequest.request.chatId } })
        }
        onOpenProfile={() => handleOpenModal(acceptedRequest, true)}
      />

      <AdoptionRequestModal
        visible={showModal}
        profile={selected?.profile ?? null}
        onClose={() => setShowModal(false)}
        readOnly={readOnly}
      />
    </ViewCustom>
  );
}