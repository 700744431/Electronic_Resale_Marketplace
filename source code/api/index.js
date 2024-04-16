var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest,
  handleDataRequest: () => handleDataRequest
});
var import_server = require("react-dom/server"), import_react = require("@remix-run/react"), import_remix = require("@mantine/remix"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), handleDataRequest = async (response, { request }) => {
  let isGet = request.method.toLowerCase() === "get", isPrefetch = (request.headers.get("Purpose") || request.headers.get("X-Purpose") || request.headers.get("Sec-Purpose") || request.headers.get("Sec-Fetch-Purpose") || request.headers.get("Moz-Purpose")) === "prefetch";
  return isGet && isPrefetch && !response.headers.has("Cache-Control") && response.headers.set("Cache-Control", "private, max-age=5"), response;
}, server = (0, import_remix.createStylesServer)();
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, {
      context: remixContext,
      url: request.url
    }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 37,
      columnNumber: 3
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response(`<!DOCTYPE html>${(0, import_remix.injectStyles)(markup, server)}`, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  Document: () => Document,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_core = require("@mantine/core"), import_modals = require("@mantine/modals"), import_notifications2 = require("@mantine/notifications"), import_remix2 = require("@mantine/remix"), import_node3 = require("@remix-run/node"), import_react3 = require("@remix-run/react");

// app.config.ts
var appConfig = {
  name: "Electronic Resale Management System",
  logo: "/logo.png"
}, app_config_default = appConfig;

// app/context/CartContext.tsx
var import_solid = require("@heroicons/react/24/solid"), import_notifications = require("@mantine/notifications"), React2 = __toESM(require("react"));

// app/utils/hooks.ts
var import_react2 = require("@remix-run/react"), React = __toESM(require("react"));
function useMatchesData(routeId) {
  let matchingRoutes = (0, import_react2.useMatches)(), route = React.useMemo(
    () => matchingRoutes.find((route2) => route2.id === routeId),
    [matchingRoutes, routeId]
  );
  return route == null ? void 0 : route.data;
}
function useOptionalUser() {
  return useMatchesData("root");
}
function useUser() {
  let { user } = useOptionalUser();
  if (!user)
    throw new Error("No user found");
  return user;
}
function useAppData() {
  return useMatchesData("routes/__app");
}
function useProduct(slug) {
  let { products } = useAppData();
  return products.find((product2) => product2.slug === slug);
}
function useLocalStorageState({
  key,
  defaultValue
}) {
  let [value, setValue] = React.useState(defaultValue);
  return React.useEffect(() => {
    let localStorageValue = window.localStorage.getItem(key);
    if (!localStorageValue) {
      setValue(defaultValue);
      return;
    }
    setValue(JSON.parse(localStorageValue));
  }, []), React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]), [value, setValue];
}

// app/context/CartContext.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), LocalStorageKey = "ekart-application", CartContext = React2.createContext(void 0);
function CartProvider({ children }) {
  let [items, setItems] = useLocalStorageState({
    key: LocalStorageKey,
    defaultValue: []
  }), totalPrice = items.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  ), clearCart = React2.useCallback(() => {
    (0, import_notifications.cleanNotifications)(), setItems([]), (0, import_notifications.showNotification)({
      title: "Successfully cleared",
      message: "All items in the cart are cleared",
      icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_solid.CheckCircleIcon, {
        className: "h-7 w-7"
      }, void 0, !1, {
        fileName: "app/context/CartContext.tsx",
        lineNumber: 41,
        columnNumber: 10
      }, this),
      color: "green"
    });
  }, [setItems]), addItemToCart = React2.useCallback(
    (item) => {
      let isAlreadyInCart = items.some((i) => i.id === item.id);
      if (!items.every((i) => i.sellerId === item.sellerId))
        return (0, import_notifications.showNotification)({
          title: "Cannot add item",
          message: "Items from different sellers cannot be added to cart",
          icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_solid.MinusCircleIcon, {
            className: "h-7 w-7"
          }, void 0, !1, {
            fileName: "app/context/CartContext.tsx",
            lineNumber: 55,
            columnNumber: 12
          }, this),
          color: "red"
        });
      if ((0, import_notifications.cleanNotifications)(), !isAlreadyInCart)
        return setItems((prev) => [
          ...prev,
          {
            ...item,
            quantity: item.quantity
          }
        ]), (0, import_notifications.showNotification)({
          title: "Successfully added",
          message: `Added ${item.name} to cart`,
          color: "green",
          icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_solid.CheckCircleIcon, {
            className: "h-9 w-9"
          }, void 0, !1, {
            fileName: "app/context/CartContext.tsx",
            lineNumber: 75,
            columnNumber: 12
          }, this)
        });
      setItems((prevItems) => {
        let newItems = [...prevItems], index = newItems.findIndex((i) => i.id === item.id);
        return index > -1 && (newItems[index].quantity = newItems[index].quantity + item.quantity), newItems;
      }), (0, import_notifications.showNotification)({
        title: "Item already present in cart",
        message: `Quantity increased by ${item.quantity}`,
        icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_solid.CheckCircleIcon, {
          className: "h-7 w-7"
        }, void 0, !1, {
          fileName: "app/context/CartContext.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        color: "green"
      });
    },
    [items, setItems]
  ), removeItemFromCart = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId)), (0, import_notifications.showNotification)({
      title: "Successfully removed",
      message: "Item removed from cart",
      icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_solid.MinusCircleIcon, {
        className: "h-7 w-7"
      }, void 0, !1, {
        fileName: "app/context/CartContext.tsx",
        lineNumber: 106,
        columnNumber: 10
      }, this),
      color: "red"
    });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CartContext.Provider, {
    value: {
      itemsInCart: items,
      totalPrice,
      addItemToCart,
      removeItemFromCart,
      clearCart
    },
    children
  }, void 0, !1, {
    fileName: "app/context/CartContext.tsx",
    lineNumber: 112,
    columnNumber: 3
  }, this);
}
function useCart() {
  let context = React2.useContext(CartContext);
  if (!context)
    throw new Error("`useCart()` must be used within a <CartProvider />");
  return context;
}

// app/lib/session.server.ts
var import_client3 = require("@prisma/client"), import_node2 = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/lib/user.server.ts
var import_client2 = require("@prisma/client"), bcrypt2 = __toESM(require("bcryptjs"));

// app/lib/prisma.server.ts
var import_client = require("@prisma/client"), prisma;
global.__db__ || (global.__db__ = new import_client.PrismaClient()), prisma = global.__db__, prisma.$connect();

// app/utils/misc.server.ts
var import_node = require("@remix-run/node");
var bcrypt = __toESM(require("bcryptjs")), DEFAULT_REDIRECT = "/", badRequest = (data) => (0, import_node.json)(data, { status: 400 });
function validateEmail(email2) {
  return typeof email2 == "string" && email2.length > 3 && email2.includes("@");
}
function validateName(name2) {
  return typeof name2 == "string" && name2.length > 1;
}
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to || typeof to != "string" || !to.startsWith("/") || to.startsWith("//") ? defaultRedirect : to;
}
function createPasswordHash(password2) {
  return bcrypt.hash(password2, 10);
}

// app/lib/user.server.ts
async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: !0,
      name: !0,
      email: !0,
      address: !0,
      hasResetPassword: !0
    }
  });
}
async function getUserByEmail(email2) {
  return prisma.user.findUnique({
    where: { email: email2 },
    select: {
      name: !0,
      email: !0
    }
  });
}
async function createUser({
  email: email2,
  password: password2,
  name: name2,
  role = import_client2.Role.CUSTOMER,
  address
}) {
  return prisma.user.create({
    data: {
      name: name2,
      email: email2,
      password: await createPasswordHash(password2),
      role,
      address
    }
  });
}
async function verifyLogin(email2, password2) {
  let userWithPassword = await prisma.user.findUnique({
    where: { email: email2 }
  });
  if (!userWithPassword || !userWithPassword.password || !await bcrypt2.compare(password2, userWithPassword.password))
    return null;
  let { password: _password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
}

// app/lib/session.server.ts
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId", USER_ROLE_KEY = "userRole", fourteenDaysInSeconds = 60 * 60 * 24 * 14, thirtyDaysInSeconds = 60 * 60 * 24 * 30;
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = await getUserId(request);
  if (!userId) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node2.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function requireUser(request, redirectTo = new URL(request.url).pathname) {
  let userId = await requireUserId(request, redirectTo), user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function createUserSession({
  request,
  userId,
  role,
  remember = !1,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), session.set(USER_ROLE_KEY, role), (0, import_node2.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? fourteenDaysInSeconds : thirtyDaysInSeconds
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return session.unset(USER_SESSION_KEY), (0, import_node2.redirect)("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}
async function isCustomer(request) {
  return (await getSession(request)).get(USER_ROLE_KEY) === import_client3.Role.CUSTOMER;
}
async function isAdmin(request) {
  return (await getSession(request)).get(USER_ROLE_KEY) === import_client3.Role.ADMIN;
}
async function isSeller(request) {
  return (await getSession(request)).get(USER_ROLE_KEY) === import_client3.Role.SELLER;
}

// app/styles/app.css
var app_default = "/build/_assets/app-QQB26BTY.css";

// app/root.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), appendCache = (0, import_core.createEmotionCache)({ key: "mantine", prepend: !1 }), links = () => [{ rel: "stylesheet", href: app_default }], loader = async ({ request }) => {
  let user = await getUser(request);
  return (0, import_node3.json)({ user });
}, meta = () => ({
  charset: "utf-8",
  title: app_config_default.name,
  viewport: "width=device-width,initial-scale=1"
});
function Document({
  title,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_core.MantineProvider, {
    withNormalizeCSS: !0,
    emotionCache: appendCache,
    theme: {
      primaryColor: "dark",
      components: {
        Button: {
          defaultProps: {
            size: "xs"
          }
        },
        TextInput: {
          defaultProps: {
            size: "xs"
          }
        },
        PasswordInput: {
          defaultProps: {
            size: "xs"
          }
        },
        Textarea: {
          defaultProps: {
            size: "xs"
          }
        },
        Select: {
          defaultProps: {
            size: "xs"
          }
        },
        Switch: {
          defaultProps: {
            size: "xs"
          }
        }
      }
    },
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("html", {
      lang: "en",
      className: "h-full",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("head", {
          children: [
            title ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("title", {
              children: title
            }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 92,
              columnNumber: 15
            }, this) : null,
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Meta, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 93,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Links, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 94,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_remix2.StylesPlaceholder, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 95,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 91,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("body", {
          className: "h-full",
          children: [
            children,
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.ScrollRestoration, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 99,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Scripts, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 100,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.LiveReload, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 101,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 97,
          columnNumber: 5
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 90,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 51,
    columnNumber: 3
  }, this);
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Document, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_modals.ModalsProvider, {
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_notifications2.NotificationsProvider, {
        autoClose: 2e3,
        limit: 3,
        position: "top-center",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(CartProvider, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Outlet, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 114,
            columnNumber: 7
          }, this)
        }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 113,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 112,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 111,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 110,
    columnNumber: 3
  }, this);
}

// app/routes/api/queues/update-order-status.ts
var update_order_status_exports = {};
__export(update_order_status_exports, {
  action: () => action
});

// app/lib/order.server.ts
var import_client4 = require("@prisma/client"), import_remix3 = require("quirrel/remix");
function getAllOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: !0,
      payment: !0,
      products: {
        include: {
          product: !0
        }
      }
    }
  });
}
function getOrders(userId) {
  return prisma.order.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      products: {
        include: {
          product: !0
        }
      },
      payment: !0
    }
  });
}
function createOrder({
  userId,
  products,
  amount,
  orderType,
  paymentMethod,
  address,
  pickupTime
}) {
  return prisma.$transaction(async (tx) => {
    let order = await tx.order.create({
      data: {
        userId,
        type: orderType,
        status: import_client4.OrderStatus.PENDING,
        pickupTime,
        payment: {
          create: {
            paymentMethod,
            address,
            amount,
            user: {
              connect: {
                id: userId
              }
            }
          }
        }
      }
    });
    return await tx.productOrder.createMany({
      data: products.map((p) => ({
        productId: p.id,
        orderId: order.id,
        quantity: p.quantity,
        amount: p.basePrice * p.quantity
      }))
    }), await Promise.all(
      products.map(async (p) => {
        let product = await tx.product.update({
          where: {
            id: p.id
          },
          data: {
            quantity: {
              decrement: p.quantity
            }
          }
        });
        if (product.quantity < 0)
          throw new Error(`Product ${product.name} has insufficient quantity`);
      })
    ), order;
  });
}
async function cancelOrder(orderId) {
  let order = await prisma.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      products: {
        include: {
          product: !0
        }
      }
    }
  });
  if (!order)
    throw new Error("Order not found");
  await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: import_client4.OrderStatus.CANCELLED
    }
  });
  let products = order.products.map((p) => ({
    id: p.product.id,
    quantity: p.quantity,
    baseQuantity: p.product.quantity
  }));
  await Promise.all(
    products.map(
      (p) => prisma.product.update({
        where: {
          id: p.id
        },
        data: {
          quantity: {
            increment: p.quantity
          }
        }
      })
    )
  );
}
var updateOrderStatus = (0, import_remix3.Queue)(
  "/api/queues/update-order-status",
  async ({ orderId, status }) => {
  }
);

// app/routes/api/queues/update-order-status.ts
var action = updateOrderStatus;

// app/routes/api/reset-password.ts
var reset_password_exports = {};
__export(reset_password_exports, {
  action: () => action2
});
var import_node4 = require("@remix-run/node");
var action2 = async ({ request }) => {
  var _a, _b;
  let formData = await request.formData(), userId = (_a = formData.get("userId")) == null ? void 0 : _a.toString(), password2 = (_b = formData.get("password")) == null ? void 0 : _b.toString();
  return !userId || !password2 ? badRequest({
    success: !1,
    error: "Missing userId or password"
  }) : (await prisma.user.update({
    where: { id: userId },
    data: {
      password: await createPasswordHash(password2),
      hasResetPassword: !0
    }
  }), (0, import_node4.json)({ success: !0 }));
};

// app/routes/api/delete-staff.tsx
var delete_staff_exports = {};
__export(delete_staff_exports, {
  action: () => action3,
  loader: () => loader2
});
var import_node5 = require("@remix-run/node");
var action3 = async ({ request }) => {
  var _a;
  let id = (_a = (await request.formData()).get("id")) == null ? void 0 : _a.toString();
  return id && await prisma.user.delete({ where: { id } }), null;
}, loader2 = async ({ request }) => (0, import_node5.redirect)("/");

// app/routes/api/image-upload.ts
var image_upload_exports = {};
__export(image_upload_exports, {
  action: () => action4
});
var import_node6 = require("@remix-run/node"), action4 = async ({ request }) => {
  let uploadHandler = (0, import_node6.unstable_composeUploadHandlers)(
    (0, import_node6.unstable_createFileUploadHandler)({
      directory: "public/uploads",
      maxPartSize: 5e6
    }),
    (0, import_node6.unstable_createMemoryUploadHandler)()
  ), image = (await (0, import_node6.unstable_parseMultipartFormData)(request, uploadHandler)).get("img");
  return !image || typeof image == "string" ? (0, import_node6.json)({
    error: "something wrong"
  }) : (0, import_node6.json)({
    success: !0,
    imgSrc: `/uploads/${image.name}`
  });
};

// app/routes/api/auth/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action5,
  loader: () => loader3
});
var import_node7 = require("@remix-run/node");
var action5 = async ({ request }) => logout(request), loader3 = async () => (0, import_node7.redirect)("/");

