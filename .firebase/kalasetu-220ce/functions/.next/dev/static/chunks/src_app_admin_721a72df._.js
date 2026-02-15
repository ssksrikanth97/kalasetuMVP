(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/dashboard/admin.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionButton": "admin-module__a3EyKq__actionButton",
  "activityContent": "admin-module__a3EyKq__activityContent",
  "activityIcon": "admin-module__a3EyKq__activityIcon",
  "activityItem": "admin-module__a3EyKq__activityItem",
  "activityTime": "admin-module__a3EyKq__activityTime",
  "avatar": "admin-module__a3EyKq__avatar",
  "cardHeader": "admin-module__a3EyKq__cardHeader",
  "cardTitle": "admin-module__a3EyKq__cardTitle",
  "contentCard": "admin-module__a3EyKq__contentCard",
  "dashboardContainer": "admin-module__a3EyKq__dashboardContainer",
  "dateBadge": "admin-module__a3EyKq__dateBadge",
  "header": "admin-module__a3EyKq__header",
  "logoContainer": "admin-module__a3EyKq__logoContainer",
  "logoText": "admin-module__a3EyKq__logoText",
  "mainContent": "admin-module__a3EyKq__mainContent",
  "navIcon": "admin-module__a3EyKq__navIcon",
  "navItem": "admin-module__a3EyKq__navItem",
  "navItemActive": "admin-module__a3EyKq__navItemActive",
  "navLinks": "admin-module__a3EyKq__navLinks",
  "sectionGrid": "admin-module__a3EyKq__sectionGrid",
  "sidebar": "admin-module__a3EyKq__sidebar",
  "statCard": "admin-module__a3EyKq__statCard",
  "statHeader": "admin-module__a3EyKq__statHeader",
  "statIcon": "admin-module__a3EyKq__statIcon",
  "statTitle": "admin-module__a3EyKq__statTitle",
  "statTrend": "admin-module__a3EyKq__statTrend",
  "statValue": "admin-module__a3EyKq__statValue",
  "statsGrid": "admin-module__a3EyKq__statsGrid",
  "statusApproved": "admin-module__a3EyKq__statusApproved",
  "statusBadge": "admin-module__a3EyKq__statusBadge",
  "statusPending": "admin-module__a3EyKq__statusPending",
  "table": "admin-module__a3EyKq__table",
  "tableContainer": "admin-module__a3EyKq__tableContainer",
  "titleGroup": "admin-module__a3EyKq__titleGroup",
  "trendDown": "admin-module__a3EyKq__trendDown",
  "trendUp": "admin-module__a3EyKq__trendUp",
  "userProfile": "admin-module__a3EyKq__userProfile",
});
}),
"[project]/src/app/admin/users/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/admin/dashboard/admin.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firebase.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function AdminUsers() {
    _s();
    const { logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminUsers.useEffect": ()=>{
            const fetchUsers = {
                "AdminUsers.useEffect.fetchUsers": async ()=>{
                    try {
                        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
                        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
                        const usersList = querySnapshot.docs.map({
                            "AdminUsers.useEffect.fetchUsers.usersList": (doc)=>({
                                    id: doc.id,
                                    ...doc.data()
                                })
                        }["AdminUsers.useEffect.fetchUsers.usersList"]);
                        setUsers(usersList);
                    } catch (error) {
                        console.error("Error fetching users:", error);
                    } finally{
                        setLoading(false);
                    }
                }
            }["AdminUsers.useEffect.fetchUsers"];
            fetchUsers();
        }
    }["AdminUsers.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoContainer,
                        style: {
                            padding: '0 1rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                width: '100%',
                                height: '40px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/logo.png",
                                alt: "KalaSetu Admin",
                                fill: true,
                                style: {
                                    objectFit: 'contain',
                                    objectPosition: 'left'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 40,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/users/page.js",
                            lineNumber: 39,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/users/page.js",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLinks,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/dashboard",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/users/page.js",
                                        lineNumber: 50,
                                        columnNumber: 25
                                    }, this),
                                    " Dashboard"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/users",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItemActive}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "👥"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/users/page.js",
                                        lineNumber: 53,
                                        columnNumber: 25
                                    }, this),
                                    " Users & Approvals"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 52,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/inventory",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "📦"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/users/page.js",
                                        lineNumber: 56,
                                        columnNumber: 25
                                    }, this),
                                    " Inventory"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 55,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/orders",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "🛍️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/users/page.js",
                                        lineNumber: 59,
                                        columnNumber: 25
                                    }, this),
                                    " Orders"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 58,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/bookings",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "📅"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/users/page.js",
                                        lineNumber: 62,
                                        columnNumber: 25
                                    }, this),
                                    " Bookings"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 61,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                target: "_blank",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                style: {
                                    marginTop: 'auto'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "🌐"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/users/page.js",
                                        lineNumber: 65,
                                        columnNumber: 25
                                    }, this),
                                    " Live Site"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 64,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: logout,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                style: {
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    width: '100%'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navIcon,
                                        children: "🚪"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/users/page.js",
                                        lineNumber: 68,
                                        columnNumber: 25
                                    }, this),
                                    " Logout"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 67,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/users/page.js",
                        lineNumber: 48,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/users/page.js",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    children: "User Management"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/users/page.js",
                                    lineNumber: 76,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Manage users, artists, and institution approvals."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/users/page.js",
                                    lineNumber: 77,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/users/page.js",
                            lineNumber: 75,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/users/page.js",
                        lineNumber: 74,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeader,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                    children: [
                                        "All Users (",
                                        users.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/users/page.js",
                                    lineNumber: 83,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 82,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tableContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].table,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/users/page.js",
                                                        lineNumber: 89,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/users/page.js",
                                                        lineNumber: 90,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Role"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/users/page.js",
                                                        lineNumber: 91,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/users/page.js",
                                                        lineNumber: 92,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Action"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/users/page.js",
                                                        lineNumber: 93,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/users/page.js",
                                                lineNumber: 88,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/users/page.js",
                                            lineNumber: 87,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: "5",
                                                    style: {
                                                        textAlign: 'center',
                                                        padding: '2rem'
                                                    },
                                                    children: "Loading users..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/users/page.js",
                                                    lineNumber: 99,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/users/page.js",
                                                lineNumber: 98,
                                                columnNumber: 37
                                            }, this) : users.length > 0 ? users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: '500'
                                                            },
                                                            children: user.name || 'N/A'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/users/page.js",
                                                            lineNumber: 104,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: user.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/users/page.js",
                                                            lineNumber: 105,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                textTransform: 'capitalize'
                                                            },
                                                            children: user.role
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/users/page.js",
                                                            lineNumber: 106,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBadge} ${user.role === 'artist' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusPending : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusApproved}`,
                                                                children: user.role === 'artist' ? 'Pending Verification' : 'Active'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/users/page.js",
                                                                lineNumber: 108,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/users/page.js",
                                                            lineNumber: 107,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionButton,
                                                                children: "View Details"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/users/page.js",
                                                                lineNumber: 113,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/users/page.js",
                                                            lineNumber: 112,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, user.id, true, {
                                                    fileName: "[project]/src/app/admin/users/page.js",
                                                    lineNumber: 103,
                                                    columnNumber: 41
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: "5",
                                                    style: {
                                                        textAlign: 'center',
                                                        padding: '2rem'
                                                    },
                                                    children: "No users found."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/users/page.js",
                                                    lineNumber: 119,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/users/page.js",
                                                lineNumber: 118,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/users/page.js",
                                            lineNumber: 96,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/users/page.js",
                                    lineNumber: 86,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/users/page.js",
                                lineNumber: 85,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/users/page.js",
                        lineNumber: 81,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/users/page.js",
                lineNumber: 73,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/users/page.js",
        lineNumber: 36,
        columnNumber: 9
    }, this);
}
_s(AdminUsers, "hViLZk9wbDi4DQyLbUcJdgWauGo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AdminUsers;
var _c;
__turbopack_context__.k.register(_c, "AdminUsers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_admin_721a72df._.js.map