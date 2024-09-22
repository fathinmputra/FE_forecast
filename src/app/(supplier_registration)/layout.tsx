import MainContainerRegisterSupplier from "@/components/layouts/main-container-register-supplier";

export default function DefaultRegisterSupplierLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <>
      <MainContainerRegisterSupplier>
        {/* BEGIN CONTENT AREA */}
        <div className="py-6 px-6 lg:px-24 xl:px-32">
          {children}
        </div>
        {/* END CONTENT AREA */}
      </MainContainerRegisterSupplier>
    </>
  );
}