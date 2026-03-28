import { Link } from "expo-router";
import { HeaderCustom, IconSymbol, ViewCustom } from "@/components/ui";
import { ReportForm } from "@/components/report/ReportForm";
import { useReport } from "@/features/report/hooks/useReport";

export default function Report() {
  const { other, setOther, option, toast, setToast, handlePress, changeOption } = useReport();

  return (
    <ViewCustom>
      <HeaderCustom
        title="Reportar"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      <ReportForm
        other={other}
        option={option}
        toast={toast}
        setOther={setOther}
        setToast={setToast}
        changeOption={changeOption}
        handlePress={handlePress}
      />
    </ViewCustom>
  );
}