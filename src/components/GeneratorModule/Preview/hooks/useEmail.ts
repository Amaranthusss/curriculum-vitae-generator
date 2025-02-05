import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useEmail = (
  renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
  renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
  const email: Profile["email"] = useProfileStore(({ email }) => email);

  const renderEmail = useCallback((): Content => {
    if (_.isEmpty(email)) return [];
    return [renderSidebarCaption("E-mail address"), renderSidebarTag(email)];
  }, [renderSidebarCaption, renderSidebarTag, email]);

  return { renderEmail };
};
