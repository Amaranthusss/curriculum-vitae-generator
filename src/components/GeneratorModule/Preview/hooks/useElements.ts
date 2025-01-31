import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import type { UseSidebarElements } from "./useSidebarElements";
import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useElements = (
  renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
  renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
  const email: Profile["email"] = useProfileStore(({ email }) => email);
  const country: Profile["country"] = useProfileStore(({ country }) => country);

  const renderEmail = useCallback((): Content => {
    return [renderSidebarCaption("E-mail address"), renderSidebarTag(email)];
  }, [renderSidebarCaption, renderSidebarTag, email]);

  const renderCountry = useCallback((): Content => {
    return [renderSidebarCaption("Country"), renderSidebarTag(country)];
  }, [renderSidebarCaption, renderSidebarTag, country]);

  return { renderEmail, renderCountry };
};
