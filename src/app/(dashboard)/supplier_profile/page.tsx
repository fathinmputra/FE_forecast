import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SupplierProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/supplier_profile/general');
  }, [router]);

  
  return null
}

export default SupplierProfilePage