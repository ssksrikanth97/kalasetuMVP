(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Navbar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/CartContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
function Navbar() {
    _s();
    const { user, userRole, loading, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { cartCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isAuthPage = pathname?.startsWith('/auth/');
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleMenu = ()=>setIsMenuOpen(!isMenuOpen);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "jsx-ccd99e5b0b3779a" + " " + "navbar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                },
                className: "jsx-ccd99e5b0b3779a" + " " + "container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            textDecoration: 'none',
                            zIndex: 101,
                            display: 'flex',
                            alignItems: 'center'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                width: '180px',
                                height: '50px'
                            },
                            className: "jsx-ccd99e5b0b3779a",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/logo.png",
                                alt: "KalaSetu",
                                fill: true,
                                style: {
                                    objectFit: 'contain',
                                    objectPosition: 'left'
                                },
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 23,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.js",
                            lineNumber: 22,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 21,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleMenu,
                        "aria-label": "Toggle Navigation",
                        className: "jsx-ccd99e5b0b3779a" + " " + "mobile-menu-btn",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-ccd99e5b0b3779a" + " " + `hamburger ${isMenuOpen ? 'open' : ''}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.js",
                            lineNumber: 39,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 34,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-ccd99e5b0b3779a" + " " + `nav-links-container ${isMenuOpen ? 'active' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/explore-institutions",
                                className: "nav-link",
                                onClick: ()=>setIsMenuOpen(false),
                                children: "Institutions"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 45,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/shop",
                                className: "nav-link",
                                onClick: ()=>setIsMenuOpen(false),
                                children: "Shop"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 46,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/about",
                                className: "nav-link",
                                onClick: ()=>setIsMenuOpen(false),
                                children: "About"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 47,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/cart",
                                className: "nav-link",
                                onClick: ()=>setIsMenuOpen(false),
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-ccd99e5b0b3779a",
                                        children: "🛒"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 50,
                                        columnNumber: 25
                                    }, this),
                                    cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: 'var(--color-maroon)',
                                            color: 'white',
                                            borderRadius: '50%',
                                            padding: '2px 8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        },
                                        className: "jsx-ccd99e5b0b3779a",
                                        children: cartCount
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 52,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this),
                            !loading && (user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-ccd99e5b0b3779a" + " " + "auth-buttons",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${userRole || 'customer'}/dashboard`,
                                        className: "btn-primary",
                                        style: {
                                            padding: '0.5rem 1rem',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        onClick: ()=>setIsMenuOpen(false),
                                        children: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 68,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            logout();
                                            setIsMenuOpen(false);
                                        },
                                        style: {
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            border: '1px solid var(--color-maroon)',
                                            background: 'transparent',
                                            color: 'var(--color-maroon)',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            minWidth: '100px'
                                        },
                                        className: "jsx-ccd99e5b0b3779a" + " " + "btn-secondary",
                                        children: "Logout"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 76,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 67,
                                columnNumber: 29
                            }, this) : !isAuthPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-ccd99e5b0b3779a" + " " + "auth-buttons",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/auth/login",
                                        className: "btn-secondary",
                                        style: {
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.9rem',
                                            textAlign: 'center'
                                        },
                                        onClick: ()=>setIsMenuOpen(false),
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 93,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/auth/signup",
                                        className: "btn-primary",
                                        style: {
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.9rem',
                                            textAlign: 'center'
                                        },
                                        onClick: ()=>setIsMenuOpen(false),
                                        children: "Join"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 94,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 92,
                                columnNumber: 33
                            }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 43,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.js",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "ccd99e5b0b3779a",
                children: '.mobile-menu-btn.jsx-ccd99e5b0b3779a{cursor:pointer;z-index:101;background:0 0;border:none;padding:.5rem;display:none}.hamburger.jsx-ccd99e5b0b3779a{background:var(--color-maroon);width:24px;height:2px;transition:all .3s ease-in-out;display:block;position:relative}.hamburger.jsx-ccd99e5b0b3779a:before,.hamburger.jsx-ccd99e5b0b3779a:after{content:"";background:var(--color-maroon);width:24px;height:2px;transition:all .3s ease-in-out;position:absolute;left:0}.hamburger.jsx-ccd99e5b0b3779a:before{top:-8px}.hamburger.jsx-ccd99e5b0b3779a:after{top:8px}.hamburger.open.jsx-ccd99e5b0b3779a{background:0 0}.hamburger.open.jsx-ccd99e5b0b3779a:before{top:0;transform:rotate(45deg)}.hamburger.open.jsx-ccd99e5b0b3779a:after{top:0;transform:rotate(-45deg)}.nav-links-container.jsx-ccd99e5b0b3779a{align-items:center;gap:var(--spacing-lg);display:flex}.auth-buttons.jsx-ccd99e5b0b3779a{align-items:center;gap:1rem;display:flex}@media (width<=768px){.mobile-menu-btn.jsx-ccd99e5b0b3779a{display:block}.nav-links-container.jsx-ccd99e5b0b3779a{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);z-index:100;background-color:#fffffffa;flex-direction:column;justify-content:center;padding:2rem;transition:transform .3s ease-in-out;position:fixed;inset:0;transform:translateY(-100%)}.nav-links-container.active.jsx-ccd99e5b0b3779a{transform:translateY(0)}.nav-link.jsx-ccd99e5b0b3779a{margin:1rem 0;font-size:1.5rem}.auth-buttons.jsx-ccd99e5b0b3779a{flex-direction:column;gap:1rem;width:100%;margin-top:1rem}.auth-buttons.jsx-ccd99e5b0b3779a a.jsx-ccd99e5b0b3779a,.auth-buttons.jsx-ccd99e5b0b3779a button.jsx-ccd99e5b0b3779a{justify-content:center;width:100%}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Navbar.js",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
