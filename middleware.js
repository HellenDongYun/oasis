import { auth } from "./lib/auth";

// export function middleware(request) {
//   console.log(request);
//   return NextResponse.redirect(new URL("/about", request.url));
// }

export const middleware = auth;

//by default middleware runs on every route,所以如果不写matcher 重定向的时候会报错，所以需要写上matcher
export const config = {
  //matcher: "/about"
  //matcher: ["/account", "/account/*", "/account/[...all]"],
  matcher: ["/account"],
};