// app/routes/__auth.tsx
var auth_exports = {};
__export(auth_exports, {
  default: () => AuthLayout,
  loader: () => loader4
});
var import_node8 = require("@remix-run/node"), import_react4 = require("@remix-run/react");
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), loader4 = async ({ request }) => await getUser(request) ? (0, import_node8.redirect)("/") : null;
function AuthLayout() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_jsx_dev_runtime4.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", {
      className: "flex min-h-full",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", {
          className: "relative hidden flex-1 lg:block",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("img", {
            className: "absolute inset-0 h-full w-full object-cover",
            src: "https://images.unsplash.com/photo-1574901200090-ca061722bdb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
            alt: ""
          }, void 0, !1, {
            fileName: "app/routes/__auth.tsx",
            lineNumber: 18,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__auth.tsx",
          lineNumber: 17,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", {
          className: "flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", {
            className: "mx-auto w-full max-w-sm lg:w-96",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react4.Outlet, {}, void 0, !1, {
              fileName: "app/routes/__auth.tsx",
              lineNumber: 27,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/__auth.tsx",
            lineNumber: 26,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__auth.tsx",
          lineNumber: 25,
          columnNumber: 5
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/__auth.tsx",
      lineNumber: 16,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__auth.tsx",
    lineNumber: 15,
    columnNumber: 3
  }, this);
}

// app/routes/__auth/register.tsx
var register_exports = {};
__export(register_exports, {
  action: () => action6,
  default: () => Register
});
var import_core2 = require("@mantine/core"), import_client5 = require("@prisma/client"), import_react5 = require("@remix-run/react");
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), action6 = async ({ request }) => {
  var _a;
  let formData = await request.formData(), email2 = formData.get("email"), password2 = formData.get("password"), confirmPassword = formData.get("confirmPassword"), name2 = formData.get("name"), address = (_a = formData.get("address")) == null ? void 0 : _a.toString();
  if (!validateName(name2))
    return badRequest({
      fieldErrors: {
        name: "Name is required"
      }
    });
  if (!validateEmail(email2))
    return badRequest({
      fieldErrors: { email: "Email is invalid" }
    });
  if (typeof password2 != "string" || typeof confirmPassword != "string")
    return badRequest({
      fieldErrors: { password: "Password is required" }
    });
  if (password2.length < 8 || confirmPassword.length < 8)
    return badRequest({
      fieldErrors: { password: "Password is too short" }
    });
  if (password2 !== confirmPassword)
    return badRequest({
      fieldErrors: { password: "Passwords do not match" }
    });
  if (await getUserByEmail(email2))
    return badRequest({
      fieldErrors: { email: "A user already exists with this email" }
    });
  let user = await createUser({ email: email2, password: password2, name: name2, address });
  return createUserSession({
    request,
    userId: user.id,
    role: import_client5.Role.CUSTOMER,
    redirectTo: "/"
  });
};
function Register() {
  var _a, _b, _c, _d;
  let transition = (0, import_react5.useTransition)(), actionData = (0, import_react5.useActionData)(), isSubmitting = transition.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_jsx_dev_runtime5.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", {
            className: "mt-6 text-3xl font-extrabold text-gray-900",
            children: "Register"
          }, void 0, !1, {
            fileName: "app/routes/__auth/register.tsx",
            lineNumber: 81,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", {
            className: "mt-2 text-sm text-gray-600",
            children: [
              "Have an account already?",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.Anchor, {
                component: import_react5.Link,
                to: "/login",
                size: "sm",
                prefetch: "intent",
                children: "Sign in"
              }, void 0, !1, {
                fileName: "app/routes/__auth/register.tsx",
                lineNumber: 84,
                columnNumber: 6
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__auth/register.tsx",
            lineNumber: 82,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__auth/register.tsx",
        lineNumber: 80,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.Form, {
        replace: !0,
        method: "post",
        className: "mt-8",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("fieldset", {
          disabled: isSubmitting,
          className: "flex flex-col gap-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.TextInput, {
              name: "name",
              autoComplete: "given-name",
              label: "Name",
              error: (_a = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _a.name,
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 92,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.TextInput, {
              name: "email",
              type: "email",
              autoComplete: "email",
              label: "Email address",
              error: (_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.email,
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 100,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.PasswordInput, {
              name: "password",
              label: "Password",
              error: (_c = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _c.password,
              autoComplete: "current-password",
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 109,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.PasswordInput, {
              name: "confirmPassword",
              label: "Confirm password",
              error: (_d = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _d.password,
              autoComplete: "current-password",
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 117,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.Textarea, {
              name: "address",
              label: "Address",
              autoComplete: "street-address"
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 125,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.Button, {
              type: "submit",
              loading: isSubmitting,
              fullWidth: !0,
              loaderPosition: "right",
              mt: "1rem",
              children: "Register"
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 131,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__auth/register.tsx",
          lineNumber: 91,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__auth/register.tsx",
        lineNumber: 90,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__auth/register.tsx",
    lineNumber: 79,
    columnNumber: 3
  }, this);
}

// app/routes/__auth/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action7,
  default: () => Login
});
var import_core3 = require("@mantine/core"), import_react6 = require("@remix-run/react");

// app/lib/zod.schema.ts
var import_zod = require("zod"), name = import_zod.z.string().min(1, "Name is required"), email = import_zod.z.string().email("Invalid email"), password = import_zod.z.string().min(8, "Password must be at least 8 characters"), LoginSchema = import_zod.z.object({
  email,
  password,
  redirectTo: import_zod.z.string().default("/")
}), RegisterUserSchema = import_zod.z.object({
  name,
  email,
  password,
  confirmPassword: password
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["password", "confirmPassword"]
}), ManageProductSchema = import_zod.z.object({
  productId: import_zod.z.string().optional(),
  name: import_zod.z.string().min(1, "Name is required"),
  description: import_zod.z.string().min(1, "Description is required"),
  quantity: import_zod.z.preprocess(
    Number,
    import_zod.z.number().min(1, "Quantity must be at least 1")
  ),
  price: import_zod.z.preprocess(
    Number,
    import_zod.z.number().min(0, "Price must be greater than 0")
  ),
  image: import_zod.z.string().min(1, "Image is required"),
  category: import_zod.z.string().min(1, "Category is required").transform((value) => value.split(","))
});

// app/utils/validation.ts
async function validateAction(request, schema) {
  let formData = await request.formData(), fields = Object.fromEntries(formData), result = schema.safeParse(fields);
  return result.success ? {
    fields: result.data,
    fieldErrors: null
  } : {
    fields: null,
    fieldErrors: result.error.issues.reduce(
      (acc, issue) => {
        let key = issue.path[0] ?? issue.code;
        return acc[key] = issue.message, acc;
      },
      {}
    )
  };
}

// app/routes/__auth/login.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), action7 = async ({ request }) => {
  let { fieldErrors, fields } = await validateAction(request, LoginSchema);
  if (fieldErrors)
    return badRequest({ fieldErrors });
  let { email: email2, password: password2, redirectTo } = fields, user = await verifyLogin(email2, password2);
  return user ? createUserSession({
    request,
    userId: user.id,
    role: user.role,
    remember: !0,
    redirectTo: safeRedirect(redirectTo)
  }) : badRequest({
    fieldErrors: {
      password: "Invalid username or password"
    }
  });
};
function Login() {
  var _a, _b;
  let [searchParams] = (0, import_react6.useSearchParams)(), fetcher = (0, import_react6.useFetcher)(), actionData = fetcher.data, redirectTo = searchParams.get("redirectTo") || "/", isSubmitting = fetcher.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_jsx_dev_runtime6.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", {
            className: "mt-6 text-3xl font-extrabold text-gray-900",
            children: "Sign in"
          }, void 0, !1, {
            fileName: "app/routes/__auth/login.tsx",
            lineNumber: 54,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", {
            className: "mt-2 text-sm text-gray-600",
            children: [
              "Do not have an account yet?",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.Anchor, {
                component: import_react6.Link,
                to: "/register",
                size: "sm",
                prefetch: "intent",
                children: "Create account"
              }, void 0, !1, {
                fileName: "app/routes/__auth/login.tsx",
                lineNumber: 57,
                columnNumber: 6
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__auth/login.tsx",
            lineNumber: 55,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__auth/login.tsx",
        lineNumber: 53,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(fetcher.Form, {
        method: "post",
        replace: !0,
        className: "mt-8",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", {
            type: "hidden",
            name: "redirectTo",
            value: redirectTo
          }, void 0, !1, {
            fileName: "app/routes/__auth/login.tsx",
            lineNumber: 64,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("fieldset", {
            disabled: isSubmitting,
            className: "flex flex-col gap-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.TextInput, {
                name: "email",
                type: "email",
                autoComplete: "email",
                label: "Email address",
                error: (_a = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _a.email,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/__auth/login.tsx",
                lineNumber: 67,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.PasswordInput, {
                name: "password",
                label: "Password",
                error: (_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.password,
                autoComplete: "current-password",
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/__auth/login.tsx",
                lineNumber: 76,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.Button, {
                type: "submit",
                loading: isSubmitting,
                fullWidth: !0,
                loaderPosition: "right",
                mt: "1rem",
                children: "Sign in"
              }, void 0, !1, {
                fileName: "app/routes/__auth/login.tsx",
                lineNumber: 84,
                columnNumber: 6
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__auth/login.tsx",
            lineNumber: 66,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__auth/login.tsx",
        lineNumber: 63,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__auth/login.tsx",
    lineNumber: 52,
    columnNumber: 3
  }, this);
}

// app/routes/seller.tsx
var seller_exports = {};
__export(seller_exports, {
  default: () => AppLayout,
  loader: () => loader5,
  unstable_shouldReload: () => unstable_shouldReload
});
var import_solid2 = require("@heroicons/react/24/solid"), import_core5 = require("@mantine/core"), import_hooks2 = require("@mantine/hooks"), import_node9 = require("@remix-run/node"), import_react7 = require("@remix-run/react");
var React3 = __toESM(require("react"));

// app/components/Footer.tsx
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime");
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("footer", {
    className: "flex h-[44px] items-center justify-center p-6 py-1 text-center text-sm",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", {
      className: "text-gray-400",
      children: [
        "\xA9",
        new Date().getFullYear(),
        " ",
        app_config_default.name,
        ", Inc. All rights reserved."
      ]
    }, void 0, !0, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 6,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/components/Footer.tsx",
    lineNumber: 5,
    columnNumber: 3
  }, this);
}

// app/components/TailwindContainer.tsx
var import_core4 = require("@mantine/core"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function TailwindContainer({
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", {
    className: (0, import_core4.clsx)("mx-auto max-w-2xl lg:max-w-7xl", className),
    children
  }, void 0, !1, {
    fileName: "app/components/TailwindContainer.tsx",
    lineNumber: 11,
    columnNumber: 3
  }, this);
}

// app/routes/seller.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), loader5 = async ({ request }) => {
  let user = await requireUser(request);
  return await isCustomer(request) ? (0, import_node9.redirect)("/") : await isAdmin(request) ? (0, import_node9.redirect)("/admin") : (0, import_node9.json)({
    hasResetPassword: user.hasResetPassword
  });
};
function AppLayout() {
  let user = useUser(), fetcher = (0, import_react7.useFetcher)(), { hasResetPassword } = (0, import_react7.useLoaderData)(), [isModalOpen, handleModal] = (0, import_hooks2.useDisclosure)(!hasResetPassword), isSubmitting = fetcher.state !== "idle";
  return React3.useEffect(() => {
    fetcher.type === "done" && (!fetcher.data.success || handleModal.close());
  }, [fetcher.data, fetcher.type, handleModal]), /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
        className: "flex h-full flex-col",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(HeaderComponent, {}, void 0, !1, {
            fileName: "app/routes/seller.tsx",
            lineNumber: 75,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.ScrollArea, {
            classNames: { root: "flex-1 bg-gray-100" },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("main", {
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react7.Outlet, {}, void 0, !1, {
                fileName: "app/routes/seller.tsx",
                lineNumber: 78,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/seller.tsx",
              lineNumber: 77,
              columnNumber: 6
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/seller.tsx",
            lineNumber: 76,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Footer, {}, void 0, !1, {
            fileName: "app/routes/seller.tsx",
            lineNumber: 81,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/seller.tsx",
        lineNumber: 74,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Drawer, {
        opened: isModalOpen,
        onClose: handleModal.close,
        title: "Reset Password",
        overlayBlur: 3,
        overlayOpacity: 0.6,
        padding: "xl",
        withCloseButton: !1,
        closeOnEscape: !1,
        closeOnClickOutside: !1,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(fetcher.Form, {
          method: "post",
          replace: !0,
          className: "flex flex-col gap-4",
          action: "/api/reset-password",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
            className: "mt-6 flex flex-col gap-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("input", {
                hidden: !0,
                name: "userId",
                defaultValue: user.id
              }, void 0, !1, {
                fileName: "app/routes/seller.tsx",
                lineNumber: 102,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.PasswordInput, {
                required: !0,
                name: "password",
                label: "Enter new password",
                placeholder: "Password"
              }, void 0, !1, {
                fileName: "app/routes/seller.tsx",
                lineNumber: 103,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Button, {
                variant: "filled",
                type: "submit",
                fullWidth: !0,
                loading: isSubmitting,
                loaderPosition: "right",
                children: "Update"
              }, void 0, !1, {
                fileName: "app/routes/seller.tsx",
                lineNumber: 110,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/seller.tsx",
            lineNumber: 101,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/seller.tsx",
          lineNumber: 95,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/seller.tsx",
        lineNumber: 84,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/seller.tsx",
    lineNumber: 73,
    columnNumber: 3
  }, this);
}
function HeaderComponent() {
  let location = (0, import_react7.useLocation)(), { user } = useOptionalUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react7.Form, {
        replace: !0,
        action: "/api/auth/logout",
        method: "post",
        id: "logout-form"
      }, void 0, !1, {
        fileName: "app/routes/seller.tsx",
        lineNumber: 132,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("header", {
        className: "h-[100px] p-4",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(TailwindContainer, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
            className: "flex h-full w-full items-center justify-between",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
                className: "flex flex-shrink-0 items-center gap-4",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Anchor, {
                  component: import_react7.Link,
                  to: "/",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("img", {
                    className: "h-20 object-cover object-center",
                    src: app_config_default.logo,
                    alt: "Logo"
                  }, void 0, !1, {
                    fileName: "app/routes/seller.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/seller.tsx",
                  lineNumber: 137,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/seller.tsx",
                lineNumber: 136,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
                className: "flex items-center gap-4",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu, {
                  position: "bottom-start",
                  withArrow: !0,
                  transition: "pop-top-right",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Target, {
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("button", {
                        children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Avatar, {
                          color: "blue",
                          size: "md",
                          children: user.name.charAt(0)
                        }, void 0, !1, {
                          fileName: "app/routes/seller.tsx",
                          lineNumber: 155,
                          columnNumber: 12
                        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Avatar, {}, void 0, !1, {
                          fileName: "app/routes/seller.tsx",
                          lineNumber: 159,
                          columnNumber: 12
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/seller.tsx",
                        lineNumber: 153,
                        columnNumber: 10
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/seller.tsx",
                      lineNumber: 152,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Dropdown, {
                      children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Item, {
                            disabled: !0,
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
                              className: "flex flex-col",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", {
                                  children: user.name
                                }, void 0, !1, {
                                  fileName: "app/routes/seller.tsx",
                                  lineNumber: 169,
                                  columnNumber: 14
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", {
                                  className: "mt-0.5 text-sm",
                                  children: user.email
                                }, void 0, !1, {
                                  fileName: "app/routes/seller.tsx",
                                  lineNumber: 170,
                                  columnNumber: 14
                                }, this)
                              ]
                            }, void 0, !0, {
                              fileName: "app/routes/seller.tsx",
                              lineNumber: 168,
                              columnNumber: 13
                            }, this)
                          }, void 0, !1, {
                            fileName: "app/routes/seller.tsx",
                            lineNumber: 167,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Divider, {}, void 0, !1, {
                            fileName: "app/routes/seller.tsx",
                            lineNumber: 173,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Item, {
                            icon: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid2.ArrowLeftOnRectangleIcon, {
                              className: "h-4 w-4"
                            }, void 0, !1, {
                              fileName: "app/routes/seller.tsx",
                              lineNumber: 176,
                              columnNumber: 19
                            }, this),
                            type: "submit",
                            form: "logout-form",
                            children: "Logout"
                          }, void 0, !1, {
                            fileName: "app/routes/seller.tsx",
                            lineNumber: 175,
                            columnNumber: 12
                          }, this)
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/seller.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Item, {
                            icon: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid2.ArrowRightOnRectangleIcon, {
                              className: "h-4 w-4"
                            }, void 0, !1, {
                              fileName: "app/routes/seller.tsx",
                              lineNumber: 186,
                              columnNumber: 19
                            }, this),
                            component: import_react7.Link,
                            to: `/login?redirectTo=${encodeURIComponent(
                              location.pathname
                            )}`,
                            children: "Login"
                          }, void 0, !1, {
                            fileName: "app/routes/seller.tsx",
                            lineNumber: 185,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Item, {
                            icon: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid2.UserPlusIcon, {
                              className: "h-4 w-4"
                            }, void 0, !1, {
                              fileName: "app/routes/seller.tsx",
                              lineNumber: 195,
                              columnNumber: 19
                            }, this),
                            component: import_react7.Link,
                            to: `/register?redirectTo=${encodeURIComponent(
                              location.pathname
                            )}`,
                            children: "Create account"
                          }, void 0, !1, {
                            fileName: "app/routes/seller.tsx",
                            lineNumber: 194,
                            columnNumber: 12
                          }, this)
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/seller.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/seller.tsx",
                      lineNumber: 164,
                      columnNumber: 9
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/seller.tsx",
                  lineNumber: 147,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/seller.tsx",
                lineNumber: 146,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/seller.tsx",
            lineNumber: 135,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/seller.tsx",
          lineNumber: 134,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/seller.tsx",
        lineNumber: 133,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/seller.tsx",
    lineNumber: 131,
    columnNumber: 3
  }, this);
}
var unstable_shouldReload = ({
  submission,
  prevUrl,
  url
}) => !(!submission && prevUrl.pathname === url.pathname);

// app/routes/seller/products.tsx
var products_exports = {};
__export(products_exports, {
  action: () => action8,
  default: () => MyProducts,
  loader: () => loader6
});
var import_solid3 = require("@heroicons/react/24/solid"), import_core6 = require("@mantine/core"), import_hooks4 = require("@mantine/hooks"), import_node10 = require("@remix-run/node"), import_react8 = require("@remix-run/react"), import_bson = require("bson"), React4 = __toESM(require("react")), import_slugify = __toESM(require("slugify"));

// app/utils/constant.ts
var categories = [
  "mobile",
  "laptop",
  "camera",
  "headphone",
  "speaker",
  "ac",
  "refrigerator",
  "tv",
  "washing machine",
  "microwave",
  "oven",
  "printer",
  "router",
  "keyboard"
];

// app/utils/misc.ts
function titleCase(string) {
  string = string.toLowerCase();
  let wordsArray = string.split(" ");
  for (var i = 0; i < wordsArray.length; i++)
    wordsArray[i] = wordsArray[i].charAt(0).toUpperCase() + wordsArray[i].slice(1);
  return wordsArray.join(" ");
}
function formatList(list) {
  return new Intl.ListFormat("en").format(list);
}
function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(date));
}

// app/routes/seller/products.tsx
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime");
var loader6 = async ({ request }) => {
  let sellerId = await requireUserId(request), products = await prisma.product.findMany({
    where: {
      sellerId
    }
  });
  return (0, import_node10.json)({
    products
  });
}, action8 = async ({ request }) => {
  let sellerId = await requireUserId(request), { fields, fieldErrors } = await validateAction(
    request,
    ManageProductSchema
  );
  if (fieldErrors)
    return badRequest({ success: !1, fieldErrors });
  let { productId, ...rest } = fields, id = new import_bson.ObjectId();
  return await prisma.product.upsert({
    where: {
      id: productId || id.toString()
    },
    update: {
      ...rest,
      slug: (0, import_slugify.default)(rest.name, { lower: !0 })
    },
    create: {
      ...rest,
      sellerId,
      slug: (0, import_slugify.default)(rest.name, { lower: !0 })
    }
  }), (0, import_node10.json)({
    success: !0
  });
};
function MyProducts() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  let fetcher = (0, import_react8.useFetcher)(), { products } = (0, import_react8.useLoaderData)(), [selectedProductId, setSelectedProductId] = React4.useState(null), [selectedProduct, setSelectedProduct] = React4.useState(null), [mode, setMode] = React4.useState(0 /* edit */), [isModalOpen, handleModal] = (0, import_hooks4.useDisclosure)(!1), [imageUrl, setImageUrl] = React4.useState(), isSubmitting = fetcher.state !== "idle";
  return React4.useEffect(() => {
    var _a2;
    fetcher.state !== "idle" && fetcher.submission === void 0 || (_a2 = fetcher.data) != null && _a2.success && (setSelectedProductId(null), handleModal.close());
  }, [(_a = fetcher.data) == null ? void 0 : _a.success, fetcher.state, fetcher.submission]), React4.useEffect(() => {
    if (!selectedProductId) {
      setSelectedProduct(null);
      return;
    }
    let product = products.find((product2) => product2.id === selectedProductId);
    !product || (setSelectedProduct(product), setImageUrl(product.image), handleModal.open());
  }, [products, selectedProductId]), React4.useEffect(() => {
    mode === 1 /* add */ && (setSelectedProductId(null), setSelectedProduct(null), setImageUrl(void 0));
  }, [mode]), /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_jsx_dev_runtime10.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(TailwindContainer, {
        className: "bg-[rgb(129, 135, 80)] rounded-md",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
          className: "mt-8 px-4 py-10 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
              className: "sm:flex sm:flex-auto sm:items-center sm:justify-between",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                      className: "mb-12",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Button, {
                        leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_solid3.ArrowLeftIcon, {
                          className: "h-5 w-5"
                        }, void 0, !1, {
                          fileName: "app/routes/seller/products.tsx",
                          lineNumber: 151,
                          columnNumber: 20
                        }, this),
                        variant: "white",
                        size: "md",
                        component: import_react8.Link,
                        to: "..",
                        pl: 0,
                        children: "Back"
                      }, void 0, !1, {
                        fileName: "app/routes/seller/products.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/seller/products.tsx",
                      lineNumber: 149,
                      columnNumber: 8
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h1", {
                      className: "text-xl font-semibold text-gray-900",
                      children: "My Products"
                    }, void 0, !1, {
                      fileName: "app/routes/seller/products.tsx",
                      lineNumber: 162,
                      columnNumber: 8
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", {
                      className: "mt-2 text-sm text-gray-700",
                      children: "A list of all the products currently present in store."
                    }, void 0, !1, {
                      fileName: "app/routes/seller/products.tsx",
                      lineNumber: 165,
                      columnNumber: 8
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/seller/products.tsx",
                  lineNumber: 148,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Button, {
                    loading: isSubmitting,
                    loaderPosition: "left",
                    onClick: () => {
                      setMode(1 /* add */), handleModal.open();
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_solid3.PlusIcon, {
                        className: "h-4 w-4"
                      }, void 0, !1, {
                        fileName: "app/routes/seller/products.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
                        className: "ml-2",
                        children: "Add product"
                      }, void 0, !1, {
                        fileName: "app/routes/seller/products.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/seller/products.tsx",
                    lineNumber: 170,
                    columnNumber: 8
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/seller/products.tsx",
                  lineNumber: 169,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/seller/products.tsx",
              lineNumber: 147,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
              className: "mt-8 flex flex-col",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                className: "-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                  className: "inline-block min-w-full py-2 align-middle md:px-6 lg:px-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("table", {
                    className: "min-w-full divide-y divide-gray-300",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("thead", {
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("tr", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                              scope: "col",
                              className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0",
                              children: "Name"
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 189,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Price"
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 195,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Quantity"
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 201,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Category"
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 207,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Approved"
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 214,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                              scope: "col",
                              className: "relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
                                className: "sr-only",
                                children: "Actions"
                              }, void 0, !1, {
                                fileName: "app/routes/seller/products.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 220,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/seller/products.tsx",
                          lineNumber: 188,
                          columnNumber: 11
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/seller/products.tsx",
                        lineNumber: 187,
                        columnNumber: 10
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("tbody", {
                        className: "divide-y divide-gray-200",
                        children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("tr", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0",
                              children: product.name
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 231,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: [
                                "$",
                                product.price.toFixed(2)
                              ]
                            }, void 0, !0, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 234,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: product.quantity
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 237,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: formatList(product.category)
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 240,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Badge, {
                                color: product.approved ? "green" : "red",
                                children: product.approved ? "Yes" : "No"
                              }, void 0, !1, {
                                fileName: "app/routes/seller/products.tsx",
                                lineNumber: 245,
                                columnNumber: 14
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 244,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                              className: "relative space-x-4 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6 md:pr-0",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                                className: "flex items-center gap-6",
                                children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Button, {
                                  loading: isSubmitting,
                                  variant: "subtle",
                                  loaderPosition: "right",
                                  onClick: () => {
                                    setSelectedProductId(product.id), setMode(0 /* edit */);
                                  },
                                  children: "Edit"
                                }, void 0, !1, {
                                  fileName: "app/routes/seller/products.tsx",
                                  lineNumber: 252,
                                  columnNumber: 15
                                }, this)
                              }, void 0, !1, {
                                fileName: "app/routes/seller/products.tsx",
                                lineNumber: 251,
                                columnNumber: 14
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/seller/products.tsx",
                              lineNumber: 250,
                              columnNumber: 13
                            }, this)
                          ]
                        }, product.id, !0, {
                          fileName: "app/routes/seller/products.tsx",
                          lineNumber: 230,
                          columnNumber: 12
                        }, this))
                      }, void 0, !1, {
                        fileName: "app/routes/seller/products.tsx",
                        lineNumber: 228,
                        columnNumber: 10
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/seller/products.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/seller/products.tsx",
                  lineNumber: 185,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/seller/products.tsx",
                lineNumber: 184,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/seller/products.tsx",
              lineNumber: 183,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/seller/products.tsx",
          lineNumber: 146,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/seller/products.tsx",
        lineNumber: 145,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Modal, {
        opened: isModalOpen,
        onClose: () => {
          setSelectedProductId(null), handleModal.close();
        },
        title: (0, import_core6.clsx)({
          "Edit product": mode === 0 /* edit */,
          "Add product": mode === 1 /* add */
        }),
        centered: !0,
        overlayBlur: 1,
        overlayOpacity: 0.7,
        closeOnClickOutside: !isSubmitting,
        closeOnEscape: !isSubmitting,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(fetcher.Form, {
          method: "post",
          replace: !0,
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("fieldset", {
            disabled: isSubmitting,
            className: "flex flex-col gap-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("input", {
                type: "hidden",
                name: "productId",
                value: selectedProduct == null ? void 0 : selectedProduct.id
              }, void 0, !1, {
                fileName: "app/routes/seller/products.tsx",
                lineNumber: 293,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.TextInput, {
                name: "name",
                label: "Name",
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.name,
                error: (_c = (_b = fetcher.data) == null ? void 0 : _b.fieldErrors) == null ? void 0 : _c.name,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/seller/products.tsx",
                lineNumber: 295,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Textarea, {
                name: "description",
                label: "Description",
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.description,
                error: (_e = (_d = fetcher.data) == null ? void 0 : _d.fieldErrors) == null ? void 0 : _e.description,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/seller/products.tsx",
                lineNumber: 303,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.NumberInput, {
                name: "price",
                label: "Price",
                min: 0,
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.price,
                error: (_g = (_f = fetcher.data) == null ? void 0 : _f.fieldErrors) == null ? void 0 : _g.price,
                precision: 2,
                readOnly: mode === 0 /* edit */ && (selectedProduct == null ? void 0 : selectedProduct.approved),
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/seller/products.tsx",
                lineNumber: 311,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.NumberInput, {
                name: "quantity",
                label: "Quantity",
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.quantity,
                min: 1,
                error: (_i = (_h = fetcher.data) == null ? void 0 : _h.fieldErrors) == null ? void 0 : _i.quantity,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/seller/products.tsx",
                lineNumber: 322,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.TextInput, {
                name: "image",
                label: "Image",
                value: imageUrl,
                onChange: (e) => setImageUrl(e.target.value),
                error: (_k = (_j = fetcher.data) == null ? void 0 : _j.fieldErrors) == null ? void 0 : _k.image,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/seller/products.tsx",
                lineNumber: 331,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.MultiSelect, {
                name: "category",
                label: "Category",
                required: !0,
                data: categories,
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.category,
                placeholder: "Select categories",
                searchable: !0,
                error: (_m = (_l = fetcher.data) == null ? void 0 : _l.fieldErrors) == null ? void 0 : _m.category
              }, void 0, !1, {
                fileName: "app/routes/seller/products.tsx",
                lineNumber: 340,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                className: "mt-1 flex items-center justify-end gap-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Button, {
                    variant: "subtle",
                    type: "button",
                    disabled: isSubmitting,
                    onClick: () => handleModal.close(),
                    color: "red",
                    children: "Cancel"
                  }, void 0, !1, {
                    fileName: "app/routes/seller/products.tsx",
                    lineNumber: 352,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Button, {
                    type: "submit",
                    loading: isSubmitting,
                    loaderPosition: "right",
                    children: mode === 0 /* edit */ ? "Save changes" : "Add product"
                  }, void 0, !1, {
                    fileName: "app/routes/seller/products.tsx",
                    lineNumber: 361,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/seller/products.tsx",
                lineNumber: 351,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/seller/products.tsx",
            lineNumber: 292,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/seller/products.tsx",
          lineNumber: 291,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/seller/products.tsx",
        lineNumber: 275,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/seller/products.tsx",
    lineNumber: 144,
    columnNumber: 3
  }, this);
}

// app/routes/seller/orders.tsx
var orders_exports = {};
__export(orders_exports, {
  action: () => action9,
  default: () => Orders,
  loader: () => loader7
});
var import_solid4 = require("@heroicons/react/24/solid"), import_core7 = require("@mantine/core"), import_client6 = require("@prisma/client"), import_node11 = require("@remix-run/node"), import_react9 = require("@remix-run/react"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime"), loader7 = async ({ request }) => {
  let sellerId = await requireUserId(request), orders = await prisma.order.findMany({
    where: {
      products: {
        every: {
          product: {
            sellerId
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      user: !0,
      payment: !0,
      products: {
        include: {
          product: !0
        }
      }
    }
  });
  return (0, import_node11.json)({ orders });
}, action9 = async ({ request }) => {
  var _a, _b, _c;
  let formData = await request.formData(), intent = (_a = formData.get("intent")) == null ? void 0 : _a.toString();
  (0, import_tiny_invariant2.default)(intent, "Invalid intent");
  let orderId = (_b = formData.get("orderId")) == null ? void 0 : _b.toString();
  switch ((0, import_tiny_invariant2.default)(orderId, "Invalid order id"), intent) {
    case "update-order-status": {
      let status = (_c = formData.get("status")) == null ? void 0 : _c.toString();
      return (0, import_tiny_invariant2.default)(status, "Invalid status"), await prisma.order.update({
        where: { id: orderId },
        data: { status }
      }), (0, import_node11.json)({ success: !0 });
    }
    default:
      return (0, import_node11.json)({ success: !1, message: "Invalid intent" }, { status: 400 });
  }
};
function Orders() {
  let { orders } = (0, import_react9.useLoaderData)(), transition = (0, import_react9.useTransition)(), submit = (0, import_react9.useSubmit)(), isSubmitting = transition.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_jsx_dev_runtime11.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(TailwindContainer, {
      className: "mt-16",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
        className: "px-4 sm:px-6 lg:px-8",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
            className: "sm:flex sm:items-center",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
              className: "sm:flex-auto",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                  className: "mb-12",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_core7.Button, {
                    leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_solid4.ArrowLeftIcon, {
                      className: "h-5 w-5"
                    }, void 0, !1, {
                      fileName: "app/routes/seller/orders.tsx",
                      lineNumber: 84,
                      columnNumber: 20
                    }, this),
                    variant: "white",
                    size: "md",
                    component: import_react9.Link,
                    to: "..",
                    pl: 0,
                    children: "Back"
                  }, void 0, !1, {
                    fileName: "app/routes/seller/orders.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/seller/orders.tsx",
                  lineNumber: 82,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("h1", {
                  className: "text-xl font-semibold text-gray-900",
                  children: "Orders"
                }, void 0, !1, {
                  fileName: "app/routes/seller/orders.tsx",
                  lineNumber: 95,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", {
                  className: "mt-2 text-sm text-gray-700",
                  children: "A list of all the orders in your account including their user details."
                }, void 0, !1, {
                  fileName: "app/routes/seller/orders.tsx",
                  lineNumber: 96,
                  columnNumber: 8
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/seller/orders.tsx",
              lineNumber: 81,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/seller/orders.tsx",
            lineNumber: 80,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
            className: "mt-8 flex flex-col",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
              className: "-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                className: "inline-block min-w-full py-2 align-middle md:px-6 lg:px-8",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                  className: "shadow ring-1 ring-black ring-opacity-5 md:rounded-lg",
                  children: orders.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("table", {
                    className: "min-w-full divide-y divide-gray-300",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("thead", {
                        className: "bg-gray-50",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("tr", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("th", {
                              scope: "col",
                              className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6",
                              children: "Name"
                            }, void 0, !1, {
                              fileName: "app/routes/seller/orders.tsx",
                              lineNumber: 110,
                              columnNumber: 14
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("th", {
                              scope: "col",
                              className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                              children: "Type"
                            }, void 0, !1, {
                              fileName: "app/routes/seller/orders.tsx",
                              lineNumber: 116,
                              columnNumber: 14
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("th", {
                              scope: "col",
                              className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                              children: "Status"
                            }, void 0, !1, {
                              fileName: "app/routes/seller/orders.tsx",
                              lineNumber: 122,
                              columnNumber: 14
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("th", {
                              scope: "col",
                              className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                              children: "Sale"
                            }, void 0, !1, {
                              fileName: "app/routes/seller/orders.tsx",
                              lineNumber: 128,
                              columnNumber: 14
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("th", {
                              scope: "col",
                              className: "relative py-3.5 pl-3 pr-4 sm:pr-6",
                              children: [
                                "Update status",
                                /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", {
                                  className: "sr-only",
                                  children: "Edit"
                                }, void 0, !1, {
                                  fileName: "app/routes/seller/orders.tsx",
                                  lineNumber: 139,
                                  columnNumber: 15
                                }, this)
                              ]
                            }, void 0, !0, {
                              fileName: "app/routes/seller/orders.tsx",
                              lineNumber: 134,
                              columnNumber: 14
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/seller/orders.tsx",
                          lineNumber: 109,
                          columnNumber: 13
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/seller/orders.tsx",
                        lineNumber: 108,
                        columnNumber: 12
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("tbody", {
                        className: "bg-[rgb(129, 135, 80)] divide-y divide-gray-200",
                        children: orders.map((order) => {
                          var _a;
                          let statusOptions = order.type === import_client6.OrderType.PICKUP ? ["PENDING", "PREPARING", "READY", "COMPLETED"] : ["PENDING", "PREPARING", "DELIVERED"];
                          return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("tr", {
                            children: [
                              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("td", {
                                className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6",
                                children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                                  className: "flex items-center",
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                                      className: "h-10 w-10 flex-shrink-0",
                                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("img", {
                                        className: "h-10 w-10 rounded-full",
                                        src: order.products[0].product.image,
                                        alt: ""
                                      }, void 0, !1, {
                                        fileName: "app/routes/seller/orders.tsx",
                                        lineNumber: 155,
                                        columnNumber: 19
                                      }, this)
                                    }, void 0, !1, {
                                      fileName: "app/routes/seller/orders.tsx",
                                      lineNumber: 154,
                                      columnNumber: 18
                                    }, this),
                                    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                                      className: "ml-4",
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                                          className: "font-medium text-gray-900",
                                          children: order.user.name
                                        }, void 0, !1, {
                                          fileName: "app/routes/seller/orders.tsx",
                                          lineNumber: 162,
                                          columnNumber: 19
                                        }, this),
                                        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                                          className: "text-gray-500",
                                          children: order.user.email
                                        }, void 0, !1, {
                                          fileName: "app/routes/seller/orders.tsx",
                                          lineNumber: 165,
                                          columnNumber: 19
                                        }, this)
                                      ]
                                    }, void 0, !0, {
                                      fileName: "app/routes/seller/orders.tsx",
                                      lineNumber: 161,
                                      columnNumber: 18
                                    }, this)
                                  ]
                                }, void 0, !0, {
                                  fileName: "app/routes/seller/orders.tsx",
                                  lineNumber: 153,
                                  columnNumber: 17
                                }, this)
                              }, void 0, !1, {
                                fileName: "app/routes/seller/orders.tsx",
                                lineNumber: 152,
                                columnNumber: 16
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("td", {
                                className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                                    className: "text-gray-900",
                                    children: titleCase(order.type)
                                  }, void 0, !1, {
                                    fileName: "app/routes/seller/orders.tsx",
                                    lineNumber: 173,
                                    columnNumber: 17
                                  }, this),
                                  /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                                    className: "text-gray-500",
                                    children: [
                                      "(",
                                      titleCase(
                                        ((_a = order.payment) == null ? void 0 : _a.paymentMethod) ?? ""
                                      ),
                                      ")"
                                    ]
                                  }, void 0, !0, {
                                    fileName: "app/routes/seller/orders.tsx",
                                    lineNumber: 176,
                                    columnNumber: 17
                                  }, this)
                                ]
                              }, void 0, !0, {
                                fileName: "app/routes/seller/orders.tsx",
                                lineNumber: 172,
                                columnNumber: 16
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("td", {
                                className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_core7.Badge, {
                                  color: order.status === import_client6.OrderStatus.PENDING ? "gray" : order.status === import_client6.OrderStatus.CANCELLED ? "red" : "green",
                                  children: titleCase(order.status)
                                }, void 0, !1, {
                                  fileName: "app/routes/seller/orders.tsx",
                                  lineNumber: 185,
                                  columnNumber: 17
                                }, this)
                              }, void 0, !1, {
                                fileName: "app/routes/seller/orders.tsx",
                                lineNumber: 184,
                                columnNumber: 16
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("td", {
                                className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                children: order.status !== import_client6.OrderStatus.CANCELLED && order.status !== import_client6.OrderStatus.PENDING && /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_jsx_dev_runtime11.Fragment, {
                                  children: [
                                    "$",
                                    order.products.map((p) => p.product.price * p.quantity).reduce((a, b) => a + b, 0)
                                  ]
                                }, void 0, !0, {
                                  fileName: "app/routes/seller/orders.tsx",
                                  lineNumber: 200,
                                  columnNumber: 19
                                }, this)
                              }, void 0, !1, {
                                fileName: "app/routes/seller/orders.tsx",
                                lineNumber: 197,
                                columnNumber: 16
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("td", {
                                className: "relative flex items-center justify-center whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6",
                                children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                                  className: "flex items-center gap-2",
                                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_core7.NativeSelect, {
                                    className: "w-48",
                                    defaultValue: order.status,
                                    data: statusOptions,
                                    disabled: isSubmitting || order.status === import_client6.OrderStatus.DELIVERED || order.status === import_client6.OrderStatus.CANCELLED || order.status === import_client6.OrderStatus.COMPLETED,
                                    onChange: (e) => {
                                      submit(
                                        {
                                          intent: "update-order-status",
                                          orderId: order.id,
                                          status: e.target.value
                                        },
                                        {
                                          method: "post",
                                          replace: !0
                                        }
                                      );
                                    }
                                  }, void 0, !1, {
                                    fileName: "app/routes/seller/orders.tsx",
                                    lineNumber: 210,
                                    columnNumber: 18
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "app/routes/seller/orders.tsx",
                                  lineNumber: 209,
                                  columnNumber: 17
                                }, this)
                              }, void 0, !1, {
                                fileName: "app/routes/seller/orders.tsx",
                                lineNumber: 208,
                                columnNumber: 16
                              }, this)
                            ]
                          }, order.id, !0, {
                            fileName: "app/routes/seller/orders.tsx",
                            lineNumber: 151,
                            columnNumber: 15
                          }, this);
                        })
                      }, void 0, !1, {
                        fileName: "app/routes/seller/orders.tsx",
                        lineNumber: 143,
                        columnNumber: 12
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/seller/orders.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                    className: "bg-[rgb(129, 135, 80)] relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_solid4.ShoppingCartIcon, {
                        className: "mx-auto h-9 w-9 text-gray-500"
                      }, void 0, !1, {
                        fileName: "app/routes/seller/orders.tsx",
                        lineNumber: 243,
                        columnNumber: 12
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", {
                        className: "mt-4 block text-sm font-medium text-gray-500",
                        children: [
                          "No orders placed yet. ",
                          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("br", {}, void 0, !1, {
                            fileName: "app/routes/seller/orders.tsx",
                            lineNumber: 245,
                            columnNumber: 35
                          }, this),
                          "Come back later."
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/seller/orders.tsx",
                        lineNumber: 244,
                        columnNumber: 12
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/seller/orders.tsx",
                    lineNumber: 242,
                    columnNumber: 11
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/seller/orders.tsx",
                  lineNumber: 105,
                  columnNumber: 9
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/seller/orders.tsx",
                lineNumber: 104,
                columnNumber: 8
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/seller/orders.tsx",
              lineNumber: 103,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/seller/orders.tsx",
            lineNumber: 102,
            columnNumber: 6
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/seller/orders.tsx",
        lineNumber: 79,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/seller/orders.tsx",
      lineNumber: 78,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/seller/orders.tsx",
    lineNumber: 77,
    columnNumber: 3
  }, this);
}

// app/routes/seller/index.tsx
var seller_exports2 = {};
__export(seller_exports2, {
  default: () => SellerDashboard
});
var import_core8 = require("@mantine/core"), import_react10 = require("@remix-run/react");
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime"), actions = [
  {
    title: "My Products",
    description: "View and manage my products",
    href: "products"
  },
  {
    title: "Orders",
    description: "View and manage orders",
    href: "orders"
  }
];
function SellerDashboard() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
    className: "flex flex-col gap-4 p-4",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
      className: "bg-[rgb(129, 135, 80)]",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(TailwindContainer, {
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
          className: "py-16 px-4 sm:py-20 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h2", {
              className: "text-center text-4xl font-semibold tracking-tight text-gray-900",
              children: "Seller Dashboard"
            }, void 0, !1, {
              fileName: "app/routes/seller/index.tsx",
              lineNumber: 24,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("ul", {
              className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2",
              children: actions.map((action14, actionIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Card, {
                action: action14
              }, actionIdx, !1, {
                fileName: "app/routes/seller/index.tsx",
                lineNumber: 30,
                columnNumber: 9
              }, this))
            }, void 0, !1, {
              fileName: "app/routes/seller/index.tsx",
              lineNumber: 28,
              columnNumber: 7
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/seller/index.tsx",
          lineNumber: 23,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/seller/index.tsx",
        lineNumber: 22,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/seller/index.tsx",
      lineNumber: 21,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/seller/index.tsx",
    lineNumber: 20,
    columnNumber: 3
  }, this);
}
function Card({ action: action14 }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("li", {
    className: "relative col-span-1 divide-y divide-gray-200 rounded-lg border border-gray-300 bg-white shadow",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
        className: "flex w-full items-center justify-between space-x-6 p-6",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
          className: "flex-1 truncate",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
            className: "flex flex-col items-center gap-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h3", {
                className: "truncate text-xl font-medium text-gray-900",
                children: action14.title
              }, void 0, !1, {
                fileName: "app/routes/seller/index.tsx",
                lineNumber: 46,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_core8.Badge, {
                fullWidth: !1,
                className: "max-w-min",
                children: action14.description
              }, void 0, !1, {
                fileName: "app/routes/seller/index.tsx",
                lineNumber: 50,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/seller/index.tsx",
            lineNumber: 45,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/seller/index.tsx",
          lineNumber: 44,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/seller/index.tsx",
        lineNumber: 43,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_react10.Link, {
        to: action14.href,
        className: "focus:outline-none",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("span", {
          className: "absolute inset-0",
          "aria-hidden": "true"
        }, void 0, !1, {
          fileName: "app/routes/seller/index.tsx",
          lineNumber: 59,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/seller/index.tsx",
        lineNumber: 57,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/seller/index.tsx",
    lineNumber: 42,
    columnNumber: 3
  }, this);
}

// app/routes/__app.tsx
var app_exports = {};
__export(app_exports, {
  default: () => AppLayout2,
  loader: () => loader8,
  unstable_shouldReload: () => unstable_shouldReload2
});
var import_outline = require("@heroicons/react/24/outline"), import_solid5 = require("@heroicons/react/24/solid"), import_core9 = require("@mantine/core"), import_spotlight = require("@mantine/spotlight"), import_node12 = require("@remix-run/node"), import_react11 = require("@remix-run/react");
var React5 = __toESM(require("react"));
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime"), loader8 = async ({ request }) => {
  if (await requireUser(request), await isAdmin(request))
    return (0, import_node12.redirect)("/admin");
  if (await isSeller(request))
    return (0, import_node12.redirect)("/seller");
  let products = await prisma.product.findMany({
    where: {
      approved: !0
    },
    include: {
      orders: !0,
      seller: !0
    }
  }), categories2 = Array.from(
    new Set(products.map((product) => product.category).flat())
  );
  return (0, import_node12.json)({
    products,
    categories: categories2,
    isCustomer: await isCustomer(request)
  });
};
function AppLayout2() {
  let navigate = (0, import_react11.useNavigate)(), { products } = (0, import_react11.useLoaderData)(), [actions3] = React5.useState(() => {
    let actions4 = [];
    return products.forEach((product) => {
      actions4.push({
        title: product.name,
        category: product.category.join(", "),
        icon: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Avatar, {
          src: product.image,
          radius: "xl",
          size: "sm"
        }, void 0, !1, {
          fileName: "app/routes/__app.tsx",
          lineNumber: 85,
          columnNumber: 11
        }, this),
        onTrigger: () => navigate(`/product/${product.slug}`)
      });
    }), actions4;
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_jsx_dev_runtime13.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_spotlight.SpotlightProvider, {
      shortcut: ["mod + K", "/"],
      highlightQuery: !0,
      searchPlaceholder: "Search for products...",
      searchIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_solid5.MagnifyingGlassIcon, {
        className: "h-5 w-5"
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 99,
        columnNumber: 17
      }, this),
      limit: 5,
      actionsWrapperComponent: ActionsWrapper,
      nothingFoundMessage: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Text, {
        children: "Nothing found"
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 102,
        columnNumber: 26
      }, this),
      filter: (query, actions4) => actions4.filter(
        (action14) => action14.title.toLowerCase().includes(query.toLowerCase()) || action14.category.toLowerCase().includes(query.toLowerCase())
      ),
      actions: actions3,
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
        className: "flex h-full flex-col",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(HeaderComponent2, {}, void 0, !1, {
            fileName: "app/routes/__app.tsx",
            lineNumber: 113,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.ScrollArea, {
            classNames: { root: "flex-1 bg-gray-100" },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("main", {
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react11.Outlet, {}, void 0, !1, {
                fileName: "app/routes/__app.tsx",
                lineNumber: 116,
                columnNumber: 8
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app.tsx",
              lineNumber: 115,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/__app.tsx",
            lineNumber: 114,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(Footer, {}, void 0, !1, {
            fileName: "app/routes/__app.tsx",
            lineNumber: 119,
            columnNumber: 6
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 112,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/__app.tsx",
      lineNumber: 95,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app.tsx",
    lineNumber: 94,
    columnNumber: 3
  }, this);
}
function HeaderComponent2() {
  let spotlight = (0, import_spotlight.useSpotlight)(), location = (0, import_react11.useLocation)(), { user } = useOptionalUser(), { itemsInCart } = useCart(), { isCustomer: isCustomer2 } = (0, import_react11.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_jsx_dev_runtime13.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react11.Form, {
        replace: !0,
        action: "/api/auth/logout",
        method: "post",
        id: "logout-form"
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 135,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("header", {
        className: "h-16 p-4",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(TailwindContainer, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
            className: "flex h-full w-full items-center justify-between",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                className: "flex flex-shrink-0 items-center gap-4",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Anchor, {
                  component: import_react11.Link,
                  to: "/",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("img", {
                    className: "h-10 object-cover object-center",
                    src: app_config_default.logo,
                    alt: "Logo"
                  }, void 0, !1, {
                    fileName: "app/routes/__app.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app.tsx",
                  lineNumber: 140,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/__app.tsx",
                lineNumber: 139,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                className: "flex items-center gap-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.ActionIcon, {
                    title: "Search",
                    size: "md",
                    onClick: () => spotlight.openSpotlight(),
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_solid5.MagnifyingGlassIcon, {
                      className: "h-5 w-5 text-gray-500"
                    }, void 0, !1, {
                      fileName: "app/routes/__app.tsx",
                      lineNumber: 155,
                      columnNumber: 9
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app.tsx",
                    lineNumber: 150,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Indicator, {
                    label: itemsInCart.length,
                    inline: !0,
                    size: 16,
                    disabled: itemsInCart.length <= 0,
                    color: "red",
                    offset: 7,
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Button, {
                      px: 8,
                      component: import_react11.Link,
                      variant: "subtle",
                      to: "/cart",
                      title: "Cart",
                      color: "gray",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_outline.ShoppingCartIcon, {
                        className: "h-5 w-5 text-gray-500"
                      }, void 0, !1, {
                        fileName: "app/routes/__app.tsx",
                        lineNumber: 174,
                        columnNumber: 10
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/__app.tsx",
                      lineNumber: 166,
                      columnNumber: 9
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app.tsx",
                    lineNumber: 158,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Menu, {
                    position: "bottom-start",
                    withArrow: !0,
                    transition: "pop-top-right",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Menu.Target, {
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("button", {
                          children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Avatar, {
                            color: "blue",
                            size: "md",
                            children: user.name.charAt(0)
                          }, void 0, !1, {
                            fileName: "app/routes/__app.tsx",
                            lineNumber: 186,
                            columnNumber: 12
                          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Avatar, {}, void 0, !1, {
                            fileName: "app/routes/__app.tsx",
                            lineNumber: 190,
                            columnNumber: 12
                          }, this)
                        }, void 0, !1, {
                          fileName: "app/routes/__app.tsx",
                          lineNumber: 184,
                          columnNumber: 10
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/__app.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Menu.Dropdown, {
                        children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_jsx_dev_runtime13.Fragment, {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Menu.Item, {
                              disabled: !0,
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                                className: "flex flex-col",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", {
                                    children: user.name
                                  }, void 0, !1, {
                                    fileName: "app/routes/__app.tsx",
                                    lineNumber: 200,
                                    columnNumber: 14
                                  }, this),
                                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", {
                                    className: "mt-0.5 text-sm",
                                    children: user.email
                                  }, void 0, !1, {
                                    fileName: "app/routes/__app.tsx",
                                    lineNumber: 201,
                                    columnNumber: 14
                                  }, this)
                                ]
                              }, void 0, !0, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 198,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Divider, {}, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 204,
                              columnNumber: 12
                            }, this),
                            isCustomer2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Menu.Item, {
                              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_outline.ShoppingBagIcon, {
                                className: "h-4 w-4"
                              }, void 0, !1, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 208,
                                columnNumber: 20
                              }, this),
                              component: import_react11.Link,
                              to: "/order-history",
                              children: "Your orders"
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 207,
                              columnNumber: 13
                            }, this) : null,
                            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Menu.Item, {
                              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_solid5.ArrowLeftOnRectangleIcon, {
                                className: "h-4 w-4"
                              }, void 0, !1, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 216,
                                columnNumber: 19
                              }, this),
                              type: "submit",
                              form: "logout-form",
                              children: "Logout"
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 215,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/__app.tsx",
                          lineNumber: 197,
                          columnNumber: 11
                        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_jsx_dev_runtime13.Fragment, {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Menu.Item, {
                              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_solid5.ArrowRightOnRectangleIcon, {
                                className: "h-4 w-4"
                              }, void 0, !1, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 226,
                                columnNumber: 19
                              }, this),
                              component: import_react11.Link,
                              to: `/login?redirectTo=${encodeURIComponent(
                                location.pathname
                              )}`,
                              children: "Login"
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 225,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Menu.Item, {
                              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_solid5.UserPlusIcon, {
                                className: "h-4 w-4"
                              }, void 0, !1, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 235,
                                columnNumber: 19
                              }, this),
                              component: import_react11.Link,
                              to: `/register?redirectTo=${encodeURIComponent(
                                location.pathname
                              )}`,
                              children: "Create account"
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 234,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/__app.tsx",
                          lineNumber: 224,
                          columnNumber: 11
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/__app.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app.tsx",
                    lineNumber: 178,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app.tsx",
                lineNumber: 149,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app.tsx",
            lineNumber: 138,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__app.tsx",
          lineNumber: 137,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 136,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app.tsx",
    lineNumber: 134,
    columnNumber: 3
  }, this);
}
function ActionsWrapper({ children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Group, {
        position: "right",
        px: 15,
        py: "xs",
        className: "border-t border-gray-300",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Text, {
          size: "xs",
          color: "dimmed",
          children: [
            "Search powered by ",
            app_config_default.name
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app.tsx",
          lineNumber: 265,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 259,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app.tsx",
    lineNumber: 257,
    columnNumber: 3
  }, this);
}
var unstable_shouldReload2 = ({
  submission,
  prevUrl,
  url
}) => !(!submission && prevUrl.pathname === url.pathname);

// app/routes/__app/order-history.tsx
var order_history_exports = {};
__export(order_history_exports, {
  action: () => action10,
  default: () => OrderHistory,
  loader: () => loader9
});
var import_outline2 = require("@heroicons/react/24/outline"), import_core10 = require("@mantine/core"), import_client7 = require("@prisma/client"), import_node13 = require("@remix-run/node"), import_react12 = require("@remix-run/react"), import_clsx = __toESM(require("clsx")), React6 = __toESM(require("react"));
var import_jsx_dev_runtime14 = require("react/jsx-dev-runtime"), dateFormatter = new Intl.DateTimeFormat("en-US"), loader9 = async ({ request }) => {
  let userId = await requireUserId(request), orders = await getOrders(userId);
  return (0, import_node13.json)({ orders });
}, action10 = async ({ request }) => {
  var _a, _b;
  let userId = await requireUserId(request), formData = await request.formData(), intent = (_a = formData.get("intent")) == null ? void 0 : _a.toString();
  if (!userId || !intent)
    return (0, import_node13.json)({ success: !1, message: "Unauthorized" }, { status: 401 });
  switch (intent) {
    case "cancel-order": {
      let orderId = (_b = formData.get("orderId")) == null ? void 0 : _b.toString();
      return orderId ? cancelOrder(orderId).then(() => (0, import_node13.json)({ success: !0 })).catch((e) => (0, import_node13.json)({ success: !1, message: e.message }, { status: 500 })) : badRequest({ success: !1, message: "Invalid order id" });
    }
    default:
      return (0, import_node13.json)({ success: !1, message: "Invalid intent" }, { status: 400 });
  }
};
function OrderHistory() {
  let { orders } = (0, import_react12.useLoaderData)(), [searchParams, setSearchParams] = (0, import_react12.useSearchParams)(), { clearCart } = useCart();
  return React6.useEffect(() => {
    if (searchParams.get("success")) {
      clearCart(), setSearchParams({}, { replace: !0 });
      return;
    }
  }, [clearCart, searchParams, setSearchParams]), /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_jsx_dev_runtime14.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
      className: "flex flex-col gap-4 p-4",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
        className: "bg-[rgb(129, 135, 80)]",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(TailwindContainer, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
            className: "py-16 px-4 sm:py-20 sm:px-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                className: "max-w-xl",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                    className: "mb-12",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Button, {
                      leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_outline2.ArrowLeftIcon, {
                        className: "h-5 w-5"
                      }, void 0, !1, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 80,
                        columnNumber: 21
                      }, this),
                      variant: "white",
                      size: "md",
                      component: import_react12.Link,
                      to: "..",
                      pl: 0,
                      children: "Back"
                    }, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 79,
                      columnNumber: 10
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("h1", {
                    className: "text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl",
                    children: "Order history"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", {
                    className: "mt-2 text-sm text-gray-500",
                    children: "Check the status of recent orders."
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 77,
                columnNumber: 8
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                className: "mt-16",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("h2", {
                    className: "sr-only",
                    children: "Recent orders"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                    className: "flex flex-col gap-20",
                    children: orders.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_jsx_dev_runtime14.Fragment, {
                      children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(Order, {
                        order
                      }, order.id, !1, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 106,
                        columnNumber: 13
                      }, this))
                    }, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 104,
                      columnNumber: 11
                    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(EmptyState, {}, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 110,
                      columnNumber: 11
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 99,
                columnNumber: 8
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 76,
            columnNumber: 7
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__app/order-history.tsx",
          lineNumber: 75,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 74,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/__app/order-history.tsx",
      lineNumber: 73,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app/order-history.tsx",
    lineNumber: 72,
    columnNumber: 3
  }, this);
}
function Order({ order }) {
  var _a, _b;
  let returnOrderFetcher = (0, import_react12.useFetcher)(), isOrderCancelled = order.status === import_client7.OrderStatus.CANCELLED, isDelivery = order.type === import_client7.OrderType.DELIVERY;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("h3", {
        className: "sr-only",
        children: [
          "Order placed on",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("time", {
            dateTime: order.createdAt,
            children: order.createdAt
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 132,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 130,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
        className: (0, import_clsx.default)(
          "rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:gap-8"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dl", {
            className: "flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600  sm:flex sm:items-center sm:gap-6 sm:space-y-0 sm:divide-y-0 lg:flex-none lg:gap-16",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                className: "flex justify-between sm:block",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dt", {
                    className: "font-semibold text-gray-900",
                    children: "Date placed"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 143,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dd", {
                    className: "sm:mt-1",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("time", {
                      dateTime: order.createdAt,
                      children: dateFormatter.format(new Date(order.createdAt))
                    }, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 145,
                      columnNumber: 8
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 144,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 142,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                className: "flex justify-between pt-6 text-gray-900 sm:block sm:pt-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dt", {
                    className: "font-semibold",
                    children: "Order type"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 153,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dd", {
                    className: "sm:mt-1",
                    children: titleCase(order.type)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 154,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 152,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                className: "flex justify-between pt-6 text-gray-900 sm:block sm:pt-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dt", {
                    className: "font-semibold",
                    children: "Payment method"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 159,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dd", {
                    className: "sm:mt-1",
                    children: titleCase(order.payment.paymentMethod.replace(/_/g, " "))
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 160,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 158,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                className: "flex justify-between pt-6  text-gray-900 sm:block sm:pt-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dt", {
                    className: "font-semibold",
                    children: "Total amount"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 167,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dd", {
                    className: "flex items-center gap-2 sm:mt-1",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", {
                      className: "font-semibold",
                      children: [
                        "$",
                        (_a = order.payment) == null ? void 0 : _a.amount
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 169,
                      columnNumber: 8
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 168,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 166,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                className: "flex justify-between pt-6  text-gray-900 sm:block sm:pt-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dt", {
                    className: "font-semibold",
                    children: "Status"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 175,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("dd", {
                    className: "flex items-center gap-2 sm:mt-1",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Badge, {
                      color: isOrderCancelled ? "blue" : "green",
                      children: titleCase(order.status)
                    }, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 177,
                      columnNumber: 8
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 176,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 174,
                columnNumber: 6
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 140,
            columnNumber: 5
          }, this),
          order.status === import_client7.OrderStatus.DELIVERED || order.status === import_client7.OrderStatus.READY || order.status === import_client7.OrderStatus.COMPLETED ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Button, {
            color: "red",
            variant: "outline",
            loaderPosition: "right",
            loading: returnOrderFetcher.state !== "idle",
            onClick: () => returnOrderFetcher.submit(
              {
                intent: "cancel-order",
                orderId: order.id
              },
              {
                method: "post",
                replace: !0
              }
            ),
            children: "Cancel Order"
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 187,
            columnNumber: 6
          }, this) : null
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 135,
        columnNumber: 4
      }, this),
      isDelivery ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
          className: "mt-2 flex items-center gap-4 pt-6 text-sm text-gray-900 sm:block sm:pt-0",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", {
              className: "pl-6 font-semibold",
              children: "Delivery address: "
            }, void 0, !1, {
              fileName: "app/routes/__app/order-history.tsx",
              lineNumber: 214,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", {
              className: "font-normal",
              children: (_b = order.payment) == null ? void 0 : _b.address
            }, void 0, !1, {
              fileName: "app/routes/__app/order-history.tsx",
              lineNumber: 215,
              columnNumber: 7
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app/order-history.tsx",
          lineNumber: 213,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 212,
        columnNumber: 5
      }, this) : order.status === import_client7.OrderStatus.READY ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
        className: "mt-2 flex items-center gap-4 pt-6 text-sm text-gray-900 sm:block sm:pt-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", {
            className: "pl-6 font-semibold",
            children: "Pickup Time: "
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 220,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", {
            className: "font-normal",
            children: formatTime(order.pickupTime)
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 221,
            columnNumber: 6
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 219,
        columnNumber: 5
      }, this) : null,
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("table", {
        className: "mt-4 w-full text-gray-500 sm:mt-6",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("thead", {
            className: "sr-only text-left text-sm text-gray-500 sm:not-sr-only",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("tr", {
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("th", {
                  scope: "col",
                  className: "py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3",
                  children: "Product"
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 228,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("th", {
                  scope: "col",
                  className: "hidden w-1/5 py-3 pr-8 font-normal sm:table-cell",
                  children: "Quantity"
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 231,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("th", {
                  scope: "col",
                  className: "hidden py-3 pr-8 font-normal sm:table-cell",
                  children: "Price"
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 237,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("th", {
                  scope: "col",
                  className: "w-0 py-3 text-right font-normal"
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 243,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/order-history.tsx",
              lineNumber: 227,
              columnNumber: 6
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 226,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("tbody", {
            className: "divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t",
            children: order.products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("tr", {
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("td", {
                  className: "py-6 pr-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                    className: "flex items-center",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("img", {
                        src: product.product.image,
                        alt: product.product.name,
                        className: "mr-6 h-16 w-16 rounded object-cover object-center"
                      }, void 0, !1, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 251,
                        columnNumber: 10
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                        className: "flex flex-col font-medium text-gray-900",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Anchor, {
                          component: import_react12.Link,
                          to: `/product/${product.product.slug}`,
                          size: "sm",
                          children: product.product.name
                        }, void 0, !1, {
                          fileName: "app/routes/__app/order-history.tsx",
                          lineNumber: 257,
                          columnNumber: 11
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 256,
                        columnNumber: 10
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 250,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 249,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("td", {
                  className: "hidden py-6 pr-8 sm:table-cell",
                  children: product.quantity
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 268,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("td", {
                  className: "hidden py-6 pr-8 sm:table-cell",
                  children: [
                    "$",
                    product.amount
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 272,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("td", {
                  className: "whitespace-nowrap py-6 text-right font-medium",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Anchor, {
                    component: import_react12.Link,
                    to: `/product/${product.product.slug}`,
                    size: "sm",
                    children: [
                      "View",
                      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", {
                        className: "sr-only",
                        children: [
                          ", ",
                          product.product.name
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 283,
                        columnNumber: 10
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 277,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 276,
                  columnNumber: 8
                }, this)
              ]
            }, product.id, !0, {
              fileName: "app/routes/__app/order-history.tsx",
              lineNumber: 248,
              columnNumber: 7
            }, this))
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 246,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 225,
        columnNumber: 4
      }, this)
    ]
  }, order.id, !0, {
    fileName: "app/routes/__app/order-history.tsx",
    lineNumber: 129,
    columnNumber: 3
  }, this);
}
function EmptyState() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
    className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_outline2.ShoppingBagIcon, {
        className: "mx-auto h-9 w-9 text-gray-500"
      }, void 0, !1, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 297,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", {
        className: "mt-4 block text-sm font-medium text-gray-500",
        children: "No previous orders"
      }, void 0, !1, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 298,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app/order-history.tsx",
    lineNumber: 296,
    columnNumber: 3
  }, this);
}

// app/routes/__app/product.$slug.tsx
var product_slug_exports = {};
__export(product_slug_exports, {
  default: () => Item,
  loader: () => loader10
});
var import_solid6 = require("@heroicons/react/24/solid"), import_core11 = require("@mantine/core"), import_node14 = require("@remix-run/node"), import_react13 = require("@remix-run/react"), React7 = __toESM(require("react"));
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime"), loader10 = async ({ params }) => {
  let { slug } = params;
  if (!slug)
    throw new Response("No slug provided", { status: 404 });
  return (0, import_node14.json)({ slug });
};
function Item() {
  let { slug } = (0, import_react13.useLoaderData)(), product = useProduct(slug), { addItemToCart } = useCart(), [quantity, setQuantity] = React7.useState(1);
  if (!product)
    return null;
  let isOutOfStock = product.quantity === 0, totalPrice = quantity ? (product.price + product.commission) * quantity : product.price + product.commission;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_jsx_dev_runtime15.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
      className: "flex flex-col gap-4 p-4",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
        className: "bg-[rgb(129, 135, 80)]",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
          className: "mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-12 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
              className: "sm:mt-10 lg:row-span-2 lg:mt-0 lg:self-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                  className: "mb-12",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Button, {
                    leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_solid6.ArrowLeftIcon, {
                      className: "h-5 w-5"
                    }, void 0, !1, {
                      fileName: "app/routes/__app/product.$slug.tsx",
                      lineNumber: 46,
                      columnNumber: 20
                    }, this),
                    variant: "white",
                    size: "md",
                    component: import_react13.Link,
                    to: "..",
                    pl: 0,
                    children: "Back"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/product.$slug.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/product.$slug.tsx",
                  lineNumber: 44,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                  className: "overflow-hidden rounded-lg shadow",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("img", {
                    src: product.image,
                    alt: product.name,
                    className: "aspect-square w-full object-cover"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/product.$slug.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/product.$slug.tsx",
                  lineNumber: 56,
                  columnNumber: 8
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/product.$slug.tsx",
              lineNumber: 43,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
              className: "lg:col-start-2 lg:max-w-lg lg:self-end",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                  className: "mt-4",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h1", {
                    className: "text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl",
                    children: product.name
                  }, void 0, !1, {
                    fileName: "app/routes/__app/product.$slug.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/product.$slug.tsx",
                  lineNumber: 66,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("section", {
                  "aria-labelledby": "information-heading",
                  className: "mt-4",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("p", {
                      className: "text-lg text-gray-900 sm:text-xl",
                      children: [
                        "$",
                        totalPrice
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/product.$slug.tsx",
                      lineNumber: 73,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                      className: "mt-4 space-y-6",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("p", {
                        className: "text-base text-gray-500",
                        children: product.description
                      }, void 0, !1, {
                        fileName: "app/routes/__app/product.$slug.tsx",
                        lineNumber: 78,
                        columnNumber: 10
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/__app/product.$slug.tsx",
                      lineNumber: 77,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                      className: "mt-4 space-y-6",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", {
                          children: "Seller: "
                        }, void 0, !1, {
                          fileName: "app/routes/__app/product.$slug.tsx",
                          lineNumber: 84,
                          columnNumber: 10
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", {
                          className: "text-base text-gray-500",
                          children: [
                            product.seller.name,
                            " (",
                            product.seller.email,
                            ")"
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/__app/product.$slug.tsx",
                          lineNumber: 85,
                          columnNumber: 10
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/product.$slug.tsx",
                      lineNumber: 83,
                      columnNumber: 9
                    }, this),
                    isOutOfStock ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_jsx_dev_runtime15.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                          className: "mt-4 space-y-6",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", {
                              children: "Available Quantity: "
                            }, void 0, !1, {
                              fileName: "app/routes/__app/product.$slug.tsx",
                              lineNumber: 93,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", {
                              className: "text-base text-gray-500",
                              children: product.quantity
                            }, void 0, !1, {
                              fileName: "app/routes/__app/product.$slug.tsx",
                              lineNumber: 94,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/__app/product.$slug.tsx",
                          lineNumber: 92,
                          columnNumber: 11
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.NumberInput, {
                          mt: 12,
                          required: !0,
                          label: "Quantity",
                          value: quantity,
                          max: product.quantity,
                          onChange: (val) => setQuantity(Number(val)),
                          min: 1,
                          defaultValue: 1
                        }, void 0, !1, {
                          fileName: "app/routes/__app/product.$slug.tsx",
                          lineNumber: 99,
                          columnNumber: 11
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/product.$slug.tsx",
                      lineNumber: 91,
                      columnNumber: 10
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/__app/product.$slug.tsx",
                  lineNumber: 72,
                  columnNumber: 8
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/product.$slug.tsx",
              lineNumber: 65,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
              className: "mt-6 lg:col-start-2 lg:row-start-2 lg:max-w-lg lg:self-start",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Button, {
                fullWidth: !0,
                mt: "2.5rem",
                disabled: !quantity || isOutOfStock || quantity > product.quantity,
                onClick: () => addItemToCart({
                  ...product,
                  quantity,
                  basePrice: product.price + product.commission
                }),
                children: isOutOfStock ? "Out of stock" : "Add to cart"
              }, void 0, !1, {
                fileName: "app/routes/__app/product.$slug.tsx",
                lineNumber: 116,
                columnNumber: 8
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app/product.$slug.tsx",
              lineNumber: 115,
              columnNumber: 7
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app/product.$slug.tsx",
          lineNumber: 42,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/product.$slug.tsx",
        lineNumber: 41,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/__app/product.$slug.tsx",
      lineNumber: 40,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app/product.$slug.tsx",
    lineNumber: 39,
    columnNumber: 3
  }, this);
}

// app/routes/__app/index.tsx
var app_exports2 = {};
__export(app_exports2, {
  default: () => Dashboard
});
var import_core12 = require("@mantine/core"), import_react14 = require("@remix-run/react");
var import_jsx_dev_runtime16 = require("react/jsx-dev-runtime");
function Dashboard() {
  let { products } = useAppData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
    className: "flex flex-col gap-4 p-4",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
      className: "bg-[rgb(129, 135, 80)]",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(TailwindContainer, {
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
          className: "py-16 px-4 sm:py-20 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
              className: "flex items-center justify-between",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("h2", {
                className: "text-2xl font-extrabold tracking-tight text-gray-900",
                children: "Products"
              }, void 0, !1, {
                fileName: "app/routes/__app/index.tsx",
                lineNumber: 15,
                columnNumber: 8
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app/index.tsx",
              lineNumber: 14,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
              className: "mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8",
              children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                className: "mx-auto sm:mx-[unset]",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                    className: "h-48 overflow-hidden rounded-md bg-gray-200 shadow lg:h-64",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("img", {
                      src: product.image,
                      alt: product.name,
                      className: "h-full w-full object-cover object-center"
                    }, void 0, !1, {
                      fileName: "app/routes/__app/index.tsx",
                      lineNumber: 25,
                      columnNumber: 12
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/index.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("h3", {
                    className: "mt-4 text-sm text-gray-700",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_core12.Anchor, {
                      to: `/product/${product.slug}`,
                      prefetch: "intent",
                      component: import_react14.Link,
                      children: product.name
                    }, void 0, !1, {
                      fileName: "app/routes/__app/index.tsx",
                      lineNumber: 33,
                      columnNumber: 12
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/index.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", {
                    className: "mt-1 text-sm font-medium text-gray-900",
                    children: [
                      "$",
                      product.price + product.commission
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/index.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_core12.Button, {
                    to: `/product/${product.slug}`,
                    component: import_react14.Link,
                    variant: "light",
                    fullWidth: !0,
                    mt: "md",
                    children: "View"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/index.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                  }, this)
                ]
              }, product.id, !0, {
                fileName: "app/routes/__app/index.tsx",
                lineNumber: 23,
                columnNumber: 10
              }, this))
            }, void 0, !1, {
              fileName: "app/routes/__app/index.tsx",
              lineNumber: 20,
              columnNumber: 7
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app/index.tsx",
          lineNumber: 13,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/index.tsx",
        lineNumber: 12,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/__app/index.tsx",
      lineNumber: 11,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app/index.tsx",
    lineNumber: 10,
    columnNumber: 3
  }, this);
}

// app/routes/__app/cart.tsx
var cart_exports = {};
__export(cart_exports, {
  action: () => action11,
  default: () => Cart
});
var import_solid7 = require("@heroicons/react/24/solid"), import_core13 = require("@mantine/core"), import_dates = require("@mantine/dates"), import_notifications3 = require("@mantine/notifications"), import_client8 = require("@prisma/client"), import_node15 = require("@remix-run/node"), import_react15 = require("@remix-run/react"), React8 = __toESM(require("react")), import_react_input_mask = __toESM(require("react-input-mask"));
var import_jsx_dev_runtime17 = require("react/jsx-dev-runtime");
async function action11({ request }) {
  var _a, _b, _c, _d, _e, _f, _g;
  let formData = await request.formData(), userId = await getUserId(request), intent = (_a = formData.get("intent")) == null ? void 0 : _a.toString();
  if (!userId || !intent)
    return (0, import_node15.json)({ success: !1, message: "Unauthorized" }, { status: 401 });
  switch (intent) {
    case "place-order": {
      let stringifiedProducts = (_b = formData.get("products[]")) == null ? void 0 : _b.toString(), amount = (_c = formData.get("amount")) == null ? void 0 : _c.toString(), orderType = (_d = formData.get("orderType")) == null ? void 0 : _d.toString(), paymentMethod = (_e = formData.get("paymentMethod")) == null ? void 0 : _e.toString(), address = (_f = formData.get("address")) == null ? void 0 : _f.toString(), pickupTime = (_g = formData.get("pickupTime")) == null ? void 0 : _g.toString();
      if (!stringifiedProducts || !amount || !paymentMethod || !orderType)
        return badRequest({
          success: !1,
          message: "Invalid request body"
        });
      if (orderType === import_client8.OrderType.DELIVERY && !address)
        return badRequest({
          success: !1,
          message: "Address is required for delivery"
        });
      if (orderType === import_client8.OrderType.PICKUP && !pickupTime)
        return badRequest({
          success: !1,
          message: "Pickup time is required for pickup"
        });
      let products = JSON.parse(stringifiedProducts);
      return await createOrder({
        userId,
        products,
        amount: Number(amount),
        paymentMethod,
        orderType,
        address: address || "",
        pickupTime: pickupTime ? new Date(pickupTime) : null
      }), (0, import_node15.redirect)("/order-history/?success=true");
    }
  }
}
function Cart() {
  let id = React8.useId(), location = (0, import_react15.useLocation)(), fetcher = (0, import_react15.useFetcher)(), { clearCart, itemsInCart, totalPrice } = useCart(), { user } = useOptionalUser(), [orderType, setOrderType] = React8.useState(
    import_client8.OrderType.DELIVERY
  ), [paymentMethod, setPaymentMethod] = React8.useState(
    import_client8.PaymentMethod.CREDIT_CARD
  ), [address, setAddress] = React8.useState((user == null ? void 0 : user.address) ?? ""), [isPaymentModalOpen, setIsPaymentModalOpen] = React8.useState(!1), [cardNumber, setCardNumber] = React8.useState("1234567891234567"), [pickUpTime, setPickUpTime] = React8.useState(
    new Date(new Date().getTime() + 2 * 60 * 60 * 1e3)
  ), [cardExpiry, setCardExpiry] = React8.useState(
    new Date("2026-12-31")
  ), [cardCvv, setCardCvv] = React8.useState("123"), [errors, setErrors] = React8.useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvv: ""
  }), closePaymentModal = () => setIsPaymentModalOpen(!1), showPaymentModal = () => setIsPaymentModalOpen(!0), placeOrder = () => {
    let formData = new FormData();
    setErrors({
      cardNumber: "",
      cardExpiry: "",
      cardCvv: ""
    }), cardNumber.replace(/[_ ]/g, "").length !== 16 && setErrors((prevError) => ({
      ...prevError,
      cardNumber: "Card number must be 16 digits"
    })), cardExpiry || setErrors((prevError) => ({
      ...prevError,
      cardExpiry: "Card expiry is required"
    })), (!cardCvv || cardCvv.length !== 3) && setErrors((prevError) => ({
      ...prevError,
      cardCvv: "Card CVV must be 3 digits"
    })), !Object.values(errors).some((error) => error !== "") && (formData.append("products[]", JSON.stringify(itemsInCart)), formData.append("amount", totalPrice.toString()), formData.append("intent", "place-order"), formData.append("orderType", orderType), formData.append("paymentMethod", paymentMethod), formData.append("address", address), formData.append("pickupTime", pickUpTime ? pickUpTime.toISOString() : ""), fetcher.submit(formData, {
      method: "post",
      replace: !0
    }));
  }, isSubmitting = fetcher.state !== "idle", isDelivery = orderType === import_client8.OrderType.DELIVERY;
  return React8.useEffect(() => {
    if (fetcher.type === "done" && ((0, import_notifications3.cleanNotifications)(), !fetcher.data.success)) {
      (0, import_notifications3.showNotification)({
        title: "Error",
        message: fetcher.data.message,
        icon: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_solid7.MinusCircleIcon, {
          className: "h-7 w-7"
        }, void 0, !1, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 193,
          columnNumber: 11
        }, this),
        color: "red"
      });
      return;
    }
  }, [fetcher.data, fetcher.type]), /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_jsx_dev_runtime17.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
        className: "flex flex-col gap-4 p-4",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
          className: "bg-[rgb(129, 135, 80)]",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(TailwindContainer, {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
              className: "sm:px-4py-16 py-16 px-4 sm:py-20",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                          className: "mb-12",
                          children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Button, {
                            leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_solid7.ArrowLeftIcon, {
                              className: "h-5 w-5"
                            }, void 0, !1, {
                              fileName: "app/routes/__app/cart.tsx",
                              lineNumber: 210,
                              columnNumber: 22
                            }, this),
                            variant: "white",
                            size: "md",
                            component: import_react15.Link,
                            to: "..",
                            pl: 0,
                            children: "Back"
                          }, void 0, !1, {
                            fileName: "app/routes/__app/cart.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                          }, this)
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 208,
                          columnNumber: 10
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("h1", {
                          className: "text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl",
                          children: "Your cart"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 220,
                          columnNumber: 10
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("p", {
                          className: "mt-2 text-sm text-gray-500",
                          children: "Products in your cart"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 223,
                          columnNumber: 10
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 207,
                      columnNumber: 9
                    }, this),
                    itemsInCart.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                      className: "space-x-2",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Button, {
                          variant: "subtle",
                          color: "red",
                          onClick: () => clearCart(),
                          disabled: isSubmitting,
                          children: "Clear cart"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 230,
                          columnNumber: 11
                        }, this),
                        user ? /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Button, {
                          variant: "light",
                          loading: isSubmitting,
                          onClick: () => showPaymentModal(),
                          children: "Make payment"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 240,
                          columnNumber: 12
                        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Button, {
                          variant: "light",
                          component: import_react15.Link,
                          to: `/login?redirectTo=${encodeURIComponent(
                            location.pathname
                          )}`,
                          children: "Sign in to order"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 248,
                          columnNumber: 12
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 229,
                      columnNumber: 10
                    }, this) : null
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 206,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                  className: "mt-16",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("h2", {
                      className: "sr-only",
                      children: "Current ice-creams in cart"
                    }, void 0, !1, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 263,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                      className: "flex flex-col gap-12",
                      children: itemsInCart.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(CartItems, {}, void 0, !1, {
                        fileName: "app/routes/__app/cart.tsx",
                        lineNumber: 266,
                        columnNumber: 36
                      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(EmptyState2, {}, void 0, !1, {
                        fileName: "app/routes/__app/cart.tsx",
                        lineNumber: 266,
                        columnNumber: 52
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 265,
                      columnNumber: 9
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 262,
                  columnNumber: 8
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 205,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/__app/cart.tsx",
            lineNumber: 204,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 203,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/cart.tsx",
        lineNumber: 202,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Modal, {
        opened: !!user && isPaymentModalOpen,
        onClose: closePaymentModal,
        title: "Payment",
        centered: !0,
        overlayBlur: 1,
        overlayOpacity: 0.7,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
          className: "flex flex-col gap-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
              className: "flex flex-col gap-2",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("h2", {
                className: "text-sm text-gray-600",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", {
                    className: "font-semibold",
                    children: "Amount: "
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 285,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", {
                    children: [
                      "$",
                      totalPrice
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 286,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 284,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 283,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Select, {
              label: "Order type",
              value: orderType,
              clearable: !1,
              onChange: (e) => setOrderType(e),
              data: Object.values(import_client8.OrderType).filter((ot) => ot === "DELIVERY").map((type) => ({
                label: titleCase(type.replace(/_/g, " ")),
                value: type
              }))
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 290,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Select, {
              label: "Payment method",
              value: paymentMethod,
              clearable: !1,
              onChange: (e) => setPaymentMethod(e),
              data: Object.values(import_client8.PaymentMethod).map((method) => ({
                label: titleCase(method.replace(/_/g, " ")),
                value: method
              }))
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 303,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Input.Wrapper, {
              id,
              label: "Credit card number",
              required: !0,
              error: errors.cardNumber,
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Input, {
                id,
                component: import_react_input_mask.default,
                mask: "9999 9999 9999 9999",
                placeholder: "XXXX XXXX XXXX XXXX",
                alwaysShowMask: !1,
                value: cardNumber,
                onChange: (e) => setCardNumber(e.target.value)
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 320,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 314,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
              className: "flex items-center gap-4",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Input.Wrapper, {
                  id: id + "cvv",
                  label: "CVV",
                  required: !0,
                  error: errors.cardCvv,
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Input, {
                    id: id + "cvv",
                    name: "cvv",
                    component: import_react_input_mask.default,
                    mask: "999",
                    placeholder: "XXX",
                    alwaysShowMask: !1,
                    value: cardCvv,
                    onChange: (e) => setCardCvv(e.target.value)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 338,
                    columnNumber: 8
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 332,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_dates.DatePicker, {
                  name: "expiryDate",
                  label: "Expiry",
                  inputFormat: "MM/YYYY",
                  clearable: !1,
                  placeholder: "MM/YYYY",
                  labelFormat: "MM/YYYY",
                  required: !0,
                  value: cardExpiry,
                  minDate: new Date(),
                  onChange: (e) => setCardExpiry(e),
                  error: errors.cardExpiry,
                  initialLevel: "year",
                  hideOutsideDates: !0
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 350,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 331,
              columnNumber: 6
            }, this),
            isDelivery ? /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Textarea, {
              label: "Delivery address",
              name: "address",
              value: address,
              onChange: (e) => setAddress(e.target.value),
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 368,
              columnNumber: 7
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_dates.TimeInput, {
                label: "Pickup time",
                clearable: !1,
                format: "12",
                value: pickUpTime,
                onChange: setPickUpTime,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 377,
                columnNumber: 8
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 376,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
              className: "mt-6 flex items-center gap-4 sm:justify-end",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Button, {
                  variant: "subtle",
                  color: "red",
                  onClick: () => closePaymentModal(),
                  children: "Cancel"
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 389,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Button, {
                  variant: "filled",
                  onClick: () => placeOrder(),
                  loading: isSubmitting,
                  loaderPosition: "right",
                  children: "Place order"
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 397,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 388,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 282,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/cart.tsx",
        lineNumber: 274,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app/cart.tsx",
    lineNumber: 201,
    columnNumber: 3
  }, this);
}
function CartItems() {
  let { itemsInCart, removeItemFromCart, totalPrice } = useCart();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_jsx_dev_runtime17.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("table", {
      className: "mt-4 w-full text-gray-500 sm:mt-6",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("thead", {
          className: "sr-only text-left text-sm text-gray-500 sm:not-sr-only",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("tr", {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("th", {
                scope: "col",
                className: "py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3",
                children: "Products"
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 420,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("th", {
                scope: "col",
                className: "hidden py-3 pr-8 font-normal sm:table-cell",
                children: "Quantity"
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 423,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("th", {
                scope: "col",
                className: "hidden py-3 pr-8 font-normal sm:table-cell",
                children: "Price"
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 429,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("th", {
                scope: "col",
                className: "w-0 py-3 text-right font-normal"
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 436,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app/cart.tsx",
            lineNumber: 419,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 418,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("tbody", {
          className: "divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t",
          children: [
            itemsInCart.map((item) => {
              let itemTotalPrice = item.basePrice * item.quantity;
              return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("tr", {
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("td", {
                    className: "py-6 pr-8",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                      className: "flex items-center",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("img", {
                          src: item.image,
                          alt: item.name,
                          className: "mr-6 h-16 w-16 rounded object-cover object-center"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 448,
                          columnNumber: 11
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                          children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                            className: "flex flex-col font-medium text-gray-900",
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Anchor, {
                              component: import_react15.Link,
                              to: `/product/${item.slug}`,
                              size: "sm",
                              children: item.name
                            }, void 0, !1, {
                              fileName: "app/routes/__app/cart.tsx",
                              lineNumber: 455,
                              columnNumber: 13
                            }, this)
                          }, void 0, !1, {
                            fileName: "app/routes/__app/cart.tsx",
                            lineNumber: 454,
                            columnNumber: 12
                          }, this)
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 453,
                          columnNumber: 11
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 447,
                      columnNumber: 10
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 446,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("td", {
                    className: "hidden py-6 pr-8 sm:table-cell",
                    children: item.quantity
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 467,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("td", {
                    className: "hidden py-6 pr-8 font-semibold sm:table-cell",
                    children: [
                      "$",
                      itemTotalPrice.toFixed(2)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 470,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("td", {
                    className: "whitespace-nowrap py-6 text-right font-medium",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.ActionIcon, {
                      onClick: () => removeItemFromCart(item.id),
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_solid7.TrashIcon, {
                        className: "h-4 w-4 text-red-500"
                      }, void 0, !1, {
                        fileName: "app/routes/__app/cart.tsx",
                        lineNumber: 475,
                        columnNumber: 11
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 474,
                      columnNumber: 10
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 473,
                    columnNumber: 9
                  }, this)
                ]
              }, item.id, !0, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 445,
                columnNumber: 8
              }, this);
            }),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("tr", {
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("td", {
                  className: "py-6 pr-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                    className: "flex items-center",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                          className: "font-medium text-gray-900"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 486,
                          columnNumber: 10
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
                          className: "mt-1 sm:hidden"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 487,
                          columnNumber: 10
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 485,
                      columnNumber: 9
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 484,
                    columnNumber: 8
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 483,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("td", {
                  className: "hidden py-6 pr-8 sm:table-cell"
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 492,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("td", {
                  className: "hidden py-6 pr-8 font-semibold sm:table-cell",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", {
                    children: [
                      "$",
                      totalPrice.toFixed(2)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 494,
                    columnNumber: 8
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 493,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 482,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 440,
          columnNumber: 5
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/__app/cart.tsx",
      lineNumber: 417,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app/cart.tsx",
    lineNumber: 416,
    columnNumber: 3
  }, this);
}
function EmptyState2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
    className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_solid7.ShoppingCartIcon, {
        className: "mx-auto h-9 w-9 text-gray-500"
      }, void 0, !1, {
        fileName: "app/routes/__app/cart.tsx",
        lineNumber: 506,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", {
        className: "mt-4 block text-sm font-medium text-gray-500",
        children: "Your cart is empty"
      }, void 0, !1, {
        fileName: "app/routes/__app/cart.tsx",
        lineNumber: 507,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app/cart.tsx",
    lineNumber: 505,
    columnNumber: 3
  }, this);
}

// app/routes/admin.tsx
var admin_exports = {};
__export(admin_exports, {
  default: () => AppLayout3,
  loader: () => loader11
});
var import_solid8 = require("@heroicons/react/24/solid"), import_core14 = require("@mantine/core"), import_node16 = require("@remix-run/node"), import_react16 = require("@remix-run/react");
var import_jsx_dev_runtime18 = require("react/jsx-dev-runtime"), loader11 = async ({ request }) => (await requireUser(request), await isCustomer(request) ? (0, import_node16.redirect)("/") : await isSeller(request) ? (0, import_node16.redirect)("/seller") : (0, import_node16.json)({}));
function AppLayout3() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_jsx_dev_runtime18.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", {
      className: "flex h-full flex-col",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(HeaderComponent3, {}, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 35,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.ScrollArea, {
          classNames: { root: "flex-1 bg-gray-100" },
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("main", {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_react16.Outlet, {}, void 0, !1, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 38,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 37,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 36,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Footer, {}, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 41,
          columnNumber: 5
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 34,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 33,
    columnNumber: 3
  }, this);
}
function HeaderComponent3() {
  let location = (0, import_react16.useLocation)(), { user } = useOptionalUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_jsx_dev_runtime18.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_react16.Form, {
        replace: !0,
        action: "/api/auth/logout",
        method: "post",
        id: "logout-form"
      }, void 0, !1, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 53,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("header", {
        className: "h-16 p-4",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(TailwindContainer, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", {
            className: "flex h-full w-full items-center justify-between",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", {
                className: "flex flex-shrink-0 items-center gap-4",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Anchor, {
                  component: import_react16.Link,
                  to: "/",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("img", {
                    className: "h-10 object-cover object-center",
                    src: app_config_default.logo,
                    alt: "Logo"
                  }, void 0, !1, {
                    fileName: "app/routes/admin.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 58,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 57,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", {
                className: "flex items-center gap-4",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Menu, {
                  position: "bottom-start",
                  transition: "pop-top-right",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Menu.Target, {
                      children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Button, {
                        variant: "gradient",
                        compact: !0,
                        children: user.name
                      }, void 0, !1, {
                        fileName: "app/routes/admin.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Avatar, {}, void 0, !1, {
                        fileName: "app/routes/admin.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/admin.tsx",
                      lineNumber: 69,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Menu.Dropdown, {
                      children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_jsx_dev_runtime18.Fragment, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Menu.Item, {
                            disabled: !0,
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", {
                              className: "flex flex-col",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("p", {
                                  children: user.name
                                }, void 0, !1, {
                                  fileName: "app/routes/admin.tsx",
                                  lineNumber: 84,
                                  columnNumber: 14
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("p", {
                                  className: "mt-0.5 text-sm",
                                  children: user.email
                                }, void 0, !1, {
                                  fileName: "app/routes/admin.tsx",
                                  lineNumber: 85,
                                  columnNumber: 14
                                }, this)
                              ]
                            }, void 0, !0, {
                              fileName: "app/routes/admin.tsx",
                              lineNumber: 83,
                              columnNumber: 13
                            }, this)
                          }, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 82,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Divider, {}, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 88,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Menu.Item, {
                            icon: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_solid8.ArrowLeftOnRectangleIcon, {
                              className: "h-4 w-4"
                            }, void 0, !1, {
                              fileName: "app/routes/admin.tsx",
                              lineNumber: 91,
                              columnNumber: 19
                            }, this),
                            type: "submit",
                            form: "logout-form",
                            children: "Logout"
                          }, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 90,
                            columnNumber: 12
                          }, this)
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/admin.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_jsx_dev_runtime18.Fragment, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Menu.Item, {
                            icon: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_solid8.ArrowRightOnRectangleIcon, {
                              className: "h-4 w-4"
                            }, void 0, !1, {
                              fileName: "app/routes/admin.tsx",
                              lineNumber: 101,
                              columnNumber: 19
                            }, this),
                            component: import_react16.Link,
                            to: `/login?redirectTo=${encodeURIComponent(
                              location.pathname
                            )}`,
                            children: "Login"
                          }, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 100,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_core14.Menu.Item, {
                            icon: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_solid8.UserPlusIcon, {
                              className: "h-4 w-4"
                            }, void 0, !1, {
                              fileName: "app/routes/admin.tsx",
                              lineNumber: 110,
                              columnNumber: 19
                            }, this),
                            component: import_react16.Link,
                            to: `/register?redirectTo=${encodeURIComponent(
                              location.pathname
                            )}`,
                            children: "Create account"
                          }, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 109,
                            columnNumber: 12
                          }, this)
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/admin.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/admin.tsx",
                      lineNumber: 79,
                      columnNumber: 9
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 68,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 67,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 56,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 55,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 54,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 52,
    columnNumber: 3
  }, this);
}

// app/routes/admin/products.tsx
var products_exports2 = {};
__export(products_exports2, {
  action: () => action12,
  default: () => ManageProduct,
  loader: () => loader12
});
var import_solid9 = require("@heroicons/react/24/solid"), import_core15 = require("@mantine/core"), import_hooks10 = require("@mantine/hooks"), import_node17 = require("@remix-run/node"), import_react17 = require("@remix-run/react"), import_bson2 = require("bson"), React9 = __toESM(require("react")), import_slugify2 = __toESM(require("slugify")), import_zod4 = require("zod");
var import_jsx_dev_runtime19 = require("react/jsx-dev-runtime"), ManageProductSchema2 = import_zod4.z.object({
  productId: import_zod4.z.string().optional(),
  name: import_zod4.z.string().min(1, "Name is required"),
  description: import_zod4.z.string().min(1, "Description is required"),
  quantity: import_zod4.z.preprocess(
    Number,
    import_zod4.z.number().min(0, "Quantity must be at least 0")
  ),
  price: import_zod4.z.preprocess(
    Number,
    import_zod4.z.number().min(0, "Price must be greater than 0")
  ),
  commission: import_zod4.z.preprocess(
    Number,
    import_zod4.z.number().min(0, "Price must be greater than 0")
  ),
  image: import_zod4.z.string().min(1, "Image is required"),
  category: import_zod4.z.string().min(1, "Category is required").transform((value) => value.split(",")),
  approved: import_zod4.z.string().optional()
}), loader12 = async ({ request }) => {
  let products = await prisma.product.findMany();
  return (0, import_node17.json)({
    products
  });
}, action12 = async ({ request }) => {
  let { fields, fieldErrors } = await validateAction(
    request,
    ManageProductSchema2
  );
  if (fieldErrors)
    return badRequest({ success: !1, fieldErrors });
  let { productId, approved, ...rest } = fields, id = new import_bson2.ObjectId();
  return console.log({ approved }), await prisma.product.update({
    where: {
      id: productId || id.toString()
    },
    data: {
      ...rest,
      approved: approved === "on",
      slug: (0, import_slugify2.default)(rest.name, { lower: !0 })
    }
  }), (0, import_node17.json)({
    success: !0
  });
};
function ManageProduct() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
  let fetcher = (0, import_react17.useFetcher)(), { products } = (0, import_react17.useLoaderData)(), [selectedProductId, setSelectedProductId] = React9.useState(null), [selectedProduct, setSelectedProduct] = React9.useState(null), [isModalOpen, handleModal] = (0, import_hooks10.useDisclosure)(!1), isSubmitting = fetcher.state !== "idle";
  return React9.useEffect(() => {
    var _a2;
    fetcher.state !== "idle" && fetcher.submission === void 0 || (_a2 = fetcher.data) != null && _a2.success && (setSelectedProductId(null), handleModal.close());
  }, [(_a = fetcher.data) == null ? void 0 : _a.success, fetcher.state, fetcher.submission]), React9.useEffect(() => {
    if (!selectedProductId) {
      setSelectedProduct(null);
      return;
    }
    let product = products.find((product2) => product2.id === selectedProductId);
    !product || (setSelectedProduct(product), handleModal.open());
  }, [products, selectedProductId]), /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_jsx_dev_runtime19.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(TailwindContainer, {
        className: "bg-[rgb(129, 135, 80)] rounded-md",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", {
          className: "mt-8 px-4 py-10 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", {
              className: "sm:flex sm:flex-auto sm:items-center sm:justify-between",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", {
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", {
                    className: "mb-12",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.Button, {
                      leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_solid9.ArrowLeftIcon, {
                        className: "h-5 w-5"
                      }, void 0, !1, {
                        fileName: "app/routes/admin/products.tsx",
                        lineNumber: 148,
                        columnNumber: 20
                      }, this),
                      variant: "white",
                      size: "md",
                      component: import_react17.Link,
                      to: "..",
                      pl: 0,
                      children: "Back"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/products.tsx",
                      lineNumber: 147,
                      columnNumber: 9
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/admin/products.tsx",
                    lineNumber: 146,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("h1", {
                    className: "text-xl font-semibold text-gray-900",
                    children: "Manage Products"
                  }, void 0, !1, {
                    fileName: "app/routes/admin/products.tsx",
                    lineNumber: 159,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("p", {
                    className: "mt-2 text-sm text-gray-700",
                    children: "A list of all the products currently present in store."
                  }, void 0, !1, {
                    fileName: "app/routes/admin/products.tsx",
                    lineNumber: 162,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 145,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/admin/products.tsx",
              lineNumber: 144,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", {
              className: "mt-8 flex flex-col",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", {
                className: "-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", {
                  className: "inline-block min-w-full py-2 align-middle md:px-6 lg:px-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("table", {
                    className: "min-w-full divide-y divide-gray-300",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("thead", {
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("tr", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("th", {
                              scope: "col",
                              className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0",
                              children: "Name"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 173,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Price"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 179,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Commision"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 185,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Quantity"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 191,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Category"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 197,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Approved"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 203,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("th", {
                              scope: "col",
                              className: "relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", {
                                className: "sr-only",
                                children: "Actions"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/products.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 209,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/admin/products.tsx",
                          lineNumber: 172,
                          columnNumber: 11
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/admin/products.tsx",
                        lineNumber: 171,
                        columnNumber: 10
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("tbody", {
                        className: "divide-y divide-gray-200",
                        children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("tr", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0",
                              children: product.name
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 220,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: [
                                "$",
                                product.price.toFixed(2)
                              ]
                            }, void 0, !0, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 223,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: [
                                "$",
                                product.commission.toFixed(2)
                              ]
                            }, void 0, !0, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 226,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: product.quantity
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 229,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: formatList(product.category)
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 232,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.Badge, {
                                color: product.approved ? "green" : "red",
                                children: product.approved ? "Yes" : "No"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/products.tsx",
                                lineNumber: 236,
                                columnNumber: 14
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 235,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("td", {
                              className: "relative space-x-4 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6 md:pr-0",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", {
                                className: "flex items-center gap-6",
                                children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.Button, {
                                  loading: isSubmitting,
                                  variant: "subtle",
                                  loaderPosition: "right",
                                  onClick: () => {
                                    setSelectedProductId(product.id);
                                  },
                                  children: "Edit"
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/products.tsx",
                                  lineNumber: 243,
                                  columnNumber: 15
                                }, this)
                              }, void 0, !1, {
                                fileName: "app/routes/admin/products.tsx",
                                lineNumber: 242,
                                columnNumber: 14
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 241,
                              columnNumber: 13
                            }, this)
                          ]
                        }, product.id, !0, {
                          fileName: "app/routes/admin/products.tsx",
                          lineNumber: 219,
                          columnNumber: 12
                        }, this))
                      }, void 0, !1, {
                        fileName: "app/routes/admin/products.tsx",
                        lineNumber: 217,
                        columnNumber: 10
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/admin/products.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 169,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 168,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/admin/products.tsx",
              lineNumber: 167,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/admin/products.tsx",
          lineNumber: 143,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/products.tsx",
        lineNumber: 142,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.Modal, {
        opened: isModalOpen,
        onClose: () => {
          setSelectedProductId(null), handleModal.close();
        },
        title: "Edit Product",
        centered: !0,
        overlayBlur: 1,
        overlayOpacity: 0.7,
        closeOnClickOutside: !isSubmitting,
        closeOnEscape: !isSubmitting,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(fetcher.Form, {
          method: "post",
          replace: !0,
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("fieldset", {
            disabled: isSubmitting,
            className: "flex flex-col gap-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("input", {
                type: "hidden",
                name: "productId",
                value: selectedProduct == null ? void 0 : selectedProduct.id
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 280,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.TextInput, {
                name: "name",
                label: "Name",
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.name,
                error: (_c = (_b = fetcher.data) == null ? void 0 : _b.fieldErrors) == null ? void 0 : _c.name,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 282,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.Textarea, {
                name: "description",
                label: "Description",
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.description,
                error: (_e = (_d = fetcher.data) == null ? void 0 : _d.fieldErrors) == null ? void 0 : _e.description,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 290,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.NumberInput, {
                name: "price",
                label: "Price",
                min: 0,
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.price,
                error: (_g = (_f = fetcher.data) == null ? void 0 : _f.fieldErrors) == null ? void 0 : _g.price,
                precision: 2,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 298,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.NumberInput, {
                name: "commission",
                label: "Commission",
                min: 0,
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.commission,
                error: (_i = (_h = fetcher.data) == null ? void 0 : _h.fieldErrors) == null ? void 0 : _i.commission,
                precision: 2,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 308,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.NumberInput, {
                name: "quantity",
                label: "Quantity",
                min: 0,
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.quantity,
                error: (_k = (_j = fetcher.data) == null ? void 0 : _j.fieldErrors) == null ? void 0 : _k.quantity,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 318,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.TextInput, {
                name: "image",
                label: "Image",
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.image,
                error: (_m = (_l = fetcher.data) == null ? void 0 : _l.fieldErrors) == null ? void 0 : _m.image,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 327,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.MultiSelect, {
                name: "category",
                label: "Category",
                required: !0,
                data: categories,
                defaultValue: selectedProduct == null ? void 0 : selectedProduct.category,
                placeholder: "Select categories",
                searchable: !0,
                error: (_o = (_n = fetcher.data) == null ? void 0 : _n.fieldErrors) == null ? void 0 : _o.category
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 335,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.Switch, {
                name: "approved",
                label: "Approved",
                defaultChecked: selectedProduct == null ? void 0 : selectedProduct.approved,
                error: (_q = (_p = fetcher.data) == null ? void 0 : _p.fieldErrors) == null ? void 0 : _q.approved
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 346,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", {
                className: "mt-1 flex items-center justify-end gap-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.Button, {
                    variant: "subtle",
                    type: "button",
                    disabled: isSubmitting,
                    onClick: () => handleModal.close(),
                    color: "red",
                    children: "Cancel"
                  }, void 0, !1, {
                    fileName: "app/routes/admin/products.tsx",
                    lineNumber: 354,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_core15.Button, {
                    type: "submit",
                    loading: isSubmitting,
                    loaderPosition: "right",
                    children: "Save changes"
                  }, void 0, !1, {
                    fileName: "app/routes/admin/products.tsx",
                    lineNumber: 363,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 353,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/admin/products.tsx",
            lineNumber: 279,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin/products.tsx",
          lineNumber: 278,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/products.tsx",
        lineNumber: 265,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/admin/products.tsx",
    lineNumber: 141,
    columnNumber: 3
  }, this);
}

// app/routes/admin/sellers.tsx
var sellers_exports = {};
__export(sellers_exports, {
  action: () => action13,
  default: () => ManageOrganizers,
  loader: () => loader13
});
var import_solid10 = require("@heroicons/react/24/solid"), import_core16 = require("@mantine/core"), import_hooks11 = require("@mantine/hooks"), import_client9 = require("@prisma/client"), import_node18 = require("@remix-run/node"), import_react18 = require("@remix-run/react"), React10 = __toESM(require("react")), import_zod5 = require("zod");
var import_jsx_dev_runtime20 = require("react/jsx-dev-runtime"), AddSellerSchema = import_zod5.z.object({
  name: import_zod5.z.string().min(1, "First name is required"),
  email: import_zod5.z.string().email("Please enter a valid email"),
  password: import_zod5.z.string().min(8, "Password must be at least 8 characters")
}), loader13 = async () => {
  let sellers = await prisma.user.findMany({
    where: { role: import_client9.Role.SELLER }
  });
  return (0, import_node18.json)({ sellers });
}, action13 = async ({ request }) => {
  let { fields, fieldErrors } = await validateAction(request, AddSellerSchema);
  if (fieldErrors)
    return badRequest({ success: !1, fieldErrors });
  let { email: email2, name: name2, password: password2 } = fields;
  return await prisma.user.create({
    data: {
      name: name2,
      email: email2,
      password: await createPasswordHash(password2),
      role: import_client9.Role.SELLER
    }
  }), await prisma.seller.create({
    data: {
      name: name2,
      email: email2,
      password: await createPasswordHash(password2)
    }
  }), (0, import_node18.json)({ success: !0 });
};
function ManageOrganizers() {
  var _a, _b, _c, _d, _e, _f, _g;
  let fetcher = (0, import_react18.useFetcher)(), { sellers } = (0, import_react18.useLoaderData)(), [isModalOpen, handleModal] = (0, import_hooks11.useDisclosure)(!1), isSubmitting = fetcher.state !== "idle";
  return React10.useEffect(() => {
    var _a2;
    fetcher.state !== "idle" && fetcher.submission === void 0 || (_a2 = fetcher.data) != null && _a2.success && handleModal.close();
  }, [(_a = fetcher.data) == null ? void 0 : _a.success, fetcher.state, fetcher.submission]), /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_jsx_dev_runtime20.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(TailwindContainer, {
        className: "rounded-md bg-white",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", {
          className: "mt-8 px-4 py-10 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", {
              className: "sm:flex sm:flex-auto sm:items-center sm:justify-between",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_core16.Button, {
                      leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_solid10.ArrowLeftIcon, {
                        className: "h-4 w-4"
                      }, void 0, !1, {
                        fileName: "app/routes/admin/sellers.tsx",
                        lineNumber: 90,
                        columnNumber: 19
                      }, this),
                      variant: "white",
                      size: "md",
                      component: import_react18.Link,
                      to: "..",
                      pl: 0,
                      mb: 20,
                      color: "gray",
                      children: "Back"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/sellers.tsx",
                      lineNumber: 89,
                      columnNumber: 8
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("h1", {
                      className: "text-3xl font-semibold text-gray-900",
                      children: "Manage Sellers"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/sellers.tsx",
                      lineNumber: 101,
                      columnNumber: 8
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", {
                      className: "mt-2 text-sm text-gray-700",
                      children: "A list of all the sellers in the system."
                    }, void 0, !1, {
                      fileName: "app/routes/admin/sellers.tsx",
                      lineNumber: 104,
                      columnNumber: 8
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/admin/sellers.tsx",
                  lineNumber: 88,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", {
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_core16.Button, {
                    loading: isSubmitting,
                    loaderPosition: "left",
                    onClick: () => handleModal.open(),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_solid10.PlusIcon, {
                        className: "h-4 w-4"
                      }, void 0, !1, {
                        fileName: "app/routes/admin/sellers.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("span", {
                        className: "ml-2",
                        children: "Add Seller"
                      }, void 0, !1, {
                        fileName: "app/routes/admin/sellers.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/admin/sellers.tsx",
                    lineNumber: 109,
                    columnNumber: 8
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/admin/sellers.tsx",
                  lineNumber: 108,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/admin/sellers.tsx",
              lineNumber: 87,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", {
              className: "mt-8 flex flex-col",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", {
                className: "-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", {
                  className: "inline-block min-w-full py-2 align-middle md:px-6 lg:px-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("table", {
                    className: "min-w-full divide-y divide-gray-300",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("thead", {
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("tr", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("th", {
                              scope: "col",
                              className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0",
                              children: "Name"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/sellers.tsx",
                              lineNumber: 125,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Email"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/sellers.tsx",
                              lineNumber: 132,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("th", {
                              scope: "col",
                              className: "relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/sellers.tsx",
                              lineNumber: 138,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/admin/sellers.tsx",
                          lineNumber: 124,
                          columnNumber: 11
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/admin/sellers.tsx",
                        lineNumber: 123,
                        columnNumber: 10
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("tbody", {
                        className: "divide-y divide-gray-200",
                        children: sellers.map((seller) => /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("tr", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0",
                              children: seller.name
                            }, void 0, !1, {
                              fileName: "app/routes/admin/sellers.tsx",
                              lineNumber: 147,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0",
                              children: seller.email
                            }, void 0, !1, {
                              fileName: "app/routes/admin/sellers.tsx",
                              lineNumber: 150,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("td", {
                              className: "relative space-x-4 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6 md:pr-0",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", {
                                className: "flex items-center gap-6"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/sellers.tsx",
                                lineNumber: 154,
                                columnNumber: 14
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/admin/sellers.tsx",
                              lineNumber: 153,
                              columnNumber: 13
                            }, this)
                          ]
                        }, seller.id, !0, {
                          fileName: "app/routes/admin/sellers.tsx",
                          lineNumber: 146,
                          columnNumber: 12
                        }, this))
                      }, void 0, !1, {
                        fileName: "app/routes/admin/sellers.tsx",
                        lineNumber: 144,
                        columnNumber: 10
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/admin/sellers.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/admin/sellers.tsx",
                  lineNumber: 121,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin/sellers.tsx",
                lineNumber: 120,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/admin/sellers.tsx",
              lineNumber: 119,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/admin/sellers.tsx",
          lineNumber: 86,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/sellers.tsx",
        lineNumber: 85,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_core16.Modal, {
        opened: isModalOpen,
        onClose: () => handleModal.close(),
        title: "Add Seller",
        centered: !0,
        overlayBlur: 1.2,
        overlayOpacity: 0.6,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(fetcher.Form, {
          method: "post",
          replace: !0,
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("fieldset", {
            disabled: isSubmitting,
            className: "flex flex-col gap-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_core16.TextInput, {
                name: "name",
                label: "Name",
                error: (_c = (_b = fetcher.data) == null ? void 0 : _b.fieldErrors) == null ? void 0 : _c.name,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/admin/sellers.tsx",
                lineNumber: 176,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_core16.TextInput, {
                name: "email",
                type: "email",
                label: "Email",
                error: (_e = (_d = fetcher.data) == null ? void 0 : _d.fieldErrors) == null ? void 0 : _e.email,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/admin/sellers.tsx",
                lineNumber: 183,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_core16.PasswordInput, {
                name: "password",
                label: "Password",
                error: (_g = (_f = fetcher.data) == null ? void 0 : _f.fieldErrors) == null ? void 0 : _g.password,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/admin/sellers.tsx",
                lineNumber: 191,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", {
                className: "mt-1 flex items-center justify-end gap-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_core16.Button, {
                    variant: "subtle",
                    disabled: isSubmitting,
                    onClick: () => handleModal.close(),
                    color: "red",
                    children: "Cancel"
                  }, void 0, !1, {
                    fileName: "app/routes/admin/sellers.tsx",
                    lineNumber: 199,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_core16.Button, {
                    type: "submit",
                    loading: isSubmitting,
                    loaderPosition: "right",
                    children: "Add Seller"
                  }, void 0, !1, {
                    fileName: "app/routes/admin/sellers.tsx",
                    lineNumber: 207,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/admin/sellers.tsx",
                lineNumber: 198,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/admin/sellers.tsx",
            lineNumber: 175,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin/sellers.tsx",
          lineNumber: 174,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/sellers.tsx",
        lineNumber: 166,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/admin/sellers.tsx",
    lineNumber: 84,
    columnNumber: 3
  }, this);
}

// app/routes/admin/orders.tsx
var orders_exports2 = {};
__export(orders_exports2, {
  default: () => Orders2,
  loader: () => loader14
});
var import_solid11 = require("@heroicons/react/24/solid"), import_core17 = require("@mantine/core"), import_hooks12 = require("@mantine/hooks"), import_client10 = require("@prisma/client"), import_node19 = require("@remix-run/node"), import_react19 = require("@remix-run/react"), React11 = __toESM(require("react"));
var import_jsx_dev_runtime21 = require("react/jsx-dev-runtime"), loader14 = async ({ request }) => {
  await requireUser(request);
  let orders = await getAllOrders();
  return (0, import_node19.json)({ orders });
};
function Orders2() {
  let { orders } = (0, import_react19.useLoaderData)(), [products, setProducts] = React11.useState([]), [isOpen, modalHandler] = (0, import_hooks12.useDisclosure)(!1, {
    onClose: () => setProducts([])
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_jsx_dev_runtime21.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(TailwindContainer, {
        className: "mt-16",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
          className: "px-4 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
              className: "sm:flex sm:items-center",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                className: "sm:flex-auto",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                    className: "mb-12",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_core17.Button, {
                      leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_solid11.ArrowLeftIcon, {
                        className: "h-5 w-5"
                      }, void 0, !1, {
                        fileName: "app/routes/admin/orders.tsx",
                        lineNumber: 39,
                        columnNumber: 20
                      }, this),
                      variant: "white",
                      size: "md",
                      component: import_react19.Link,
                      to: "..",
                      pl: 0,
                      children: "Back"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 38,
                      columnNumber: 9
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/admin/orders.tsx",
                    lineNumber: 37,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("h1", {
                    className: "text-xl font-semibold text-gray-900",
                    children: "Orders"
                  }, void 0, !1, {
                    fileName: "app/routes/admin/orders.tsx",
                    lineNumber: 50,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("p", {
                    className: "mt-2 text-sm text-gray-700",
                    children: "A list of all the orders in your account including their user details."
                  }, void 0, !1, {
                    fileName: "app/routes/admin/orders.tsx",
                    lineNumber: 51,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 36,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/admin/orders.tsx",
              lineNumber: 35,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
              className: "mt-8 flex flex-col",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                className: "-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                  className: "inline-block min-w-full py-2 align-middle md:px-6 lg:px-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                    className: "shadow ring-1 ring-black ring-opacity-5 md:rounded-lg",
                    children: orders.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("table", {
                      className: "min-w-full divide-y divide-gray-300",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("thead", {
                          className: "bg-gray-50",
                          children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("tr", {
                            children: [
                              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("th", {
                                scope: "col",
                                className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6",
                                children: "Name"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 65,
                                columnNumber: 14
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("th", {
                                scope: "col",
                                className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                                children: "Type"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 71,
                                columnNumber: 14
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("th", {
                                scope: "col",
                                className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                                children: "Status"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 77,
                                columnNumber: 14
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("th", {
                                scope: "col",
                                className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                                children: "Commission"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 83,
                                columnNumber: 14
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("th", {
                                scope: "col",
                                className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                                children: "Products"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 90,
                                columnNumber: 14
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("th", {
                                scope: "col",
                                className: "relative py-3.5 pl-3 pr-4 sm:pr-6"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 96,
                                columnNumber: 14
                              }, this)
                            ]
                          }, void 0, !0, {
                            fileName: "app/routes/admin/orders.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                          }, this)
                        }, void 0, !1, {
                          fileName: "app/routes/admin/orders.tsx",
                          lineNumber: 63,
                          columnNumber: 12
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("tbody", {
                          className: "bg-[rgb(129, 135, 80)] divide-y divide-gray-200",
                          children: orders.map((order) => {
                            var _a, _b;
                            return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("tr", {
                              children: [
                                /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("td", {
                                  className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6",
                                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                                    className: "flex items-center",
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                                        className: "h-10 w-10 flex-shrink-0",
                                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("img", {
                                          className: "h-10 w-10 rounded-full",
                                          src: order.products[0].product.image,
                                          alt: ""
                                        }, void 0, !1, {
                                          fileName: "app/routes/admin/orders.tsx",
                                          lineNumber: 109,
                                          columnNumber: 19
                                        }, this)
                                      }, void 0, !1, {
                                        fileName: "app/routes/admin/orders.tsx",
                                        lineNumber: 108,
                                        columnNumber: 18
                                      }, this),
                                      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                                        className: "ml-4",
                                        children: [
                                          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                                            className: "font-medium text-gray-900",
                                            children: order.user.name
                                          }, void 0, !1, {
                                            fileName: "app/routes/admin/orders.tsx",
                                            lineNumber: 116,
                                            columnNumber: 19
                                          }, this),
                                          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                                            className: "text-gray-500",
                                            children: order.user.email
                                          }, void 0, !1, {
                                            fileName: "app/routes/admin/orders.tsx",
                                            lineNumber: 119,
                                            columnNumber: 19
                                          }, this)
                                        ]
                                      }, void 0, !0, {
                                        fileName: "app/routes/admin/orders.tsx",
                                        lineNumber: 115,
                                        columnNumber: 18
                                      }, this)
                                    ]
                                  }, void 0, !0, {
                                    fileName: "app/routes/admin/orders.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 106,
                                  columnNumber: 16
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("td", {
                                  className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                                      className: "text-gray-900",
                                      children: titleCase(order.type)
                                    }, void 0, !1, {
                                      fileName: "app/routes/admin/orders.tsx",
                                      lineNumber: 127,
                                      columnNumber: 17
                                    }, this),
                                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                                      className: "text-gray-500",
                                      children: [
                                        "(",
                                        titleCase(
                                          ((_a = order.payment) == null ? void 0 : _a.paymentMethod) ?? ""
                                        ),
                                        ")"
                                      ]
                                    }, void 0, !0, {
                                      fileName: "app/routes/admin/orders.tsx",
                                      lineNumber: 130,
                                      columnNumber: 17
                                    }, this)
                                  ]
                                }, void 0, !0, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 126,
                                  columnNumber: 16
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("td", {
                                  className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                  children: order.status !== import_client10.OrderStatus.CANCELLED && order.status !== import_client10.OrderStatus.PENDING && /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_jsx_dev_runtime21.Fragment, {
                                    children: [
                                      "$",
                                      order.products.map(
                                        (p) => p.product.commission * p.quantity
                                      ).reduce((a, b) => a + b, 0)
                                    ]
                                  }, void 0, !0, {
                                    fileName: "app/routes/admin/orders.tsx",
                                    lineNumber: 141,
                                    columnNumber: 19
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 138,
                                  columnNumber: 16
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("td", {
                                  className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                                      className: "text-gray-900",
                                      children: titleCase(order.type)
                                    }, void 0, !1, {
                                      fileName: "app/routes/admin/orders.tsx",
                                      lineNumber: 152,
                                      columnNumber: 17
                                    }, this),
                                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                                      className: "text-gray-500",
                                      children: [
                                        "(",
                                        titleCase(
                                          ((_b = order.payment) == null ? void 0 : _b.paymentMethod) ?? ""
                                        ),
                                        ")"
                                      ]
                                    }, void 0, !0, {
                                      fileName: "app/routes/admin/orders.tsx",
                                      lineNumber: 155,
                                      columnNumber: 17
                                    }, this)
                                  ]
                                }, void 0, !0, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 151,
                                  columnNumber: 16
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("td", {
                                  className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_core17.Button, {
                                    variant: "subtle",
                                    compact: !0,
                                    onClick: () => {
                                      setProducts(order.products), modalHandler.open();
                                    },
                                    children: "View all"
                                  }, void 0, !1, {
                                    fileName: "app/routes/admin/orders.tsx",
                                    lineNumber: 164,
                                    columnNumber: 17
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 163,
                                  columnNumber: 16
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("td", {
                                  className: "relative flex items-center justify-center whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6"
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 175,
                                  columnNumber: 16
                                }, this)
                              ]
                            }, order.id, !0, {
                              fileName: "app/routes/admin/orders.tsx",
                              lineNumber: 105,
                              columnNumber: 15
                            }, this);
                          })
                        }, void 0, !1, {
                          fileName: "app/routes/admin/orders.tsx",
                          lineNumber: 102,
                          columnNumber: 12
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 62,
                      columnNumber: 11
                    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                      className: "bg-[rgb(129, 135, 80)] relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_solid11.ShoppingCartIcon, {
                          className: "mx-auto h-9 w-9 text-gray-500"
                        }, void 0, !1, {
                          fileName: "app/routes/admin/orders.tsx",
                          lineNumber: 183,
                          columnNumber: 12
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("span", {
                          className: "mt-4 block text-sm font-medium text-gray-500",
                          children: [
                            "No orders placed yet. ",
                            /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("br", {}, void 0, !1, {
                              fileName: "app/routes/admin/orders.tsx",
                              lineNumber: 185,
                              columnNumber: 35
                            }, this),
                            "Come back later."
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/admin/orders.tsx",
                          lineNumber: 184,
                          columnNumber: 12
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 182,
                      columnNumber: 11
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/admin/orders.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/admin/orders.tsx",
                  lineNumber: 59,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 58,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/admin/orders.tsx",
              lineNumber: 57,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/admin/orders.tsx",
          lineNumber: 34,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/orders.tsx",
        lineNumber: 33,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_core17.Modal, {
        opened: isOpen && products.length > 0,
        onClose: () => modalHandler.close(),
        size: "lg",
        overflow: "inside",
        title: "Products",
        centered: !0,
        overlayBlur: 1,
        overlayOpacity: 0.7,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_jsx_dev_runtime21.Fragment, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("table", {
            className: "mt-4 w-full text-gray-500 sm:mt-6",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("caption", {
                className: "sr-only",
                children: "Ice-cream"
              }, void 0, !1, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 209,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("thead", {
                className: "sr-only text-left text-sm text-gray-500 sm:not-sr-only",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("tr", {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("th", {
                      scope: "col",
                      className: "py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3",
                      children: "Product"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 212,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("th", {
                      scope: "col",
                      className: "hidden w-1/5 py-3 pr-8 font-normal sm:table-cell",
                      children: "Quantity"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 218,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("th", {
                      scope: "col",
                      className: "hidden py-3 pr-8 font-normal sm:table-cell",
                      children: "Price"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 224,
                      columnNumber: 9
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/admin/orders.tsx",
                  lineNumber: 211,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 210,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("tbody", {
                className: "divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t",
                children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("tr", {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("td", {
                      className: "py-6 pr-8",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                        className: "flex items-center",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("img", {
                            src: product.product.image,
                            alt: product.product.name,
                            className: "mr-6 h-16 w-16 rounded object-cover object-center"
                          }, void 0, !1, {
                            fileName: "app/routes/admin/orders.tsx",
                            lineNumber: 237,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                            className: "flex flex-col",
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", {
                              className: "font-medium text-gray-900",
                              children: product.product.name
                            }, void 0, !1, {
                              fileName: "app/routes/admin/orders.tsx",
                              lineNumber: 243,
                              columnNumber: 13
                            }, this)
                          }, void 0, !1, {
                            fileName: "app/routes/admin/orders.tsx",
                            lineNumber: 242,
                            columnNumber: 12
                          }, this)
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/admin/orders.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 235,
                      columnNumber: 10
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("td", {
                      className: "hidden py-6 pr-8 sm:table-cell",
                      children: product.quantity
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 250,
                      columnNumber: 10
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("td", {
                      className: "hidden py-6 pr-8 sm:table-cell",
                      children: [
                        "$",
                        product.amount
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 254,
                      columnNumber: 10
                    }, this)
                  ]
                }, product.id, !0, {
                  fileName: "app/routes/admin/orders.tsx",
                  lineNumber: 234,
                  columnNumber: 9
                }, this))
              }, void 0, !1, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 232,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/admin/orders.tsx",
            lineNumber: 208,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin/orders.tsx",
          lineNumber: 207,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/orders.tsx",
        lineNumber: 197,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/admin/orders.tsx",
    lineNumber: 32,
    columnNumber: 3
  }, this);
}

// app/routes/admin/index.tsx
var admin_exports2 = {};
__export(admin_exports2, {
  default: () => AdminDashboard
});
var import_core18 = require("@mantine/core"), import_react20 = require("@remix-run/react");
var import_jsx_dev_runtime22 = require("react/jsx-dev-runtime"), actions2 = [
  {
    title: "Manage Orders",
    description: "View and manage Morderso",
    href: "orders"
  },
  {
    title: "Manage Products",
    description: "View and manage products",
    href: "products"
  },
  {
    title: "Manage Sellers",
    description: "View and manage sellers",
    href: "sellers"
  }
];
function AdminDashboard() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", {
    className: "flex flex-col gap-4 p-4",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", {
      className: "bg-[rgb(129, 135, 80)]",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(TailwindContainer, {
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", {
          className: "py-16 px-4 sm:py-20 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("h2", {
              className: "text-center text-4xl font-semibold tracking-tight text-gray-900",
              children: "Admin Dashboard"
            }, void 0, !1, {
              fileName: "app/routes/admin/index.tsx",
              lineNumber: 29,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("ul", {
              className: "mt-10 grid grid-cols-1 gap-6",
              children: actions2.map((action14, actionIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(Card2, {
                action: action14
              }, actionIdx, !1, {
                fileName: "app/routes/admin/index.tsx",
                lineNumber: 35,
                columnNumber: 9
              }, this))
            }, void 0, !1, {
              fileName: "app/routes/admin/index.tsx",
              lineNumber: 33,
              columnNumber: 7
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/admin/index.tsx",
          lineNumber: 28,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 27,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 26,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/admin/index.tsx",
    lineNumber: 25,
    columnNumber: 3
  }, this);
}
function Card2({ action: action14 }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("li", {
    className: "relative rounded-lg border border-gray-300 bg-white shadow",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", {
        className: "flex w-full items-center justify-between space-x-6 p-6",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", {
          className: "flex-1 truncate",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", {
            className: "flex flex-col items-center gap-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("h3", {
                className: "truncate text-xl font-medium text-gray-900",
                children: action14.title
              }, void 0, !1, {
                fileName: "app/routes/admin/index.tsx",
                lineNumber: 51,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_core18.Badge, {
                fullWidth: !1,
                className: "max-w-min",
                children: action14.description
              }, void 0, !1, {
                fileName: "app/routes/admin/index.tsx",
                lineNumber: 55,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/admin/index.tsx",
            lineNumber: 50,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin/index.tsx",
          lineNumber: 49,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 48,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react20.Link, {
        to: action14.href,
        className: "focus:outline-none",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("span", {
          className: "absolute inset-0",
          "aria-hidden": "true"
        }, void 0, !1, {
          fileName: "app/routes/admin/index.tsx",
          lineNumber: 64,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 62,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/admin/index.tsx",
    lineNumber: 47,
    columnNumber: 3
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "f98d418f", entry: { module: "/build/entry.client-654ZSWRQ.js", imports: ["/build/_shared/chunk-2MJ4U5R6.js", "/build/_shared/chunk-GOHHIIJD.js", "/build/_shared/chunk-KA4DZYDM.js", "/build/_shared/chunk-5KL4PAQL.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-C2J3EHR5.js", imports: ["/build/_shared/chunk-P3FNEAO6.js", "/build/_shared/chunk-SKISKHSZ.js", "/build/_shared/chunk-5QHCINFJ.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app": { id: "routes/__app", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/__app-54Q75PLU.js", imports: ["/build/_shared/chunk-TFBHDYZH.js", "/build/_shared/chunk-4OXK2OY5.js", "/build/_shared/chunk-VRZZG5CT.js", "/build/_shared/chunk-XCNOBYZX.js", "/build/_shared/chunk-YTKCPPSU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/cart": { id: "routes/__app/cart", parentId: "routes/__app", path: "cart", index: void 0, caseSensitive: void 0, module: "/build/routes/__app/cart-6IMA7WGU.js", imports: ["/build/_shared/chunk-IMHXLUYT.js", "/build/_shared/chunk-YJMNGXS3.js", "/build/_shared/chunk-N4IEHR4W.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-SKISKHSZ.js", "/build/_shared/chunk-5QHCINFJ.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/index": { id: "routes/__app/index", parentId: "routes/__app", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/__app/index-BCOOKAWZ.js", imports: ["/build/_shared/chunk-5QHCINFJ.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/order-history": { id: "routes/__app/order-history", parentId: "routes/__app", path: "order-history", index: void 0, caseSensitive: void 0, module: "/build/routes/__app/order-history-LNE2V6V3.js", imports: ["/build/_shared/chunk-IMHXLUYT.js", "/build/_shared/chunk-YJMNGXS3.js", "/build/_shared/chunk-N4IEHR4W.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-SKISKHSZ.js", "/build/_shared/chunk-5QHCINFJ.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/product.$slug": { id: "routes/__app/product.$slug", parentId: "routes/__app", path: "product/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/__app/product.$slug-JVBS4WW3.js", imports: ["/build/_shared/chunk-SKISKHSZ.js", "/build/_shared/chunk-5QHCINFJ.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__auth": { id: "routes/__auth", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/__auth-6VC42BPW.js", imports: ["/build/_shared/chunk-YTKCPPSU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__auth/login": { id: "routes/__auth/login", parentId: "routes/__auth", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/__auth/login-5B2P4UKZ.js", imports: ["/build/_shared/chunk-UX2QLN6H.js", "/build/_shared/chunk-YJMNGXS3.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__auth/register": { id: "routes/__auth/register", parentId: "routes/__auth", path: "register", index: void 0, caseSensitive: void 0, module: "/build/routes/__auth/register-DJ3TWHBH.js", imports: ["/build/_shared/chunk-UX2QLN6H.js", "/build/_shared/chunk-YJMNGXS3.js", "/build/_shared/chunk-N4IEHR4W.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin": { id: "routes/admin", parentId: "root", path: "admin", index: void 0, caseSensitive: void 0, module: "/build/routes/admin-W3GCIBDR.js", imports: ["/build/_shared/chunk-TFBHDYZH.js", "/build/_shared/chunk-XCNOBYZX.js", "/build/_shared/chunk-YTKCPPSU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/index": { id: "routes/admin/index", parentId: "routes/admin", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/admin/index-ZDOQZFDT.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/orders": { id: "routes/admin/orders", parentId: "routes/admin", path: "orders", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/orders-QCPTDQ4N.js", imports: ["/build/_shared/chunk-IMHXLUYT.js", "/build/_shared/chunk-N4IEHR4W.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/products": { id: "routes/admin/products", parentId: "routes/admin", path: "products", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/products-YS5QUF7F.js", imports: ["/build/_shared/chunk-R4FMJRSR.js", "/build/_shared/chunk-SYLFCC64.js", "/build/_shared/chunk-4OXK2OY5.js", "/build/_shared/chunk-YJMNGXS3.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/sellers": { id: "routes/admin/sellers", parentId: "routes/admin", path: "sellers", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/sellers-SSNDFKVV.js", imports: ["/build/_shared/chunk-R4FMJRSR.js", "/build/_shared/chunk-4OXK2OY5.js", "/build/_shared/chunk-YJMNGXS3.js", "/build/_shared/chunk-N4IEHR4W.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/auth/logout": { id: "routes/api/auth/logout", parentId: "root", path: "api/auth/logout", index: void 0, caseSensitive: void 0, module: "/build/routes/api/auth/logout-YMHSIKRS.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/delete-staff": { id: "routes/api/delete-staff", parentId: "root", path: "api/delete-staff", index: void 0, caseSensitive: void 0, module: "/build/routes/api/delete-staff-3WO62UEK.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/image-upload": { id: "routes/api/image-upload", parentId: "root", path: "api/image-upload", index: void 0, caseSensitive: void 0, module: "/build/routes/api/image-upload-NBPAMXJG.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/queues/update-order-status": { id: "routes/api/queues/update-order-status", parentId: "root", path: "api/queues/update-order-status", index: void 0, caseSensitive: void 0, module: "/build/routes/api/queues/update-order-status-BQSOWHAT.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/reset-password": { id: "routes/api/reset-password", parentId: "root", path: "api/reset-password", index: void 0, caseSensitive: void 0, module: "/build/routes/api/reset-password-ZLIDUUXZ.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/seller": { id: "routes/seller", parentId: "root", path: "seller", index: void 0, caseSensitive: void 0, module: "/build/routes/seller-BSQ76PEN.js", imports: ["/build/_shared/chunk-TFBHDYZH.js", "/build/_shared/chunk-XCNOBYZX.js", "/build/_shared/chunk-YTKCPPSU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/seller/index": { id: "routes/seller/index", parentId: "routes/seller", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/seller/index-SMVH5BPE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/seller/orders": { id: "routes/seller/orders", parentId: "routes/seller", path: "orders", index: void 0, caseSensitive: void 0, module: "/build/routes/seller/orders-5XXBZB52.js", imports: ["/build/_shared/chunk-4OXK2OY5.js", "/build/_shared/chunk-N4IEHR4W.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/seller/products": { id: "routes/seller/products", parentId: "routes/seller", path: "products", index: void 0, caseSensitive: void 0, module: "/build/routes/seller/products-IKKKSC3E.js", imports: ["/build/_shared/chunk-SYLFCC64.js", "/build/_shared/chunk-4OXK2OY5.js", "/build/_shared/chunk-YJMNGXS3.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-F98D418F.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_meta: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api/queues/update-order-status": {
    id: "routes/api/queues/update-order-status",
    parentId: "root",
    path: "api/queues/update-order-status",
    index: void 0,
    caseSensitive: void 0,
    module: update_order_status_exports
  },
  "routes/api/reset-password": {
    id: "routes/api/reset-password",
    parentId: "root",
    path: "api/reset-password",
    index: void 0,
    caseSensitive: void 0,
    module: reset_password_exports
  },
  "routes/api/delete-staff": {
    id: "routes/api/delete-staff",
    parentId: "root",
    path: "api/delete-staff",
    index: void 0,
    caseSensitive: void 0,
    module: delete_staff_exports
  },
  "routes/api/image-upload": {
    id: "routes/api/image-upload",
    parentId: "root",
    path: "api/image-upload",
    index: void 0,
    caseSensitive: void 0,
    module: image_upload_exports
  },
  "routes/api/auth/logout": {
    id: "routes/api/auth/logout",
    parentId: "root",
    path: "api/auth/logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/__auth": {
    id: "routes/__auth",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/__auth/register": {
    id: "routes/__auth/register",
    parentId: "routes/__auth",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: register_exports
  },
  "routes/__auth/login": {
    id: "routes/__auth/login",
    parentId: "routes/__auth",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/seller": {
    id: "routes/seller",
    parentId: "root",
    path: "seller",
    index: void 0,
    caseSensitive: void 0,
    module: seller_exports
  },
  "routes/seller/products": {
    id: "routes/seller/products",
    parentId: "routes/seller",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: products_exports
  },
  "routes/seller/orders": {
    id: "routes/seller/orders",
    parentId: "routes/seller",
    path: "orders",
    index: void 0,
    caseSensitive: void 0,
    module: orders_exports
  },
  "routes/seller/index": {
    id: "routes/seller/index",
    parentId: "routes/seller",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: seller_exports2
  },
  "routes/__app": {
    id: "routes/__app",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  },
  "routes/__app/order-history": {
    id: "routes/__app/order-history",
    parentId: "routes/__app",
    path: "order-history",
    index: void 0,
    caseSensitive: void 0,
    module: order_history_exports
  },
  "routes/__app/product.$slug": {
    id: "routes/__app/product.$slug",
    parentId: "routes/__app",
    path: "product/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: product_slug_exports
  },
  "routes/__app/index": {
    id: "routes/__app/index",
    parentId: "routes/__app",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: app_exports2
  },
  "routes/__app/cart": {
    id: "routes/__app/cart",
    parentId: "routes/__app",
    path: "cart",
    index: void 0,
    caseSensitive: void 0,
    module: cart_exports
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/admin/products": {
    id: "routes/admin/products",
    parentId: "routes/admin",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: products_exports2
  },
  "routes/admin/sellers": {
    id: "routes/admin/sellers",
    parentId: "routes/admin",
    path: "sellers",
    index: void 0,
    caseSensitive: void 0,
    module: sellers_exports
  },
  "routes/admin/orders": {
    id: "routes/admin/orders",
    parentId: "routes/admin",
    path: "orders",
    index: void 0,
    caseSensitive: void 0,
    module: orders_exports2
  },
  "routes/admin/index": {
    id: "routes/admin/index",
    parentId: "routes/admin",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: admin_exports2
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
