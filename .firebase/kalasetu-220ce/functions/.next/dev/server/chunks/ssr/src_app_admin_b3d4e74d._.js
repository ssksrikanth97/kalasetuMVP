module.exports = [
"[project]/src/app/admin/dashboard/admin.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/src/app/admin/inventory/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminInventory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/admin/dashboard/admin.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firebase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
function AdminInventory() {
    const { logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchProducts = async ()=>{
            try {
                const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'products'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
                const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q);
                const list = querySnapshot.docs.map((doc)=>({
                        id: doc.id,
                        ...doc.data()
                    }));
                setProducts(list);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally{
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    const handleRowClick = (productId)=>{
        router.push(`/admin/inventory/edit/${productId}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dashboardContainer || ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sidebar || ""),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '0 1rem'
                        },
                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logoContainer || ""),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                width: '100%',
                                height: '40px'
                            },
                            className: "jsx-fdcdcaf1598921ca",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/logo.png",
                                alt: "KalaSetu Admin",
                                fill: true,
                                style: {
                                    objectFit: 'contain',
                                    objectPosition: 'left'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 46,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/inventory/page.js",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/inventory/page.js",
                        lineNumber: 44,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navLinks || ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/dashboard",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navIcon || ""),
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 56,
                                        columnNumber: 25
                                    }, this),
                                    " Dashboard"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 55,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/users",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navIcon || ""),
                                        children: "👥"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 59,
                                        columnNumber: 25
                                    }, this),
                                    " Users"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 58,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/inventory",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItemActive}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navIcon || ""),
                                        children: "📦"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 62,
                                        columnNumber: 25
                                    }, this),
                                    " Inventory"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 61,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/orders",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navIcon || ""),
                                        children: "🛍️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 65,
                                        columnNumber: 25
                                    }, this),
                                    " Orders"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 64,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/bookings",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navIcon || ""),
                                        children: "📅"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 68,
                                        columnNumber: 25
                                    }, this),
                                    " Bookings"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 67,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                target: "_blank",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItem,
                                style: {
                                    marginTop: 'auto'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navIcon || ""),
                                        children: "🌐"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, this),
                                    " Live Site"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 70,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: logout,
                                style: {
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    width: '100%'
                                },
                                className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navItem || ""),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navIcon || ""),
                                        children: "🚪"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 74,
                                        columnNumber: 25
                                    }, this),
                                    " Logout"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 73,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/inventory/page.js",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/inventory/page.js",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainContent || ""),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header || ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].titleGroup || ""),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "jsx-fdcdcaf1598921ca",
                                        children: "Inventory Management"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 82,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-fdcdcaf1598921ca",
                                        children: "Track products, prices, and stock levels."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 83,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 81,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fdcdcaf1598921ca",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin/inventory/new",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            padding: '0.75rem 1.25rem',
                                            fontSize: '0.9rem'
                                        },
                                        className: "jsx-fdcdcaf1598921ca" + " " + "btn-primary",
                                        children: "+ Add Product"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                        lineNumber: 87,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/inventory/page.js",
                                    lineNumber: 86,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 85,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/inventory/page.js",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contentCard || ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardHeader || ""),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardTitle || ""),
                                    children: [
                                        "Product List (",
                                        products.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/inventory/page.js",
                                    lineNumber: 94,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 93,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tableContainer || ""),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].table || ""),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "jsx-fdcdcaf1598921ca",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "jsx-fdcdcaf1598921ca",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            width: '60px'
                                                        },
                                                        className: "jsx-fdcdcaf1598921ca",
                                                        children: "Image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                                        lineNumber: 100,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "jsx-fdcdcaf1598921ca",
                                                        children: "Product Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                                        lineNumber: 101,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "jsx-fdcdcaf1598921ca",
                                                        children: "Category"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                                        lineNumber: 102,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "jsx-fdcdcaf1598921ca",
                                                        children: "ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                                        lineNumber: 103,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "jsx-fdcdcaf1598921ca",
                                                        children: "Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                                        lineNumber: 104,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "jsx-fdcdcaf1598921ca",
                                                        children: "Stock"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                                        lineNumber: 105,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "jsx-fdcdcaf1598921ca",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/inventory/page.js",
                                                        lineNumber: 106,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/inventory/page.js",
                                                lineNumber: 99,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                            lineNumber: 98,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "jsx-fdcdcaf1598921ca",
                                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "jsx-fdcdcaf1598921ca",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: "6",
                                                    style: {
                                                        textAlign: 'center',
                                                        padding: '2rem'
                                                    },
                                                    className: "jsx-fdcdcaf1598921ca",
                                                    children: "Loading products..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/inventory/page.js",
                                                    lineNumber: 112,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/inventory/page.js",
                                                lineNumber: 111,
                                                columnNumber: 37
                                            }, this) : products.length > 0 ? products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    onClick: ()=>router.push(`/admin/inventory/edit/${p.id}`),
                                                    className: "jsx-fdcdcaf1598921ca" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].clickableRow || ""),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "jsx-fdcdcaf1598921ca",
                                                            children: p.mainImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: p.mainImage,
                                                                alt: p.productName,
                                                                width: 40,
                                                                height: 40,
                                                                style: {
                                                                    objectFit: 'cover',
                                                                    borderRadius: '4px'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/inventory/page.js",
                                                                lineNumber: 120,
                                                                columnNumber: 53
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    background: '#eee',
                                                                    borderRadius: '4px'
                                                                },
                                                                className: "jsx-fdcdcaf1598921ca"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/inventory/page.js",
                                                                lineNumber: 122,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                                            lineNumber: 118,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                fontWeight: 500
                                                            },
                                                            className: "jsx-fdcdcaf1598921ca",
                                                            children: p.productName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                                            lineNumber: 125,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "jsx-fdcdcaf1598921ca",
                                                            children: p.categoryId?.replace('-', ' ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                                            lineNumber: 126,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "jsx-fdcdcaf1598921ca",
                                                            children: p.id?.replace('-', ' ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                                            lineNumber: 127,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "jsx-fdcdcaf1598921ca",
                                                            children: [
                                                                "₹",
                                                                p.price?.toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                                            lineNumber: 128,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "jsx-fdcdcaf1598921ca",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: p.stockQuantity < 5 ? 'red' : 'inherit'
                                                                },
                                                                className: "jsx-fdcdcaf1598921ca",
                                                                children: p.stockQuantity
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/inventory/page.js",
                                                                lineNumber: 130,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                                            lineNumber: 129,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "jsx-fdcdcaf1598921ca",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-fdcdcaf1598921ca" + " " + `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statusBadge} ${p.stockQuantity > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statusApproved : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statusPending}`,
                                                                children: p.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/inventory/page.js",
                                                                lineNumber: 133,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                                            lineNumber: 132,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, p.id, true, {
                                                    fileName: "[project]/src/app/admin/inventory/page.js",
                                                    lineNumber: 116,
                                                    columnNumber: 41
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "jsx-fdcdcaf1598921ca",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: "6",
                                                    style: {
                                                        textAlign: 'center',
                                                        padding: '3rem',
                                                        color: '#666'
                                                    },
                                                    className: "jsx-fdcdcaf1598921ca",
                                                    children: [
                                                        "No products found.",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                            className: "jsx-fdcdcaf1598921ca"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                                            lineNumber: 143,
                                                            columnNumber: 63
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/admin/inventory/new",
                                                            style: {
                                                                color: 'var(--color-maroon)',
                                                                fontWeight: 600,
                                                                marginTop: '1rem',
                                                                display: 'inline-block'
                                                            },
                                                            children: "Add your first product"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                                            lineNumber: 144,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/inventory/page.js",
                                                    lineNumber: 142,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/inventory/page.js",
                                                lineNumber: 141,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/inventory/page.js",
                                            lineNumber: 109,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/inventory/page.js",
                                    lineNumber: 97,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/page.js",
                                lineNumber: 96,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/inventory/page.js",
                        lineNumber: 92,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/inventory/page.js",
                lineNumber: 79,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "fdcdcaf1598921ca",
                children: "tbody.jsx-fdcdcaf1598921ca tr.jsx-fdcdcaf1598921ca:hover{background-color:#f9fafb}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/inventory/page.js",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=src_app_admin_b3d4e74d._.js.map