_s(Navbar, "eTPF5R0FNS0O5PWbWXDkWF6SET8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/institutions/[institutionId]/institution-profile.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "aboutSection": "institution-profile-module__TTyLza__aboutSection",
  "artistCard": "institution-profile-module__TTyLza__artistCard",
  "artistsGrid": "institution-profile-module__TTyLza__artistsGrid",
  "artistsSection": "institution-profile-module__TTyLza__artistsSection",
  "container": "institution-profile-module__TTyLza__container",
  "eventCard": "institution-profile-module__TTyLza__eventCard",
  "eventInfo": "institution-profile-module__TTyLza__eventInfo",
  "eventsGrid": "institution-profile-module__TTyLza__eventsGrid",
  "eventsSection": "institution-profile-module__TTyLza__eventsSection",
  "header": "institution-profile-module__TTyLza__header",
  "headerContent": "institution-profile-module__TTyLza__headerContent",
  "location": "institution-profile-module__TTyLza__location",
  "logo": "institution-profile-module__TTyLza__logo",
  "pageWrapper": "institution-profile-module__TTyLza__pageWrapper",
});
}),
"[project]/src/app/institutions/[institutionId]/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InstitutionProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firebase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/institutions/[institutionId]/institution-profile.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function InstitutionProfile() {
    _s();
    const { institutionId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [institution, setInstitution] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InstitutionProfile.useEffect": ()=>{
            if (!institutionId) return;
            const fetchInstitution = {
                "InstitutionProfile.useEffect.fetchInstitution": async ()=>{
                    const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'institutions', institutionId);
                    const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
                    if (docSnap.exists()) {
                        setInstitution(docSnap.data());
                    } else {
                        console.log("No such institution!");
                    }
                    setLoading(false);
                }
            }["InstitutionProfile.useEffect.fetchInstitution"];
            fetchInstitution();
        }
    }["InstitutionProfile.useEffect"], [
        institutionId
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-loading",
            children: "Loading profile..."
        }, void 0, false, {
            fileName: "[project]/src/app/institutions/[institutionId]/page.js",
            lineNumber: 30,
            columnNumber: 16
        }, this);
    }
    if (!institution) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Institution not found."
        }, void 0, false, {
            fileName: "[project]/src/app/institutions/[institutionId]/page.js",
            lineNumber: 34,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageWrapper,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                lineNumber: 39,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: institution.media?.logoUrl || 'https://via.placeholder.com/150',
                                alt: "Logo",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo
                            }, void 0, false, {
                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                lineNumber: 42,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: institution.basicDetails?.instituteName
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                        lineNumber: 44,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].location,
                                        children: institution.basicDetails?.city
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                        lineNumber: 45,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                lineNumber: 43,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                        lineNumber: 41,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].aboutSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "About"
                            }, void 0, false, {
                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                lineNumber: 50,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: institution.about?.description
                            }, void 0, false, {
                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                lineNumber: 51,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                        lineNumber: 49,
                        columnNumber: 17
                    }, this),
                    institution.events && institution.events.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventsSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Events & Gallery"
                            }, void 0, false, {
                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                lineNumber: 56,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventsGrid,
                                children: institution.events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: event.imageUrl || 'https://via.placeholder.com/300x200',
                                                alt: event.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                                lineNumber: 60,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].eventInfo,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: event.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                                        lineNumber: 62,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: event.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                                        lineNumber: 63,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                                lineNumber: 61,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, event.id, true, {
                                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                        lineNumber: 59,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                lineNumber: 57,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                        lineNumber: 55,
                        columnNumber: 21
                    }, this),
                    institution.artists && institution.artists.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].artistsSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Artists & Team"
                            }, void 0, false, {
                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                lineNumber: 73,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].artistsGrid,
                                children: institution.artists.map((artist)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$institutions$2f5b$institutionId$5d2f$institution$2d$profile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].artistCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: artist.imageUrl || 'https://via.placeholder.com/150',
                                                alt: artist.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                                lineNumber: 77,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: artist.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                                lineNumber: 78,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: artist.role
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                                lineNumber: 79,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, artist.id, true, {
                                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                        lineNumber: 76,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                                lineNumber: 74,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                        lineNumber: 72,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/institutions/[institutionId]/page.js",
                lineNumber: 40,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/institutions/[institutionId]/page.js",
        lineNumber: 38,
        columnNumber: 9
    }, this);
}
_s(InstitutionProfile, "TZyyJPUKdmK84HROf3TDJ2iopeo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = InstitutionProfile;
var _c;
__turbopack_context__.k.register(_c, "InstitutionProfile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_d103fc33._.js.map