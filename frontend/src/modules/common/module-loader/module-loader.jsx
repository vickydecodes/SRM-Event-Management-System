import { DatatableLoader } from "@/core/utils/loader.util";
import NotPermitted from "../not-permitted/not-permitted";

export default function ModulePage({
  module,
  loader,
  loaderComponent,
  children,
  bypass=false
}) {
  if (!module?.allow?.view && !bypass) return <NotPermitted/>;

  if (loader || module.loading?.global) {
    return loaderComponent ?? <DatatableLoader />;
  }

  return children;
}
