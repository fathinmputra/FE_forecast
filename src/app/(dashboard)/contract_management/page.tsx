import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ContractManagementMenu = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);
}

export default ContractManagementMenu;