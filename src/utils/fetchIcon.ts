import _ from "lodash";

export const fetchIcon = async (url: string | undefined): Promise<string> => {
  if (_.isNil(url) || _.isEmpty(url)) return "";

  const response: Response = await fetch(url);

  return await response.text();
};
