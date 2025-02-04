import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import { fetchIcon } from "../../../../utils/fetchIcon";
import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { LinkField } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";

export const useLinks = (
  renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
  renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
  const links: LinkField[] = useProfileStore(({ links }) => links);

  const renderLinks = useCallback(async (): Promise<Content> => {
    const tags: Content[] = [];

    for (const link of links) {
      if (_.isEmpty(link)) continue;
      if (_.isEmpty(link.link)) continue;
      if (_.isEmpty(link.label)) continue;
      console.log(link);

      const iconBase64: string = await fetchIcon(link.icon);

      tags.push(renderSidebarCaption(link.label, iconBase64));
      tags.push(renderSidebarTag(link.link));
    }

    console.log(tags);

    return tags;
  }, [renderSidebarCaption, renderSidebarTag, links]);

  return { renderLinks };
};
