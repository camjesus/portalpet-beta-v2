import * as WebBrowser from "expo-web-browser";

export function redirectSystemPath({ path }: { path: string }) {
  if (path.includes("oauth2redirect") || path.includes("oauthredirect")) {
    WebBrowser.maybeCompleteAuthSession();
    return "/oauthredirect";
  }

  return path;
}
